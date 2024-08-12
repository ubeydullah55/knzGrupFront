import { Injectable } from '@angular/core';
import { json } from 'stream/consumers';
import { productsModel } from '../models/productModel';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CartService {

public product :productsModel[]=[];
  constructor() {
    if(typeof localStorage !== 'undefined')
    {
      const data=localStorage.getItem('urunEklemesession');
      if(data){
        this.product=JSON.parse(data);
      }
    
    }
   }
  

  urunEkle(item:any)
  {
   
   // Aynı ID'ye sahip ürünü bul
   let existingProduct = this.product.find(p => p.id === item.id);

   if (existingProduct) {
     // Ürün zaten varsa, count'u artır
     existingProduct.count += 1;
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
    totalPrice += item.price * item.count; // Fiyat ve miktar çarpımını toplama ekle
  }
  return totalPrice;
}
teklifAl(){
  for (const item of this.product) {
     console.log(item);
  }
}

}
