import { Component, inject } from '@angular/core';
import { CustomerService } from '../../Services/customer.service';
import { Product } from '../../Types/product';
import { ProductCardComponent } from "../manage/product-card/product-card.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../Types/category';
import { Brand } from '../../Types/brand';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, MatInputModule, MatSelectModule, FormsModule, MatButtonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  customerSer = inject(CustomerService);
  searchTerm: string = '';
  categoryId: string = '';
  sortBy: string = '';
  sortOrder: number = -1;
  page: number = 1;
  pageSize: number = 10;
  brandId: string = '';
  products: Product[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  route = inject(ActivatedRoute);
  router = inject(Router);
  isNext: boolean = true




  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoryId = params['categoryId'] || '';
      this.searchTerm = params['search'] || '';
      this.brandId = params['brandId'] || '';
      // console.log('categoryId', this.categoryId)
      this.getProductsOnfiltering();
      this.getBrandsByCategoryId();
    });

    this.getCategories();

  }


  getCategories() {
    this.customerSer.getCategories().subscribe(
      (res: any) => {
        this.categories = res;

      },
      (error) => { console.error(error) }
    )
  }

  getBrands() {
    this.customerSer.getBrands().subscribe(
      (res) => {
        this.brands = res;
      },
      (error) => { console.error(error) }
    )
  }

  orderChange(event: any) {
    this.sortBy = 'Price',
      this.sortOrder = event;
    this.getProductsOnfiltering()
  }


  categoryChange(categoryId: string) {
    this.page = 1;
    this.router.navigate(['/products'], {
      queryParams: {
        categoryId: categoryId,
        search: this.searchTerm,
        brandId: this.brandId
      }
    })
    // this.getProductsOnfiltering();
    // this.getBrandsByCategoryId();

  }


  getBrandsByCategoryId() {
    setTimeout(() => {
      this.customerSer.getBrandsByCategoryId(this.categoryId).subscribe((res) => {
        this.brands = res
      })
    }, 100)

  }



  brandChange() {
    this.page = 1;
    this.getProductsOnfiltering();

  }

  totalPages: number = 0;
  totalRecords: number = 0;
  getProductsOnfiltering() {
    setTimeout(() => {
      this.customerSer.getProducts(this.searchTerm, this.categoryId, this.page, this.pageSize, this.sortBy, this.sortOrder, this.brandId).subscribe(
        (res: any) => {
          this.products = res?.products;
          this.totalPages = res?.totalPages;
          this.totalRecords = res?.totalRecords;
          if (this.products.length == 0) {
            this.isNext = false;
          }

        },
        (error) => { console.error(error) }
      )
    }, 500)

  }

  pageChange(page: number) {
    this.isNext = true;
    this.page = page;
    this.getProductsOnfiltering();
  }
}
