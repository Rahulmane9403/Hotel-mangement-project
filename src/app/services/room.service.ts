import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResonse, Room, RoomStatusDTO } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = 'https://localhost:7238/api/Room';

  constructor(private http: HttpClient) { }

  getAllRooms(): Observable<ApiResonse<Room[]>>{
    return this.http.get<ApiResonse<Room[]>>(`${this.baseUrl}/All`);
  }

  getRoomsById(id: number):Observable<ApiResonse<Room>>{
    return this.http.get<ApiResonse<Room>>(`${this.baseUrl}/${id}`);
  }

  createRoom(payload: Omit<Room, 'roomID'>): Observable<any> {
    return this.http.post(`${this.baseUrl}/Create`, payload);
  }

  updateRoom(id: number, payload: Room): Observable<any> {
    return this.http.put(`${this.baseUrl}/Update/${id}`, payload);
  }


  deleteRoom(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete/${id}`);
  }

  
  toggleActiveStatus(payload: RoomStatusDTO): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/ActiveInActive?roomId=${payload.roomID}&IsActive=${payload.isActive}`,
      {}
    );

  }







}
