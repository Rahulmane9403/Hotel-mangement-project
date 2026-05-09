import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(
    private LoginService: LoginService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
debugger
    const expectedRoles: number[] = route.data['roles'];
    const userRole = this.LoginService.getRoleId();

    if (!userRole || !expectedRoles.includes(userRole)) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}