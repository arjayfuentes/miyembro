import { Component, Input, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { FileUploadModule } from 'primeng/fileupload';
import { OrganizationService } from '../../../pages/organization/services/organization.service';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageMetadata } from '../../models/image-meta-data';

@Component({
  selector: 'app-organization-upload-image',
  imports: [FileUploadModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './organization-upload-image.component.html',
  styleUrl: './organization-upload-image.component.scss'
})
export class OrganizationUploadImageComponent implements OnInit {


  imageMetadataList: ImageMetadata[] = [];
  organizationId: string | undefined;
  selectedLogoImageFile: File | null = null; 
  selectedLogoImageFiles: File [] = [];

  selectedBackgroundImageFile: File | null = null; 
  selectedBackgroundImageFiles: File [] = [];


  @Input() organizationImageForm: FormGroup = new FormGroup({}); // Input for the parent to provide the form
  

   constructor(
      private sessionService: SessionService,
      private organizationService: OrganizationService
    ) {
    }

  ngOnInit(): void {
    console.log("as");
    this.selectedLogoImageFiles = [];
    if(this.organizationImageForm.controls['logoImage'].value) {
      this.selectedLogoImageFile = this.organizationImageForm.controls['logoImage'].value;
      if(this.selectedLogoImageFile) {
        this.selectedLogoImageFiles.push(this.selectedLogoImageFile);
      }
    }

    if(this.organizationImageForm.controls['backgroundImage'].value) {
      this.selectedBackgroundImageFile = this.organizationImageForm.controls['backgroundImage'].value;
      if(this.selectedBackgroundImageFile) {
        this.selectedBackgroundImageFiles.push(this.selectedBackgroundImageFile);
      }
    }
  }

  imageType = 'logo';  

  onLogoImageFileSelect(event: any): void {
    this.selectedLogoImageFile = event.files[0]; 
    console.log('Selected file:', this.selectedLogoImageFile);
    this.organizationImageForm.controls['logoImage'].setValue(this.selectedLogoImageFile) ;
  }

  onBackgroundImageFileSelect(event: any): void {
    this.selectedBackgroundImageFile = event.files[0]; 
    console.log('Selected file:', this.selectedBackgroundImageFile); 
    this.organizationImageForm.controls['backgroundImage'].setValue(this.selectedBackgroundImageFile) ;
  }

  


  
}
