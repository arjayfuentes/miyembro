import { Component, OnInit } from '@angular/core';
import { BackgroundComponent } from 'src/app/shared/components/background/background.component';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { MemberRequest } from 'src/app/core/models/member-request';

@Component({
  selector: 'app-register',
  imports: [BackgroundComponent, InputNumberModule, ReactiveFormsModule, FormsModule, DividerModule, ReactiveFormsModule, CommonModule, PasswordModule, ButtonModule, CardModule, IftaLabelModule, InputTextModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  registerForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
    });
  }


  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      memberAddress: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        provinceState: ['', Validators.required],
        region: ['', Validators.required],
        country: ['', Validators.required]
      })
    });
  }



  onClickRegister() {
    const loginFormVal = this.registerForm.value;
    const memberRequest: MemberRequest = this.registerForm.value;
    this.authenticationService.register(memberRequest).subscribe(
      (res) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err);
        // this.loginErrorMessage = err.error.message;
      }
    );
    
  }

  onClickLogin() {
    this.router.navigate(['/login']);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.onClickLogin();
    }
  }

}
