import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrganizationResponse } from '../../core/models/organization-reponse';
import { environment as env } from '@environments/environment';
import { MembershipResponse } from '../../core/models/membership-response';
import { JoinOrganizationRequest } from '../../core/models/join-membership-request';
import { GetMembershipRequest } from '../../core/models/get-membership-request';
import { MembershipRequest } from 'src/app/core/models/membership-request';
import { MembershipFilters } from 'src/app/features/members/models/membership-filters';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  baseUrl = '/membership';


constructor(
    private http: HttpClient,
  ) {
    
  }

  approveMembershipRequest(membership: MembershipRequest | undefined ) {
    return this.http.put(`${env.apiUrl}${this.baseUrl}/membership-request/` + membership?.membershipId + '/approve', membership) as Observable<MembershipResponse>;
  }

  denyMembershipRequest(membership: MembershipRequest | undefined ) {
    return this.http.put(`${env.apiUrl}${this.baseUrl}/membership-request/` + membership?.membershipId + '/deny', membership) as Observable<MembershipResponse>;
  }

  getMembershipByMemberIdAndOrganizationId(organizationId: string | undefined, memberId: string | undefined): Observable<MembershipResponse> {
    return this.http.get(`${env.apiUrl}${this.baseUrl}/organization/` + organizationId + '/member/' + memberId) as Observable<MembershipResponse>;
  }

  getMembershipsByOrganization(organizationId: string | undefined, pageNo: number, pageSize: number, sortField: string, sortOrder: string, membershipFilters: MembershipFilters | undefined ): Observable<Page<MembershipResponse>> {
    const url = `${env.apiUrl}${this.baseUrl}/organization/${organizationId}/memberships`;

    const params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('sortField', sortField.toString())
      .set('sortOrder', sortOrder.toString());
      return this.http.post<any>(url, membershipFilters, { params }) as Observable<Page<MembershipResponse>>;
  }

  getPendingMembershipsByOrganization(organizationId: string | undefined, pageNo: number, pageSize: number, sortField: string, sortOrder: string , membershipFilters: MembershipFilters | undefined ): Observable<Page<MembershipResponse>> {
    const url = `${env.apiUrl}${this.baseUrl}/organization/${organizationId}/memberships/pending`;

    const params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('sortField', sortField.toString())
      .set('sortOrder', sortOrder.toString());
      return this.http.post<any>(url, membershipFilters, { params }) as Observable<Page<MembershipResponse>>;
  }

  getOrganizationByMemberId(memberId: string | undefined): Observable<OrganizationResponse[]> {
    return this.http.get(`${env.apiUrl}${this.baseUrl}/getOrganizationByMemberId/${memberId}`) as Observable<OrganizationResponse[]>;
  }

  requestMembership(joinOrganizationRequest: JoinOrganizationRequest | undefined): Observable<MembershipResponse> {
      return this.http.post(`${env.apiUrl}${this.baseUrl}/membership-request/request`, joinOrganizationRequest) as Observable<MembershipResponse>;
  }

  updateMembership(membership: MembershipRequest | undefined ) {
    return this.http.put(`${env.apiUrl}${this.baseUrl}/update-membership/` + membership?.membershipId, membership) as Observable<MembershipResponse>;
  }

  updateMembershipType(membership: MembershipRequest | undefined ) {
    return this.http.put(`${env.apiUrl}${this.baseUrl}/update-membership/{membership-id}/membership-type/` + membership?.membershipId, membership) as Observable<MembershipResponse>;
  }





}
