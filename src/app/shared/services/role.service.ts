import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '@environments/environment';
import { Role } from 'src/app/core/models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl = '/role';


constructor(
    private http: HttpClient,
  ) {
    
  }

  getMemberRoles(): Observable<Role[]> {
      return this.http.get(`${env.apiUrl}${this.baseUrl}/getMemberRoles`) as Observable<Role[]>;
  }
}
