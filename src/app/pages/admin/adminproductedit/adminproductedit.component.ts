import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AppConfig } from '../../../config/app.config';
import { productsModel } from '../../../models/productModel';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';




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
    console.log("product update çalıştı"+this.product);
    if (this.imagePreviewUrl && this.product) {
      const formData = new FormData();
      formData.append('file', this.selectedFile!); // Sunucu tarafında beklenen alan ismi
      formData.append('name', this.product.name);
      formData.append('price', this.product.price.toString());
      formData.append('description', this.product.description);
      formData.append('categoryid', this.product.categoryid.toString());
      formData.append('imggfile', this.product.imgfile.toString());
  
      // Konsol çıktısı ile gönderilen verileri kontrol et
      console.log('Gönderilen veriler:', {
        name: this.product.name,
        price: this.product.price,
        description: this.product.description,
        categoryid: this.product.categoryid,
        imgfile:this.product.imgfile
      });
  
      this.http.put(`${this.api_url}/update/${this.product.id}`, formData).subscribe({
        next: (response: any) => {
          console.log('Ürün güncellendi:', response);
        },
        error: (err) => {
          console.error('Ürün güncellenirken bir hata oluştu:', err);
          // Hata mesajını ve detaylarını kontrol et
          if (err.error && err.error.errors) {
            console.error('Sunucudan dönen doğrulama hataları:', err.error.errors);
          } 
        }
      });
    } else {
      console.error('Gerekli veriler eksik veya seçili dosya yok!');
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

  addProduct() {

    
    const productData = {
      name: this.product.name,
      price: this.product.price,
      imgfile: this.product.imgfile,
      description: this.product.description,
      categoryid: this.product.categoryid
  };

  this.http.post(this.api_url, productData).subscribe({
      next: (response) => {
          console.log('Ürün başarıyla eklendi:', response);
      },
      error: (error) => {
          console.error('Ürün eklenirken hata oluştu:', error);
      }
  });
  }


updateProduct() {
  console.log("Ürün güncelleme işlemi başladı", this.product);
  
  // Güncellenmiş ürün verisini hazırlayın, ID de dahil
 
 

  Swal.fire({
    title: 'Geçerli düzenlemeleri kaydetmek istediğinize emin misiniz?',
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
      const productData = {
        id: this.product.id, // ID'yi ekliyoruz
        name: this.product.name,
        price: this.product.price,
        imgfile: this.product.imgfile,
        description: this.product.description,
        categoryid: this.product.categoryid
    };
    // API'ye PUT isteği gönderin
    this.http.put(`${this.api_url}/${this.product.id}`, productData).subscribe({
        next: (response) => {
            console.log('Ürün başarıyla güncellendi:', response);
            Swal.fire('Başarı', "Güncelleme başarılı... !", "success");
            window.location.reload();
        },
        error: (error) => {
            console.error('Ürün güncellenirken hata oluştu:', error);
        }
    });
   
    } else if (result.isDenied) {
      return;
    }
  });
}
onDescriptionBlur(event: any) {
  // CKEditor'deki veri, kullanıcı yazmayı bitirip editörden çıktığında güncellenir
  const editorData = event.editor.getData();
  this.product.description = editorData;
}

}
