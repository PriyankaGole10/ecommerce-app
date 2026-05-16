import { Component, inject } from '@angular/core';
import { BrandService } from '../../../Services/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '../../../Types/brand';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-brands-form',
  standalone: true,
   imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './brands-form.component.html',
  styleUrl: './brands-form.component.scss'
})
export class BrandsFormComponent {
  name: string = '';
  brandSer = inject(BrandService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit: boolean = false;
  id!: string;

  ngOnInit() {
    this.id = this.route.snapshot.params["id"]
    if (this.id) {
      this.isEdit = true
      this.brandSer.getBrandById(this.id).subscribe(
        (res: Brand) => {
          // console.log('edit', rses)
          this.name = res.name
        },
        (error) => { console.error(error) }
      )
    }
  }


  add() {

    let payload = {
      'name':this.name
    }
    this.brandSer.addBrand(payload).subscribe(
      (res: any) => {
        alert('Brand added');
        this.router.navigateByUrl("/admin/brands");
      },
      (error) => { console.error(error) }
    )
  }


  update() {

     let payload = {
      'name':this.name
    }
    this.brandSer.updateBrand(this.id, payload).subscribe(
      (res: any) => {
        alert('Brand updated');
        this.router.navigateByUrl("/admin/brands");
      },
      (error) => { console.error(error) }
    )
  }



}
