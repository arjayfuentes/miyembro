import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationResponse } from '../models/organization-reponse';
import { environment as env } from '@environments/environment';
import { MembershipResponse } from '../models/membership-response';
import { JoinOrganizationRequest } from '../models/join-membership-request';
import { GetMembershipRequest } from '../models/get-membership-request';
import { MembershipRequest } from 'src/app/core/models/membership-request';
import { MembershipFilters } from 'src/app/core/models/membership-filters';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  baseUrl = '/memberships';

  constructor(
    private http: HttpClient,
  ) {
    
  }

  approveMembershipRequest(membership: MembershipRequest | undefined ) {
    return this.http.put(`${env.apiUrl}${this.baseUrl}` + membership?.membershipId + '/approve', membership) as Observable<MembershipResponse>;
  }

  denyMembershipRequest(membership: MembershipRequest | undefined ) {
    return this.http.put(`${env.apiUrl}${this.baseUrl}` + membership?.membershipId + '/deny', membership) as Observable<MembershipResponse>;
  }

  getMembershipByMemberIdAndOrganizationId(organizationId: string | undefined, memberId: string | undefined): Observable<MembershipResponse> {
    return this.http.get(`${env.apiUrl}${this.baseUrl}/organizations/` + organizationId + '/members/' + memberId) as Observable<MembershipResponse>;
  }

  getMembershipsByOrganization(organizationId: string | undefined, pageNo: number, pageSize: number, sortField: string, sortOrder: string, membershipFilters: MembershipFilters | undefined ): Observable<Page<MembershipResponse>> {
    const url = `${env.apiUrl}${this.baseUrl}/organizations/${organizationId}/members`;

    const params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('sortField', sortField.toString())
      .set('sortOrder', sortOrder.toString());
      return this.http.post<any>(url, membershipFilters, { params }) as Observable<Page<MembershipResponse>>;
  }

  getPendingMembershipsByOrganization(organizationId: string | undefined, pageNo: number, pageSize: number, sortField: string, sortOrder: string , membershipFilters: MembershipFilters | undefined ): Observable<Page<MembershipResponse>> {
    const url = `${env.apiUrl}${this.baseUrl}/organizations/${organizationId}/members/pending`;

    const params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('sortField', sortField.toString())
      .set('sortOrder', sortOrder.toString());
      return this.http.post<any>(url, membershipFilters, { params }) as Observable<Page<MembershipResponse>>;
  }

  requestMembership(joinOrganizationRequest: JoinOrganizationRequest | undefined): Observable<MembershipResponse> {
      return this.http.post(`${env.apiUrl}${this.baseUrl}/request`, joinOrganizationRequest) as Observable<MembershipResponse>;
  }

  updateMembership(membership: MembershipRequest | undefined ) {
    return this.http.put(`${env.apiUrl}${this.baseUrl}/` + membership?.membershipId, membership) as Observable<MembershipResponse>;
  }

}
