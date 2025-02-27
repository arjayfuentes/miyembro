import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment as env } from '@environments/environment';
import { Session } from 'src/app/core/models/session';
import { OrganizationResponse } from 'src/app/core/models/organization-reponse';
import { CreateOrganizationRequest } from 'src/app/core/models/create-organization-request';
import { Page } from 'src/app/shared/model/page';
import { ImageMetadata } from 'src/app/features/create-organization/models/image-meta-data';
import { OrganizationRequest } from 'src/app/core/models/organization-request';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

    private organizationSubject = new Subject<OrganizationResponse>();
    
    baseUrl = '/organization';

    constructor(
      private http: HttpClient,
    ) {
    }

    getOrganizationsByMemberId(memberId: string | undefined): Observable<OrganizationResponse[]> {
      return this.http.get(`${env.apiUrl}${this.baseUrl}/getOrganizationsByMemberId/members/${memberId}`) as Observable<OrganizationResponse[]>;
    }

    getOrganizationUpdate(): Observable<OrganizationResponse> {
      return this.organizationSubject.asObservable();
    }
 
    setOrganization(organizationResponse: OrganizationResponse): void {
      this.organizationSubject.next(organizationResponse);
    }

    completeCreateOrganization(formData: FormData): Observable<any> {
      return this.http.post(`${env.apiUrl}${this.baseUrl}/completeCreateOrganization`, formData);
    }

    findMyOrganizationById(organizationId: string | null | undefined ): Observable<OrganizationResponse> {
      return this.http.get(`${env.apiUrl}${this.baseUrl}/findMyOrganizationById/${organizationId}`) as Observable<OrganizationResponse>;
    }

    getAllOrganizations(page: number, size: number, name: string | null, countryName: string | null, cityName: string | null): Observable<Page<OrganizationResponse>> {
      const url = `${env.apiUrl}${this.baseUrl}/getAllOrganizations`;
  
      let params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
    
      if (name) {
        params = params.set('name', name);
      }
      if(countryName) {
        params = params.set('countryName', countryName);
      }
      if(cityName) {
        params = params.set('cityName', cityName);
      }
      return this.http.get<any>(url, { params }) as Observable<Page<OrganizationResponse>>;
    }
  
    getOrganizationCitiesByCountry(country : string): Observable<string[]> {
      const params = new HttpParams()
      .set('country', country.toString());
      return this.http.get(`${env.apiUrl}${this.baseUrl}/organizationCitiesByCountry`, { params }) as Observable<string []>;
    }

    getOrganizationImages(organizationId: string | undefined): Observable<ImageMetadata []> {
      return this.http.get(`${env.apiUrl}${this.baseUrl}/getOrganizationImages/${organizationId}`) as Observable<ImageMetadata []>;
    }
  
    getUniqueOrganizationCountries(): Observable<string[]> {
      return this.http.get(`${env.apiUrl}${this.baseUrl}/organizationCountries`) as Observable<string []>;
    }

    updateOrganization(organization: OrganizationResponse | undefined): Observable<OrganizationResponse> {
      return this.http.put(`${env.apiUrl}${this.baseUrl}/updateOrganization`, organization) as Observable<OrganizationResponse>;
    }

    updateOrganizationPhoto(organization: OrganizationResponse | null, formData: FormData): Observable<OrganizationResponse> {
      return this.http.post(`${env.apiUrl}${this.baseUrl}/updateOrganizationPhoto/${organization?.organizationId}`, formData) as Observable<OrganizationResponse>;
    }

    uploadImage(organizationId: string | undefined, file: File, imageType: string): Observable<string> {
      const formData = new FormData();
      formData.append('image', file, file.name);  
      formData.append('imageType', imageType);   

      return this.http.post<string>(`${env.apiUrl}${this.baseUrl}/uploadOrganizationImage/${organizationId}/upload-image`, formData);
    }

    viewAllOrganization(): Observable<OrganizationResponse []> {
      return this.http.get(`${env.apiUrl}${this.baseUrl}/viewAllOrganization`) as Observable<OrganizationResponse []>;
    }
   
}

