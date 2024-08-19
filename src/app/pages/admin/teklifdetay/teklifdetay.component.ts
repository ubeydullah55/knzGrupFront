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
  musteriBilgi: any;
  
  urunList: productsModel[] = [];

  constructor(private route: ActivatedRoute,private teklifService: TeklifdetayService) {}
  ngOnInit(): void {
    this.getIdAndFetchData();
  }
  getIdAndFetchData(): void {
    this.route.queryParams.subscribe(params => {
      this.urlid = +this.route.snapshot.paramMap.get('id')!;
      this.musteriBilgi = {
        siparisid: params['siparisid'],
        name: params['name'],
        mail: params['mail'],
        tel: params['tel']
      };
      this.fetchTeklifDetay(this.urlid);
    });
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
