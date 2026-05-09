import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AllUsers, ApiResponse, LoggedInUser } from '../../models/loginRequest.model';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  //https://localhost:7238/User/AllUsers
  private apiurl = "https://localhost:7238";
  getAllUsers() {
    return this.http.get<ApiResponse<AllUsers[]>>(`${this.apiurl}/User/AllUsers`);
  }
}
