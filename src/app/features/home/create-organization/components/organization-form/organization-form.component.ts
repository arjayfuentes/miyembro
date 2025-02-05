import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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
import { FormErrorsFilterPipe } from 'src/app/shared/pipes/form-errors-filter.pipe';
import { FormErrorsPipe } from 'src/app/shared/pipes/form-errors.pipe';
import { TextareaModule } from 'primeng/textarea';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-organization-form',
  imports: [InputNumberModule, ToastModule, TextareaModule, EditorModule, FormErrorsFilterPipe, FormErrorsPipe, TooltipModule, ReactiveFormsModule, FormsModule, DividerModule, ReactiveFormsModule, CommonModule, PasswordModule, ButtonModule, CardModule, IftaLabelModule, InputTextModule, AlertComponent],
  templateUrl: './organization-form.component.html',
  styleUrl: './organization-form.component.scss'
})
export class OrganizationFormComponent implements OnInit {

  @Input() organizationForm: FormGroup = new FormGroup({}); // Input for the parent to provide the form
  @Output() organizationFormChange = new EventEmitter<FormGroup>(); // Emit form changes

  ngOnInit(): void {
    this.organizationForm.valueChanges.subscribe(() => {
      this.emitForm();
    });
  }

  emitForm(): void {
    this.organizationFormChange.emit(this.organizationForm);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.organizationForm.controls;
  }

  get fgErrors(): { [key: string]: ValidationErrors } | null {
    return this.organizationForm.errors;
  }
}
