import { Injectable } from '@angular/core';
import { productsModel } from '../models/productModel';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }
  public product :productsModel[]=[
    { id: 12, name: 'Dr. Nice',price:55 },
    { id: 13, name: 'Bombasto',price:43 },
    { id: 14, name: 'Celeritas',price:189 },
    { id: 15, name: 'Magneta',price:121 },
    { id: 16, name: 'RubberMan',price:234 },
    { id: 17, name: 'Dynama',price:72 },
    { id: 18, name: 'Dr. IQ',price:12 },
    { id: 19, name: 'Magma',price:5 },
    { id: 20, name: 'Tornado',price:8 }
  ];
  gelAllProducts(){
    return this.product;
  }
  deneme1(){
    alert('geldi');
  }
}
