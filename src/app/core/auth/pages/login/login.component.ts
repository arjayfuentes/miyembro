import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GoogleLoginRequest } from 'src/app/core/models/google-login-request';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  SocialAuthService,
  GoogleLoginProvider,
} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, DatePickerModule, IftaLabelModule, InputTextModule, ButtonModule, PasswordModule],
  providers: [
    SocialAuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('654581949282-dmvkqbivaa8rmvem7ipjbas30p5akkrm.apps.googleusercontent.com', {
              scopes: 'openid profile email',
            }),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    }
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginErrorMessage: string | null = null;
  private unsubscribe: Subject<any> = new Subject();
  @ViewChild('googleSignInButton') googleSignInButton!: ElementRef;


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private sessionService: SessionService,
    private alertService: AlertService,
    private socialAuthService: SocialAuthService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.pipe(takeUntil(this.unsubscribe)).subscribe((val) => {
      if (val && this.loginErrorMessage) {
        this.loginErrorMessage = null;
      }
    });
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        this.onClickLoginGoogleContinue(user.idToken);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(0);
    this.unsubscribe.complete();
  }

  onClickTraditionalLogin() {
    const loginFormVal = this.loginForm.value;
    this.loginErrorMessage = null;
    this.authenticationService.login(loginFormVal).subscribe(
      (res) => {
        this.sessionService.setSession(res);
        this.successFulLogin();
      },
      (err: any) => {
        this.loginErrorMessage = err.error.messsage;
        this.alertService.error('/login', 'Error', err.error.message);
      }
    );
  }

  onClickLoginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  onClickLoginGoogleContinue(googleToken: string) {
    console.log('Sending Google token to backend...');
    const googleLoginRequest: GoogleLoginRequest = {
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

  onClickRegister() {
    this.router.navigate(['/register']);
  }
}
