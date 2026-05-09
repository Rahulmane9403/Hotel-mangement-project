import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AddAmenityDTO, Amenity, AmenityStatusDTO, UpdateAmenityDTO } from '../models/amenity.model';
import { ApiResponse } from '../models/loginRequest.model';

@Injectable({
  providedIn: 'root'
})
export class AmenityService {

  private readonly baseUrl = 'https://localhost:7238/api/Amenity';

  constructor(
    private http: HttpClient
  ) { }

 

  getAllAmenities(): Observable<Amenity[]> {
    return this.http.get<ApiResponse<{ amenities: Amenity[] }>>(`${this.baseUrl}/Fetch`)
      .pipe(
        map(response => response.data.amenities)
      );
  }


  getAmenityById(id: number): Observable<Amenity> {
    return this.http.get<ApiResponse<Amenity>>(`${this.baseUrl}/Fetch/${id}`)
      .pipe(
        map(response => response.data)
      );
  }



  addAmenity(payload: AddAmenityDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/Add`, payload);
  }

  updateAmenity(id: number, payload: UpdateAmenityDTO): Observable<any> {
    return this.http.put(`${this.baseUrl}/Update/${id}`, payload);
  }

  deleteAmenity(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete/${id}`);
  }


  bulkInsertAmenities(payload: AddAmenityDTO[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/BulkInsert`, payload);
  }

  bulkUpdateAmenities(payload: UpdateAmenityDTO[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/BulkUpdate`, payload);
  }

  bulkUpdateAmenityStatus(payload: AmenityStatusDTO[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/BulkUpdateStatus`, payload);
  }

}
