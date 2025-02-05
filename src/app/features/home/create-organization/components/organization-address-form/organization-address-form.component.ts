import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { FormErrorsFilterPipe } from 'src/app/shared/pipes/form-errors-filter.pipe';
import { FormErrorsPipe } from 'src/app/shared/pipes/form-errors.pipe';

@Component({
  selector: 'app-organization-address-form',
  imports: [InputNumberModule, ToastModule, TextareaModule, FormErrorsFilterPipe, FormErrorsPipe, TooltipModule, ReactiveFormsModule, FormsModule, DividerModule, ReactiveFormsModule, CommonModule, PasswordModule, ButtonModule, CardModule, IftaLabelModule, InputTextModule, AlertComponent],
  templateUrl: './organization-address-form.component.html',
  styleUrl: './organization-address-form.component.scss'
})
export class OrganizationAddressFormComponent implements OnInit {

  @Input() organizationAddressForm: FormGroup = new FormGroup({}); // Input for the parent to provide the form
  @Output() organizationAddressFormChange = new EventEmitter<FormGroup>(); // Emit form changes
      
  ngOnInit() {
    this.organizationAddressForm.valueChanges.subscribe(() => {
      this.emitForm();
    });
  }
  
  emitForm() {
    this.organizationAddressFormChange.emit(this.organizationAddressForm);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.organizationAddressForm.controls;
  }

  get fgErrors(): { [key: string]: ValidationErrors } | null {
    return this.organizationAddressForm.errors;
  }

}
