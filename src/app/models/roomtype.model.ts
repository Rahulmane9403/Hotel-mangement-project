export interface Roomtype {
    roomTypeID: number;
    typeName: string;
    accessibilityFeatures: string;
    description: string;
    isActive: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
}

export interface RoomtypeStatusDTO {
  roomTypeID: number;
  isActive: boolean;
}
