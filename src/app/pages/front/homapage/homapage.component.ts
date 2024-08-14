import { Component, inject } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../services/products.service';
@Component({
  selector: 'app-homapage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homapage.component.html',
  styleUrl: './homapage.component.css'
})
export class HomapageComponent {
  categoryService=inject(CategoryService);
  productsService=inject(ProductsService);
  trackById(index: number, item: any): number {
    return item.id; // Her öğe için benzersiz olan ID'yi döndür
  }
}
