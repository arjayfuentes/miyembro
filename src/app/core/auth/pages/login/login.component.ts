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
import { Subject, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/shared/services/alert.service';

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
  private unsubscribe: Subject<any> = new Subject();


  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.queryParams;
    const fieldRedirect = 'redirectTo';
    // if (params[fieldRedirect]) {
    //   this.redirectURL = params[fieldRedirect];
    // }

    this.loginForm
      .valueChanges.pipe(takeUntil(this.unsubscribe))
      .subscribe((val) => {
        if (val && this.loginErrorMessage) {
          this.loginErrorMessage = null;
        }
      });
  } 

  ngOnDestroy(): void {
    this.unsubscribe.next(0);
    this.unsubscribe.complete();
  }

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

  onClickLogin() {
    const loginFormVal = this.loginForm.value;
    this.loginErrorMessage = null;
    this.authenticationService.login(loginFormVal).subscribe(
      (res) => {
        this.sessionService.setSession(res);

        const numberOfJoinedOrganizations: number | undefined = this.sessionService.getSession()?.organizationIdsOfMember?.length
        if(numberOfJoinedOrganizations && numberOfJoinedOrganizations > 1) {
          this.router.navigate(['/choose-organization']);
        } else {
          const session = this.sessionService.getSession();
          if(session) {
            localStorage.setItem('authToken', session.accessToken);
          }
          this.alertService.success('/login', 'Success', 'Succefully Login');
          this.router.navigate(['/home']);
        }
       
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

}
