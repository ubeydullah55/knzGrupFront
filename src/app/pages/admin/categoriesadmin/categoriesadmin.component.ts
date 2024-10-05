import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { categoryModel } from '../../../models/categoryModel';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-categoriesadmin',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './categoriesadmin.component.html',
  styleUrl: './categoriesadmin.component.css'
})
export class CategoriesadminComponent implements OnInit{
  api_url = `${AppConfig.apiUrl}/categories`;
  categoryApi$=this.getAllCategoryApi();

  category: categoryModel[] = [];
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getAllCategoryApi().subscribe(data => {
      this.category = data.sort((a, b) => b.id - a.id);
    });

  }
  getAllCategoryApi(){
    return this.http.get<[categoryModel]>(this.api_url);
  }
  categoryDelete(id: number) {
    const url = `${this.api_url}/${id}`;
    this.http.delete(url).subscribe({
      next: () => {
        console.log(`Kategori ${id} başarıyla silindi!`);
        this.category = this.category.filter(item => item.id !== id);
      },
      error: (err) => {
        console.error('Silme işlemi başarısız oldu:', err);
      }
    });
  }
  trackById(index: number, item: categoryModel): number {
    return item.id;  // veya item.id, öğe için benzersiz bir özellik kullanın
  }
}
