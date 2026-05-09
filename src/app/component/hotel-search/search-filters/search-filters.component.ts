import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomHotelSearchCriteria } from '../../../models/hotel-search.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-filters',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  // standalone: true,
  templateUrl: './search-filters.component.html',
  styleUrl: './search-filters.component.css'
})
export class SearchFiltersComponent implements OnInit {

  @Output() search = new EventEmitter<CustomHotelSearchCriteria>();

  filterForm!: FormGroup;

  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.filterForm = this.fb.group({
      minPrice: [null],
      maxPrice: [null],
      roomTypeName: [''],
      amenityName: [''],
      viewType: ['']
    });
  }

  onSearch(): void{
    const criteria: CustomHotelSearchCriteria = this.cleanPayload(
      this.filterForm.value
    );
  }

  private cleanPayload(value:any): CustomHotelSearchCriteria{
    const cleaned: any = {};
    Object.keys(value).forEach(key =>{
      if(value[key] !== null && value[key] !== ''){
        cleaned[key] = value[key];
      }
    });
    return cleaned;
  }

  onReset():void {
    this.filterForm.reset();
    this.search.emit({});
  }

}
