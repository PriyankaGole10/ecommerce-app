import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../Types/product';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  http = inject(HttpClient)
  wishlistProducts: Product[] = [];


  constructor() { }


  init() {
    this.getWishList().subscribe((res) => {
      this.wishlistProducts = res;
    })
  }


  getWishList() {
    return this.http.get<Product[]>(environment.apiUrl + "/customer/wishlists")
  }


  addtoWishList(productId: string) {
    return this.http.post(environment.apiUrl + '/customer/wishlists/' + productId, {})
  }

  removeFromWishList(productId: string) {
    return this.http.delete(environment.apiUrl + '/customer/wishlists/' + productId)
  }
}
