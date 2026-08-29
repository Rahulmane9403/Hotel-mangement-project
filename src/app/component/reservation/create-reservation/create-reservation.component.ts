import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReservationService } from '../../../services/reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-reservation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.css',
})
export class CreateReservationComponent {
  private fb = inject(FormBuilder);
  private reservstionService = inject(ReservationService);
  private router = inject(Router);

  reservationForm!: FormGroup;
  loading = false;

  roomCostSummary: any = null;

  selectedRooms: Number[] = [];

  rooms = [
    { roomID: 1, roomNumber: '101 Deluxe' },
    { roomID: 2, roomNumber: '102 Super Deluxe' },
    { roomID: 3, roomNumber: '103 Suite' },
    { roomID: 4, roomNumber: '104 Executive' },
  ];

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.reservationForm = this.fb.group({
      // userID: number;
      roomIDs: [[], Validators.required],

      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
    });
  }

  onRoomChange(event: any, roomID: number) {
    if (event.target.checked) {
      this.selectedRooms.push(roomID);
    } else {
      this.selectedRooms = this.selectedRooms.filter((x) => x !== roomID);
    }

    this.reservationForm.patchValue({
      roomIDs: this.selectedRooms,
    });
  }
}
