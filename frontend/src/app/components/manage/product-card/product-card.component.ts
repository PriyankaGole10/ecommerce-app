import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../Types/product';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from '../../../Services/customer.service';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../../Services/wishlist.service';
import { CartService } from '../../../Services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: any;
  customerServ = inject(CustomerService);
  wishlistSer = inject(WishlistService);
  cartSer = inject(CartService);

  ngOnInit() {
    // console.log(this.product)
  }

  get sellingPrice() {
    return Math.round(this.product.Price - (this.product.Price * this.product.discount) / 100)
  }


  addToWishList(product: Product) {

    if (this.isInWishList(product)) {
      this.wishlistSer.removeFromWishList(product._id!)
        .subscribe((res: any) => {
          this.wishlistSer.init();
        })
    } else {
      this.wishlistSer.addtoWishList(product._id!).subscribe((res: any) => {
        this.wishlistSer.init()
      })
    }
  }

  isInWishList(product: Product) {
    let isExists = this.wishlistSer.wishlistProducts?.find(x => x?._id == product?._id);
    if (isExists) return true
    else return false;
  }

  addToCart(product: Product) {
    if (!this.isProductInCart(product._id!)) {
      this.cartSer.addToCart(product._id!, 1).subscribe(()=>{
        this.cartSer.init();
      })
    }else{
      this.cartSer.removeCartItem(product._id!).subscribe(()=>{
        this.cartSer.init();
      })
    }
  }

  isProductInCart(productId: string) {
    if (this.cartSer.items.find((x) => x.product._id == productId)) {
      return true;
    } else {
      return false;
    }
  }








}


