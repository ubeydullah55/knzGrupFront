import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AppConfig } from '../../../config/app.config';
import { productsModel } from '../../../models/productModel';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-adminproductedit',
  standalone: true,
  imports: [CKEditorModule,CommonModule,FormsModule],
  templateUrl: './adminproductedit.component.html',
  styleUrl: './adminproductedit.component.css'
})
export class AdminproducteditComponent implements OnInit{
  public Editor: any;
  public editorData: string = '';
  api_url = `${AppConfig.apiUrl}/products`;
 
  categories_url = `${AppConfig.apiUrl}/categories`; // Kategori API'si
  categories: { id: number, name: string }[] = []; // Kategori dizisi
  product: productsModel;

  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null; // Önizleme URL'si için değişken
  httpClient: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Tarayıcı ortamında olup olmadığımızı kontrol edin
    if (typeof window !== 'undefined') {
      import('@ckeditor/ckeditor5-build-classic').then(module => {
        this.Editor = module.default; // CKEditor'u dinamik olarak yükle
        // CKEditor yüklendikten sonra kısa bir süre bekleyip veriyi yeniden set et
        setTimeout(() => {
          if (this.product && this.product.description) {
            this.editorData = this.product.description; // Eğer açıklama varsa editöre set et
          }
        }, 100);
      });
    }
 
    // URL parametrelerini al
    const productId = this.route.snapshot.paramMap.get('id'); // 'id' URL'deki parametre adı
  
    // Eğer bir productId varsa, API'den ürünü al
    if (productId) {
      this.getProductApi(productId).subscribe({
        next: (data) => {
          this.product = data; // Ürün verisini al
          this.editorData = this.product.description; // Veriyi CKEditor'e aktar
          
          if (this.product) {
            this.editorData = this.product.description; // Eğer açıklama varsa atayın
            this.getCategories();
          } else {
            console.error('Ürün bulunamadı.'); // Ürün yoksa hata göster
          }
        },
        error: (err) => {
          console.error('Ürün bilgileri alınırken bir hata oluştu.'); // Hata durumunu göster
          console.error('API Hatası:', err); // Konsola hata bilgilerini yazdır
        }
      });
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement; 
    if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0]; 

        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.imagePreviewUrl = e.target.result; // Önizleme URL'sini sakla
        };
        reader.readAsDataURL(this.selectedFile); 
    }
}

  getCategories() {
    this.http.get<{ id: number, name: string }[]>(this.categories_url).subscribe({
      next: (data) => {
        this.categories = data; // Kategorileri al
      },
      error: (err) => {
        console.error('Kategoriler alınırken bir hata oluştu:', err);
      }
    });
  }
  productUpdate(){
    console.log(this.product);
if(this.imagePreviewUrl){
  const formData = new FormData();
    formData.append('file', this.selectedFile!); // 'file' sunucu tarafında beklenen alan ismi
    // Diğer form verilerini de ekleyebilirsiniz
    // formData.append('productName', this.product.name);
    
    // HTTP istemcisi ile dosyayı gönderin
    this.httpClient.post('API_URL', formData).subscribe((response: any) => {
        console.log('Dosya yüklendi:', response);
    });
}
  

  }
  onCategoryChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Seçim elemanını al
    const selectedCategoryId = Number(selectElement.value); // Seçilen kategorinin ID'sini al ve number'a çevir
    // product.categoryid'yi güncelle
    this.product.categoryid = selectedCategoryId; 
  }
  getProductApi(id: string) {
    return this.http.get<productsModel>(`${this.api_url}/${id}`); // Dinamik olarak id ile istek at
  }
}
