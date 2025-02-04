import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '@environments/environment';
import { Session } from 'src/app/core/models/session';
import { OrganizationResponse } from 'src/app/core/models/organization-reponse';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  baseUrl = '/organization';

   constructor(
      private http: HttpClient,
    ) {
    }


    findMyOrganizationById(organizationId: string | undefined): Observable<OrganizationResponse> {
      return this.http.get(`${env.apiUrl}${this.baseUrl}/findMyOrganizationById/${organizationId}`) as Observable<OrganizationResponse>;
    }

    viewAllOrganization(): Observable<OrganizationResponse []> {
      return this.http.get(`${env.apiUrl}${this.baseUrl}/viewAllOrganization`) as Observable<OrganizationResponse []>;
    }

   
}

