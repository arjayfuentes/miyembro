import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from '@environments/environment';
import { Observable } from "rxjs";
import { MembershipStatusResponse } from "src/app/features/members/models/membership-status-response";


@Injectable({
  providedIn: 'root'
})
export class MembershipStatusService {

  baseUrl = '/membership-status';


constructor(
    private http: HttpClient,
  ) {
    
  }

  getMemberMembershipStatuses(): Observable<MembershipStatusResponse[]> {
    return this.http.get(`${env.apiUrl}${this.baseUrl}/getMemberMembershipStatuses`, {}) as Observable<MembershipStatusResponse[]>;
  }

}
