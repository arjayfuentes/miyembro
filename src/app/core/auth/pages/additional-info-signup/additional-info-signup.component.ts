import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { MemberAddressFormComponent } from "../../components/member-address-form/member-address-form.component";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MemberFormComponent } from "../../components/member-form/member-form.component";
import { BackgroundComponent } from "../../../../shared/components/background/background.component";
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-additional-info-signup',
  imports: [ButtonModule, StepperModule, MemberAddressFormComponent, CardModule, MemberFormComponent, BackgroundComponent],
  templateUrl: './additional-info-signup.component.html',
  styleUrl: './additional-info-signup.component.scss'
})
export class AdditionalInfoSignupComponent {


    memberForm: FormGroup;
    memberAddressForm: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private alertService: AlertService
    ) {
      this.memberForm = this.formBuilder.group({
        memberId: [null],
        firstName: [null],
        lastName: [null],
        email: [null],
        password: [null],
        phoneNumber: ['', Validators.required],
        birthDate: ['', Validators.required],
        loginType:[null]
      });
      this.memberAddressForm = this.formBuilder.group({
        memberAddressId: [null],
        street: [''],
        city: ['', Validators.required],
        provinceState: [''],
        region: [''],
        postCode: [''],
        country: ['', Validators.required]
      });
    }
  
}
