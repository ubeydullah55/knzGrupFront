import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailError: boolean = false;
  constructor(private router: Router) {}
  // Form gönderim işlemi
  onSubmit() {
    if (this.isEmailValid(this.email) && this.password.trim() !== '') {
      this.loginControl();
      // Form verilerini işleme kodu
      if(sessionStorage.getItem('loginControl')=='true'){
        Swal.fire('Başarı', "Giriş başarılı... !", "success");
        this.redirectToPanel();
      }
     else
     {
      Swal.fire('Hata', "Mail aderesi veya şifre yanlış... !", "error");
      this.email = '';
      this.password = '';
     }
      
      //alert(`Email: ${this.email}\nMesaj: ${this.msg}`);
      // Formu sıfırlama
      
      this.emailError = false; // Hata mesajını gizle
    } else {
      this.emailError = !this.isEmailValid(this.email);
      Swal.fire('Hata', "Lütfen geçerli bir email adresi girin ve tüm alanları doldurun. !", "error");
    }
  }

  // Email doğrulama fonksiyonu
  isEmailValid(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  loginControl(){
    if((this.email=='info@knzgrup.com.tr')&&(this.password=='./2024knz-')){      
      sessionStorage.setItem('loginControl', 'true');
    }
  }
  redirectToPanel(): void {
    this.router.navigate(['/admin/panel']);
  }
}
