import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AddGuestsToReservation,
  CreateReservation,
  ProcessPayment,
  RoomCosts,
} from '../models/reservation';
import { ApiResponse } from '../models/loginRequest.model';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly baseurl = 'https://localhost:7238/api/Reservation';

  constructor(private http: HttpClient) {}

  calculateRoomCosts(payload: RoomCosts): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseurl}/CalculateRoomCosts`,
      payload,
    );
  }

  createReservation(payload: CreateReservation): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseurl}/CreateReservation`,
      payload,
    );
  }

  addGuestsToReservation(
    payload: AddGuestsToReservation,
  ): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseurl}/AddGuestsToReservation`,
      payload,
    );
  }

  processPaymentDTO(payload: ProcessPayment): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(
      `${this.baseurl}/ProcessPaymentDTO`,
      payload,
    );
  }
}
