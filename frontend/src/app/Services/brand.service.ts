import { inject, Injectable } from '@angular/core';
import { HttpClient}  from '@angular/common/http'
import { Brand } from '../Types/brand';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  http = inject(HttpClient)

  constructor() { }


  getAllBrands(){
    return this.http.get<Brand[]>(environment.apiUrl+"/brand")
  }

  getBrandById(id:string){
    return this.http.get<Brand>(environment.apiUrl+"/brand/"+id)
  }

  addBrand(payload:Object){
    return this.http.post(environment.apiUrl+"/brand",payload)
  }

  updateBrand(id:string,payload:Object){
    return this.http.put(environment.apiUrl+"/brand/" + id, payload)
  }

  deleteBrand(id:string){
    return this.http.delete(environment.apiUrl+"/brand/" + id);
  }
}
