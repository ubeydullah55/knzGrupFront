import { Component ,inject,OnInit} from '@angular/core';
import { DataService } from '../../../services/data-service.service';
import { CartService } from '../../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detailproduct',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './detailproduct.component.html',
  styleUrl: './detailproduct.component.css'
})
export class DetailproductComponent implements OnInit {
  item: any;
  cartService=inject(CartService);
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
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

}
