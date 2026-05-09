import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomSearch } from '../../../models/hotel-search.model';
import { CommonModule } from '@angular/common';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-room-card',
  imports: [CommonModule],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
  @Input({ required: true}) room!:RoomSearch;
  @Output() viewDetails = new EventEmitter<number>();

  onViewDetails(): void {
    this.viewDetails.emit(this.room.roomID);
  }

  getStatusClass():string{
    switch(this.room.status){
      case 'Available': return 'bg-success';
      case 'Occupied': return 'bg-danger';
      default: return 'bg-warning';
    }
  }

  getAmenityIcon(name: string): string {
    const iconMap: any = {
      wifi: 'bi-wifi',
      pool: 'bi-water',
      gym: 'bi-activity',
      spa: 'bi-heart-pulse',
      breakfast: 'bi-cup-hot'
    };

    return iconMap[name.toLowerCase()] || 'bi-check-circle';
  }
}
