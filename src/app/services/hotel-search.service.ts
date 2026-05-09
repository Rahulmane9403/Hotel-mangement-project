import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/loginRequest.model';
import { AmenitySearch, CustomHotelSearchCriteria, RoomDetailsWithAmenitiesSearch, RoomSearch } from '../models/hotel-search.model';

@Injectable({
  providedIn: 'root'
})
export class HotelSearchService {

  private baseUrl = 'https://localhost:7238/HotelSearch';

  constructor(private http: HttpClient) {}

  // 🔹 Availability Search
  searchByAvailability(checkInDate: string, checkOutDate: string):
    Observable<ApiResponse<RoomSearch[]>> {

    const params = new HttpParams()
      .set('checkInDate', checkInDate)
      .set('checkOutDate', checkOutDate);

    return this.http.get<ApiResponse<RoomSearch[]>>(
      `${this.baseUrl}/Availability`,
      { params }
    );
  }

  // 🔹 Price Range
  searchByPriceRange(minPrice: number, maxPrice: number):
    Observable<ApiResponse<RoomSearch[]>> {

    const params = new HttpParams()
      .set('minPrice', minPrice)
      .set('maxPrice', maxPrice);

    return this.http.get<ApiResponse<RoomSearch[]>>(
      `${this.baseUrl}/PriceRange`,
      { params }
    );
  }

  // 🔹 Room Type
  searchByRoomType(roomTypeName: string):
    Observable<ApiResponse<RoomSearch[]>> {

    return this.http.get<ApiResponse<RoomSearch[]>>(
      `${this.baseUrl}/RoomType`,
      { params: { roomTypeName } }
    );
  }

  // 🔹 View Type
  searchByViewType(viewType: string):
    Observable<ApiResponse<RoomSearch[]>> {

    return this.http.get<ApiResponse<RoomSearch[]>>(
      `${this.baseUrl}/ViewType`,
      { params: { viewType } }
    );
  }

  // 🔹 Amenities
  searchByAmenity(amenityName: string):
    Observable<ApiResponse<RoomSearch[]>> {

    return this.http.get<ApiResponse<RoomSearch[]>>(
      `${this.baseUrl}/Amenities`,
      { params: { amenityName } }
    );
  }

  // 🔹 Rooms by RoomTypeID
  getRoomsByRoomType(roomTypeID: number):
    Observable<ApiResponse<RoomSearch[]>> {

    return this.http.get<ApiResponse<RoomSearch[]>>(
      `${this.baseUrl}/RoomsByType`,
      { params: { roomTypeID } }
    );
  }

  // 🔹 Room Details with Amenities
  getRoomDetails(roomID: number):
    Observable<ApiResponse<RoomDetailsWithAmenitiesSearch>> {

    return this.http.get<ApiResponse<RoomDetailsWithAmenitiesSearch>>(
      `${this.baseUrl}/RoomDetails`,
      { params: { roomID } }
    );
  }

  // 🔹 Room Amenities Only
  getRoomAmenities(roomID: number):
    Observable<ApiResponse<AmenitySearch[]>> {

    return this.http.get<ApiResponse<AmenitySearch[]>>(
      `${this.baseUrl}/RoomAmenities`,
      { params: { roomID } }
    );
  }

  // 🔹 By Rating
  searchByMinRating(minRating: number):
    Observable<ApiResponse<RoomSearch[]>> {

    return this.http.get<ApiResponse<RoomSearch[]>>(
      `${this.baseUrl}/ByRating`,
      { params: { minRating } }
    );
  }

  // 🔹 Custom Combination Search
  customSearch(criteria: CustomHotelSearchCriteria):
    Observable<ApiResponse<RoomSearch[]>> {

    return this.http.post<ApiResponse<RoomSearch[]>>(
      `${this.baseUrl}/CustomSearch`,
      criteria
    );
  }
}
