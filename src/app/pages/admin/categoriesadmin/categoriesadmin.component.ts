import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { categoryModel } from '../../../models/categoryModel';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-categoriesadmin',
  standalone: true,
  imports: [CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './categoriesadmin.component.html',
  styleUrl: './categoriesadmin.component.css'
})
export class CategoriesadminComponent implements OnInit{
  api_url = `${AppConfig.apiUrl}/categories`;
  categoryApi$=this.getAllCategoryApi();

  category: categoryModel[] = [];
  addCategoryForm: FormGroup;
  constructor(private http: HttpClient,private fb: FormBuilder) { }
  ngOnInit() {
    this.getAllCategoryApi().subscribe(data => {
      this.category = data.sort((a, b) => b.id - a.id);
    });
  // Form oluşturuldu
  this.addCategoryForm = this.fb.group({
    name: ['']  // Kategori adı için input alanı
  });
  }
  addCategory() {

    Swal.fire({
      title: 'Bunu yeni bir kategori olarak eklemek istediğinize emin misiniz?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Evet',
      denyButtonText: 'Hayır',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newCategory: categoryModel = this.addCategoryForm.value;
    
        this.http.post<categoryModel>(this.api_url, newCategory).subscribe({
          next: (response) => {          
            this.category.push(response);
            this.addCategoryForm.reset();  // Formu temizle
            Swal.fire('Başarı', "Kategori başarılı bir şekilde eklendi... !", "success");
            window.location.reload();
          },
          error: (err) => {
            console.error('Kategori ekleme işlemi başarısız oldu:', err);
          }
        });
     
      } else if (result.isDenied) {
        return;
      }
    });
  }
  getAllCategoryApi() {
    const timestamp = new Date().getTime();  // Zaman damgası ekle
    return this.http.get<[categoryModel]>(`${this.api_url}?t=${timestamp}`);
  }
  categoryDelete(id: number) {

    Swal.fire({
      title: 'Seçili kategoriyi silmek istediğinize emin misiniz?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Evet',
      denyButtonText: 'Hayır',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `${this.api_url}/${id}`;
        this.http.delete(url).subscribe({
          next: () => {        
            Swal.fire('Başarı', "Kategori başarılı bir şekilde silindi... !", "success");
           window.location.reload();
          },
          error: (err) => {
            console.error('Silme işlemi başarısız oldu:', err);
          }
        });
     
      } else if (result.isDenied) {
        return;
      }
    });
  }

  trackById(index: number, item: categoryModel): number {
    return item.id;  // veya item.id, öğe için benzersiz bir özellik kullanın
  }
}
