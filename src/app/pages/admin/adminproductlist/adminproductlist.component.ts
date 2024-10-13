import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../config/app.config';
import { productsModel } from '../../../models/productModel';
import { HttpClient } from '@angular/common/http';
import { DataTable } from 'simple-datatables';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminproductlist',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './adminproductlist.component.html',
  styleUrl: './adminproductlist.component.css'
})
export class AdminproductlistComponent implements OnInit{
  api_url = `${AppConfig.apiUrl}/products`;
  productApi$=this.getAllProductApi();
  categories_url = `${AppConfig.apiUrl}/categories`; // Kategori API'si
  categories: { id: number, name: string }[] = []; // Kategori dizisi
  product: productsModel[] = [];
  constructor(private http: HttpClient) { }
  ngOnInit() {
       // Kategorileri al
       this.getAllCategoriesApi().subscribe(categoriesData => {
        this.categories = categoriesData;
        // Ürünleri al
        this.getAllProductApi().subscribe(data => {
          this.product = data.sort((a, b) => b.id - a.id);
          this.initializeDataTable();
        });
      });

  }
  initializeDataTable() {
    // Yükleme tamamlandıktan sonra tabloyu başlatın
    setTimeout(() => {
      new DataTable("#datatablesSimple", {
        perPage: 25,
        perPageSelect: [10, 25, 50, 100],
        searchable: true,
        sortable: true
      });
    }, 200);
  }
  getAllCategoriesApi() {
    const timestamp = new Date().getTime();  // Zaman damgası
    return this.http.get<{ id: number, name: string }[]>(`${this.categories_url}?t=${timestamp}`);
  }
  getAllProductApi() {
    const timestamp = new Date().getTime();  // Zaman damgası
    return this.http.get<productsModel[]>(`${this.api_url}?t=${timestamp}`);
  }
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Bilinmiyor'; // Kategori bulunamazsa 'Bilinmiyor' döner
  }

  productDelete(id: number) {

    Swal.fire({
      title: 'Seçili ürünü silmek istediğinize emin misiniz?',
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
            Swal.fire('Başarı', "Ürün başarılı bir şekilde silindi... !", "success");
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
  trackById(index: number, item: productsModel): number {
    return item.id;  // veya item.id, öğe için benzersiz bir özellik kullanın
  }
}
