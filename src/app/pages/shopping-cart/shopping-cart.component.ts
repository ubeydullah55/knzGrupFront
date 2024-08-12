import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  cartService=inject(CartService);
  formData = {
    adSoyad: '',
    mail: '',
    telefon: ''
  };
  changeQuantity(item: any, delta: number) {
    item.count = Math.max(1, item.count + delta); // Ensure count is at least 1
    this.updateItemCount(item);
  }

  updateItemCount(item: any) {
    // Update the item in the cart service or perform other operations
    this.cartService.updateItem(item);
  }
  updateQuantity(item: any, newQuantity: number): void {
    item.count = newQuantity;
    this.cartService.updateItem(item); // Hizmet metodunu güncelleyebilirsiniz
  }
  getForm(form: any){
    if (form.valid) {
      // Form valid, proceed with submission
      console.log('Form Data:', this.formData);
      this.teklifAl();
      
      // Perform the submission or other actions with formData here
      Swal.fire('Başarı', 'Form başarıyla gönderildi!', 'success');
      this.cartService.sepetSifirla();
      window.location.reload();
    } else {
      // Form invalid, show error
      if (!this.formData.adSoyad) {
        Swal.fire('Hata', 'İsim Soyisim alanı boş olamaz!', 'error');
      } else if (!this.formData.mail || !this.isValidEmail(this.formData.mail)) {
        Swal.fire('Hata', 'Geçerli bir e-posta adresi girin!', 'error');
      } else if (!this.formData.telefon) {
        Swal.fire('Hata', 'Telefon numarası boş olamaz!', 'error');
      }
    }
  }
  teklifAl(){
    this.cartService.teklifAl();
  }
  private isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}
