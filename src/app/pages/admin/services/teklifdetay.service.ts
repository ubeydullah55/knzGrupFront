import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { productsModel } from '../../../models/productModel';
import { AppConfig } from '../../../config/app.config';

@Injectable({
  providedIn: 'root'
})
export class TeklifdetayService {

  //private apiUrl = 'https://localhost:7266/api/paneldetaylist/';
  api_url = `${AppConfig.apiUrl}/paneldetaylist`;
  constructor(private http: HttpClient) {}

  getByList(siparisId: string): Observable<productsModel[]> {
    // URL'ye siparisId parametresini ekle
    const url = `${this.api_url}/${siparisId}`;
    return this.http.get<productsModel[]>(url);
  }
}
