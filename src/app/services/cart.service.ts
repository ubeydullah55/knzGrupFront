import { Injectable } from '@angular/core';
import { json } from 'stream/consumers';
import { productsModel } from '../models/productModel';

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
     products.count = 1;  // Yeni ürün için count'u 1 olarak ayarla
     this.product.push(products);
   }
 
   this.SaveLocalStorageProduct();
   alert("Ekleme başarılı");
  }
  
  urunSil(id:number)
  {
    const index = this.product.findIndex(x => x.id === id);
    if(index>-1){
      this.product.splice(index, 1); 
      this.SaveLocalStorageProduct();
      alert("Silme başarılı");
    }
   else{
    alert("Silme başarısız");
   }    
  }
  
  getAllSessionProducts(){
    return this.product;
  }
  productsCount(){
    return this.product.length;
  }
  sepetiBosalt(){
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
