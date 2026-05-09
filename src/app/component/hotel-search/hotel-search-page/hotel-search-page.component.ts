import { Component, OnInit } from '@angular/core';
import { HotelSearchService } from '../../../services/hotel-search.service';
import { CustomHotelSearchCriteria, RoomSearch } from '../../../models/hotel-search.model';
import { ApiResponse } from '../../../models/common.model';
import { CommonModule, formatDate } from '@angular/common';
import { SearchFiltersComponent } from '../search-filters/search-filters.component';
import { RoomCardComponent } from '../room-card/room-card.component';

@Component({
  selector: 'app-hotel-search-page',
  imports: [CommonModule, SearchFiltersComponent,RoomCardComponent],
  templateUrl: './hotel-search-page.component.html',
  styleUrl: './hotel-search-page.component.css'
})
export class HotelSearchPageComponent implements OnInit {

  rooms: RoomSearch[] = [];
  loading = false;
  error: string | null = null;
  hasSearched = false;

  constructor(
    private hotelSearchService: HotelSearchService
  ) { }

  ngOnInit(): void {
    this.searchAvailableRooms();
  }

  searchAvailableRooms(): void {
    this.loading = true;
    this.error = null;
    this.hasSearched = false;

    const today = new Date();
    const tomorrow = new Date();
    today.setDate(today.getDate() + 1)
    tomorrow.setDate(today.getDate() + 2);


    const checkIn = formatDate(today, 'yyyy-MM-dd', 'en-US');
    const checkOut = formatDate(tomorrow, 'yyyy-MM-dd', 'en-US');


    this.hotelSearchService
      .searchByAvailability(checkIn, checkOut)
      .subscribe({
        next: (res: ApiResponse<RoomSearch[]>) => {
          this.rooms = res.data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Failed to load available rooms';
          this.loading = false;
        }
      });
  }

  onSearch(criteria: CustomHotelSearchCriteria): void {
    this.loading = true;
    this.error = null;
    this.hasSearched = true;

    this.hotelSearchService
      .customSearch(criteria)
      .subscribe({
        next: (res) => {
          this.rooms = res.data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Search failed. Please try again.';
          this.loading = false;
        }
      });
  }

  openRoomDetails(roomId: number): void {
    console.log('Open Room Details:', roomId);
    // next step → details modal
  }


}
