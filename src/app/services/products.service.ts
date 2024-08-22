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

  constructor(private http: HttpClient) { }

  public product :productsModel[]=[];


  public productHome :productsModel[]=[
    { id: 12, name: 'İşci Nevresim Takımı',price:55,imgfile:'assets/cozastore-master/images/blogs/nevresim_takimi.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:1 },
    { id: 13, name: 'İşçi Ranzası',price:43,imgfile:'assets/cozastore-master/images/blogs/knzgrup_isci_yatagi.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:1 },
    { id: 14, name: 'İşci Yatağı',price:189,imgfile:'assets/cozastore-master/images/blogs/santiye_yatak.jpg',description:'denem ürün yazısı buraya uzun uzun yazılar yazılacak ürün hakkında detaylı bilgi',count:0,slug:"",categoryid:1 },
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
