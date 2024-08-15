import { Component ,inject,OnInit} from '@angular/core';
import { DataService } from '../../../services/data-service.service';
import { CartService } from '../../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
@Component({
  selector: 'app-detailproduct',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './detailproduct.component.html',
  styleUrl: './detailproduct.component.css'
})
export class DetailproductComponent implements OnInit {
  item: any;
  urlid:number;
  cartService=inject(CartService);
  productsService=inject(ProductsService);
  constructor(private dataService: DataService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null && id !== undefined) {
      this.urlid = +id; // + işareti ile string'i number'a çeviriyoruz
      this.item=this.productsService.getProductById(this.urlid as number);
      return this.item;
    } else {
      // Hata durumunu veya default bir değeri ele alın
      console.error('ID parametresi bulunamadı.');
    }
    this.item = this.dataService.getData();
    
  }
  changeQuantity(item: any, delta: number) {
    item.count = Math.max(1, item.count + delta); // Ensure count is at least 1   
  }

  updateQuantity(item: any, newQuantity: number): void {
    item.count = newQuantity; 
  }
  urunEkleToplu(item:any){
    this.cartService.urunEkleToplu(item);    
  }
  benzerUrunler(){
    return this.productsService.getAllBenzerUrunler(this.urlid);
  }
}
