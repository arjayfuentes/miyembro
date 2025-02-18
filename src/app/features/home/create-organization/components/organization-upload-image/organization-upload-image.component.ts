import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { FileUploadModule } from 'primeng/fileupload';
import { OrganizationService } from '../../../pages/organization/services/organization.service';
import { CommonModule } from '@angular/common';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageMetadata } from '../../models/image-meta-data';
import { AvatarComponent } from 'src/app/shared/components/avatar/avatar.component';

@Component({
  selector: 'app-organization-upload-image',
  imports: [FileUploadModule, CommonModule, ReactiveFormsModule, FormsModule, AvatarComponent],
  templateUrl: './organization-upload-image.component.html',
  styleUrl: './organization-upload-image.component.scss'
})
export class OrganizationUploadImageComponent {

  @Input() organizationImageFileForm: FormGroup = new FormGroup({});
  
}
