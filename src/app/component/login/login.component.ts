import { Component } from '@angular/core';
import { LoginRequest } from '../../models/loginRequest.model';
import { LoginService } from '../../services/login.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private loginService: LoginService,
    private router: Router
  ){

  }


  credentials: LoginRequest = { email: '', password: '' };

  onLogin(){
    this.loginService.login(this.credentials).subscribe({
      next:(res) =>{
        console.log("Login Sccessful:",res);
        // localStorage.setItem('userid', res.userId);
        this.router.navigate(['/dashboard']);
      },
      error:(err)=>{
        console.error("Login Failed:",err);
      }
    })
  }


}
