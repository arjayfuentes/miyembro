import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
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
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { SessionService } from '../../../services/session.service';
import { DatePickerModule } from 'primeng/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxMaterialIntlTelInputComponent } from 'ngx-material-intl-tel-input';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CountryService } from '../../../services/country.service';
import { Country } from 'src/app/core/models/country';
import { SelectModule } from 'primeng/select';
import { State } from 'src/app/core/models/state';
import { City } from 'src/app/core/models/city';
import { LoginType } from 'src/app/core/models/login-type.enum';
import { DatePipe } from '@angular/common';
import { Member } from 'src/app/core/models/member';
import { MemberFormType } from 'src/app/core/models/member-form-type.enum';
import { AvatarComponent } from 'src/app/shared/components/avatar/avatar.component';

@Component({
  selector: 'app-member-form',
  imports: [BackgroundComponent, InputNumberModule, SelectModule, ToastModule, DatePickerModule, FloatLabelModule, FileUploadModule, NgxMaterialIntlTelInputComponent, FormErrorsFilterPipe, FormErrorsPipe, TooltipModule, ReactiveFormsModule, FormsModule, DividerModule, ReactiveFormsModule, CommonModule, PasswordModule, ButtonModule, CardModule, IftaLabelModule, InputTextModule, AlertComponent, AvatarComponent],
  templateUrl: './member-form.component.html',
  styleUrl: './member-form.component.scss',
  providers: [DatePipe]
})
export class MemberFormComponent implements OnInit, OnChanges{

  MemberFormType = MemberFormType;
  @Input() formType: MemberFormType = MemberFormType.ADDITIONAL_INFO_MEMBER;
  @Input() member: Member | undefined;


  @Input() memberForm: FormGroup = new FormGroup({}); // Input for the parent to provide the form
  @Output() memberFormChange = new EventEmitter<FormGroup>(); // Emit form changes

  selectedProfileImageFile: File | null = null; 
  selectedProfileImageFiles: File [] = [];
  loginErrorMessage: string | null = null;
  selectedCountry: string | undefined;
  selectedState: string | null = null;
  selectedCity: string | null = null;

  countries: Country [] = [];
  states: State [] = [];
  cities: City [] = [];

  
  get f(): { [key: string]: AbstractControl } {
    return this.memberForm.controls;
  }

  get fgErrors(): { [key: string]: ValidationErrors } | null {
      return this.memberForm.errors;
  }

  constructor(
    private countrySevice: CountryService,
  ) {
  }

  getControlErrors(groupName: string, controlName: string): ValidationErrors | null {
    const group = this.memberForm.get(groupName) as FormGroup;
    const control = group ? group.get(controlName) : null;
    return control ? control.errors : null;

  }

  isControlInvalidAndTouched(groupName: string, controlName: string): boolean {
    const group = this.memberForm.get(groupName) as FormGroup;
    const control = group ? group.get(controlName) : null;
    return control ? control.invalid && control.touched : false;
  }

  ngOnInit(): void {
    this.getCountries();
    this.memberForm.get('memberAddress.country')?.valueChanges.subscribe(selectedCountry => {
      if(selectedCountry) {
        this.selectedCountry = selectedCountry;
        this.getStates();
      } 
      this.states = [];
      this.cities = [];
      this.memberForm.get('memberAddress.provinceState')?.setValue(null);
      this.selectedState = null;
      this.memberForm.get('memberAddress.city')?.setValue(null);
      this.selectedCity = null;
    });
    this.memberForm.get('memberAddress.provinceState')?.valueChanges.subscribe(selectedState => {
      if(selectedState) {
        this.selectedState = selectedState;
        this.getCities();
      } 
      this.cities = [];
      this.memberForm.get('memberAddress.city')?.setValue(null);
      this.selectedCity = null;
    });
    this.memberForm.valueChanges.subscribe(() => {
      this.emitForm();
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['member'] && this.member) {
      this.patchForm();
    }
  }

  emitForm(): void {
    this.memberFormChange.emit(this.memberForm);
  }

  patchCountry() {
    this.memberForm.get('member.memberAddress.country')?.setValue(this.member?.memberAddress.country);
  }

  patchState() {
    this.memberForm.get('member.memberAddress.provinceState')?.setValue(this.member?.memberAddress.provinceState);
  }

  patchCity() {
    this.memberForm.get('member.memberAddress.city')?.setValue(this.member?.memberAddress.city);
  }
  
  patchForm() {
    if (this.member) {
      this.memberForm.patchValue({
        memberId: this.member.memberId,
        firstName: this.member.firstName,
        lastName: this.member.lastName,
        email: this.member.email,
        phoneNumber: this.member.phoneNumber,
        profilePicUrl: this.member.profilePicUrl,
        birthDate: this.member.birthDate ? new Date(this.member.birthDate) : null,
        loginType: this.member.loginType,
        memberAddress: {
          street: this.member.memberAddress?.street,
          city: this.member.memberAddress?.city,
          provinceState: this.member.memberAddress?.provinceState,
          postalCode: this.member.memberAddress?.postalCode,
          country: this.member.memberAddress?.country
        }
      });
      this.selectedCountry = this.member.memberAddress?.country;
      this.selectedState = this.member.memberAddress?.provinceState;
      this.selectedCity = this.member.memberAddress?.city;
    }
  }


  getCountries() {
    this.countrySevice.getCountries().subscribe(
      (res) => {
        this.countries = res;
        if(this.formType === MemberFormType.UPDATE_MEMBER) {
          this.patchCountry();
          this.getStates();
        }
        this.setFormToPristine();
      },
      (err: any) => {
        this.loginErrorMessage = err.error.message;
      }
    );
  }

  getStates() {
    const iso2CountryCode = this.countries.find((country) => country.name === this.selectedCountry);
    this.countrySevice.getStatesByCountry(iso2CountryCode?.iso2).subscribe(
      (res) => {
        this.states = res;
        if(this.formType === MemberFormType.UPDATE_MEMBER) {
          this.patchState();
          this.getCities();
        }
        this.setFormToPristine();
      },
      (err: any) => {
        this.loginErrorMessage = err.error.message;
      }
    );
  }

  getCities() {
    const country = this.countries.find((country) => country.name === this.selectedCountry);
    const state = this.states.find((state) => state.name === this.selectedState);
    this.countrySevice.getCitiesByStateAndCountry(country?.iso2, state?.iso2 ).subscribe(
      (res) => {
        
        if(res.length == 0) {
          this.getCitiesByCountry();
        } else {
          this.cities = res;
        }
        if(this.formType === MemberFormType.UPDATE_MEMBER) {
          this.patchCity();
        }
        this.setFormToPristine();
      },
      (err: any) => {
        this.loginErrorMessage = err.error.message;
      }
    );
  }

  getCitiesByCountry() {
    const country = this.countries.find((country) => country.name === this.selectedCountry);
    this.countrySevice.getCitiesByCountry(country?.iso2).subscribe(
      (res) => {
        this.cities = res;
        if(this.formType === MemberFormType.UPDATE_MEMBER) {
          this.patchCity();
        }
      },
      (err: any) => {
        this.loginErrorMessage = err.error.message;
      }
    );
  }


  setFormToPristine() {
    if(this.formType === MemberFormType.UPDATE_MEMBER) {
      this.memberForm.markAsPristine();
    }
  }

  onProfileImageFileSelect(event: any) {
    this.selectedProfileImageFile = event.files[0]; 
    console.log('Selected file:', this.selectedProfileImageFile);
    this.memberForm.controls['selectedProfilePicImage'].setValue(this.selectedProfileImageFile) ;
  }



}