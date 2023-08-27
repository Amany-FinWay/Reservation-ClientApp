import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingSpinnerService } from 'src/services/loader-spinner.service';

@Component({
  selector: 'app-insert-pin',
  templateUrl: './insert-pin.component.html',
  styleUrls: ['./insert-pin.component.scss']
})
export class InsertPinComponent {
  constructor(
    private loader: LoadingSpinnerService,
    private router: Router
  ) {

  }
  onPayBill() {
    this.loader.start();
    setTimeout(() => {
      this.loader.stop();
      this.router.navigate(['payment-success']);
    }, 5000);
  }
}
