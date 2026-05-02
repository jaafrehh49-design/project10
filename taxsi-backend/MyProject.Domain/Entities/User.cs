using System;
using System.Collections.Generic;

namespace MyProject.Infrastructure.Models;

public partial class User
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;
    public string? ResetToken { get; set; }
    public DateTime? TokenExpiry { get; set; }
  
}
