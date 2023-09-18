import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettingService } from 'src/services/appSetting.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/services/modal.service';
import { AppConfig } from 'src/environments/AppConfig';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Reservation-ClientApp';
  isLastMinutes: boolean = false;
  timerCountDown!: number;
  apiUrl!: string;

  constructor(
    private httpClient: HttpClient,
    public appSettingService: AppSettingService,
    public router: Router,
    private modalService: ModalService,
    private appConfig: AppConfig

    ) { }

  ngOnInit(): void {
    //console.log(this.appSettingService.isBeenAMinute);
    
    this.tick();
    if(this.appConfig.isRunningLocal) {
      // Use this to run local
      this.apiUrl = `${this.appConfig.usedApiUrl}oauth/v1/tokens`;
    }else{
    // Use this to run Electron
    // this.apiUrl = `${this.appConfig.baseOperaApiUrl}oauth/v1/tokens`;
    }

    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Authorization' , `Basic Zmlud2F5X0NsaWVudDo5WGxyVEZYdU44M19aRDFDMzRBUDU0X3A=`)
      .set('x-app-key', 'ce0eec0d-a9a2-43d3-9f84-91f10dfd9abb')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'username=OHIPSB_FINWAY&password=9XlrTFXuN83_ZD1C34AP54_p&grant_type=password';
    this.httpClient.post(this.apiUrl, body, { headers: headers }).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('token', res.access_token);
      }, error: (err: any) => {
        console.log(err);
      }
    });
  }

  tick() {
    if (this.router.url !== '/payment-step' && this.router.url !== '/insert-pin') {
      //console.log(this.appSettingService.counter);

      this.appSettingService.counter = this.appSettingService.counter - 1;
      if (this.appSettingService.counter == 0) {
        this.modalService.closeModal()
        this.isLastMinutes = false;
        this.router.navigateByUrl('/insert-booking-id');
        this.appSettingService.counter = 60;
        this.tick();
        if (this.router.url == '/insert-booking-id') {
          //console.log('been a min');
          this.appSettingService.isBeenAMinute = true
        }
      }else {
        setTimeout(() => {
          this.tick();
        }, 1000);
      }
      if (this.appSettingService.counter == 10 && this.router.url !== '/insert-booking-id') {
        this.isLastMinutes = true;
        this.modalService.openModal('count-down-termination', undefined, undefined, true)
      }
    }else {
      setTimeout(() => {
        this.tick();
      }, 1000);
    }
  }

  onIntercatWithScreen(){
    this.appSettingService.counter = 60;
  }
}
