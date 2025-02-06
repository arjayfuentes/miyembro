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
import { OrganizationUploadImageComponent } from "../../components/organization-upload-image/organization-upload-image.component";
import { OrganizationRequest } from 'src/app/core/models/organization-request';
import { CreateOrganizationRequest } from 'src/app/core/models/create-organization-request';
import { MembershipType } from 'src/app/core/models/membership-type';
import { OrganizationService } from '../../../pages/organization/services/organization.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MembershipTypeRequest } from 'src/app/core/models/membership-type-request';

@Component({
  selector: 'app-create-organization-page',
  imports: [ButtonModule, StepperModule, OrganizationFormComponent, OrganizationUploadImageComponent, CommonModule, OrganizationAddressFormComponent, OrganizationMembershipTypeFormComponent, OrganizationUploadImageComponent],
  templateUrl: './create-organization-page.component.html',
  styleUrl: './create-organization-page.component.scss'
})
export class CreateOrganizationPageComponent implements OnInit{
  
  organizationForm: FormGroup;
  organizationAddressForm: FormGroup;
  organizationMembershipTypesForm: FormGroup;
  organizationImageForm: FormGroup;

  membershipTypeValidities: MembershipTypeValidity [] = [];

  constructor(
    private formBuilder: FormBuilder,
    private membershipTypeService: MembershipTypeService,
    private organizationService: OrganizationService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.organizationForm = this.formBuilder.group({
      organizationId: [null],
      name: ['', Validators.required],
      description: ['', [emptyEditorValidator(), Validators.required]],
      logoUrl: [''],
      backgroundImageUrl: [''],
      email: [''],
      phoneNumber: [''],
      websiteUrl: [''],
      organizationAddress: [null]
    });
    this.organizationAddressForm = this.formBuilder.group({
      organizationAddressId: [null],
      street: [''],
      city: ['', Validators.required],
      provinceState: [''],
      region: [''],
      postCode: [''],
      country: ['', Validators.required]
    });
    this.organizationMembershipTypesForm = this.formBuilder.group({
      membershipTypes: this.formBuilder.array([this.createMembershipType(true)]) 
    });
    this.organizationImageForm = this.formBuilder.group({
      logoImage: [null, Validators.required],
      backgroundImage: [null, Validators.required]
    })
  }


  private createMembershipType(isDefault= false): FormGroup {
    return this.formBuilder.group({
      membershipTypeId: [null],
      organizationId: [null],
      membershipTypeValidity: [null, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      isDefault: [isDefault]
    });
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


  createOrganization() {
    console.log("asdasdads");
    const organizationFormVal  = this.organizationForm.value;
    const organizationAddressFormVal  = this.organizationAddressForm.value;

    const organization: OrganizationRequest = organizationFormVal;
    organization.organizationAddress = organizationAddressFormVal;
  
    const membershipTypes: MembershipTypeRequest [] = this.organizationMembershipTypesForm.controls['membershipTypes'].value;
    const logoImage: File = this.organizationImageForm.controls['logoImage'].value;
    const backgroundImage: File = this.organizationImageForm.controls['backgroundImage'].value;
    console.log(this.organizationImageForm.value);

    const createOrganizationRequest: CreateOrganizationRequest = {
      organizationRequest: organization,
      membershipTypes: membershipTypes
    }

    console.log(createOrganizationRequest);


    const formData = new FormData();
    formData.append('logoImage', logoImage);
    formData.append('backgroundImage', backgroundImage);

    // Append JSON as a Blob (ensure correct key and structure)
    const jsonBlob = new Blob([JSON.stringify({
      organizationRequest: organization, 
      membershipTypes: membershipTypes
    })], { type: 'application/json' });

    formData.append('createOrganizationRequest', jsonBlob);
    console.log(formData);
    this.organizationService.completeCreateOrganization(formData).subscribe(
      (res) => {
        console.log(res)
        this.router.navigate(['/home/explore']);
        this.alertService.success('/login', 'Success', 'Succefully Created Organization');
      },
      (err: any) => {
        console.log(err);
        this.alertService.error('/login', 'Error', err.error.message);
      }
    );



  }


  


}
