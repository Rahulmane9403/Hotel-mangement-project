import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomTypeService } from '../../../services/room-type.service';

@Component({
  selector: 'app-room-type-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './room-type-form.component.html',
  styleUrl: './room-type-form.component.css'
})
export class RoomTypeFormComponent implements OnInit {

  @Input() roomTypeId?: number;
  @Output() close = new EventEmitter<boolean>();

  isEditMode = false;
  roomTypeForm!: FormGroup;
  submitting: boolean = false;
  selectedRoomTypeId?: number;
  showRoomTypeForm: boolean = false;
  showModal = false;

  constructor(
    private roomTypeService: RoomTypeService,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    this.createForm();

    if (this.roomTypeId) {
      this.isEditMode = true;
      this.loadRoomType();
    }

  }

  createForm(): void {
    this.roomTypeForm = this.fb.group({
      typeName: ['', Validators.required],
      accessibilityFeatures: [''],
      description: [''],
      isActive: [true]
    });
  }

  loadRoomType(): void {
    this.roomTypeService.getRoomTypeById(this.roomTypeId!).subscribe(
      res => {
        this.roomTypeForm.patchValue(res.data);
      });
  }
  onSubmit(): void {
    if (this.roomTypeForm.invalid) return;

    this.submitting = true;

    let payload = this.roomTypeForm.value;

    if (this.isEditMode && this.roomTypeId) {
      payload = {
        roomTypeID: this.roomTypeId,
        ...payload
      };
    }

    const request$ = this.isEditMode
      ? this.roomTypeService.updateRoomType(this.roomTypeId!, payload)
      : this.roomTypeService.addRoomType(payload);

    console.log('paylod', payload);
    request$.subscribe({
      next: () => {
        this.submitting = false;
        this.close.emit(true); // success
      },
      error: () => {
        this.submitting = false;
      }
    });
  }


  cancel(): void {
    this.close.emit(false);
  }



}
