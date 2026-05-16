import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Category } from '../../../Types/category';
import { Brand } from '../../../Types/brand';
import { CategoryService } from '../../../Services/category.service';
import { BrandService } from '../../../Services/brand.service';
import { ProductService } from '../../../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../Types/product';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule,MatCheckboxModule, MatInputModule, MatButtonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  formBuilder = inject(FormBuilder);
  categoryser = inject(CategoryService);
  brandSer = inject(BrandService);
  productSer = inject(ProductService);
  router = inject(Router);
  route = inject(ActivatedRoute)
  brands: Brand[] = [];
  categories: Category[] = [];
  id!:string;



  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.isEdit()
    // this.addImage();
    this.getCategories();
    this.getAllBrands();
  }

isEdit(){
  if(this.id){
    this.productSer.getProductById(this.id).subscribe(
      (res:any)=>{
        // console.log(res)
        for(let i=0; i< res.images.length; i++){
          this.addImage()
        }
        this.productForm.patchValue(res as any)
      },
      (error)=>{console.error(error)}
    )
  }else{
  this.addImage();
  }
}


  getCategories() {
    this.categoryser.getCategories().subscribe((res) => {
      this.categories = res;
    })
  }

  getAllBrands() {
    this.brandSer.getAllBrands().subscribe((res) => {
      this.brands = res;
    })
  }

  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    shortDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(10)]],
    Price: [null, [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
    isFeatured:[false],
    isNewProduct:[false],
  })


  addProduct() {
   
    if(this.productForm.invalid){
      alert("please fill all required fields.")
      return
    }
     let value = this.productForm.value;
    this.productSer.addProduct(value).subscribe(
      (res)=> {alert("Product added successfully");
        this.router.navigateByUrl("/admin/products");
      })
   
  }

  updateProduct() {
   
    if(this.productForm.invalid){
      alert("please fill all required fields.")
      return
    }
     let value = this.productForm.value;
    this.productSer.updateProduct(this.id,value).subscribe(
      (res)=> {alert("Product updated successfully");
        this.router.navigateByUrl("/admin/products");
      })
   
  }


 

  get images() {
    return this.productForm.get('images') as FormArray;
  }

  addImage() {
    this.images.push(this.formBuilder.control(null))
  }

  removeImage(index: number) {
    this.images.removeAt(index);
  }

}
