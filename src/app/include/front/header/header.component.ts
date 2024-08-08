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
  urunEkle(id: number,ad : string){
    this.cartService.urunEkle(id,ad);
  }
  urunListele(){
    this.cartService.getAllSessionProducts();
  }
  urunSil(id:number){
    this.cartService.urunSil(id);
  }
}
