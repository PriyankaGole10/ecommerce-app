import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { Category } from '../../Types/category';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { debounceTime, fromEvent, map } from 'rxjs';
import { AuthService } from '../../Services/auth.service';
import { CustomerService } from '../../Services/customer.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from '../../Services/wishlist.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  customerSer = inject(CustomerService);
  wishlistSer = inject(WishlistService);
  authSer = inject(AuthService);
  categoryList: Category[] = [];
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

  currentCategoryId: string = '';
  @ViewChild('search') searchInput!: ElementRef;
  ngOnInit() {
    this.getCategories();
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentCategoryId = params['categoryId'] ?? '';
    });
  }

  getCategories() {

    setTimeout(() => {
      this.customerSer.getCategories().subscribe(
        (res) => {

          this.categoryList = res;
        },
        (error) => {
          console.error(error);
        }
      )
    }, 0)

  }


  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        map((event: any) => event.target.value),
        debounceTime(500)
      )
      .subscribe((value: string) => {
        this.onSearch(value)
      })
  }

  onSearch(value: string) {
    const query = value?.trim();

    if (!query) return;

    this.router.navigate(['/products'], {
      queryParams: { search: query }
    });
  }


  categoryClick(id: any) {
    this.router.navigate(['/products'], {
      queryParams: { categoryId: id }
    })
    this.searchInput.nativeElement.value = '';
  }

  logout() {
    this.authSer.logout();
    this.router.navigateByUrl('/login')
  }



}
