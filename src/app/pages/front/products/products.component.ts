import { Component, inject,OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data-service.service';
import { CategoryService } from '../../../services/category.service';
import { Observable } from 'rxjs';
import { categoryModel } from '../../../models/categoryModel';
import { productsModel } from '../../../models/productModel';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']  // Düzeltilmiş: 'styleUrls' yerine 'styleUrl' yerine
})
export class ProductsComponent implements OnInit {

  say:number=0;
  categories$: Observable<categoryModel[]>; // Observable for categories
  productsApi$: Observable<productsModel[]>; // Observable for products
  // Servisleri injection yoluyla al
  cartService = inject(CartService);
  dataService = inject(DataService);

  constructor(private router: Router,private categoryService:CategoryService,private productsService:ProductsService) {}
  ngOnInit(): void {
    // Sayfanın daha önce yenilenip yenilenmediğini kontrol et
    if (typeof window !== 'undefined') {
      const hasReloaded = localStorage.getItem('hasReloaded');
      // localStorage işlemlerini burada yapın
       
    if (!hasReloaded) {
      // Yenileme işlemini gerçekleştir
      localStorage.setItem('hasReloaded', 'true');
      window.location.reload();
    } else {
      // Yenilenmişse, durumu sıfırla
      localStorage.removeItem('hasReloaded');
    }
    }
    this.categories$ = this.categoryService.getAllCategoryApi();
    this.productsApi$ = this.productsService.getAllProductsApi();
 
  }
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
  kategoriListele(){
    return this.categoryService.getAllCategoryApi();
  }
  urunListele(){
    return this.productsService.getAllProductsApi();
  }
}
