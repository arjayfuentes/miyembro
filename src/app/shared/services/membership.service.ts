import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationResponse } from '../../core/models/organization-reponse';
import { environment as env } from '@environments/environment';
import { MembershipResponse } from '../../core/models/membership-response';
import { JoinOrganizationRequest } from '../../core/models/join-membership-request';
import { GetMembershipRequest } from '../../core/models/get-membership-request';
import { MembershipRequest } from 'src/app/core/models/membership-request';

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


  requestMembership(joinOrganizationRequest: JoinOrganizationRequest | undefined): Observable<MembershipResponse> {
      return this.http.post(`${env.apiUrl}${this.baseUrl}/requestMembership`, joinOrganizationRequest) as Observable<MembershipResponse>;
  }

  getMembershipByMemberIdAndOrganizationId(getMembershipRequest: GetMembershipRequest | undefined): Observable<MembershipResponse> {
    return this.http.post(`${env.apiUrl}${this.baseUrl}/getMembershipByMemberIdAndOrganizationId`, getMembershipRequest) as Observable<MembershipResponse>;
  }

  updateMembershipType(membership: MembershipRequest | undefined ) {
    return this.http.put(`${env.apiUrl}${this.baseUrl}/updateMembershipType/` + membership?.membershipId, membership) as Observable<MembershipResponse>;
  }

  updateMembership(membership: MembershipRequest | undefined ) {
    return this.http.put(`${env.apiUrl}${this.baseUrl}/updateMembership/` + membership?.membershipId, membership) as Observable<MembershipResponse>;
  }



}
