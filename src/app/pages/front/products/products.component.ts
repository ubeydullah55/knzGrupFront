import { Component, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { productsModel } from '../../../models/productModel';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  cartService=inject(CartService);


  urunEkle(id: number,ad : string){
    this.cartService.urunEkle(id,ad);
  }
  urunSil(id:number){
    this.cartService.urunSil(id);
  }

}
