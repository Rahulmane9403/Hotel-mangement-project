import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAmenityComponent } from './room-amenity.component';

describe('RoomAmenityComponent', () => {
  let component: RoomAmenityComponent;
  let fixture: ComponentFixture<RoomAmenityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomAmenityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAmenityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
