import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../models/loginRequest.model';
import { Observable } from 'rxjs';
import { Roomtype, RoomtypeStatusDTO } from '../models/roomtype.model';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

  private readonly baseUrl = 'https://localhost:7238/api/RoomType';

  constructor(
    private http: HttpClient
  ) { }
  getAllRoomTypes(): Observable<ApiResponse<Roomtype[]>> {
    return this.http.get<ApiResponse<Roomtype[]>>(
      `${this.baseUrl}/AllRoomTypes`
    );
  }

  // 🔹 Get Room Type By ID
  getRoomTypeById(roomTypeId: number): Observable<ApiResponse<Roomtype>> {
    return this.http.get<ApiResponse<Roomtype>>(
      `${this.baseUrl}/GetRoomType/${roomTypeId}`
    );
  }

  addRoomType(payload: Omit<Roomtype, 'roomTypeID' | 'isActive'>)
    : Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseUrl}/AddRoomType`,
      payload
    );
  }

  // 🔹 Update Room Type
  updateRoomType(roomTypeId: number, payload: Roomtype)
    : Observable<ApiResponse<any>> {
    return this.http.put<ApiResponse<any>>(
      `${this.baseUrl}/Update/${roomTypeId}`,
      payload
    );
  }
  deleteRoomType(roomTypeId: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(
      `${this.baseUrl}/Delete/${roomTypeId}`
    );
  }


  toggleActiveStatus(payload: RoomtypeStatusDTO): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/ActiveInActive?RoomTypeId=${payload.roomTypeID}&IsActive=${payload.isActive}`,
      {}
    );

  }


}
