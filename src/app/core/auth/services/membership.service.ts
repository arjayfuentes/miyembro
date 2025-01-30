import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationResponse } from '../../models/organization-reponse';
import { environment as env } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

constructor(
    private http: HttpClient,
  ) {
    
  }

   getOrganizationByMemberId(memberId: string | null): Observable<OrganizationResponse[]> {
       return this.http.get(`${env.apiUrl}/membership/getOrganizationByMemberId/${memberId}`, {}) as Observable<OrganizationResponse[]>;
     }
}
