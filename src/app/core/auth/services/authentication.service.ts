import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from '../../models/session';
import { Observable } from 'rxjs';
import { environment as env } from '@environments/environment';
import { LoginRequest } from '../../models/login-request';
import { LoginResponse } from '../../models/login-response';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
  ) {
    
  }

  getLoginSession(): Observable<LoginResponse> {
    return this.http.post(`${env.apiUrl}/auth/login`, {}) as Observable<LoginResponse>;
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post(`${env.apiUrl}/auth/login`, loginRequest) as Observable<LoginResponse>;
  }

  logout(): Observable<Session> {
    return this.http.post(`${env.apiUrl}/user/logout`, {}) as Observable<Session>;
  }
}
