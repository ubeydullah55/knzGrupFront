import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  cartService=inject(CartService);
  changeQuantity(item: any, delta: number) {
    item.count = Math.max(1, item.count + delta); // Ensure count is at least 1
    this.updateItemCount(item);
  }

  updateItemCount(item: any) {
    // Update the item in the cart service or perform other operations
    this.cartService.updateItem(item);
  }
  updateQuantity(item: any, newQuantity: number): void {
    item.count = newQuantity;
    this.cartService.updateItem(item); // Hizmet metodunu güncelleyebilirsiniz
  }
  teklifAl(){
    this.cartService.teklifAl();
    alert("oldu");
 
  }
}
