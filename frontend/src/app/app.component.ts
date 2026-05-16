import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WishlistService } from './Services/wishlist.service';
import { CartService } from './Services/cart.service';
import { AuthService } from './Services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce';
  wishListSer = inject(WishlistService);
  cartServ = inject(CartService);
  authser = inject(AuthService);

  ngOnInit() {
    if (this.authser.isLoggedIn) {
      this.wishListSer.init();
      this.cartServ.init();
    }
  }

  


}
