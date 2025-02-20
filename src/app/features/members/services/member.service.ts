import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@environments/environment';
import { Observable } from 'rxjs';
import { Member } from 'src/app/core/models/member';
import { MembershipResponse } from 'src/app/core/models/membership-response';
import { Page } from 'src/app/shared/model/page';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  
  baseUrl = '/member';

  constructor(
    private http: HttpClient,
  ) {
    
  }

  getMembersByOrganization(organizationId: string | undefined): Observable<Member[]> {
    return this.http.get(`${env.apiUrl}${this.baseUrl}/organization/` + organizationId) as Observable<Member[]>;
  }

  getMembersByOrganizationPage(organizationId: string | undefined, pageNo: number, pageSize: number, sortField: string, sortOrder: string): Observable<Page<Member>> {
    const url = `${env.apiUrl}${this.baseUrl}/organizationPage/${organizationId}`;

    const params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('sortField', sortField.toString())
      .set('sortOrder', sortOrder.toString());
      return this.http.get<any>(url, { params }) as Observable<Page<Member>>;
  }


  getMembershipsByOrganization(organizationId: string | undefined, pageNo: number, pageSize: number, sortField: string, sortOrder: string): Observable<Page<MembershipResponse>> {
    const url = `${env.apiUrl}${this.baseUrl}/organization/${organizationId}/memberships`;

    const params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('sortField', sortField.toString())
      .set('sortOrder', sortOrder.toString());
      return this.http.get<any>(url, { params }) as Observable<Page<MembershipResponse>>;
  }

  getPendingMembershipsByOrganization(organizationId: string | undefined, pageNo: number, pageSize: number, sortField: string, sortOrder: string): Observable<Page<MembershipResponse>> {
    const url = `${env.apiUrl}${this.baseUrl}/organization/${organizationId}/memberships/pending`;

    const params = new HttpParams()
      .set('pageNo', pageNo.toString())
      .set('pageSize', pageSize.toString())
      .set('sortField', sortField.toString())
      .set('sortOrder', sortOrder.toString());
      return this.http.get<any>(url, { params }) as Observable<Page<MembershipResponse>>;
  }

  updateMemberDetails(formData: FormData): Observable<Member> {
    return this.http.post(`${env.apiUrl}${this.baseUrl}/updateMemberDetails`, formData) as Observable<Member>;
  }

}