import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { BackgroundComponent } from 'src/app/shared/components/background/background.component';
import { FormErrorsFilterPipe } from 'src/app/shared/pipes/form-errors-filter.pipe';
import { FormErrorsPipe } from 'src/app/shared/pipes/form-errors.pipe';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { SessionService } from '../../services/session.service';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxMaterialIntlTelInputComponent } from 'ngx-material-intl-tel-input';
import { FloatLabelModule } from 'primeng/floatlabel';


@Component({
  selector: 'app-member-form',
  imports: [BackgroundComponent, InputNumberModule, ToastModule, DatePickerModule, FloatLabelModule, FileUploadModule, NgxMaterialIntlTelInputComponent, FormErrorsFilterPipe, FormErrorsPipe, TooltipModule, ReactiveFormsModule, FormsModule, DividerModule, ReactiveFormsModule, CommonModule, PasswordModule, ButtonModule, CardModule, IftaLabelModule, InputTextModule, AlertComponent],
  templateUrl: './member-form.component.html',
  styleUrl: './member-form.component.scss'
})
export class MemberFormComponent {

  additionalInfoRegisterForm: FormGroup;
  selectedProfileImageFile: File | null = null; 
  selectedProfileImageFiles: File [] = [];
  
  get f(): { [key: string]: AbstractControl } {
    return this.additionalInfoRegisterForm.controls;
  }

  get fgErrors(): { [key: string]: ValidationErrors } | null {
      return this.additionalInfoRegisterForm.errors;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private sessionService: SessionService,
    private alertService: AlertService
  ) {
    this.additionalInfoRegisterForm = this.formBuilder.group({
      firstName: [null],
      lastName: [null],
      email: [null],
      password: [null],
      phoneNumber: ['', Validators.required],
      birthDate: ['', Validators.required],
      profilePicUrl: ['', Validators.required],
      memberAddress: this.formBuilder.group({
        street: [''],
        city: ['', Validators.required],
        provinceState: [''],
        region: [''],
        country: ['', Validators.required]
      })
    });
  }


  getControlErrors(groupName: string, controlName: string): ValidationErrors | null {
    const group = this.additionalInfoRegisterForm.get(groupName) as FormGroup;
    const control = group ? group.get(controlName) : null;
    return control ? control.errors : null;

  }

  isControlInvalidAndTouched(groupName: string, controlName: string): boolean {
    const group = this.additionalInfoRegisterForm.get(groupName) as FormGroup;
    const control = group ? group.get(controlName) : null;
    return control ? control.invalid && control.touched : false;
  }

  onClickRegisterAdditionalInfo() {
    console.log("dadsa");
  }

  onProfileImageFileSelect(event: any) {
    this.selectedProfileImageFile = event.files[0]; 
    console.log('Selected file:', this.selectedProfileImageFile);
    this.additionalInfoRegisterForm.controls['profilePicUrl'].setValue(this.selectedProfileImageFile) ;
  }

  onSkipAdditionalInfo() {
    this.router.navigate(['/login']);
  }

}
