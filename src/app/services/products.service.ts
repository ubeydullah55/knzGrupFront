import { Injectable } from '@angular/core';
import { productsModel } from '../models/productModel';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }
  public product :productsModel[]=[
    { id: 12, name: 'Dr. Nice',price:55,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0 },
    { id: 13, name: 'Bombasto',price:43,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0 },
    { id: 14, name: 'Celeritas',price:189,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0 },
    { id: 15, name: 'Magneta',price:121,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0 },
    { id: 16, name: 'RubberMan',price:234,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0 },
    { id: 17, name: 'Dynama',price:72,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0 },
    { id: 18, name: 'Dr. IQ',price:12,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0 },
    { id: 19, name: 'Magma',price:5,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0 },
    { id: 20, name: 'Tornado',price:8,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0 }
  ];
  gelAllProducts(){
    return this.product;
  }
  deneme1(){
    alert('geldi');
  }
}
