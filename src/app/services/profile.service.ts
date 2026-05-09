import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private apiurl = "https://localhost:7238";

  updateUser(id: number, userData: any) { 
    return this.http.put<any>(`${this.apiurl}/User/Update/${id}`, userData); 
  }
}
