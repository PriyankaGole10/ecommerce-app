import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';
import { Product } from '../../Types/product';
import { ProductCardComponent } from "../manage/product-card/product-card.component";
import { WishlistService } from '../../Services/wishlist.service';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../Services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReviewsService } from '../../Services/reviews.service';
import { Review } from '../../Types/review';
import { ProductReviewsComponent } from "../product-reviews/product-reviews.component";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MatIconModule, RouterLink, FormsModule, CommonModule, ProductReviewsComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  route = inject(ActivatedRoute);
  customerSer = inject(CustomerService);
  wishlistSer = inject(WishlistService);
  reviewSer = inject(ReviewsService);
  cartSer = inject(CartService);
  id = '';
  product: any;
  mainImage!: string;
  similarProducts: Product[] = [];
  productReviews: Review[] = [];


  ngOnInit() {
    this.route.params.subscribe((res: any) => {
      this.id = res.id;
      this.getProductById(this.id);
    })
  }

  getProductById(id: string) {
    this.customerSer.getProductById(id).subscribe(
      (res) => {
        this.product = res;
        this.mainImage = res.images[0];
        this.getSimilarProducts();
      },
      (error) => { console.error(error) })
  }

  getSimilarProducts() {
    this.customerSer.getProducts('', this.product.categoryId, 1, 5, '', -1, this.product.brandId).subscribe(
      (res: any) => {
        this.similarProducts = res.products;
      },
      (err) => { console.error(err) }
    )
  }




  changeImage(url: any) {
    this.mainImage = url;
  }

  sellingPrice(product: Product) {
    const price = product?.Price ?? 0;
    const discount = product?.discount ?? 0;
    return Math.round(price - (price * discount) / 100);
  }

  isInWishList(product: Product) {
    let isExists = this.wishlistSer.wishlistProducts?.find(x => x?._id == product?._id);
    if (isExists) return true
    else return false;
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



  addToCart(product: Product) {
    if (!this.isProductInCart(product._id!)) {
      this.cartSer.addToCart(product._id!, 1).subscribe(() => {
        this.cartSer.init();
      })
    } else {
      this.cartSer.removeCartItem(product._id!).subscribe(() => {
        this.cartSer.init();
      })
    }
  }

  isProductInCart(productId: string) {
    if (this.cartSer.items?.find((x => x.product._id === productId))) {
      return true;
    } else {
      return false;
    }
  }


 

}
