import { Component } from '@angular/core';
import { teklifDetayModel } from '../../../models/teklifDetayModel';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-teklifdetay',
  standalone: true,
  imports: [],
  templateUrl: './teklifdetay.component.html',
  styleUrl: './teklifdetay.component.css'
})
export class TeklifdetayComponent {
  urlid:number;
  item: any;

  public teklifDetay :teklifDetayModel[]=[
    { teklifid:1,productid: 1, productprice: 12,productimg:'product-01.jpg',productname:'ürün1',count:1},
    { teklifid:1,productid: 2, productprice: 55,productimg:'product-01.jpg',productname:'ürün2',count:4},
    { teklifid:2,productid: 3, productprice: 33,productimg:'product-01.jpg',productname:'ürün5',count:8},
  ];
  constructor(private route: ActivatedRoute) {}

  getir(){
    const id = this.route.snapshot.paramMap.get('id');
   
    if (id !== null && id !== undefined) {
      this.urlid = +id; // + işareti ile string'i number'a çeviriyoruz
      this.item=this.getTeklifDetay(this.urlid as number);
      return this.item;
    } else {
      // Hata durumunu veya default bir değeri ele alın
      console.error('ID parametresi bulunamadı.');
    }
  }
  getTeklifDetay(id:number){
    return this.teklifDetay.filter(p => p.teklifid === id);
  }
  totalPrice() : number{
    let totalPrice = 0;
    for (const item of this.teklifDetay.filter(p => p.teklifid === this.urlid)) {
      totalPrice += item.productprice * item.count; // Fiyat ve miktar çarpımını toplama ekle
    }
    return totalPrice;
  }
}
