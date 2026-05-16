import { Component, inject } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { Product } from '../../Types/product';
import { ProductCardComponent } from "../manage/product-card/product-card.component";
import { CarouselModule } from 'primeng/carousel';
import { Carousel } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../Services/wishlist.service';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, Carousel, ButtonModule, CommonModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  customerSer = inject(CustomerService);
  wishListSer = inject(WishlistService);
  cartServ = inject(CartService);
  newProducts: Product[] = [];
  featuredProducts: Product[] = [];
  corouselData: Product[] = [];


  ngOnInit() {
    this.getProducts();
    // this.wishListSer.init();
    // this.cartServ.init();
  }

  getProducts() {
    this.customerSer.getFeaturedProducts().subscribe((result) => {
      this.featuredProducts = result;
      this.corouselData = [...result]
    })

    this.customerSer.getNewProducts().subscribe((result) => {
      this.newProducts = result;
      this.corouselData = [...result]
    })
  }

  responsiveOptions: any[] = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ]

  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'INSTOCK':
  //       return 'success';
  //     case 'LOWSTOCK':
  //       return 'warn';
  //     case 'OUTOFSTOCK':
  //       return 'danger';
  //   }
  // }
}
