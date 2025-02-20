import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembershipService } from 'src/app/shared/services/membership.service';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { GetMembershipRequest } from 'src/app/core/models/get-membership-request';
import { JoinOrganizationRequest } from 'src/app/core/models/join-membership-request';
import { OrganizationResponse } from 'src/app/core/models/organization-reponse';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OrganizationService } from '../../../../shared/services/organization.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { CollapsibleHeaderComponent } from 'src/app/shared/components/collapsible-header/collapsible-header.component';
import { OrganizationAboutUsComponent } from '../organization-about-us/organization-about-us.component';
import { OrganizationEventsComponent } from '../organization-events/organization-events.component';
import { OrganizationPhotosComponent } from '../organization-photos/organization-photos.component';
import { OrganizationMembershipComponent } from '../organization-membership/organization-membership.component';
import { OrganizationCollapsingHeaderComponent } from "../organization-collapsing-header/organization-collapsing-header.component";
import { MembershipResponse } from 'src/app/core/models/membership-response';

@Component({
  selector: 'app-organization',
  imports: [CommonModule, ButtonModule, TabsModule, FormsModule, OrganizationAboutUsComponent, OrganizationEventsComponent, OrganizationPhotosComponent, OrganizationMembershipComponent, CollapsibleHeaderComponent, OrganizationCollapsingHeaderComponent],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent implements OnInit {
  
  @Input() isMyOrganization = false;
  @Input() membership: MembershipResponse | null = null;
  @Input() organization: OrganizationResponse | null = null;

  isEditAllowed = false;

  constructor( 
    private sessionService: SessionService
  ) {

  }

  ngOnInit(): void {
    this.isEditAllowed = this.isMyOrganization && this.sessionService.getSession()?.role.name === 'Admin';
  }

}
