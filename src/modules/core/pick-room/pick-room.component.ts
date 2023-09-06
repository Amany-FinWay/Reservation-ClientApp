import { Component, Input, OnInit } from '@angular/core';
import { RoomModel } from 'src/models/RoomModel';
import { RoomsPerFloorModel } from 'src/models/RoomsPerFloorModel';
import { RoomFeatureEnum } from 'src/models/_enums/RoomFeatureEnum';
import { ModalService } from 'src/services/modal.service';
import { ReservationService } from 'src/services/reservation.service';
import { Options } from '@popperjs/core';
@Component({
  selector: 'app-pick-room',
  templateUrl: './pick-room.component.html',
  styleUrls: ['./pick-room.component.scss']
})
export class PickRoomComponent {
  @Input() availableRoomsPerFloor!: RoomsPerFloorModel[];

  constructor(
    private reservationService: ReservationService,
    public modalService: ModalService
  ) {}

  onPickRoomNumber(roomId: string){
    this.reservationService.reservationDetails!.roomKey = roomId;
    this.modalService.closeModal();
  }


  popperOptions = (options: Partial<Options>) => {
		// customize placement
		options.placement = 'bottom';

		// customize modifiers
		for (const modifier of options.modifiers || []) {
			// disable flip
			if (modifier.name === 'flip') {
				modifier.enabled = false;
			}
		}

		// add your own modifier
		options.modifiers?.push({
			name: 'custom',
			enabled: true,
			phase: 'main',
			fn: ({ state }) => {
				console.log('custom modifier');
			},
		});

		// first update callback
		options.onFirstUpdate = (state) => {
			console.log('onFirstUpdate', state);
			if (state.elements?.arrow) {
				state.elements.arrow.style.display = 'none';
			}
		};
		return options;
	};
}
