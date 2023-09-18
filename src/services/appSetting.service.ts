import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSettingService {
  counter: number = 60;
  isBeenAMinute: boolean = false;

}
