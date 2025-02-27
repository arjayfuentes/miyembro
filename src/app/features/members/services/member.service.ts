import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@environments/environment';
import { Observable } from 'rxjs';
import { Member } from 'src/app/core/models/member';
import { MembershipResponse } from 'src/app/core/models/membership-response';
import { Page } from 'src/app/shared/model/page';
import { MembershipFilters } from '../models/membership-filters';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  
  baseUrl = '/member';

  constructor(
    private http: HttpClient,
  ) {
    
  }

  updateMemberAfterRegistration(memberId: string, formData: FormData): Observable<any> {
    return this.http.post(`${env.apiUrl}${this.baseUrl}/` + memberId + '/register', formData);
  }

  updateMemberDetails(memberId: string, formData: FormData): Observable<Member> {
    return this.http.put(`${env.apiUrl}${this.baseUrl}/` + memberId, formData) as Observable<Member>;
  }

}