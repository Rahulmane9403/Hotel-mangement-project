import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable()
export class authInterceptor implements HttpInterceptor{
  constructor(private loginService:LoginService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.loginService.getAccessToken();

    let authReq = req;
    if(token){
      authReq = req.clone({
        setHeaders:{
          Authorization:`Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          return this.loginService.refreshToken().pipe(
            switchMap(() => {
              const newToken = this.loginService.getAccessToken();
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next.handle(retryReq);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }
}
// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };
