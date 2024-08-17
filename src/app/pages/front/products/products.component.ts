import { Component, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data-service.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']  // Düzeltilmiş: 'styleUrls' yerine 'styleUrl' yerine
})
export class ProductsComponent {

  // Servisleri injection yoluyla al
  cartService = inject(CartService);
  productsService = inject(ProductsService);
  categoryService = inject(CategoryService);
  dataService = inject(DataService);

  // TrackBy function for *ngFor
  trackById(index: number, item: any): number {
    return item.id; // Her öğe için benzersiz olan ID'yi döndür
  }

  // Sepete ürün ekleme
  urunEkle(item: any) {
    this.cartService.urunEkle(item);  
  }

  // Sepetten ürün silme
  urunSil(id: number) {
    this.cartService.urunSil(id);
  }
}
