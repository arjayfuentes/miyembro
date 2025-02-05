import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { OrganizationFormComponent } from "../../components/organization-form/organization-form.component";
import { OrganizationAddressFormComponent } from "../../components/organization-address-form/organization-address-form.component";
import { OrganizationMembershipTypeFormComponent } from "../../components/organization-membership-type-form/organization-membership-type-form.component";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { emptyEditorValidator } from 'src/app/core/validators/empty-editor-validator';
import { MembershipTypeService } from '../../services/membership-type.service';
import { MembershipTypeValidity } from '../../models/membership-type-validity';

@Component({
  selector: 'app-create-organization-page',
  imports: [ButtonModule, StepperModule, OrganizationFormComponent, CommonModule, OrganizationAddressFormComponent, OrganizationMembershipTypeFormComponent],
  templateUrl: './create-organization-page.component.html',
  styleUrl: './create-organization-page.component.scss'
})
export class CreateOrganizationPageComponent implements OnInit{
  
  organizationForm: FormGroup;
  organizationAddressForm: FormGroup;
  organizationMembershipTypesForm: FormGroup;
  membershipTypeValidities: MembershipTypeValidity [] = [];

  constructor(
    private formBuilder: FormBuilder,
    private membershipTypeService: MembershipTypeService
  ) {
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
    this.organizationMembershipTypesForm = this.formBuilder.group({
      membershipTypes: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.membershipTypeService.findAllMembershipTypeValidity().subscribe(
      (res) => {
        this.membershipTypeValidities = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }


  


}
