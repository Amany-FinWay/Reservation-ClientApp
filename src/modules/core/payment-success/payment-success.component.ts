import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DaysBetweenPipe } from 'src/modules/shared/pipes/calculate-days.pipe';
import { ReservationService } from 'src/services/reservation.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss'],
  providers: [ DaysBetweenPipe ]
})
export class PaymentSuccessComponent implements OnInit{
  constructor(
    public reservationService: ReservationService,
    public daysBetween: DaysBetweenPipe,
    public router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 5000);
  }
}
