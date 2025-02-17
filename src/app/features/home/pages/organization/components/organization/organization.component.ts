import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MembershipService } from 'src/app/core/auth/services/membership.service';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { GetMembershipRequest } from 'src/app/core/models/get-membership-request';
import { JoinOrganizationRequest } from 'src/app/core/models/join-membership-request';
import { Membership } from 'src/app/core/models/membership';
import { OrganizationResponse } from 'src/app/core/models/organization-reponse';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OrganizationService } from '../../services/organization.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { CollapsibleHeaderComponent } from 'src/app/shared/components/collapsible-header/collapsible-header.component';
import { OrganizationAboutUsComponent } from '../organization-about-us/organization-about-us.component';
import { OrganizationEventsComponent } from '../organization-events/organization-events.component';
import { OrganizationPhotosComponent } from '../organization-photos/organization-photos.component';
import { OrganizationMembershipComponent } from '../organization-membership/organization-membership.component';

@Component({
  selector: 'app-organization',
  imports: [CommonModule, ButtonModule, TabsModule, FormsModule, OrganizationAboutUsComponent, OrganizationEventsComponent, OrganizationPhotosComponent, OrganizationMembershipComponent, CollapsibleHeaderComponent],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent {
  
  @Input() membership: Membership | null = null;
  @Input() organization: OrganizationResponse | null = null;
  @Input() isMyOrganization = false;

}
