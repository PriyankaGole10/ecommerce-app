import { Component, inject } from '@angular/core';
import { WishlistService } from '../../Services/wishlist.service';
import { ProductCardComponent } from "../manage/product-card/product-card.component";

@Component({
  selector: 'app-wishlists',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './wishlists.component.html',
  styleUrl: './wishlists.component.scss'
})
export class WishlistsComponent {
wishlistSer = inject(WishlistService);

  
}
