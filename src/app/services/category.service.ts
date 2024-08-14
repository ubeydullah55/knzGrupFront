import { Injectable } from '@angular/core';
import { categoryModel } from '../models/categoryModel';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
  public category :categoryModel[]=[
    { id: 1, name: 'Women' },
    { id: 2, name: 'Men' },
    { id: 3, name: 'Bag' },
    { id: 4, name: 'Shoes' },
    { id: 5, name: 'Watches' },
  ];
  public categoryHome :categoryModel[]=[
    { id: 1, name: 'Çok Satanlar' },
    { id: 2, name: 'İndirimli' },
    { id: 3, name: 'Yeni Çıkanlar' },
  ];

  getAllCategory():categoryModel[]{
    return this.category;
  }
  getAllCategoryHome():categoryModel[]{
    return this.categoryHome;
  }
}
