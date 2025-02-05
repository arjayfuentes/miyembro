import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { OrganizationFormComponent } from "../../components/organization-form/organization-form.component";
import { OrganizationAddressFormComponent } from "../../components/organization-address-form/organization-address-form.component";
import { OrganizationMembershipTypeFormComponent } from "../../components/organization-membership-type-form/organization-membership-type-form.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { emptyEditorValidator } from 'src/app/core/validators/empty-editor-validator';

@Component({
  selector: 'app-create-organization-page',
  imports: [ButtonModule, StepperModule, OrganizationFormComponent, CommonModule, OrganizationAddressFormComponent, OrganizationMembershipTypeFormComponent],
  templateUrl: './create-organization-page.component.html',
  styleUrl: './create-organization-page.component.scss'
})
export class CreateOrganizationPageComponent {
  
  organizationForm: FormGroup;
  organizationAddressForm: FormGroup;
  organizationMembershipTypes: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.organizationForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [emptyEditorValidator(), Validators.required]],
      email: [''],
      phoneNumber: [''],
      websiteUrl: ['']
    });
    this.organizationAddressForm = this.formBuilder.group({
      street: [''],
      city: ['', Validators.required],
      provinceState: [''],
      postCode: [''],
      country: ['', Validators.required]
    });
    this.organizationMembershipTypes = this.formBuilder.group({
      membershipTypes: ['', Validators.required]
    })
  }
}
