import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  http = inject(HttpClient)


  constructor() { }


  getReviewsByProductId(productId: string) {
    return this.http.get<any>(environment.apiUrl + "/reviews/" + productId)
  }


  addReview(payload: any) {
    return this.http.post(environment.apiUrl + "/reviews/", payload)
  }


}
