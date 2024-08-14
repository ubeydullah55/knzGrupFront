import { Injectable } from '@angular/core';
import { productsModel } from '../models/productModel';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }
  public product :productsModel[]=[
    { id: 12, name: 'Dr. Nice',price:55,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:1 },
    { id: 13, name: 'Bombasto',price:43,imgfile:'assets/cozastore-master/images/product-02.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:1 },
    { id: 14, name: 'Celeritas',price:189,imgfile:'assets/cozastore-master/images/product-03.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:1 },
    { id: 15, name: 'Magneta',price:121,imgfile:'assets/cozastore-master/images/product-04.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:1 },
    { id: 16, name: 'RubberMan',price:234,imgfile:'assets/cozastore-master/images/product-05.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:2},
    { id: 17, name: 'Dynama',price:72,imgfile:'assets/cozastore-master/images/product-06.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:3 },
    { id: 18, name: 'Dr. IQ',price:12,imgfile:'assets/cozastore-master/images/product-07.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:4 },
    { id: 19, name: 'Magma',price:5,imgfile:'assets/cozastore-master/images/product-08.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:5 },
    { id: 20, name: 'Tornado',price:8,imgfile:'assets/cozastore-master/images/product-09.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:5 }
  ];


  public productHome :productsModel[]=[
    { id: 12, name: 'Dr. Nice',price:55,imgfile:'assets/cozastore-master/images/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:1 },
    { id: 13, name: 'Bombasto',price:43,imgfile:'assets/cozastore-master/images/product-02.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:1 },
    { id: 14, name: 'Celeritas',price:189,imgfile:'assets/cozastore-master/images/product-03.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:1 },
    { id: 15, name: 'Magneta',price:121,imgfile:'assets/cozastore-master/images/product-04.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:1 },
    { id: 16, name: 'RubberMan',price:234,imgfile:'assets/cozastore-master/images/product-05.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:2},
    { id: 17, name: 'Dynama',price:72,imgfile:'assets/cozastore-master/images/product-06.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:3 },
    { id: 18, name: 'Dr. IQ',price:12,imgfile:'assets/cozastore-master/images/product-07.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:3 },
    { id: 19, name: 'Magma',price:5,imgfile:'assets/cozastore-master/images/product-08.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:3 },
    { id: 20, name: 'Tornado',price:8,imgfile:'assets/cozastore-master/images/product-09.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:3 }
  ];

  generateSlug() {
    this.product.forEach(item => {
      item.slug=item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    });
  }
  getAllProducts(){
    this.generateSlug();
    return this.product;
  }
  getAllProductsHome(id:number):productsModel[] | undefined{
    this.generateSlug();
    const products = this.productHome.filter(product => product.categoryid === id);
  return products.length > 0 ? products : undefined;
  }
  deneme1(){
    alert('geldi');
  }
  getProductById(id:number){
    const product = this.product.find(p => p.id === id);
    return product;
  }
}
