import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/services/authentication.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SessionService } from '../auth/services/session.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService, 
    private sessionService: SessionService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const session = this.sessionService.getSession()
    const isLoggedIn = this.sessionService.isLoggedIn();
    console.log('Is user logged in? ', isLoggedIn);  // Debugging log to check login status

    if (isLoggedIn) {
      console.log('Redirecting to home because user is logged in.');  // Debugging log when redirecting
      this.router.navigate(['/home']);
      return false;  // Prevent access to login and register if already logged in
    }

    console.log('User is NOT logged in. Allowing access to login/register.');  // Debugging log when access is allowed
    return true;  // Allow access to login or register pages
  }
}
