using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
namespace MyProject.Application.DTOs
{
    

    public class RegisterDto
    {
        [Required(ErrorMessage = "الإيميل مطلوب")]
        [EmailAddress(ErrorMessage = "الإيميل غير صالح")]
        public string Email { get; set; }

        [Required(ErrorMessage = "كلمة المرور مطلوبة")]
        [MinLength(8, ErrorMessage = "كلمة المرور لازم تكون 8 أحرف على الأقل")]
        [RegularExpression(@"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$",
            ErrorMessage = "الباسورد لازم يحتوي على حرف كبير وصغير ورقم ورمز")]
        public string Password { get; set; }
    }

    public class ForgotPasswordDto
    {
        public string Email { get; set; }
    }

    public class ResetPasswordDto
    {
        public string Token { get; set; }
        public string NewPassword { get; set; }
    }
}
