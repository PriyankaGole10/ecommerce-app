import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

import { Router } from '@angular/router';

import { CartService } from '../../Services/cart.service';
import { OrderService } from '../../Services/order.service';
import { PaymentService } from '../../Services/payment.service';

import { Order } from '../../Types/order';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

  router = inject(Router);

  cartSer = inject(CartService);

  orderSer = inject(OrderService);

  paymentSer = inject(PaymentService);

  fb = inject(FormBuilder);

  orderStep = 0;

  paymentType = 'cod';

  addressForm!: FormGroup;

  ngOnInit() {

    this.cartSer.init();

    this.initializeForm();

  }

  // ================= FORM =================

  initializeForm() {

    this.addressForm = this.fb.group({

      address1: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]
      ],

      address2: [
        '',
        [
          Validators.maxLength(100)
        ]
      ],

      city: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z ]+$')
        ]
      ],

      pincode: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{6}$')
        ]
      ]

    });

  }

  // ================= GETTERS =================

  get f() {
    return this.addressForm.controls;
  }

  get cartItems() {
    return this.cartSer.items;
  }

  // ================= PRICE =================

  sellingPrice(product: any) {

    return Math.round(
      product.Price -
      (product.Price * product.discount) / 100
    );

  }

  // ================= CART =================

  increaseQty(productId: string) {

    this.cartSer.addToCart(productId, 1)
      .subscribe(() => {

        this.cartSer.init();

      });

  }

  decreaseQty(productId: string) {

    this.cartSer.addToCart(productId, -1)
      .subscribe(() => {

        this.cartSer.init();

      });

  }

  removeItem(productId: string) {

    this.cartSer.removeCartItem(productId)
      .subscribe(() => {

        this.cartSer.init();

      });

  }

  // ================= TOTAL =================

  getSubtotal() {

    return this.cartSer.items.reduce(
      (total: number, item: any) => {

        const price = this.sellingPrice(item.product);

        return total + (price * item.quantity);

      },
      0
    );

  }

  // ================= ORDER FLOW =================

  checkout() {

    this.orderStep = 1;

  }

  onSubmit() {

    this.addressForm.markAllAsTouched();

    if (this.addressForm.invalid) return;

    this.orderStep = 2;

  }

  // ================= COD ORDER =================

  completeOrder() {

    let order: Order = {

      items: this.cartItems,

      paymentType: this.paymentType,

      address: this.addressForm.value,

      date: new Date()

    };

    this.orderSer.addOrder(order)
      .subscribe(() => {

        alert('Order placed successfully');

        this.cartSer.init();

        this.addressForm.reset();

        this.orderStep = 0;

        this.router.navigateByUrl('/orders');

      });

  }

  // ================= ONLINE PAYMENT =================

  payOnline() {

    this.paymentSer
      .createOrder(this.getSubtotal())
      .subscribe((response: any) => {

        const options: any = {

          key: environment.razorPayTestKeyId,

          amount: response.amount,

          currency: response.currency,

          name: 'My Ecommerce',

          description: 'Order Payment',

          image:
            'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',

          order_id: response.id,

          handler: (paymentResponse: any) => {

            this.verifyPayment(paymentResponse);

          },

          prefill: {

            name: 'Customer',

            email: 'customer@gmail.com',

            contact: '9999999999'

          },

          theme: {
            color: '#4f46e5'
          }

        };

        const razorpay = new (window as any)
          .Razorpay(options);

        razorpay.open();

      });

  }

  // ================= VERIFY PAYMENT =================

  verifyPayment(paymentData: any) {

    this.paymentSer
      .verifyPayment(paymentData)
      .subscribe((res: any) => {

        if (res.success) {

          this.paymentType = 'online';

          this.completeOrder();

        } else {

          alert('Payment Failed');

        }

      });

  }

}