import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingSpinnerService } from 'src/services/loader-spinner.service';
@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.scss']
})
export class LoaderSpinnerComponent {
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    public loader: LoadingSpinnerService,
    ) {
    const routerSubscription = router.events.subscribe((event) => {
      this.navigationInterceptor(event as RouterEvent);
    });
    this.subscriptions.push(routerSubscription);
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
        this.loader.start();
    }
    if (event instanceof NavigationEnd) {
        this.loader.stop();
    }
    if (event instanceof NavigationCancel) {
        this.loader.stop();
    }
    if (event instanceof NavigationError) {
        this.loader.stop();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
