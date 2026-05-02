import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'https://localhost:7180/api/Auth';

  constructor(private http: HttpClient) {}

 

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }
  
  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/send-reset-token`, {
      Email: email
    });
  }
  resetPassword(data: any) {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }
}