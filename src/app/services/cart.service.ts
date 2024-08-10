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
  

  urunEkle(id: number,ad : string)
  {
    let products=new productsModel();
    products.id=id;
    products.name=ad;
    this.product.push(products);
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
  SaveLocalStorageProduct() 
  {
    localStorage.setItem('urunEklemesession',JSON.stringify(this.product));
 }
}
