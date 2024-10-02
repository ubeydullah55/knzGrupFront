import { Component, Inject, inject,OnInit, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { ProductsService } from '../../../services/products.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
export class ProductsComponent implements OnInit {

  say:number=0;
  // Servisleri injection yoluyla al
  cartService = inject(CartService);
  productsService = inject(ProductsService);
  categoryService = inject(CategoryService);
  dataService = inject(DataService);
  categories$=this.kategoriListele();
  productsApi$=this.urunListele();
  constructor(private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {

    if (isPlatformBrowser(this.platformId)) {
      // Tarayıcı ortamında çalışıyorsa bu kodu çalıştır
      const hasReloaded = localStorage.getItem('hasReloaded');
    
      if (!hasReloaded) {
        // Yenileme işlemini gerçekleştir
        localStorage.setItem('hasReloaded', 'true');
        window.location.reload();
      } else {
        // Yenilenmişse, durumu sıfırla
        localStorage.removeItem('hasReloaded');
      }
    }
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
