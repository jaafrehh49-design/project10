import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPassword {

  email = '';


  constructor(private auth: AuthService) {}

  sendLink() {
    this.auth.forgotPassword(this.email).subscribe({
      next: (res: any) => {
        console.log('SUCCESS:', res);
  
        // 👇 إذا السيرفر رجّع string
        if (typeof res === 'string') {
          alert(res);
        } else if (res?.message) {
          alert(res.message);
        } else {
          alert('تم إرسال الرابط 📩');
        }
  
        this.email = '';
      },
  
      error: (err) => {
        console.log('ERROR:', err);
  
        // 👇 عرض الخطأ الحقيقي
        if (err.error?.message) {
          alert(err.error.message);
        } else if (typeof err.error === 'string') {
          alert(err.error);
        } else {
          alert('صار خطأ بالسيرفر ❌');
        }
      }
    });

  }
}