import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
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
