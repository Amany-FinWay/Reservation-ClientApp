import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VirtualKeyboardService } from 'src/services/virtual-keyboard.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettingService } from 'src/services/appSetting.service';
import { LoadingSpinnerService } from 'src/services/loader-spinner.service';
import { finalize } from 'rxjs';
import { ReservationService } from 'src/services/reservation.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/services/alert.service';
import { AlertType } from 'src/models/_enums/AlertTypeEnum';
import { AppConfig } from 'src/environments/AppConfig';

@Component({
  selector: 'app-insert-booking-id',
  templateUrl: './insert-booking-id.component.html',
  styleUrls: ['./insert-booking-id.component.scss']
})
export class InsertBookingIdComponent implements OnInit{
  bookingIDForm!: FormGroup;
  apiUrl!: string;
  constructor
  (
    private virtualKeyboardService: VirtualKeyboardService,
    private http: HttpClient,
    private appSettingService: AppSettingService,
    private loader: LoadingSpinnerService,
    private reservationService: ReservationService,
    private router: Router,
    private alertService: AlertService,
    private appConfig: AppConfig
    ) {}

    ngOnInit(): void {
      this.bookingIDForm = new FormGroup({
        bookingID: new FormControl('', [Validators.required])
      })
    }

  emitInputEvent(event: any) {
    switch(event.type) {
      case 'focus':
        this.virtualKeyboardService.numericTrigger.emit(true);
        this.virtualKeyboardService.inputFocused.emit(this.bookingIDForm.controls['bookingID']);
        break;
      case 'blur':
        this.virtualKeyboardService.inputBlured.emit(event);
        break;
      case 'input':
        this.virtualKeyboardService.inputChanged.emit(event);
        break;
      default:
        break;
    }
  }

  onGetReservationDetails(){
    this.loader.start();
    const bookingID = this.bookingIDForm.controls['bookingID'].value;
    if(this.appConfig.isRunningLocal) {
      // Use this to run local
      this.apiUrl = `${this.appConfig.usedApiUrl}rsv/v1/hotels/SAND01/reservations/${bookingID}?fetchInstructions=Reservation`;
    } else{
      // Use this to run Electron
      this.apiUrl = `${this.appConfig.baseOperaApiUrl}rsv/v1/hotels/SAND01/reservations/${bookingID}?fetchInstructions=Reservation`;
    }
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Authorization' , `Bearer ${localStorage.getItem("token")}`)
      .set('x-hotelid' , 'SAND01')
      .set('x-app-key', 'ce0eec0d-a9a2-43d3-9f84-91f10dfd9abb')
      .set('Content-Type', 'application/json');

    this.http.get(this.apiUrl, { headers: headers }).pipe(finalize(() => {
        this.loader.stop();
      })).subscribe({
      next: (res: any) => {
        if (res == null) {
          this.alertService.fire(null, 'Oops...', 'No reservations found for this ID' , 'error');
        } else {
          this.reservationService.reservationDetails =  {
            createdDateTime: res.reservations.reservation[0].createDateTime,
            fullName: res.reservations.reservation[0].reservationGuests[0].profileInfo.profile.customer.personName[0]?.givenName + ' ' + res.reservations.reservation[0].reservationGuests[0].profileInfo.profile.customer.personName[0].surname,
            email: res.reservations.reservation[0].reservationGuests[0].profileInfo.profile.emails?.emailInfo[0].email.emailAddress,
            roomType: res.reservations.reservation[0].roomStay.roomRates[0]?.roomType,
            numberOfAdults: res.reservations.reservation[0].roomStay.roomRates[0]?.guestCounts.adults,
            numberOfChildren: res.reservations.reservation[0].roomStay.roomRates[0]?.guestCounts.children,
            arrivalDate: res.reservations.reservation[0].roomStay.arrivalDate,
            depatureDate: res.reservations.reservation[0].roomStay.departureDate,
            costPerNight: res.reservations.reservation[0].roomStay.roomRates[0]?.total.amountBeforeTax
          };
          this.router.navigate(['reservation-details']);
        }
      }, error: () => {
        this.alertService.fire(AlertType.Error);
      }
    })
  }
}
