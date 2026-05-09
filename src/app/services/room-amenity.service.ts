import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResonse } from '../models/room.model';
import { ApiResponse } from '../models/loginRequest.model';
import { BulkRoomAmenity, RoomAmenity } from '../models/room-amenity.model';

@Injectable({
  providedIn: 'root'
})
export class RoomAmenityService {

  private readonly baseUrl = 'https://localhost:7238/api/RoomAmenity';

  constructor(
    private http: HttpClient
  ) { }

  //https://localhost:7238/api/RoomAmenity/FetchAmenitiesByRoomTypeId/1

  getAmenitiesByRoomTypeId(
    roomTypeId: number
  ): Observable<ApiResponse<number[]>> {
    return this.http.get<ApiResponse<number[]>>(
      `${this.baseUrl}/FetchAmenitiesByRoomTypeId/${roomTypeId}`
    );
  }

  getRoomTypesByAmenityId(
    amenityId: number
  ): Observable<ApiResponse<number[]>> {
    return this.http.get<ApiResponse<number[]>>(
      `${this.baseUrl}/FetchRoomTypesByAmenityId/${amenityId}`
    );
  }


  addRoomAmenity(
    payload: RoomAmenity
  ): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/AddRoomAmenity`,
      payload
    );
  }

  deleteRoomAmenity(
    payload: RoomAmenity
  ): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/DeleteRoomAmenity`,
      payload
    );
  }


  bulkInsertRoomAmenities(
    payload: BulkRoomAmenity
  ): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/BulkInsertRoomAmenities`,
      payload
    );
  }

  bulkUpdateRoomAmenities(
    payload: BulkRoomAmenity
  ): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/BulkUpdateRoomAmenities`,
      payload
    );
  }

  deleteAllByRoomTypeId(
    roomTypeId: number
  ): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/DeleteAllRoomAmenitiesByRoomTypeID/${roomTypeId}`,
      {}
    );
  }

  deleteAllByAmenityId(
    amenityId: number
  ): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/DeleteAllRoomAmenitiesByAmenityID/${amenityId}`,
      {}
    );
  }


}
