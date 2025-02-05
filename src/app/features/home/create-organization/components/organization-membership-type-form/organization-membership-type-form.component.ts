import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MembershipType } from 'src/app/core/models/membership-type';  // If you have this model
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { FormErrorsFilterPipe } from 'src/app/shared/pipes/form-errors-filter.pipe';
import { FormErrorsPipe } from 'src/app/shared/pipes/form-errors.pipe';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MembershipTypeService } from '../../services/membership-type.service';
import { MembershipTypeValidity } from '../../models/membership-type-validity';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-organization-membership-type-form',
  templateUrl: './organization-membership-type-form.component.html',
  styleUrls: ['./organization-membership-type-form.component.scss'],
  imports: [InputNumberModule, ToastModule, TextareaModule, FormErrorsFilterPipe, SelectModule, RadioButtonModule, FormErrorsPipe, TooltipModule, ReactiveFormsModule, FormsModule, DividerModule, ReactiveFormsModule, CommonModule, PasswordModule, ButtonModule, CardModule, IftaLabelModule, InputTextModule, AlertComponent],
})
export class OrganizationMembershipTypeFormComponent implements OnInit {
  
  membershipTypesForm: FormGroup;
  membershipTypeValidities: MembershipTypeValidity [] = [];

  constructor(
    private formBuilder: FormBuilder,
    private membershipTypeService: MembershipTypeService
  ) {
    this.membershipTypesForm = this.formBuilder.group({
      membershipTypes: this.formBuilder.array([this.createMembershipType(true)]) 
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

  get membershipTypes(): FormArray {
    return this.membershipTypesForm.get('membershipTypes') as FormArray;
  }

  private createMembershipType(isDefault= false): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      validity: [null, Validators.required],
      isDefaultType: [isDefault]
    });
  }

  addMembershipType(): void {
    this.membershipTypes.push(this.createMembershipType(false));
  }

  removeMembershipType(index: number): void {
    if (this.membershipTypes.length > 1) {
      const isDefault = this.membershipTypes.at(index).get('isDefaultType')?.value;
      this.membershipTypes.removeAt(index);

      // If the removed membership was default, set another one as default
      if (isDefault) {
        this.membershipTypes.at(0).get('isDefaultType')?.setValue(true);
      }
    } else {
      alert('At least one membership type is required.');
    }
  }

  setDefaultType(index: number): void {
    this.membershipTypes.controls.forEach((control, i) => {
      control.get('isDefaultType')?.setValue(i === index);
    });
  }

   get f(): { [key: string]: AbstractControl } {
      return this.membershipTypesForm.controls;
    }
  
    get fgErrors(): { [key: string]: ValidationErrors } | null {
      return this.membershipTypesForm.errors;
    }
}
