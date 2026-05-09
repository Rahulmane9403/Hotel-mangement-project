import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

// export const guestGuard: CanActivateFn = (route, state) => {
//   return true;
// };

@Injectable({providedIn:'root'})
export class guestGuard implements CanActivate{
  constructor(private loginService:LoginService,
    private router:Router
  ){}

  canActivate(): boolean {
    
    if(this.loginService.isLoggedIn()){
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
