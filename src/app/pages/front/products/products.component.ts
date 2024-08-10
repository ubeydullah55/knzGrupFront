import { Component, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { productsModel } from '../../../models/productModel';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  cartService=inject(CartService);
  productsService=inject(ProductsService);

  trackById(index: number, item: any): number {
    return item.id; // Her öğe için benzersiz olan ID'yi döndür
  }

  urunEkle(id: number,ad : string){
    this.cartService.urunEkle(id,ad);    
  }

  urunSil(id:number){
    this.cartService.urunSil(id);
  }

}
