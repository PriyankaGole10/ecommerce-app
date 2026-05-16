import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCommonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  fb = inject(FormBuilder);
  authSer = inject(AuthService)
  router = inject(Router)



  ngOnInit() {
    this.initializeForm()
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    })

  }

  onSubmit() {
    let password = this.loginForm.value.password
    let email = this.loginForm.value.email


    this.authSer.login(email, password).subscribe(
      (res) => {
        // console.log('login',res)
        //  alert("User registered");
        localStorage.setItem("token", res.token)
        localStorage.setItem("user", JSON.stringify(res.user));
        this.router.navigateByUrl("/")
      },
      (error) => {

      }
    )
  }

}
