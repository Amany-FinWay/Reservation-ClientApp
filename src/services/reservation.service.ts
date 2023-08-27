import { Injectable } from '@angular/core';
import { ReservationDetailsModel } from 'src/models/ReservationDetailsModel';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservationDetails?: ReservationDetailsModel;
}
