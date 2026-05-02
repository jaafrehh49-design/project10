import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink,RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit, AfterViewInit {

  email = '';
  password = '';
  showPassword = false;

  // 👇 مهم جداً لخداع Chrome
  randomId = Math.random();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.clearFields();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.clearFields();
    }, 200);
  }

  clearFields() {
    this.email = '';
    this.password = '';
  }

  login() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.auth.login(data).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        alert('تم تسجيل الدخول ✅');
        this.clearFields();
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        alert(err.error || 'بيانات خاطئة ❌');
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}