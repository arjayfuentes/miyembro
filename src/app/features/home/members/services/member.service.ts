import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@environments/environment';
import { Observable } from 'rxjs';
import { Member } from 'src/app/core/models/member';

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
}
