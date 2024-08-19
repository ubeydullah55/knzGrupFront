import { Component } from '@angular/core';
import { teklifDetayModel } from '../../../models/teklifDetayModel';
import { ActivatedRoute } from '@angular/router';
import { TeklifdetayService } from '../services/teklifdetay.service';
import { productsModel } from '../../../models/productModel';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-teklifdetay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teklifdetay.component.html',
  styleUrl: './teklifdetay.component.css'
})
export class TeklifdetayComponent {
  urlid:number;
  item: any;
  urunList: productsModel[] = [];
  public teklifDetay :teklifDetayModel[]=[
    { teklifid:1,productid: 1, productprice: 12,productimg:'product-01.jpg',productname:'ürün1',count:1},
    { teklifid:1,productid: 2, productprice: 55,productimg:'product-01.jpg',productname:'ürün2',count:4},
    { teklifid:2,productid: 3, productprice: 33,productimg:'product-01.jpg',productname:'ürün5',count:8},
  ];
  constructor(private route: ActivatedRoute,private teklifService: TeklifdetayService) {}
  ngOnInit(): void {
    this.getIdAndFetchData();
  }
  getIdAndFetchData(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null && id !== undefined) {
      this.urlid = +id; // + işareti ile string'i number'a çeviriyoruz
      this.fetchTeklifDetay(this.urlid);
    } else {
      // Hata durumunu veya default bir değeri ele alın
      console.error('ID parametresi bulunamadı.');
    }
  }
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
  fetchTeklifDetay(id: number): void {
    this.teklifService.getByList(id.toString()).subscribe(
      data => {
        this.urunList = data;
      },
      error => {
        console.error('API isteği başarısız:', error);
      }
    );
  }



  getTeklifDetay(id:number){
    return this.teklifDetay.filter(p => p.teklifid === id);
  }
  totalPrice() : number{
    let totalPrice = 0;
  
    // urunList içerisindeki her bir ürün için
    for (const item of this.urunList) {
      // item.price ve item.count undefined olmadığından emin olmak için kontroller ekliyoruz
      if (item.price && item.count) {
        totalPrice += item.price * item.count;
      }
    }
  
    return totalPrice;
  }

  trackById(index: number, item: productsModel): number {
    return item.id; // veya item.id, item.productid, vb.
  }
  
}
