import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSettingService {
  //cosrProxyServer= 'http://localhost:9090/';
  baseOperaApiUrl = 'https://ocr2-demo-oc.hospitality-api.us-ashburn-1.ocs.oc-test.com/';

  usedApiUrl = 'http://localhost:9090/https://ocr2-demo-oc.hospitality-api.us-ashburn-1.ocs.oc-test.com/'
}
