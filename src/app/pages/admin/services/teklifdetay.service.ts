import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { productsModel } from '../../../models/productModel';

@Injectable({
  providedIn: 'root'
})
export class TeklifdetayService {

  private apiUrl = 'https://localhost:7266/api/paneldetaylist/';

  constructor(private http: HttpClient) {}

  getByList(siparisId: string): Observable<productsModel[]> {
    // URL'ye siparisId parametresini ekle
    const url = `${this.apiUrl}${siparisId}`;
    return this.http.get<productsModel[]>(url);
  }
}
