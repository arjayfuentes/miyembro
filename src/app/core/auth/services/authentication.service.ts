import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../../models/session';
import { Observable } from 'rxjs';
import { environment as env } from '@environments/environment';
import { LoginRequest } from '../../models/login-request';
import { LoginResponse } from '../../models/login-response';
import { SelectOrganizationLoginRequest } from '../../models/select-login-organization-request';
import { MemberRequest } from '../../models/member-request';
import { Member } from '../../models/member';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = '/auth';

  constructor(
    private http: HttpClient,
  ) {
    
  }

  getLoginSession(): Observable<Session> {
    return this.http.post(`${env.apiUrl}/auth/login`, {}) as Observable<Session>;
  }

  login(loginRequest: LoginRequest): Observable<Session> {
    return this.http.post(`${env.apiUrl}/auth/login`, loginRequest) as Observable<Session>;
  }

  logout(): Observable<Session> {
    return this.http.post(`${env.apiUrl}/auth/logout`, {}) as Observable<Session>;
  }

  register(memberRequest: MemberRequest): Observable<Member> {
    return this.http.post(`${env.apiUrl}/auth/register`, memberRequest) as Observable<Member>;
  }


  selectLoginOrganization(selectOrganizationLoginRequest: SelectOrganizationLoginRequest): Observable<Session> {
    return this.http.post(`${env.apiUrl}/auth/selectLoginOrganization`, selectOrganizationLoginRequest) as Observable<Session>;
  }
}
