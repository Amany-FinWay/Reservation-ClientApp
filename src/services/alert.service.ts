import { Injectable } from '@angular/core';
import { AlertModel } from 'src/models/shared/AlertModel';
import { AlertType } from 'src/models/_enums/AlertTypeEnum';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts = new Map<AlertType, AlertModel>([
    [AlertType.Success, {title: "Success", html: "Your request has been processed successfully", icon: "success"}],
    [AlertType.Error, {title: "Failure", html: "An error has occured while processing your request", icon: "error"}]
  ]);

  fire(type: AlertType|null = null, title: string|null = null, html: string|null = null, icon : SweetAlertIcon|null = null) {
    Swal.fire(type != null ? this.alerts.get(type)?.title : title!,
              type != null ? this.alerts.get(type)?.html : html!,
              type != null ? this.alerts.get(type)?.icon : icon!);
  }

  confirm(html: string|null = null, title: string|null = null, confirmButtonText: string|null = null, cancelButtonText: string|null = null) {
    return Swal.fire({
      title: title??'',
      html: html??'',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText??'',
      cancelButtonText: cancelButtonText??''
    });
  }

  toast(timerProgressBar: boolean, timer: number, icon : SweetAlertIcon, message: string) {
    return Swal.fire({
      toast: false,
      position: 'center',
      showConfirmButton: false,
      icon: icon,
      timerProgressBar,
      timer: timer,
      padding: '3.25rem 0',
      title: message
    });
  }
}
