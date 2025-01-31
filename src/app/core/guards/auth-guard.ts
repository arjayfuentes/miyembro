import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/services/authentication.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SessionService } from '../auth/services/session.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService, 
    private sessionService: SessionService,
    private router: Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.sessionService.isLoggedIn()) {
      return true;
    } else {
      return this.authenticationService.getLoginSession().pipe(
        map((session) => {
          this.sessionService.setSession(session.data);
          return true;
        }),
        catchError(() => {
          this.router.navigate(['/login'], { queryParams: { redirectTo: state.url } });
          return of(false);
        })
      );
    }
  }
}
