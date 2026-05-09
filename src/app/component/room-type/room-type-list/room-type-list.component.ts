import { Component, OnInit } from '@angular/core';
import { RoomTypeService } from '../../../services/room-type.service';
import { Roomtype, RoomtypeStatusDTO } from '../../../models/roomtype.model';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomTypeFormComponent } from '../room-type-form/room-type-form.component';

@Component({
  selector: 'app-room-type-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RoomTypeFormComponent, ReactiveFormsModule],
  templateUrl: './room-type-list.component.html',
  styleUrl: './room-type-list.component.css'
})
export class RoomTypeListComponent implements OnInit {

  loading: boolean = false;

  roomTypes: Roomtype[] = [];
  filteredRoomTypes: Roomtype[] = [];
  searchText = '';
  filterStatus: 'ALL' | 'ACTIVE' | 'INACTIVE' = 'ALL';
  showModal = false;
  selectedRoomTypeId?: number;
  isEditMode = false;
  // showModal = false;


  constructor(
    private roomTypeService: RoomTypeService
  ) { }

  ngOnInit(): void {
    this.loadRoomTypes();
  }
  loadRoomTypes(): void {
    this.loading = true;

    this.roomTypeService.getAllRoomTypes().subscribe({
      next: (res) => {
        this.roomTypes = res.data;
        this.applyFilter();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  applyFilter(): void {
    this.filteredRoomTypes = this.roomTypes.filter(rt => {
      const matchesSearch = rt.typeName.toLowerCase().includes(this.searchText.toLowerCase());
      const marchesStaus =
        this.filterStatus === 'ALL' ||
        (this.filterStatus === 'ACTIVE' && rt.isActive) ||
        (this.filterStatus === 'INACTIVE' && !rt.isActive);

      return matchesSearch && marchesStaus;
    });
  }

  toggleStatus(roomType: Roomtype): void {

    const payload: RoomtypeStatusDTO =
    {
      roomTypeID: roomType.roomTypeID,
      isActive: !roomType.isActive
    }

    this.roomTypeService.toggleActiveStatus(payload)
      .subscribe(() => this.loadRoomTypes());
  }

  editRoomType(id: number): void {
    this.isEditMode = false;
    this.selectedRoomTypeId = id;
    this.showModal = true;
  }

  deleteRoomType(id: number): void {
    console.log('Delete RoomType:', id);
    // Next step: confirmation modal
  }

  openAdd(): void {
    this.isEditMode = false;
    this.selectedRoomTypeId = undefined;
    this.showModal = true;
  }


  onModalClose(refresh: boolean): void {
    this.showModal = false;
    this.selectedRoomTypeId = undefined;

    if (refresh) {
      this.loadRoomTypes();
    }
  }
  closeForm() {
    this.showModal = false;
  }


}
