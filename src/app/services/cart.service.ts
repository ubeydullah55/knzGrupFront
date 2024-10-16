import { Injectable } from '@angular/core';
import { json } from 'stream/consumers';
import { productsModel } from '../models/productModel';
import Swal from 'sweetalert2';
import { teklifModel } from '../models/teklifModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { teklifPostModel } from '../models/teklifPostModel';
import { Observable } from 'rxjs';
import { count } from 'console';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AppConfig } from '../config/app.config';
@Injectable({
  providedIn: 'root'
})
export class CartService {

public product :productsModel[]=[];
public product2 :productsModel[]=[];
public teklifBilgi:teklifModel[]=[];
public teklifPost:teklifPostModel[]=[];
public postJsonValue:any;
totalPricePost = 0;
siparisidPost=0;
curDate=new Date();

  //api_url='https://localhost:7266/api/siparis';
  api_url = `${AppConfig.apiUrl}/siparis`;
  api_url_detay = `${AppConfig.apiUrl}/siparisdetay`;
  //api_url_detay='https://localhost:7266/api/siparisdetay';
formData = {
  adSoyad: '',
  mail: '',
  telefon: ''
};
  constructor(private http: HttpClient) {
    if(typeof localStorage !== 'undefined')
    {
      const data=localStorage.getItem('urunEklemesession');
      if(data){
        this.product=JSON.parse(data);
        this.product2=JSON.parse(data);
      }
    
    }
   }
  
   getPostTeklifApi() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // 'Content-Type' başlığı doğru şekilde ayarlandı
    });
    const localDate = new Date(this.curDate.getTime() - (this.curDate.getTimezoneOffset() * 60000)).toISOString();
    const body = {
      name: this.formData.adSoyad,
      mail: this.formData.mail,
      tel: String(this.formData.telefon),
      tarih: localDate,  
      totalprice: this.totalPricePost
    };
  
    return this.http.post<{ id: number }>(this.api_url, body, { headers }).pipe(
      map((data) => {
        sessionStorage.setItem('siparisidPost', data.id.toString());
        return data.id;
      }),
      catchError((error) => {
        console.error('Hata oluştu:', error);
        return of(null); // Hata durumunda null döndürüyoruz
      })
    );
  }

  getPostDetay(siparisid: number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.product.forEach((item) => {
      const body = {
        siparisid: siparisid,  // product içindeki siparisid kullanılıyor
        productid: item.id,    // product içindeki id kullanılıyor
        count: item.count,     // product içindeki count kullanılıyor
      };
      this.http.post(this.api_url_detay, body, { headers }).subscribe(
        (data) => {
          // Başarılı POST işleminde yapılacaklar
        },
        (error) => {
          console.error('Hata oluştu:', error);
        }
      );
    });
    this.sepetSifirla();
  }

  urunEkle(item:any)
  {
   
   // Aynı ID'ye sahip ürünü bul
   let existingProduct = this.product.find(p => p.id === item.id);

   if (existingProduct) {
     // Ürün zaten varsa, count'u artır
     if (existingProduct.count !== undefined && existingProduct.count !== null) {
      existingProduct.count += 1;
    } else {
      existingProduct.count = 1;
    }
   } else {
     // Ürün yoksa, yeni bir ürün olarak ekle
     let products = new productsModel();
     products.id = item.id;
     products.name = item.name;
     products.description = item.description;
     products.imgfile = item.imgfile;
     products.price=item.price;
     if(item.count>0){
      products.count = item.count;
     }
     else
     {
      products.count = 1;  // Yeni ürün için count'u 1 olarak ayarla
     }
    
     this.product.push(products);
   }
 
   this.SaveLocalStorageProduct();
   Swal.fire('Ekleme Başarılı', "Ürün sepetinize başarılı bir şekilde eklenmiştir !", "success");  
  }
  urunEkleToplu(item:any)
  {
   
   // Aynı ID'ye sahip ürünü bul
   let existingProduct = this.product.find(p => p.id === item.id);

   if (existingProduct) {
     // Ürün zaten varsa, count'u artır
     existingProduct.count = item.count;
   } else {
     // Ürün yoksa, yeni bir ürün olarak ekle
     let products = new productsModel();
     products.id = item.id;
     products.name = item.name;
     products.description = item.description;
     products.imgfile = item.imgfile;
     products.price=item.price;
     if(item.count>0){
      products.count = item.count;
     }
     else
     {
      products.count = 1;  // Yeni ürün için count'u 1 olarak ayarla
     }
    
     this.product.push(products);
   }
 
   this.SaveLocalStorageProduct();
   Swal.fire('Ekleme Başarılı', "Ürün sepetinize başarılı bir şekilde eklenmiştir !", "success"); 
  }
  
  urunSil(id: number) {
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
        const index = this.product.findIndex(x => x.id === id);
        if (index > -1) {
          this.product.splice(index, 1);
          this.SaveLocalStorageProduct();        
        } else {
          Swal.fire('Hata', "Silme işlemi başarısız. Bir hata ile karşılaşıldı!", "error").then(() => {
            // Hata bildirimin z-index ayarını yap
            const swalPopup = document.querySelector('.swal2-container');
            if (swalPopup) {
              (swalPopup as HTMLElement).style.zIndex = '2000';
            }
          });
        }
      } else if (result.isDenied) {
        return;
      }
    });
  
    // İlk bildirim için z-index ayarını yap
    setTimeout(() => {
      const swalPopup = document.querySelector('.swal2-container');
      if (swalPopup) {
        (swalPopup as HTMLElement).style.zIndex = '2000';
      }
    }, 0);
  }
  
  
  
  getAllSessionProducts(){
    return this.product;
  }
  
  productsCount(){
    return this.product.length;
  }

  sepetiBosalt(){
    Swal.fire({
      title: 'Sepetteki tüm ürünler silinecek devam etmek istiyormusunuz ?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.product=[];
        this.SaveLocalStorageProduct();
      } else if (result.isDenied) {
        return;
      }
    });
    setTimeout(() => {
      const swalPopup = document.querySelector('.swal2-container');
      if (swalPopup) {
        (swalPopup as HTMLElement).style.zIndex = '2000';
      }
    }, 0);
  }
  sepetSifirla(){
    this.product=[];
    this.SaveLocalStorageProduct();
  }
  SaveLocalStorageProduct() 
  {
    localStorage.setItem('urunEklemesession',JSON.stringify(this.product));
 }
 updateItem(updatedItem: any) {
  // Sepetteki ürünü günceller
  const index = this.product.findIndex(item => item.id === updatedItem.id);
  if (index > -1) {
    this.product[index] = updatedItem;
    this.SaveLocalStorageProduct();
  }
  
}
totalPrice() : number{
  let totalPrice = 0;
  for (const item of this.product) {
      const itemCount = item.count || 0; // Eğer item.count undefined ise, 0 olarak kabul edilir
      totalPrice += item.price * itemCount; // Fiyat ve miktar çarpımını toplama ekle
  }
  this.totalPricePost=totalPrice;
  return totalPrice;
}
teklifAl(){
  this.getPostTeklifApi().subscribe((siparisid) => {
    if (siparisid !== null) {
      this.getPostDetay(siparisid);
    }
  });
  
}

}
