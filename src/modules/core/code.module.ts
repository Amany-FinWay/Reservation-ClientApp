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
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { ReceiveRoomKeyComponent } from './receive-room-key/receive-room-key.component';
import { CountdownTerminationComponent } from './countdown-termination/countdown-termination.component';
import { PickRoomComponent } from './pick-room/pick-room.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    InsertBookingIdComponent,
    ReservationDetailsComponent,
    PaymentStepComponent,
    PaymentSuccessComponent,
    HeaderComponent,
    LoaderSpinnerComponent,
    InsertPinComponent,
    SplashScreenComponent,
    ReceiveRoomKeyComponent,
    CountdownTerminationComponent,
    PickRoomComponent
  ],
  exports: [
    InsertBookingIdComponent,
    HeaderComponent,
    LoaderSpinnerComponent,
    SplashScreenComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    NgbModule
  ]
})
export class CoreModule { }
