import { Injectable } from '@angular/core';
import { productsModel } from '../models/productModel';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { AppConfig } from '../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  api_url = `${AppConfig.apiUrl}/products`;
  productsApi$=this.getAllProductsApi();

  //api_url='https://localhost:7266/api';
  

  constructor(private http: HttpClient) { }

  public product :productsModel[]=[];


  public productHome :productsModel[]=[
    { id: 12, name: 'Dr. Nice',price:55,imgfile:'assets/cozastore-master/images/products/product-01.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:1 },
    { id: 13, name: 'Bombasto',price:43,imgfile:'assets/cozastore-master/images/products/product-02.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:1 },
    { id: 14, name: 'Celeritas',price:189,imgfile:'assets/cozastore-master/images/products/product-03.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:1 },
    { id: 15, name: 'Magneta',price:121,imgfile:'assets/cozastore-master/images/products/product-04.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:1 },
    { id: 16, name: 'RubberMan',price:234,imgfile:'assets/cozastore-master/images/products/product-05.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:2},
    { id: 17, name: 'Dynama',price:72,imgfile:'assets/cozastore-master/images/products/product-06.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:3 },
    { id: 18, name: 'Dr. IQ',price:12,imgfile:'assets/cozastore-master/images/products/product-07.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:3 },
    { id: 19, name: 'Magma',price:5,imgfile:'assets/cozastore-master/images/products/product-08.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:3 },
    { id: 20, name: 'Tornado',price:8,imgfile:'assets/cozastore-master/images/products/product-09.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:3 },
    { id: 21, name: 'Lumo',price:8,imgfile:'assets/cozastore-master/images/products/product-09.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:3 }
  ];


  generateSlugHome() {
    this.productHome.forEach(item => {
      item.slug=item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    });
  }

  getAllProductsHome(id:number):productsModel[] | undefined{
    this.generateSlugHome();
    const products = this.productHome.filter(product => product.categoryid === id);
  return products.length > 0 ? products : undefined;
  }
  deneme1(){
    alert('geldi');
  }
  getProductById(id: number): Observable<productsModel | undefined> {
    return this.getAllProductsApi().pipe(
      map(products => products.find(product => product.id === id))
    );    
  }

  public getAllProductsApi(): Observable<productsModel[]>{
    return this.http.get<productsModel[]>(this.api_url)
      .pipe(
        map(products => 
          products.map(product => ({
            ...product,
            slug: this.generateSlugApi(product.name)
          }))
        )
      );
  }
  private generateSlugApi(name: string): string {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  }
  
  
}
