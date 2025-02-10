import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorResponse } from 'src/app/core/models/error-response';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';
import { GoogleLoginRequest } from 'src/app/core/models/google-login-request';

declare const google: any;

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, PasswordModule, ButtonModule, CardModule, IftaLabelModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginErrorMessage: string | null = null;
  private redirectURL: string | null = null;
  private unsubscribe: Subject<any> = new Subject();
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router,
    private sessionService: SessionService,
    private alertService: AlertService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.queryParams;
    const fieldRedirect = 'redirectTo';
    this.loginForm
      .valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe((val) => {
        if (val && this.loginErrorMessage) {
          this.loginErrorMessage = null;
        }
      });
      this.initializeGoogleSignIn();
  } 

  initializeGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: '654581949282-dmvkqbivaa8rmvem7ipjbas30p5akkrm.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
      scope: 'profile email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.address', // Add the address scope
      prompt: 'select_account' // To prompt for account selection every time
    });
    google.accounts.id.renderButton(
      document.getElementById('googleLoginButton'),
      { theme: 'outline', size: 'large', text: 'continue_with' }
    );
    
    google.accounts.id.prompt(); 
  }

  handleCredentialResponse(response: any) {
    const googleToken = response.credential;

    
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

  ngOnDestroy(): void {
    this.unsubscribe.next(0);
    this.unsubscribe.complete();
  }


  onClickLogin() {
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

  onClickRegister() {
    this.router.navigate(['/register']);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.onClickRegister();
    }
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
