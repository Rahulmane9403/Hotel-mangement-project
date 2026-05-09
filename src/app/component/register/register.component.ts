import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LoginRequest, RegisterRequest } from '../../models/loginRequest.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private loginService: LoginService,
    private router: Router
  ) { }

  payload: RegisterRequest = { name: '', email: '', password: '', confirmPassword: '' };

  onregister() {
    if(this.payload.password !== this.payload.confirmPassword){
      alert('password do not match');
      return;
    }
    this.loginService.register(this.payload).subscribe({
      next: (res) => {
        console.log("register Sccessful:", res);
        // localStorage.setItem('userid', res.userId);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("register Failed:", err);
      }
    })
  }


}
