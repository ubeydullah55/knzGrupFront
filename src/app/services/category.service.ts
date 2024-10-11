import { Injectable } from '@angular/core';
import { categoryModel } from '../models/categoryModel';

import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { AppConfig } from '../config/app.config';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  api_url = `${AppConfig.apiUrl}/categories`;

  constructor(private http: HttpClient) { }

  public categoryHome :categoryModel[]=[
    { id: 1, name: 'Çok Satanlar' },
    { id: 2, name: 'İndirimli' },
    { id: 3, name: 'Yeni Çıkanlar' },
  ];


  getAllCategoryHome():categoryModel[]{
    return this.categoryHome;
  }

  public getAllCategoryApi(): Observable<categoryModel[]> {
    const timestamp = new Date().getTime();  // Zaman damgası
    return this.http.get<categoryModel[]>(`${this.api_url}?t=${timestamp}`);
  }
}
