export interface Amenity {
    amenityID: number;
    name: string;
    description: string;
    isActive: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}


export interface AddAmenityDTO {
  name: string;
  description: string;
}

export interface UpdateAmenityDTO {
  amenityID: number;
  name: string;
  description: string;
  isActive: boolean;
}

export interface AmenityStatusDTO {
  amenityID: number;
  isActive: boolean;
}
