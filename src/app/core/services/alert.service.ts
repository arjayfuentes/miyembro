import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { AlertOptions } from '../models/alert-options';
import { ErrorResponse } from 'src/app/core/models/error-response';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertsSubject = new Subject<AlertOptions>();


  clear(key?: string): void {
    this.setAlert({ key, clear: true });
  }

  // error(error: ErrorResponse, opts?: { key?: string; includeGlobalAlerts?: boolean }): void {
  //   const alert = Object.assign(error, opts, { type: 'error' }) as AlertOptions;
  //   if(alert.detail) {
  //     alert.summary = "";
  //   }
  //   this.setAlert({ key: key, type: 'error', summary: summary, detail: detail });
  // }

  // info(detail: string, opts?: { key?: string; includeGlobalAlerts?: boolean }): void {
  //   const alert = Object.assign(detail, opts, { type: 'info' }) as AlertOptions;
  //   this.setAlert(alert);
  // }


  error(key: string, summary: string, detail: string) {
    this.setAlert({ key: key, type: 'error', summary: summary, detail: detail });
  }

  success(key: string, summary: string, detail: string) {
    this.setAlert({ key: key, type: 'success', summary: summary, detail: detail });
  }
 
  info(key: string, summary: string, detail: string) {
    this.setAlert({ key: key, type: 'info', summary: summary, detail: detail });
  }

  getAlerts(): Observable<AlertOptions> {
    return this.alertsSubject.asObservable();
  }

  private setAlert(alertOptions: AlertOptions): void {
    this.alertsSubject.next(alertOptions);
  }
}
