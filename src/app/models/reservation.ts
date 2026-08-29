export interface RoomCosts {
  roomIDs: number[];
  checkInDate: string;
  checkOutDate: string;
}

export interface CreateReservation {
  userID: number;
  roomIDs: number[];
  checkInDate: string;
  checkOutDate: string;
}

export interface AddGuestsToReservation {
  userID: number;
  reservationID: number;
  GuestDetails: GuestDetails[];
}

export interface GuestDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ageGroup: string;
  address: string;
  countryId: number;
  stateId: number;
  roomID: number;
}

export interface ProcessPayment {
  reservationID: number;
  totalAmount: number;
  paymentMethod: string;
}
