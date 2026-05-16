import { Component, inject } from '@angular/core';
import { Order } from '../../Types/order';
import { OrderService } from '../../Services/order.service';
import { Product } from '../../Types/product';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.scss'
})
export class CustomerOrdersComponent {
  orders: Order[]= [];
  orderSer = inject(OrderService);


  ngOnInit(){
    this.orderSer.getCustomerOrders().subscribe(result=>{
      this.orders = result;
    })
  }

  sellingPrice(product: any) {
    return Math.round(
      product.Price - (product.Price * product.discount) / 100
    );
  }

}
