export interface ReservationDetailsModel {
  fullName?: string;
  email?: string;
  createdDateTime?: Date;
  arrivalDate?: string;
  depatureDate?: string;
  roomType?: string;
  numberOfAdults?: number;
  numberOfChildren?: number;
  numberOfDays?: number;
  costPerNight?: number;
  total?: number;
  roomKey?: string;
}
