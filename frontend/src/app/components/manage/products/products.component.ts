import { Component, inject } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../Services/product.service';
import { Product } from '../../../Types/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent{
  displayedColumns: string[] = ['id', 'name','shortDescription', 'description','Price', 'discount', 'action'];
  dataSource!: MatTableDataSource<Product>;
  productSer = inject (ProductService)

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor() { }


  ngOnInit() {
    this.getAllBrands();
  }


  getAllBrands() {
    this.productSer.getAllProducts().subscribe(
      (res: Product[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => { console.error(error) }
    )
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProduct(id:string){
  this.productSer.deleteProduct(id,).subscribe(
  (res:any)=>{alert( 'Product deleted successfully');
      this.getAllBrands();
  },
  (error)=>{console.error(error)}
)
  }
}
