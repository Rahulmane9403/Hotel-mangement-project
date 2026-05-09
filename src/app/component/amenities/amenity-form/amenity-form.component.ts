import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AmenityService } from '../../../services/amenity.service';
import { AddAmenityDTO, UpdateAmenityDTO } from '../../../models/amenity.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amenity-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './amenity-form.component.html',
  styleUrl: './amenity-form.component.css'
})
export class AmenityFormComponent implements OnInit, OnChanges {
  @Input() amenityId?: number;
  @Input() isEditMode = false;

  @Output() formSubmitted = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  amenityForm!: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private amenityService: AmenityService
  ) { }

  ngOnInit(): void {
    this.createForm();   // 🔴 MUST BE HERE
  }
  ngOnChanges(changes: SimpleChanges): void {
    debugger
    if (
      changes['amenityId'] &&
      this.isEditMode &&
      this.amenityId
    ) {
      this.loadAmenityById(this.amenityId);
    }
  }

  // ngOnInit(): void {
  //   this.amenityForm = this.fb.group({
  //     name: ['', Validators.required],
  //     description: [''],
  //     isActive: [true]
  //   });

  //   if (this.isEditMode && this.amenityId) {
  //     this.loadAmenity();
  //   }
  // }

  createForm() {
    this.amenityForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      isActive: [true]
    });
  }

  loadAmenity() {
    this.amenityService.getAmenityById(this.amenityId!).subscribe({
      next: (res) => {
        this.amenityForm.patchValue({
          name: res.name,
          description: res.description,
          isActive: res.isActive
        });
      }
    });
  }

  loadAmenityById(id: number) {
    debugger
    this.amenityService.getAmenityById(id).subscribe({
      next: (res) => {
        const amenity = res;
        // const amenity = res.data ?? res; 

        this.amenityForm.patchValue({
          name: amenity.name,
          description: amenity.description,
          isActive: amenity.isActive
        });
      },
      error: () => {
        alert('Failed to load amenity');
      }
    });
  }

  onSubmit() {
    if (this.amenityForm.invalid) return;

    this.submitting = true;

    if (this.isEditMode) {
      const payload: UpdateAmenityDTO = {
        amenityID: this.amenityId!,
        ...this.amenityForm.value
      };

      this.amenityService.updateAmenity(this.amenityId!, payload).subscribe({
        next: () => this.handleSuccess(),
        error: () => this.submitting = false
      });

    } else {
      const payload: AddAmenityDTO = {
        name: this.amenityForm.value.name,
        description: this.amenityForm.value.description
      };

      this.amenityService.addAmenity(payload).subscribe({
        next: () => this.handleSuccess(),
        error: () => this.submitting = false
      });
    }
  }
  handleSuccess() {
    this.submitting = false;
    this.formSubmitted.emit();
  }

  cancel() {
    this.cancelled.emit();
  }


}
