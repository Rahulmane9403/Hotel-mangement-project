import { Component, NgModule, OnInit } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { Room, RoomStatusDTO } from '../../../models/room.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomFormComponent } from '../room-form/room-form.component';
import { Roomtype } from '../../../models/roomtype.model';
import { RoomTypeService } from '../../../services/room-type.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RoomFormComponent, ReactiveFormsModule
  ],
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {


  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  loading = false;
  error: string | null = null;

  searchText = '';
  selectedStatus = '';
  showInactive: boolean = false;

  selectedRoomId?: number;
  showModal = false;
  isEditMode = false;
  roomTypes: Roomtype[] = [];

  constructor(
    private roomService: RoomService,
    private roomTypeService: RoomTypeService
  ) { }

  ngOnInit(): void {
    this.loadRooms();

  }


  loadRooms(): void {
    this.loading = true;

    forkJoin({
      roomsRes: this.roomService.getAllRooms(),
      roomTypesRes: this.roomTypeService.getAllRoomTypes()
    }).subscribe({
      next: ({ roomsRes, roomTypesRes }) => {

        const roomTypes = roomTypesRes.data;

        // 🔹 Create lookup map
        const roomTypeMap: { [key: number]: string } = {};
        roomTypes.forEach(rt => {
          roomTypeMap[rt.roomTypeID] = rt.typeName;
        });

        // 🔹 Map typeName into rooms
        this.rooms = roomsRes.data.map(room => ({
          ...room,
          typeName: roomTypeMap[room.roomTypeID] || 'N/A'
        }));

        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load rooms';
        this.loading = false;
      }
    });
  }




  applyFilters(): void {
    this.filteredRooms = this.rooms.filter(room => {
      const matchesSearch =
        !this.searchText ||
        room.roomNumber.toLowerCase().includes(this.searchText.toLowerCase()) ||
        room.bedType.toLowerCase().includes(this.searchText.toLowerCase()) ||
        room.viewType.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus =
        !this.selectedStatus || room.status === this.selectedStatus;

      const matchesActive =
        this.showInactive ? true : room.isActive;

      return matchesSearch && matchesStatus && matchesActive;
    });
  }



  deleteRoom(id: number): void {
    console.log('Delete Room', id);
    // Implement delete logic here
  }

  toggleActive(room: Room): void {
    const payload: RoomStatusDTO =
    {
      roomID: room.roomID,
      isActive: !room.isActive
    }

    this.roomService.toggleActiveStatus(payload).subscribe(() => this.loadRooms());
    // Call update API here
  }





  openAddRoom(): void {
    this.isEditMode = false;
    this.selectedRoomId = undefined;
    this.showModal = true;

  }

  editRoom(id: number): void {
    this.isEditMode = false;
    this.selectedRoomId = id;
    this.showModal = true;
  }

  onModalClose(refresh: boolean): void {
    this.showModal = false;
    this.selectedRoomId = undefined;

    if (refresh) {
      this.loadRooms();
    }
  }

}