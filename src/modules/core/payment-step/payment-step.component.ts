import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DaysBetweenPipe } from 'src/modules/shared/pipes/calculate-days.pipe';
import { ReservationService } from 'src/services/reservation.service';

@Component({
  selector: 'app-payment-step',
  templateUrl: './payment-step.component.html',
  styleUrls: ['./payment-step.component.scss'],
  providers: [ DaysBetweenPipe ]
})
export class PaymentStepComponent {
  constructor(
    public reservationService: ReservationService,
    public daysBetween: DaysBetweenPipe,
    private router: Router
  ) {}

  onInsertPIN() {
    this.router.navigate(['insert-pin']);
    // this.loader.start();
    // setTimeout(() => {
    //   this.router.navigate(['payment-success']);
    //   this.loader.stop();
    // }, 5000);
  }
}
