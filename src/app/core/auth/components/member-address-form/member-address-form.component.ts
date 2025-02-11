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
  selector: 'app-member-address-form',
  imports: [InputNumberModule, ToastModule, TextareaModule, FormErrorsFilterPipe, FormErrorsPipe, TooltipModule, ReactiveFormsModule, FormsModule, DividerModule, ReactiveFormsModule, CommonModule, PasswordModule, ButtonModule, CardModule, IftaLabelModule, InputTextModule, AlertComponent],
  templateUrl: './member-address-form.component.html',
  styleUrl: './member-address-form.component.scss'
})
export class MemberAddressFormComponent implements OnInit {

  @Input() memberAddressForm: FormGroup = new FormGroup({}); // Input for the parent to provide the form
  @Output() memberAddressFormChange = new EventEmitter<FormGroup>(); // Emit form changes
      
  ngOnInit() {
    this.memberAddressForm.valueChanges.subscribe(() => {
      this.emitForm();
    });
  }
  
  emitForm() {
    this.memberAddressFormChange.emit(this.memberAddressForm);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.memberAddressForm.controls;
  }

  get fgErrors(): { [key: string]: ValidationErrors } | null {
    return this.memberAddressForm.errors;
  }

}
