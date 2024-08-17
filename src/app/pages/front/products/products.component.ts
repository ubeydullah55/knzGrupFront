import { Component, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { productsModel } from '../../../models/productModel';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data-service.service';
import { CategoryService } from '../../../services/category.service';


import { categoryModel } from '../../../models/categoryModel';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  constructor(private router: Router, private dataService: DataService) {}
  cartService=inject(CartService);
  productsService=inject(ProductsService);
  categoryService=inject(CategoryService);
  trackById(index: number, item: any): number {
    return item.id; // Her öğe için benzersiz olan ID'yi döndür
  }

  urunEkle(item:any){
    this.cartService.urunEkle(item);  
  }

  urunSil(id:number){
    this.cartService.urunSil(id);
  }

}
