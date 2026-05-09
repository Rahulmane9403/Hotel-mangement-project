export interface Room {
  roomID: number;
  roomNumber: string;
  roomTypeID: number;
  price: number;
  bedType: string;
  viewType: string;
  status: RoomStatus;
  isActive: boolean;
  createdBy?: number;
  createdDate?: string;
  modifiedBy?: number;
  modifiedDate?: string;
  typeName?: string;
}

export type RoomStatus =
  | 'Available'
  | 'Occupied'
  | 'Under Maintenance';

export interface ApiResonse<T>{
    success:boolean;
    statusCode: number;
    message:string;
    data:T;
    error:any;
}


export interface RoomStatusDTO {
  roomID: number;
  isActive: boolean;
}