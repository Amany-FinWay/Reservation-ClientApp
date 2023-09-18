import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/environments/AppConfig';
import { RoomsPerFloorModel } from 'src/models/RoomsPerFloorModel';
import { DaysBetweenPipe } from 'src/modules/shared/pipes/calculate-days.pipe';
import { AppSettingService } from 'src/services/appSetting.service';
import { ModalService } from 'src/services/modal.service';
import { ReservationService } from 'src/services/reservation.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
  providers: [ DaysBetweenPipe ]
})
export class ReservationDetailsComponent implements OnInit{
  areRoomsAvailable: boolean = false;
  apiUrl!: string;

  constructor(
    private httpClient: HttpClient,
    public appSettingService: AppSettingService,
    public reservationService: ReservationService,
    public daysBetween: DaysBetweenPipe,
    public router: Router,
    public modalService: ModalService,
    public appConfig: AppConfig
  ) {}

  ngOnInit(): void {}

  onPresentCard() {
    this.router.navigate(['payment-step']);
  }

  onPickRoom(){
    this.areRoomsAvailable = true;
    if(this.appConfig.isRunningLocal) {
      // Use this to run local
      this.apiUrl = `${this.appConfig.usedApiUrl}fof/v0/hotels/SAND01/rooms?hotelRoomStartDate=${this.reservationService.reservationDetails!.arrivalDate!}&hotelRoomEndDate=${this.reservationService.reservationDetails!.depatureDate!}&roomType=${this.reservationService.reservationDetails!.roomType}&hotelRoomStatus=Inspected`;
    }else{
      // Use this to run Electron
      // this.apiUrl = `${this.appConfig.baseOperaApiUrl}fof/v0/hotels/SAND01/rooms?hotelRoomStartDate=${this.reservationService.reservationDetails!.arrivalDate!}&hotelRoomEndDate=${this.reservationService.reservationDetails!.depatureDate!}&roomType=${this.reservationService.reservationDetails!.roomType}&hotelRoomStatus=Inspected`;
    }
    const headers = new HttpHeaders()
    .set('Accept', '*/*')
    .set('Authorization' , `Bearer ${localStorage.getItem("token")}`)
    .set('x-app-key', 'ce0eec0d-a9a2-43d3-9f84-91f10dfd9abb')
    .set('Content-Type', 'application/json')
    .set('x-hotelid', 'SAND01');

  this.httpClient.get(this.apiUrl, { headers: headers }).subscribe({
    next: (res: any) => {
      console.log(res);
      const roomDetailsPerFloor: RoomsPerFloorModel[] = [];
      res.hotelRoomsDetails.room.forEach((room: any) => {
        const floor = room.floor || '00';
        const roomId = room.roomId;
        const roomStatus = room.housekeeping.roomStatus.roomStatus;
        const roomFeatures = room.roomFeatures;
        if (roomDetailsPerFloor[floor]) {
          // If the floor object already exists, push the room details into its rooms array
          roomDetailsPerFloor[floor].rooms.push({ id: roomId, roomStatus: roomStatus, roomFeatures: roomFeatures });
        } else {
          // If the floor object doesn't exist, create a new floor object and push it into the roomDetailsPerFloor array
          roomDetailsPerFloor[floor] = {
            floorNumber: floor,
            rooms: [{ id: roomId, roomStatus: roomStatus, roomFeatures: roomFeatures }],
          };
        }
      });
      // Convert the object to an array of objects
      this.reservationService.roomsPerFloor = Object.values(roomDetailsPerFloor);
      console.log(this.reservationService.roomsPerFloor);
      
      this.modalService.openModal('pick-room', new Map<string, any>([["availableRoomsPerFloor", this.reservationService.roomsPerFloor]]), 'xl');
      this.areRoomsAvailable = false;
    }, error: (err: any) => {
      this.areRoomsAvailable = false;
      console.log(err);
    }
  });
    //this.modalService.openModal('pick-room', undefined, 'xxl', true);
  }
}
