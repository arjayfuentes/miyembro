import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { OrganizationResponse } from 'src/app/core/models/organization-reponse';
import { OrganizationService } from '../../services/organization.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CommonModule } from '@angular/common';
import { OrganizationInformationComponent } from "../../components/organization-information/organization-information.component";

@Component({
  selector: 'app-organization',
  imports: [CardModule, ButtonModule, AvatarGroupModule, AvatarModule, CommonModule, OrganizationInformationComponent],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent implements OnInit{

  selectedOrganization: OrganizationResponse | null = null;
  loginErrorMessage: string | null = null;

  constructor(
      private activatedRoute: ActivatedRoute,
      private organizationService: OrganizationService,
      private router: Router,
      private sessionService: SessionService,
      private alertService: AlertService
    ) {
     
    }


  ngOnInit(): void {
    const organizationId = this.sessionService.getSession()?.organization?.organizationId;
    this.organizationService.findMyOrganizationById(organizationId).subscribe(
      (res) => {
        this.selectedOrganization = res;
      },
      (err: any) => {
        this.loginErrorMessage = err.error.message;
      }
    );
  }




}
