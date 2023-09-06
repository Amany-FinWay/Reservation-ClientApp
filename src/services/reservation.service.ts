import { Injectable } from '@angular/core';
import { ReservationDetailsModel } from 'src/models/ReservationDetailsModel';
import { RoomsPerFloorModel } from 'src/models/RoomsPerFloorModel';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservationDetails?: ReservationDetailsModel;
  roomsPerFloor?: RoomsPerFloorModel[];
}
