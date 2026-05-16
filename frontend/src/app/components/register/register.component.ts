import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCommonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  fb = inject(FormBuilder);
  authSer = inject(AuthService)
  route = inject(Router)

  ngOnInit() {
    this.initializeForm()
  }


  initializeForm() {
    this.registerForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    })

  }

  onSubmit() {
    let name = this.registerForm.value.name
    let password = this.registerForm.value.password
    let email = this.registerForm.value.email


    this.authSer.register(name, email, password).subscribe(
      (res) => {
        // console.log('register',res)
        alert("User registered");
        this.route.navigateByUrl("/login")

      },
      (error) => {

      }
    )
  }





}
