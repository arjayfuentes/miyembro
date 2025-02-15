import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '@environments/environment';
import { Session } from 'src/app/core/models/session';
import { OrganizationResponse } from 'src/app/core/models/organization-reponse';
import { ImageMetadata } from '../../../create-organization/models/image-meta-data';
import { CreateOrganizationRequest } from 'src/app/core/models/create-organization-request';
import { Page } from 'src/app/shared/model/page';

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

  getAllOrganizations(page: number, size: number): Observable<Page<OrganizationResponse>> {
    const url = `${env.apiUrl}${this.baseUrl}/getAllOrganizations`;

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
      return this.http.get<any>(url, { params }) as Observable<Page<OrganizationResponse>>;
  }
  

  viewAllOrganization(): Observable<OrganizationResponse []> {
    return this.http.get(`${env.apiUrl}${this.baseUrl}/viewAllOrganization`) as Observable<OrganizationResponse []>;
  }


  uploadImage(organizationId: string | undefined, file: File, imageType: string): Observable<string> {
    const formData = new FormData();
    formData.append('image', file, file.name);  
    formData.append('imageType', imageType);   

    return this.http.post<string>(`${env.apiUrl}${this.baseUrl}/uploadOrganizationImage/${organizationId}/upload-image`, formData);
  }


  getOrganizationImages(organizationId: string | undefined): Observable<ImageMetadata []> {
    return this.http.get(`${env.apiUrl}${this.baseUrl}/getOrganizationImages/${organizationId}`) as Observable<ImageMetadata []>;
  }


  // completeCreateOrganization(createOrganizationRequest: CreateOrganizationRequest): Observable<OrganizationResponse> {
  //   return this.http.post(`${env.apiUrl}${this.baseUrl}/completeCreateOrganization`, createOrganizationRequest) as Observable<OrganizationResponse>;
  // }


  completeCreateOrganization(formData: FormData): Observable<any> {
    return this.http.post(`${env.apiUrl}${this.baseUrl}/completeCreateOrganization`, formData);
  }

   
}

