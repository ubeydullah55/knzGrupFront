import { Component, Inject, inject,OnInit, PLATFORM_ID } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { ProductsService } from '../../../services/products.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { DataService } from '../../../services/data-service.service';
import { CategoryService } from '../../../services/category.service';
import { productsModel } from '../../../models/productModel';
import { categoryModel } from '../../../models/categoryModel';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterModule],
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
  products: productsModel[] = [];
  categories: categoryModel[] = [];
  selectedCategoryId: number | null = null;

  constructor(private router: Router,@Inject(PLATFORM_ID) private platformId: Object) {}
  ngOnInit(): void {
    this.kategoriListele();   // Ürünleri yükle
    this.urunListele(); // Kategorileri yükle

  }

  // TrackBy function for *ngFor
  trackByProductId(index: number, item: productsModel): number {
    return item.id; // Ürün ID'si ile izleme yap
  }

  trackByCategoryId(index: number, item: categoryModel): number {
    return item.id; // Kategori ID'si ile izleme yap
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
    this.categoryService.getAllCategoryApi().subscribe({
      next: (data) => {
        this.categories = data; // Kategorileri al ve güncelle
      },
      error: (err) => {
        console.error('Kategoriler alınırken bir hata oluştu:', err);
      }
    });

  }
  urunListele(){
    this.productsService.getAllProductsApi().subscribe({
      next: (data) => {
        this.products = data; // Ürünleri al ve güncelle
      },
      error: (err) => {
        console.error('Ürünler alınırken bir hata oluştu:', err);
      }
    });
  }
  // Kategori seçme fonksiyonu
  kategoriSec(categoryId: number | null) {
    this.selectedCategoryId = categoryId; // Seçilen kategori ID'sini güncelle
  }

  // Ürünleri filtreleyen bir getter
  get filteredProducts() {
    if (this.selectedCategoryId) {
      return this.products.filter(product => product.categoryid === this.selectedCategoryId);
    }
    return this.products; // Tüm ürünleri göster
  }
}
