import { Component, OnInit } from '@angular/core';
import { BackgroundComponent } from 'src/app/shared/components/background/background.component';
import { AuthenticationService } from '../../services/authentication.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
import { TooltipModule } from 'primeng/tooltip';
import { FormErrorsPipe } from 'src/app/shared/pipes/form-errors.pipe';
import { passwordValidator } from 'src/app/shared/directives/password-validator.directive';
import { FormErrorsFilterPipe } from 'src/app/shared/pipes/form-errors-filter.pipe';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AlertComponent } from "../../../../shared/components/alert/alert.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [BackgroundComponent, InputNumberModule, ToastModule, FormErrorsFilterPipe, FormErrorsPipe, TooltipModule, ReactiveFormsModule, FormsModule, DividerModule, ReactiveFormsModule, CommonModule, PasswordModule, ButtonModule, CardModule, IftaLabelModule, InputTextModule, AlertComponent],
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
    private sessionService: SessionService,
    private alertService: AlertService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      memberAddress: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        provinceState: ['', Validators.required],
        region: ['', Validators.required],
        country: ['', Validators.required]
      })
    }, {
      validators: [
        passwordValidator('password', 'confirmPassword')
      ],
    });
  }

  getControlErrors(groupName: string, controlName: string): ValidationErrors | null {
    const group = this.registerForm.get(groupName) as FormGroup;
    const control = group ? group.get(controlName) : null;
    return control ? control.errors : null;

  }

  isControlInvalidAndTouched(groupName: string, controlName: string): boolean {
    const group = this.registerForm.get(groupName) as FormGroup;
    const control = group ? group.get(controlName) : null;
    return control ? control.invalid && control.touched : false;
  }


  // convenience getter for form controls
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  get fgErrors(): { [key: string]: ValidationErrors } | null {
      return this.registerForm.errors;
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
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      memberAddress: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        provinceState: ['', Validators.required],
        region: ['', Validators.required],
        country: ['', Validators.required]
      })
    },
    {
      validators: [
        passwordValidator('password', 'confirmPassword')
      ],
    });
    this.registerForm.reset();
  }



  onClickRegister() {    
    const loginFormVal = { ...this.registerForm.value };
    delete loginFormVal.confirmPassword;
    const memberRequest: MemberRequest = this.registerForm.value;
    this.authenticationService.register(memberRequest).subscribe(
      (res) => {
        console.log(res);
        this.alertService.success('/login', '', 'Succefully Registered');
        this.router.navigate(['/login']);
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
