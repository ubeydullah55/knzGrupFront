import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../../services/data-service.service';
import { CartService } from '../../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { productsModel } from '../../../models/productModel';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-detailproduct',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit {
  item: productsModel | undefined;
  urlid: number;
  description: SafeHtml | undefined; // Güvenli HTML içeriği
  cartService = inject(CartService);
  productsService = inject(ProductsService);
  sanitizer = inject(DomSanitizer); // DomSanitizer'ı inject ediyoruz

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null && id !== undefined) {
      this.urlid = +id; // + işareti ile string'i number'a çeviriyoruz
      this.productsService.getProductById(this.urlid).subscribe({
        next: (product) => {
          this.item = product;

          // Eğer item tanımlıysa, description'ı güvenli hale getir
          if (this.item && this.item.description) {
            this.description = this.sanitizer.bypassSecurityTrustHtml(this.item.description);
          }
        },
        error: (err) => {
          console.error('Ürün alınırken hata oluştu:', err);
        }
      });
    } else {
      console.error('ID parametresi bulunamadı.');
    }
  }

  changeQuantity(item: productsModel, delta: number) {
    if (item) {
      item.count = Math.max(1, (item.count || 1) + delta); // Ensure count is at least 1
    }
  }

  updateQuantity(item: productsModel, newQuantity: number): void {
    if (item) {
      item.count = newQuantity;
    }
  }

  urunEkleToplu(item: productsModel) {
    if (item) {
      this.cartService.urunEkleToplu(item);
    }
  }
}
