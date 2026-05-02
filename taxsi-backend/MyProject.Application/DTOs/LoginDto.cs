using System;
using System.Collections.Generic;
using System.Text;
using MyProject.Infrastructure;
using MyProject.Application.DTOs;
using System.ComponentModel.DataAnnotations;
namespace MyProject.Application.DTOs

{
   

    public class LoginDto
    {
        [Required(ErrorMessage = "الإيميل مطلوب")]
        [EmailAddress(ErrorMessage = "الإيميل غير صالح")]
        public string Email { get; set; }

        [Required(ErrorMessage = "كلمة المرور مطلوبة")]
        public string Password { get; set; }
    }
}
