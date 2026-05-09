import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, LoggedInUser, LoginRequest, LoginResponse, RegisterRequest } from '../models/loginRequest.model';
import { catchError, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private router: Router
  ) { }
  private apiurl1 = "https://localhost:7238";
  private apiurl = "https://localhost:7238/User";


  login(credentials: LoginRequest): Observable<LoginResponse> {
    // localStorage.setItem("isLoginInHM","true");
    return this.http.post<LoginResponse>(this.apiurl + '/Login', credentials).pipe(
      tap(res => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
    );
  }


  register(paylod: RegisterRequest): Observable<any> {
    return this.http.post<any>(this.apiurl + '/AddUser', paylod);
  }

  refreshToken() {
    debugger
    return this.http.post<any>(`${this.apiurl1}/refresh-token`, {
      refreshToken: this.getRefreshToken()
    }).pipe(
      tap(() => this.clearTokens())
    );
  }

  // logout() {
  //   debugger
  //   return this.http.post(`${this.apiurl1}/logout`, {
  //     refreshToken: this.getRefreshToken()
  //   }).pipe(
  //     tap(() => this.clearTokens())
  //   );
  // }

  logout() {
  return this.http.post(`${this.apiurl1}/logout`, {
    refreshToken: this.getRefreshToken()
  }).pipe(
    catchError(() => {
      // even if API fails, clear local session
      return of(null);
    }),
    tap(() => this.clearTokens())
  );
}


  getLoggedInUser(){
    return this.http.get<ApiResponse<LoggedInUser>>(`${this.apiurl}/GetUser`);
  }

  getRoleId(): number | null {
  const token = localStorage.getItem('accessToken');
  if (!token) return null;

  const decoded: any = jwtDecode(token);
  return decoded.roleId ? Number(decoded.roleId) : null;
}



  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  clearTokens() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  

}

