import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettingService } from 'src/services/appSetting.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit{

  constructor(
    public appSettingService: AppSettingService,
    private router: Router
  ) {}

  onClickOnScreen(){
    this.appSettingService.isBeenAMinute = false;
    this.router.navigate(['/insert-booking-id']);
  }

  ngOnInit(): void {
    this.appSettingService.counter = 60;
  }
}
