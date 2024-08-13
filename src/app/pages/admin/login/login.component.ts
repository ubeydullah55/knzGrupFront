import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  msg: string = '';
  emailError: boolean = false;

  // Form gönderim işlemi
  onSubmit() {
    if (this.isEmailValid(this.email) && this.msg.trim() !== '') {
      // Form verilerini işleme kodu
      Swal.fire('Gönderim Başarılı', "Mesajınız iletilmiştir en kısa sürede size dönüş yapılacaktır.... !", "success");
      
      //alert(`Email: ${this.email}\nMesaj: ${this.msg}`);
      // Formu sıfırlama
      this.email = '';
      this.msg = '';
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
}
