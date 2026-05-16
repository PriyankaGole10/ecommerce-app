import { Component, inject } from '@angular/core';
import { OrderService } from '../../../Services/order.service';
import { Order } from '../../../Types/order';
import { DatePipe } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe,MatButtonToggleModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  orderSer = inject(OrderService);
  orders: Order[] = [];

  ngOnInit(){
    this.getAdminOrders();
  }

  getAdminOrders(){
    this.orderSer.getAdminOrders().subscribe(res=>{
      this.orders = res;
    })
  }

  sellingPrice(product: any) {
    return Math.round(
      product.Price - (product.Price * product.discount) / 100
    );
  }


  statusChanged(button:any, order:Order){
   this.orderSer
   .updateOrderStatus(order._id!, button.value)
   .subscribe((res)=>{
         alert('Order status updated')
   })
  }

}
