import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DaysBetweenPipe } from 'src/modules/shared/pipes/calculate-days.pipe';
import { ReservationService } from 'src/services/reservation.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
  providers: [ DaysBetweenPipe ]
})
export class ReservationDetailsComponent implements OnInit{

  constructor(
    public reservationService: ReservationService,
    public daysBetween: DaysBetweenPipe,
    public router: Router
  ) {}

  ngOnInit(): void {}

  onPresentCard() {
    this.router.navigate(['payment-step']);
  }
}
