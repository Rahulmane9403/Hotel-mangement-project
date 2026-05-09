import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private loginService:LoginService,
    private router:Router
  ){}

  onlogout(): void
   {
    this.loginService.logout().subscribe(()=>{
      this.router.navigate(['/login']);
    })
  }


}
