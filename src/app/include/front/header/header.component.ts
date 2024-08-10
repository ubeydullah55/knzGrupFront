import { Component, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  cartService=inject(CartService);
 
  urunListele(){
    this.cartService.getAllSessionProducts();
  }
  urunSil(id:number){
    this.cartService.urunSil(id);
  }
  sepetiBosalt(){
    this.cartService.sepetiBosalt();
  }
}
