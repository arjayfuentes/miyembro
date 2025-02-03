import { Injectable } from '@angular/core';
import { Session } from '../../models/session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private session: Session | null = null; 
  
  constructor() {
    console.log('SessionService instance created'); 
  }

  clearSession(): void {
    this.session = null;
  }

  getSession(): Session | null {
    return this.session;
  }

  isLoggedIn(): boolean {
    return this.session != null;
  }

  setSession(session: Session): void {
    this.session = session;
  }

  hasPermission(permissionName: string): boolean {
    return this.session?.permissions?.includes(permissionName) || false;
  }

  
}
