import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { OrganizationResponse } from 'src/app/core/models/organization-reponse';
import { CollapsibleHeaderComponent } from "../../../../shared/components/collapsible-header/collapsible-header.component";
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { Router } from '@angular/router';
import { ImageType } from 'src/app/shared/model/image-type.enum';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UpdateOrganizationPhotoRequest } from '../../model/update-organization-photo-request';

@Component({
  selector: 'app-organization-collapsing-header',
  imports: [CollapsibleHeaderComponent],
  templateUrl: './organization-collapsing-header.component.html',
  styleUrl: './organization-collapsing-header.component.scss'
})
export class OrganizationCollapsingHeaderComponent implements OnChanges {
  
    @Input() organization: OrganizationResponse | null = null;
    @Input() isEditAllowed = false;

    backgroundImageUrl: string | undefined;
    logoUrl: string | undefined;
    title: string | undefined;


    constructor( 
      private alertService: AlertService,
      private loaderService: LoaderService,
      private organizationService: OrganizationService,
      private router: Router,
    ) {

    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['organization'] && this.organization) {
        this.backgroundImageUrl = this.organization.backgroundImageUrl;
        this.logoUrl = this.organization.logoUrl;
        this.title = this.organization.name;
      }
    }

    onOrganizationBackgroundImageUrlUpdate(event: any) {
      if(event && this.backgroundImageUrl !== event && (event instanceof File)) {
        const updateOrganizationPhotoRequest: UpdateOrganizationPhotoRequest = {
          imageType: ImageType.BACKGROUND_IMAGE
        }
        this.updateOrganizationPhoto(event, updateOrganizationPhotoRequest );
      }
    }

    onOrganizationLogoUrlUpdate(event: any) {
      if(event && this.logoUrl !== event && (event instanceof File)) {
        const updateOrganizationPhotoRequest: UpdateOrganizationPhotoRequest = {
          imageType: ImageType.LOGO_IMAGE
        }
        this.updateOrganizationPhoto(event, updateOrganizationPhotoRequest );
      }
    }


    updateOrganizationPhoto(file: any, updateOrganizationPhotoRequest: UpdateOrganizationPhotoRequest) {
      const formData = new FormData();
  
      if(file) {
        formData.append('image', file);
      }
  
      formData.append('imageType', updateOrganizationPhotoRequest.imageType);
      this.loaderService.showLoader(this.router.url, false);
      this.organizationService.updateOrganizationPhoto(this.organization, formData).subscribe(
        (res) => {
          this.organizationService.setOrganization(res);
          this.loaderService.hideLoader(this.router.url);
          this.alertService.success('/login', 'Success', 'Succefully updated image');
        },
        (err: any) => {
          console.log(err);
          this.loaderService.hideLoader(this.router.url);
          this.alertService.error('/login', 'Error', err);
        }
      );
    }

    

}
