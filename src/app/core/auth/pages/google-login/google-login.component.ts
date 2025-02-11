import { Component, OnInit } from '@angular/core';
import { BackgroundComponent } from "../../../../shared/components/background/background.component";
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OAuthService, OAuthSuccessEvent, OAuthErrorEvent } from 'angular-oauth2-oidc';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { SessionService } from '../../services/session.service';
import { GoogleRequest } from 'src/app/core/models/google-request';

@Component({
  selector: 'app-google-login',
  imports: [BackgroundComponent, ProgressSpinnerModule],
  templateUrl: './google-login.component.html',
  styleUrl: './google-login.component.scss'
})
export class GoogleLoginComponent implements OnInit {

    loginErrorMessage: string | null = null;

    constructor(
      private authenticationService: AuthenticationService,
      private router: Router,
      private sessionService: SessionService,
      private alertService: AlertService,
      private oauthService: OAuthService
    ) {
    }



 ngOnInit() {
    this.oauthService.loadDiscoveryDocument().then(() => {
      this.oauthService.tryLogin().then(() => {
        const accessToken = this.oauthService.getAccessToken();
        const idToken = this.oauthService.getIdToken();
        console.log('Access Token:', accessToken);
        console.log('ID Token:', idToken);

        this.onTokenCaptured(accessToken, idToken);
      }).catch((error) => {
        console.error('OAuth Error:', error);
        alert('error');
        this.router.navigate(['/login']);
      });
    });
  }

  onTokenCaptured(accessToken: string, idToken: string) {
    console.log('Captured Tokens:', { accessToken, idToken });
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('id_token', idToken);
    if (idToken) {
      this.onClickLoginGoogleContinue(idToken);  // Send the ID token to the backend for processing
    }
  }
    
  onClickLoginGoogleContinue(googleToken: string) {
    console.log('Sending Google token to backend...');
    const googleLoginRequest: GoogleRequest = {
      googleToken: googleToken
    };

    this.authenticationService.loginWithGoogle(googleLoginRequest).subscribe(
      (res) => {
        this.sessionService.setSession(res);  
        this.successFulLogin();
      },
      (err: any) => {
        this.loginErrorMessage = err.error.message;
        this.alertService.error('/login', 'Error', err.error.message);
      }
    );
  }


  successFulLogin() {
    console.log(this.sessionService.getSession());
    const numberOfJoinedOrganizations: number | undefined = this.sessionService.getSession()?.organizationIdsOfMember?.length;
    if (numberOfJoinedOrganizations && numberOfJoinedOrganizations > 1) {
      this.router.navigate(['/choose-organization']);
    } else {
      const session = this.sessionService.getSession();
      if (session) {
        localStorage.setItem('authToken', session.accessToken);
      }
      this.alertService.success('/login', 'Success', 'Successfully logged in');
      this.router.navigate(['/home/explore']);  // Redirect after successful backend login
    }
  }

}
