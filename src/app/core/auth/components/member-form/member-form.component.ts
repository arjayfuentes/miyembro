import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
import { CountryService } from '../../services/country.service';
import { Country } from 'src/app/core/models/country';
import { SelectModule } from 'primeng/select';
import { State } from 'src/app/core/models/state';
import { City } from 'src/app/core/models/city';
import { LoginType } from 'src/app/core/models/login-type.enum';
import { DatePipe } from '@angular/common';
import { Member } from 'src/app/core/models/member';
import { MemberFormType } from 'src/app/core/models/member-form-type.enum';
import { AvatarComponent } from "../avatar/avatar.component";

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

  additionalInfoRegisterForm: FormGroup;
  selectedProfileImageFile: File | null = null; 
  selectedProfileImageFiles: File [] = [];
  loginErrorMessage: string | null = null;
  selectedCountry: string | null = null;
  selectedState: string | null = null;
  selectedCity: string | null = null;

  countries: Country [] = [];
  states: State [] = [];
  cities: City [] = [];

  
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
    private alertService: AlertService,
    private countrySevice: CountryService,
    private datePipe: DatePipe
  ) {
    this.additionalInfoRegisterForm = this.formBuilder.group({
      memberId: [null],
      firstName: [null],
      lastName: [null],
      email: [null],
      password: [null],
      phoneNumber: [null, Validators.required],
      profilePicUrl: [null],
      birthDate: [null, Validators.required],
      loginType: [null],
      selectedProfilePicImage: [null, Validators.required],
      memberAddress: this.formBuilder.group({
        street: [null],
        city: [null, Validators.required],
        provinceState: [null, Validators.required],
        postalCode: [null],
        country: [null, Validators.required]
      })
    });
  }

  ngOnInit(): void {
    this.getCountries();
    this.patchForm();
    this.additionalInfoRegisterForm.get('memberAddress.country')?.valueChanges.subscribe(selectedCountry => {
      if(selectedCountry) {
        this.selectedCountry = selectedCountry;
        this.getStates();
      } 
      this.states = [];
      this.cities = [];
      this.additionalInfoRegisterForm.get('memberAddress.provinceState')?.setValue(null);
      this.selectedState = null;
      this.additionalInfoRegisterForm.get('memberAddress.city')?.setValue(null);
      this.selectedCity = null;
    });
    this.additionalInfoRegisterForm.get('memberAddress.provinceState')?.valueChanges.subscribe(selectedState => {
      if(selectedState) {
        this.selectedState = selectedState;
        this.getCities();
      } 
      this.cities = [];
      this.additionalInfoRegisterForm.get('memberAddress.city')?.setValue(null);
      this.selectedCity = null;
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['member'] && this.member) {
      this.patchForm();
    }
  }
  
  patchForm() {
    console.log(this.member);
    if (this.member) {
      this.additionalInfoRegisterForm.patchValue({
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

      // Set selectedCountry, selectedState, and selectedCity
      this.selectedCountry = this.member.memberAddress?.country;
      this.selectedState = this.member.memberAddress?.provinceState;
      this.selectedCity = this.member.memberAddress?.city;
    }
  }


  getCountries() {
    this.countrySevice.getCountries().subscribe(
      (res) => {
        console.log(res);
        this.countries = res;
      },
      (err: any) => {
        this.loginErrorMessage = err.error.message;
      }
    );
  }

  getStates() {
    const iso2CountryCode = this.countries.find((country) => country.name === this.selectedCountry);
    console.log(iso2CountryCode);
    this.countrySevice.getStatesByCountry(iso2CountryCode?.iso2).subscribe(
      (res) => {
        this.states = res;
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
      },
      (err: any) => {
        this.loginErrorMessage = err.error.message;
      }
    );
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
    const profilePicImage: File = this.additionalInfoRegisterForm.controls['selectedProfilePicImage'].value;
    const birthDate: Date = this.additionalInfoRegisterForm.controls['birthDate'].value;

    const formattedBirthDate = this.datePipe.transform(birthDate, 'yyyy-MM-dd');

    const memberRequest = { ...this.additionalInfoRegisterForm.value };
    memberRequest.birthDate = formattedBirthDate; // Assign formatted date

    delete memberRequest.selectedProfilePicImage;

    const formData = new FormData();
    formData.append('profilePicImage', profilePicImage);
   
    formData.append('additionalInfoRequest', JSON.stringify({
      memberRequest: memberRequest
    }));

    this.authenticationService.updateMemberAfterRegistration(formData).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/login']);
        this.alertService.success('/additional-info-signup', 'Success', "Succesfully added details. You can now login");

      },
      (err: any) => {
        console.log(err);
        this.alertService.error('/login', 'Error', err.error.message);
      }
    );
  }

  onProfileImageFileSelect(event: any) {
    this.selectedProfileImageFile = event.files[0]; 
    console.log('Selected file:', this.selectedProfileImageFile);
    this.additionalInfoRegisterForm.controls['selectedProfilePicImage'].setValue(this.selectedProfileImageFile) ;
  }

  onSkipAdditionalInfo() {
    this.router.navigate(['/login']);
  }

}