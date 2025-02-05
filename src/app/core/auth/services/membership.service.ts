import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationResponse } from '../../models/organization-reponse';
import { environment as env } from '@environments/environment';
import { Membership } from '../../models/membership';
import { JoinOrganizationRequest } from '../../models/join-membership-request';
import { GetMembershipRequest } from '../../models/get-membership-request';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  baseUrl = '/membership';


constructor(
    private http: HttpClient,
  ) {
    
  }

    getOrganizationByMemberId(memberId: string | undefined): Observable<OrganizationResponse[]> {
      return this.http.get(`${env.apiUrl}/membership/getOrganizationByMemberId/${memberId}`, {}) as Observable<OrganizationResponse[]>;
    }


    requestMembership(joinOrganizationRequest: JoinOrganizationRequest | undefined): Observable<Membership> {
        return this.http.post(`${env.apiUrl}${this.baseUrl}/requestMembership`, joinOrganizationRequest) as Observable<Membership>;
    }

    getMembershipByMemberIdAndOrganizationId(getMembershipRequest: GetMembershipRequest | undefined): Observable<Membership> {
      return this.http.post(`${env.apiUrl}${this.baseUrl}/getMembershipByMemberIdAndOrganizationId`, getMembershipRequest) as Observable<Membership>;
  }


}
