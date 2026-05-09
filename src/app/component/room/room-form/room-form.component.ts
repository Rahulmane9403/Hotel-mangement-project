import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../models/room.model';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { RoomTypeService } from '../../../services/room-type.service';
@Component({
  selector: 'app-room-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnChanges {

  @Input() roomId?: number;
  @Output() close = new EventEmitter<boolean>();

  roomForm!: FormGroup;
  loading = false;
  isEditMode = false;
  roomTypes: any[] = [];
  submitting: boolean = false;


  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private roomTypeService: RoomTypeService
  ) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['roomId']) {

      if (this.roomId) {
        this.isEditMode = true;
        this.loadRoomById(this.roomId);
      } else {
        this.isEditMode = false;
        this.roomForm.reset({
          roomID: 0,
          status: 'Available',
          isActive: true
        });
        this.loadRoomTypes();
      }
    }
  }
  private loadRoomTypes(): void {
  this.roomTypeService.getAllRoomTypes().subscribe({
    next: (res) => {
      this.roomTypes = res.data;
    }
  });
}


  private buildForm(): void {
    this.roomForm = this.fb.group({
      roomID: [0],
      roomNumber: ['', Validators.required],
      roomTypeID: [null, Validators.required],
      price: [null, Validators.required],
      bedType: ['', Validators.required],
      viewType: ['', Validators.required],
      status: ['Available', Validators.required],
      isActive: [true]
    });
  }

  private loadRoomById(id: number): void {
    this.loading = true;

    forkJoin({
      roomRes: this.roomService.getRoomsById(id),
      roomTypesRes: this.roomTypeService.getAllRoomTypes()
    }).subscribe({
      next: ({ roomRes, roomTypesRes }) => {
        this.roomTypes = roomTypesRes.data; // <-- yeh line zaroori hai

        const enrichedRoom = {
          ...roomRes.data,
          typeName: this.roomTypes.find(rt => rt.roomTypeID === roomRes.data.roomTypeID)?.typeName || 'N/A'
        };

        this.roomForm.patchValue(enrichedRoom);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });


  }

  

onsubmit(): void {
  if (this.roomForm.invalid) {
    this.roomForm.markAllAsTouched();
    return;
  }

  this.loading = true;
  let payload = this.roomForm.value;

  if (this.isEditMode && this.roomId) {
    payload.roomId = this.roomId; // 👈 no overwrite conflict
  }

  const request$ = this.isEditMode
    ? this.roomService.updateRoom(this.roomId!, payload)
    : this.roomService.createRoom(payload);

  request$.subscribe({
    next: () => {
      this.submitting = false;
      this.close.emit(true);
    },
    error: () => (this.submitting = false)
  });
}

  closeForm(): void {
    this.close.emit(false);
  }
}