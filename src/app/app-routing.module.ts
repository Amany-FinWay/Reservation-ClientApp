import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertBookingIdComponent } from 'src/modules/core/insert-booking-id/insert-booking-id.component';
import { InsertPinComponent } from 'src/modules/core/insert-pin/insert-pin.component';
import { PaymentStepComponent } from 'src/modules/core/payment-step/payment-step.component';
import { PaymentSuccessComponent } from 'src/modules/core/payment-success/payment-success.component';
import { ReservationDetailsComponent } from 'src/modules/core/reservation-details/reservation-details.component';

const routes: Routes =
  [
    { path: 'insert-booking-id', component: InsertBookingIdComponent },
    { path: '', redirectTo: '/insert-booking-id', pathMatch: 'full' },
    { path: 'reservation-details', component: ReservationDetailsComponent },
    { path: 'payment-step', component: PaymentStepComponent },
    { path: 'payment-success', component: PaymentSuccessComponent },
    { path: 'insert-pin', component: InsertPinComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
