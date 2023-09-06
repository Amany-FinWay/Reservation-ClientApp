import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountdownTerminationComponent } from 'src/modules/core/countdown-termination/countdown-termination.component';
import { PickRoomComponent } from 'src/modules/core/pick-room/pick-room.component';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    components = new Map<string, any>([
        ["count-down-termination", CountdownTerminationComponent],
        ["pick-room", PickRoomComponent]
    ]);

    constructor(private ngbModalService: NgbModal) {}

    openModal(
        componentName: string,
        inputs?: Map<string, any>,
        size: string = '',
        centered: boolean = false,
    ) {
    const modalRef = this.ngbModalService.open(
        this.components.get(componentName),
        { backdrop: 'static', size: size, centered: centered }
    );
    if (inputs) {
        inputs.forEach((value, key) => {
            modalRef.componentInstance[key] = value;
        });
    }
    }

    closeModal() {
        this.ngbModalService.dismissAll();
    }
}
