import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettingService } from 'src/services/appSetting.service';
import { ModalService } from 'src/services/modal.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-countdown-termination',
  templateUrl: './countdown-termination.component.html',
  styleUrls: ['./countdown-termination.component.scss']
})
export class CountdownTerminationComponent {
  @Input('timecounter') timecounter!: any;
  constructor(
    public appSettingService: AppSettingService,
    private modalService: ModalService,
    private router: Router,
    public activeModal: NgbActiveModal
  ) {}

  exitPopUp() {
    this.modalService.closeModal();
    this.router.navigateByUrl('');
    this.appSettingService.counter = 60;
  }

  waitPopup() {
    this.activeModal.close();
    this.appSettingService.counter = 60;
  }
}
