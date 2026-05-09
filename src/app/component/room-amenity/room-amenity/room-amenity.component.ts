import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomTypeService } from '../../../services/room-type.service';
import { AmenityService } from '../../../services/amenity.service';
import { RoomAmenityService } from '../../../services/room-amenity.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../../../services/room.service';
import { ToastComponent } from '../../../shared/toast/toast.component';

@Component({
  selector: 'app-room-amenity',
  imports: [CommonModule, FormsModule, ToastComponent],
  templateUrl: './room-amenity.component.html',
  styleUrl: './room-amenity.component.css'
})
export class RoomAmenityComponent implements OnInit {

  roomTypes: any[] = [];
  amenities: any[] = [];
  pagedAmenities: any[] = [];

  selectedRoomTypeId!: number;
  assignedAmenityIds = new Set<number>();
  searchText = '';
  filteredAmenities: any[] = [];


  // Pagination
  pageSize = 6;
  currentPage = 1;
  totalPages = 0;

  loading = false;
  isDirty = false;

  @ViewChild('toast') toast!: any;

  constructor(
    private roomTypeService: RoomTypeService,
    private amenityService: AmenityService,
    private roomAmenityService: RoomAmenityService
  ) { }

  ngOnInit(): void {
    this.loadRoomTypes();
    this.loadAmenities();
  }


  loadRoomTypes(): void {
    this.roomTypeService.getAllRoomTypes().subscribe(res => {
      this.roomTypes = res.data.filter(rt => rt.isActive);
      this.selectedRoomTypeId = this.roomTypes[0]?.roomTypeID;
      this.loadAssignedAmenities();
    });
  }

  onRoomTypeChange(): void {
    if (this.isDirty && !confirm('Unsaved changes will be lost. Continue?')) {
      return;
    }
    this.isDirty = false;
    this.loadAssignedAmenities();
  }

  loadAmenities(): void {
    this.loading = true;

    this.amenityService.getAllAmenities().subscribe(res => {
      this.amenities = res;
      this.filteredAmenities = [...this.amenities];
      this.calculatePagination();
      this.loading = false;
    });
  }

  onSearch(): void {
    const value = this.searchText.toLowerCase().trim();

    this.filteredAmenities = this.amenities.filter(a =>
      a.name.toLowerCase().includes(value)
    );

    this.calculatePagination();
  }



  loadAssignedAmenities(): void {
    this.roomAmenityService
      .getAmenitiesByRoomTypeId(this.selectedRoomTypeId)
      .subscribe(res => {
        // Ensure only IDs, no duplicates
        this.assignedAmenityIds = new Set(res.data.map((a: any) =>
          typeof a === 'object' ? a.amenityID : a
        ));
        this.calculatePagination();
      });
  }


  toggleAmenity(amenityId: number): void {
    this.isDirty = true;

    if (this.assignedAmenityIds.has(amenityId)) {
      this.assignedAmenityIds.delete(amenityId);
    } else {
      this.assignedAmenityIds.add(amenityId);
    }
  }

  isChecked(id: number): boolean {
    return this.assignedAmenityIds.has(id);
  }

  saveChanges(): void {
    const payload = {
      roomTypeID: this.selectedRoomTypeId,
      amenityIDs: Array.from(this.assignedAmenityIds) // already unique numbers
    };

    this.roomAmenityService.bulkUpdateRoomAmenities(payload).subscribe({
      next: () => {
        this.toast.showToast('Amenities updated successfully');
        this.isDirty = false;
      },
      error: () => {
        this.toast.showToast('Failed to save amenity', 'error');
      }
    });
  }



  reset(): void {
    if (!confirm('Reset all changes?')) return;
    this.loadAssignedAmenities();
    this.isDirty = false;
  }

  // Add a dictionary for amenity → icon class
  amenityIconMap: { [key: string]: string } = {
    'WiFi': 'bi bi-wifi',
    'Pool': 'bi bi-water',
    'Gym': 'bi bi-heart-pulse',
    'TV': 'bi bi-tv',
    'Parking': 'bi bi-car-front',
    'Breakfast': 'bi bi-cup-hot'
  };

  getAmenityIcon(name: string): string {
    return this.amenityIconMap[name] || 'bi bi-check-circle'; // default icon
  }



  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredAmenities.length / this.pageSize);
    this.changePage(1);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;

    this.pagedAmenities = this.filteredAmenities.slice(start, end);
  }


}
