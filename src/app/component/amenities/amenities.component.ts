
import { Component, OnInit, ViewChild } from '@angular/core';
import { Amenity, AmenityStatusDTO } from '../../models/amenity.model';
import { AmenityService } from '../../services/amenity.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmenityFormComponent } from './amenity-form/amenity-form.component';
import { ToastComponent } from '../../shared/toast/toast.component';

@Component({
  selector: 'app-amenities',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AmenityFormComponent, ToastComponent],
  templateUrl: './amenities.component.html',
  styleUrl: './amenities.component.css'
})
export class AmenitiesComponent implements OnInit {


  amenities: Amenity[] = [];
  loading = false;
  error: string | null = null;
  showAmenityForm = false;
  isEditMode = false;
  selectedAmenityId?: number;

  filteredAmenities: Amenity[] = [];

  searchText: string = '';
  statusFilter: 'all' | 'active' | 'inactive' = 'all';


  @ViewChild('toast') toast!: any;


  constructor(private amenityService: AmenityService) { }

  ngOnInit(): void {
    this.loadAmenities();
  }

  loadAmenities() {
    this.loading = true;

    this.amenityService.getAllAmenities().subscribe({
      next: (res) => {
        this.amenities = res;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load amenities';
        this.toast.showToast('Failed to save amenity', 'error');

        this.loading = false;
      }
    });

  }
  getAmenityIcon(name: string): string {
    const iconMap: { [key: string]: string } = {
      'Wi-Fi': 'bi bi-wifi',
      'Pool': 'bi bi-water',
      'SPA': 'bi bi-flower1',
      'Fitness Center': 'bi bi-heart-pulse',
      'Yoga & Meditation': 'bi bi-peace',
      'Breakfast': 'bi bi-cup-hot'
    };

    return iconMap[name] || 'bi bi-star';
  }
  openAddAmenity() {
    this.isEditMode = false;
    this.selectedAmenityId = undefined;
    this.showAmenityForm = true;
  }
  editAmenity(id: number) {
    debugger
    this.isEditMode = true;
    this.selectedAmenityId = id;
    this.showAmenityForm = true;
  }
  onAmenitySaved() {
    this.showAmenityForm = false;
    this.loadAmenities(); // refresh cards
    this.toast.showToast('Amenity saved successfully', 'success');
  }
  closeForm() {
    this.showAmenityForm = false;
  }

  toggleStatus(amenity: Amenity) {

    const payload: AmenityStatusDTO[] = [
      {
        amenityID: amenity.amenityID,
        isActive: !amenity.isActive
      }
    ];

    this.amenityService.bulkUpdateAmenityStatus(payload).subscribe({
      next: () => {
        this.loadAmenities(),
          this.toast.showToast('Amenity saved successfully', 'success');
      },
      error: () => alert('Failed to update status')
    });
  }
  deleteAmenity(id: number) {
    if (!confirm('Are you sure you want to delete this amenity?')) return;

    this.amenityService.deleteAmenity(id).subscribe({
      next: () => {
        this.loadAmenities(),
          this.toast.showToast('Amenity saved successfully', 'success');
      },
      error: () => {
        this.toast.showToast('Failed to save amenity', 'error')
      }

    });
  }

  applyFilters() {
    this.filteredAmenities = this.amenities.filter(amenity => {

      const matchesSearch =
        this.searchText === '' ||
        amenity.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        amenity.description?.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus =
        this.statusFilter === 'all' ||
        (this.statusFilter === 'active' && amenity.isActive) ||
        (this.statusFilter === 'inactive' && !amenity.isActive);

      return matchesSearch && matchesStatus;
    });
  }



}
