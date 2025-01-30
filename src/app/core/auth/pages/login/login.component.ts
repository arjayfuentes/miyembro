import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { ErrorResponse } from 'src/app/core/models/error-response';
import { DatePickerModule } from 'primeng/datepicker';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, DatePickerModule, IftaLabelModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginErrorMessage: string | null = null;
  private redirectURL: string | null = null ;


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private sessionService: SessionService,
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
        console.log(res);

        this.sessionService.setSession(res.data);
        if (this.redirectURL) {
          this.router.navigateByUrl(this.redirectURL);
        } else {
          this.router.navigate(['/']);
        }
      },
      (err: ErrorResponse) => {
        console.log(err);
        this.loginErrorMessage = err.messsage;
      }
    );
  }

}
