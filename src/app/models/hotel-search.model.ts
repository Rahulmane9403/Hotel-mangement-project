export interface RoomTypeSearch {
  roomTypeID: number;
  typeName: string;
  accessibilityFeatures: string;
  description: string;
}


export interface RoomSearch {
  roomID: number;
  roomNumber: string;
  price: number;
  bedType: string;
  viewType: string;
  status: string;
  roomType: RoomTypeSearch;
}
export interface AmenitySearch {
  amenityID: number;
  name: string;
  description: string;
}


export interface RoomDetailsWithAmenitiesSearch {
  room: RoomSearch;
  amenities: AmenitySearch[];
}


export interface CustomHotelSearchCriteria {
  minPrice?: number;
  maxPrice?: number;
  roomTypeName?: string;
  amenityName?: string;
  viewType?: string;
}

