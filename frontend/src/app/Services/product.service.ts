import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Product } from '../Types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 http = inject(HttpClient)
  constructor() { }

   getAllProducts(){
      return this.http.get<Product[]>(environment.apiUrl+"/Product")
    }
  
    getProductById(id:string){
      return this.http.get<Product>(environment.apiUrl+"/Product/"+id)
    }
  
    addProduct(payload:Object){
      return this.http.post(environment.apiUrl+"/Product",payload)
    }
  
    updateProduct(id:string,payload:Object){
      return this.http.put(environment.apiUrl+"/Product/" + id, payload)
    }
  
    deleteProduct(id:string){
      return this.http.delete(environment.apiUrl+"/Product/" + id);
    }
}
