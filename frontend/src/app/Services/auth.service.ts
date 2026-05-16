import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
http = inject(HttpClient);

  constructor() { }

  register(name:string,email:string,password:string){
    return this.http.post<any>(environment.apiUrl+"/auth/register",{
      name,
      email,
      password
    })
  }

  login(email:string,password:string){
    return this.http.post<any>(environment.apiUrl+"/auth/login",{
      email,
      password
    })
  }

  get isLoggedIn(){
    let token = localStorage.getItem('token');
    if(token){
      return true;
    }
    return false
  }

  get isAdmin(){
    let user = localStorage.getItem('user');
    if(user){
      return JSON.parse(user).isAdmin;
    }
    return false;
  }

  get userName(){
    let user=localStorage.getItem('user');
    if(user){
      return JSON.parse(user).name;
    }
    return null;
  }

  get email(){
    let user=localStorage.getItem('user');
    if(user){
      return JSON.parse(user).email;
    }
    return null;
  }


  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
