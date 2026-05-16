import { Component, inject, Input } from '@angular/core';
import { ReviewsService } from '../../Services/reviews.service';
import { Review } from '../../Types/review';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.scss'
})
export class ProductReviewsComponent {
  productId!: string;
  reviewSer = inject(ReviewsService);
  route = inject(ActivatedRoute);
  productReviews: Review[] = [];
  myReview:any=null;
  isEditMode:boolean = false;
  userData:any={};

  ngOnInit() {
    let data:any=localStorage.getItem("user");
    this.userData = JSON.parse(data);
     this.reviewForm.name = this.userData.name;
    // console.log(this.userData)
    this.route.params.subscribe((res: any) => {
      this.productId = res.id;
      this.getReviewsOfProduct(this.productId);
    });
  }

  reviewForm = {
    name: '',
    rating: 0,
    comment: ''
  }

  getReviewsOfProduct(id: string) {
    this.reviewSer.getReviewsByProductId(id).subscribe((res) => {
      this.productReviews = res.reviews;
      this.myReview = res.myReview;
      if(this.myReview){
        this.isEditMode = true;
        this.reviewForm.comment = this.myReview.comment;
        this.reviewForm.rating = this.myReview.rating;
      }
    })
  }

  addReview() {
    let payload = {
      productId: this.productId,
      name: this.reviewForm.name,
      rating: this.reviewForm.rating,
      comment: this.reviewForm.comment,
    }
    this.reviewSer.addReview(payload).subscribe((res) => {
      this.getReviewsOfProduct(this.productId);
      this.reviewForm = {
        name: this.reviewForm.name,
        rating: 0,
        comment: ''
      };
    })
  }


  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }

  toggleRating(star: number) {
    if (this.reviewForm.rating === star) {
      this.reviewForm.rating = star - 1;
    } else {
      this.reviewForm.rating = star;
    }
  }
}
