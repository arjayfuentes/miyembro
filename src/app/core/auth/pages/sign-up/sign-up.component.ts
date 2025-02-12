import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { GoogleAuthService } from '../../services/google-auth.service';
import { SessionService } from '../../services/session.service';
import { TooltipModule } from 'primeng/tooltip';
import { passwordValidator } from 'src/app/shared/directives/password-validator.directive';
import { FormErrorsFilterPipe } from 'src/app/shared/pipes/form-errors-filter.pipe';
import { FormErrorsPipe } from 'src/app/shared/pipes/form-errors.pipe';
import { MemberRequest } from 'src/app/core/models/member-request';
import { GoogleRequest } from 'src/app/core/models/google-request';
import { LoginType } from 'src/app/core/models/login-type.enum';
import { Member } from 'src/app/core/models/member';
declare const google: any;

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, ReactiveFormsModule, FormErrorsFilterPipe, FormErrorsPipe, TooltipModule, CommonModule, PasswordModule, ButtonModule, CardModule, IftaLabelModule, InputTextModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  loginErrorMessage: string | null = null;
  private client: any;

  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  get fgErrors(): { [key: string]: ValidationErrors } | null {
      return this.signupForm.errors;
  }
    
  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private alertService: AlertService,
  ) {
    this.signupForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.client = google.accounts.oauth2.initCodeClient({
      client_id: '654581949282-dmvkqbivaa8rmvem7ipjbas30p5akkrm.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/user.addresses.read https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/user.phonenumbers.read', 
      ux_mode: 'popup',
      redirect_uri: 'https://localhost:4200/register/callback', 
      callback: (response: any) => {
        this.signupWithGoogle(response);
      }
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phontNumber: [null],
      profilePicUrl: [null],
      loginType: [LoginType.NORMAL],
      confirmPassword: ['', Validators.required],
      memberAddress: [null]
    }, {
      validators: [
        passwordValidator('password', 'confirmPassword')
      ],
    });
    this.signupForm.reset();
  }


  onClickLogin() {
    this.router.navigate(['/login']);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.onClickLogin();
    }
  }

  onClickSignup() {
    const loginFormVal = { ...this.signupForm.value };
    delete loginFormVal.confirmPassword;
    const memberRequest: MemberRequest = this.signupForm.value;
    this.authenticationService.register(memberRequest).subscribe(
      (res) => {
        console.log(res);
        this.successfulSignup(res);
      },
      (err: any) => {
        this.errorSignup(err);
      }
    );
  }

  onClickSignupWithGoogle() {
    if(this.client) {
      this.client.requestCode();
    } 
  }

  private signupWithGoogle(response: any) {
    console.log(response);
    const googleToken = response.code;
    
    const googleLoginRequest: GoogleRequest = {
      googleToken: googleToken
    };

    this.authenticationService.signupWithGoogle(googleLoginRequest).subscribe(
      (res) => {
        console.log(res);
        this.successfulSignup(res);
      },
      (err: any) => {
        this.errorSignup(err);
      }
    );
  }

  private errorSignup(error: any) {
    console.log(error);
    this.loginErrorMessage = error.error.message;
    this.alertService.error('/signup', 'Error', error.error.message);
  }

  private successfulSignup(member: Member) {
    this.alertService.success('/signup', '', 'Succefully Registered');
    this.router.navigate(['/additional-info-signup'], {
      state: { member: member }
    });
  }

}
