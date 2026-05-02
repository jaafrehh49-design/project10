import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword implements OnInit {

  password = '';
  confirmPassword = '';
  token = '';
  showPassword = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'];
    console.log('TOKEN:', this.token);
  }

  reset() {
    if (this.password !== this.confirmPassword) {
      alert('كلمة المرور غير متطابقة ❌');
      return;
    }

    this.auth.resetPassword({
      token: this.token,
      newPassword: this.password
    }).subscribe({
      next: (res: any) => {
        alert(res.message || 'تم تغيير كلمة المرور ✅');
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        alert(err.error?.message || 'الرابط غير صالح ❌');
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}