import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/services/reservation.service';

@Component({
  selector: 'app-receive-room-key',
  templateUrl: './receive-room-key.component.html',
  styleUrls: ['./receive-room-key.component.scss']
})
export class ReceiveRoomKeyComponent implements OnInit{
  constructor(
    public reservationService: ReservationService,
    public router: Router
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/insert-booking-id']);
    }, 9000000)
  }
}
