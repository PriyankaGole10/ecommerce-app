import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../Services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../Types/category';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  name: string = '';
  categoryser = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  isEdit: boolean = false;
  id!: string;

  ngOnInit() {
    this.id = this.route.snapshot.params["id"]
    if (this.id) {
      this.isEdit = true
      this.categoryser.getCategorybyId(this.id).subscribe(
        (res: Category) => {
          // console.log('edit', rses)
          this.name = res.name
        },
        (error) => { console.error(error) }
      )
    }
  }


  add() {
    this.categoryser.addCategory(this.name).subscribe(
      (res: any) => {
        alert('Category added');
        this.router.navigateByUrl("/admin/categories");
      },
      (error) => { console.error(error) }
    )
  }


  update() {
    this.categoryser.updateCategory(this.id, this.name).subscribe(
      (res: any) => {
        alert('Category updated');
        this.router.navigateByUrl("/admin/categories");
      },
      (error) => { console.error(error) }
    )
  }



}
