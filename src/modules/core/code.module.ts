import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InsertBookingIdComponent } from './insert-booking-id/insert-booking-id.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { PaymentStepComponent } from './payment-step/payment-step.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { HeaderComponent } from './header/header.component';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { SharedModule } from "../shared/shared.module";
import { InsertPinComponent } from './insert-pin/insert-pin.component';


@NgModule({
  declarations: [
    InsertBookingIdComponent,
    ReservationDetailsComponent,
    PaymentStepComponent,
    PaymentSuccessComponent,
    HeaderComponent,
    LoaderSpinnerComponent,
    InsertPinComponent
  ],
  exports: [
    InsertBookingIdComponent,
    HeaderComponent,
    LoaderSpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CoreModule { }
