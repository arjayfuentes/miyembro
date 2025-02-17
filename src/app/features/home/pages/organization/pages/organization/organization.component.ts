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
import { OrganizationAboutUsComponent } from '../../components/organization-about-us/organization-about-us.component';
import { OrganizationEventsComponent } from '../../components/organization-events/organization-events.component';
import { OrganizationPhotosComponent } from '../../components/organization-photos/organization-photos.component';
import { OrganizationMembershipComponent } from '../../components/organization-membership/organization-membership.component';

@Component({
  selector: 'app-organization',
  imports: [CommonModule, ButtonModule, TabsModule, FormsModule, OrganizationAboutUsComponent, OrganizationEventsComponent, OrganizationPhotosComponent, OrganizationMembershipComponent, CollapsibleHeaderComponent],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent implements OnInit {
  
  @Input() membership: Membership | null = null;
  @Input() organization: OrganizationResponse | null = null;
  @Input() isMyOrganization = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private membershipService: MembershipService,
    private organizationService: OrganizationService,
    private sessionService: SessionService,
  ) {}

  ngOnInit() {
    console.log('dasdas');
  }

}
