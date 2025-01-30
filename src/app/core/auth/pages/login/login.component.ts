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
import { MembershipService } from '../../services/membership.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, PasswordModule, ButtonModule, CardModule, IftaLabelModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginErrorMessage: string | null = null;
  private redirectURL: string | null = null ;


  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.queryParams;
    const fieldRedirect = 'redirectTo';
    // if (params[fieldRedirect]) {
    //   this.redirectURL = params[fieldRedirect];
    // }
  } 

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onClickLogin() {
    const loginFormVal = this.loginForm.value;
    this.loginErrorMessage = null;
    this.authenticationService.login(loginFormVal).subscribe(
      (res) => {
        this.sessionService.setMemberId(res.data?.member.memberId);

        this.sessionService.setSession(res.data);
        localStorage.setItem('memberId', res.data?.member.memberId);

        localStorage.setItem('token', res.data.accessToken);

        if (this.redirectURL) {
          this.router.navigateByUrl(this.redirectURL);
        } else {
          this.router.navigate(['/auth/choose-organization']);
        }
      },
      (err: any) => {
        console.log(err);
        this.loginErrorMessage = err.error.message;
      }
    );
  }

}
