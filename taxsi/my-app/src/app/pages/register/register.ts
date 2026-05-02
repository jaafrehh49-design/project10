import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit, AfterViewInit {

  email = '';
  password = '';
  showPassword = false;

  // 👇 مهم لخداع Chrome
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

  register() {
    const data = {
      email: this.email,
      password: this.password
    };

    this.auth.register(data).subscribe({
      next: () => {
        alert('تم إنشاء الحساب ✅');
        this.clearFields();
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        alert(err.error || 'فشل التسجيل ❌');
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}