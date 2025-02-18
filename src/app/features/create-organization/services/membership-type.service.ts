import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MembershipTypeValidity } from '../models/membership-type-validity';
import { environment as env } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembershipTypeService {

   baseUrl = '/membership-type';
  
  
  constructor(
      private http: HttpClient,
    ) {

  }

  findAllMembershipTypeValidity(): Observable<MembershipTypeValidity[]> {
    return this.http.get(`${env.apiUrl}${this.baseUrl}/findAllMembershipTypeValidity`) as Observable<MembershipTypeValidity[]>;
  }

      
}
