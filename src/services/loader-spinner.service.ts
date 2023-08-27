import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingSpinnerService {
  counter = 0;
  loadingVisible = false;
  message?: string;

  constructor() { }

  start(message: string | undefined = undefined){
    this.message = message;
    this.counter++;
    if (this.counter > 0) {
      this.loadingVisible = true;
    }
  }

  stop(){
    this.message = undefined;
    this.counter--;
    if (this.counter < 0) {
      this.counter = 0;
    }
    if (this.counter == 0) {
      this.loadingVisible = false;
    }
  }
}
