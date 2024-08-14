import { Injectable } from '@angular/core';
import { productsModel } from '../models/productModel';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }
  public product :productsModel[]=[
    { id: 12, name: 'Dr. Nice',price:55,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" },
    { id: 13, name: 'Bombasto',price:43,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" },
    { id: 14, name: 'Celeritas',price:189,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" },
    { id: 15, name: 'Magneta',price:121,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" },
    { id: 16, name: 'RubberMan',price:234,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" },
    { id: 17, name: 'Dynama',price:72,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" },
    { id: 18, name: 'Dr. IQ',price:12,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" },
    { id: 19, name: 'Magma',price:5,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" },
    { id: 20, name: 'Tornado',price:8,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" }
  ];


  public productHome :productsModel[]=[
    { id: 12, name: 'Dr. Nice',price:55,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" },
    { id: 13, name: 'Bombasto',price:43,imgfile:'assets/cozastore-master/images/product-02.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" },
    { id: 14, name: 'Celeritas',price:189,imgfile:'assets/cozastore-master/images/product-03.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" },
    { id: 15, name: 'Magneta',price:121,imgfile:'assets/cozastore-master/images/product-04.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" },
    { id: 16, name: 'RubberMan',price:234,imgfile:'assets/cozastore-master/images/product-05.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" },
    { id: 17, name: 'Dynama',price:72,imgfile:'assets/cozastore-master/images/product-06.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" },
    { id: 18, name: 'Dr. IQ',price:12,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" },
    { id: 19, name: 'Magma',price:5,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" },
    { id: 20, name: 'Tornado',price:8,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"" }
  ];

  generateSlug() {
    this.product.forEach(item => {
      item.slug=item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    });
  }
  gelAllProducts(){
    this.generateSlug();
    return this.product;
  }
  deneme1(){
    alert('geldi');
  }
  getProductById(id:number){
    const product = this.product.find(p => p.id === id);
    return product;
  }
}
