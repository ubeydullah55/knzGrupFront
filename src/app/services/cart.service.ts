import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  urunEkle(){
    console.log("Urun eklendi");
    alert("Ekleme başarılı");
  }
}
