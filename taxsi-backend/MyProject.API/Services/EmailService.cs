using System.Net;
using System.Net.Mail;

namespace MyProject.API.Services
{
    public class EmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmail(string to, string subject, string body)
        {
            var email = _config["EmailSettings:Email"];
            var password = _config["EmailSettings:Password"];

            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                Credentials = new NetworkCredential(email, password),
                EnableSsl = true
            };

            var message = new MailMessage(email, to, subject, body);

            await client.SendMailAsync(message); // 👈 مهم
        }
    }
}