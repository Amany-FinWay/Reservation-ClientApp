import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettingService } from 'src/services/appSetting.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Reservation-ClientApp';

  constructor(
    private http: HttpClient,
    private appSetting: AppSettingService
    ) { }

  ngOnInit(): void {
    // Use this to run local
    const url = `${this.appSetting.usedApiUrl}oauth/v1/tokens`;

    // Use this to run Electron
    // const url = `${this.appSetting.baseOperaApiUrl}oauth/v1/tokens`;
    const headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Authorization' , `Basic Zmlud2F5X0NsaWVudDo5WGxyVEZYdU44M19aRDFDMzRBUDU0X3A=`)
      .set('x-app-key', 'ce0eec0d-a9a2-43d3-9f84-91f10dfd9abb')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'username=OHIPSB_FINWAY&password=9XlrTFXuN83_ZD1C34AP54_p&grant_type=password';
    this.http.post(url, body, { headers: headers }).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('token', res.access_token);
      }, error: (err: any) => {
        console.log(err);
      }
    })
  }
}
