import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Category } from '../Types/category';
import { Product } from '../Types/product';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);

  constructor() { }

  getNewProducts() {
    return this.http.get<any>(environment.apiUrl + "/customer/home/new-products")
  }

  getFeaturedProducts() {
    return this.http.get<any>(environment.apiUrl + "/customer/home/featured-products")
  }

  getCategories() {
    return this.http.get<Category[]>(environment.apiUrl + "/customer/category")
  }

  getBrands() {
    return this.http.get<Category[]>(environment.apiUrl + "/customer/brands")
  }

  getBrandsByCategoryId(id:string) {
    return this.http.get<Category[]>(environment.apiUrl + "/customer/brands/" +id)
  }


  getProducts(searchTerm: string, categoryId: string, page: number, pageSize: number, sortBy: string, sortOrder: number, brandId: string) {
    return this.http.get<any[]>(environment.apiUrl + `/customer/products?searchTerm=${searchTerm}&categoryId=${categoryId}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}&brandId=${brandId}`)
  }

  getProductById(id:string){
    return this.http.get<Product>(environment.apiUrl+'/customer/product/'+id)
  }

getWishlists(){
  return this.http.get<Product[]>(environment.apiUrl = '/customer/wishlists')
}

}
