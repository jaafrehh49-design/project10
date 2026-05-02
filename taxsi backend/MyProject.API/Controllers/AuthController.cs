using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyProject.Infrastructure.Context;
using MyProject.Application.DTOs;
using MyProject.Infrastructure.Models;
using MyProject.API.Services;

namespace MyProject.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtService _jwtService;
        private readonly EmailService _emailService;

        public AuthController(ApplicationDbContext context, JwtService jwtService, EmailService emailService)
        {
            _context = context;
            _jwtService = jwtService;
            _emailService = emailService;
        }

            [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            if (string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password))
                return BadRequest("الرجاء إدخال جميع البيانات");

            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == dto.Email);

            if (user == null)
                return Unauthorized("بيانات الدخول غير صحيحة");

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
                return Unauthorized("بيانات الدخول غير صحيحة");

            var token = _jwtService.GenerateToken(user);

            return Ok(new
            {
                token = token,
                message = "تم تسجيل الدخول"
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            if (string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password))
                return BadRequest("الرجاء إدخال جميع البيانات");

            var existingUser = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == dto.Email);

            if (existingUser != null)
                return BadRequest("Email مستخدم مسبقاً");

            var user = new User
            {
                Email = dto.Email.ToLower(),
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "تم إنشاء الحساب" });
        }
        [HttpPost("send-reset-token")]
        public async Task<IActionResult> SendResetToken([FromBody] ForgotPasswordDto dto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == dto.Email);

            if (user == null)
                return NotFound("المستخدم غير موجود");

            var token = Guid.NewGuid().ToString();

            user.ResetToken = token;
            user.TokenExpiry = DateTime.Now.AddMinutes(15);

            await _context.SaveChangesAsync();

            var link = $"http://localhost:4200/reset-password?token={token}";

            _ = Task.Run(async () =>
            {
                await _emailService.SendEmail(
                    dto.Email,
                    "Reset Password",
                    $"اضغطي الرابط:\n{link}"
                );
            });

            return Ok(new { message = "تم إرسال رابط إعادة التعيين إلى الإيميل" });
        }
        [HttpPost("reset-password")]
       
            public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.ResetToken == dto.Token);

            if (user == null)
                return BadRequest("التوكن غير صحيح");

            if (user.TokenExpiry < DateTime.Now)
                return BadRequest("التوكن منتهي");

            user.Password = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);

            user.ResetToken = null;
            user.TokenExpiry = null;

            await _context.SaveChangesAsync();

            return Ok(new { message = "تم تغيير كلمة المرور ✅" });
        }
    }
}