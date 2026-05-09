import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
@Injectable({providedIn:'root'})
export class authGuard implements CanActivate{

  constructor(private loginService:LoginService,
    private router:Router
  ){}

  canActivate(): boolean {
    if(this.loginService.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}