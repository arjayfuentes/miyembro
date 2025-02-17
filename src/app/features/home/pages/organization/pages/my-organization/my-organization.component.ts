import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { OrganizationResponse } from 'src/app/core/models/organization-reponse';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OrganizationService } from '../../services/organization.service';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OrganizationInformationComponent } from '../../components/organization-information/organization-information.component';
import { OrganizationComponent } from '../organization/organization.component';
import { GetMembershipRequest } from 'src/app/core/models/get-membership-request';
import { MembershipService } from 'src/app/core/auth/services/membership.service';
import { Membership } from 'src/app/core/models/membership';

@Component({
  selector: 'app-my-organization',
  imports: [CardModule, ButtonModule, AvatarGroupModule, AvatarModule, CommonModule, OrganizationInformationComponent, OrganizationComponent],
  templateUrl: './my-organization.component.html',
  styleUrl: './my-organization.component.scss'
})
export class MyOrganizationComponent implements OnInit{

  organization: OrganizationResponse | null = null;
  membership: Membership | null = null;

  loginErrorMessage: string | null = null;

  constructor(
      private organizationService: OrganizationService,
      private membershipService: MembershipService,
      private sessionService: SessionService,
    ) {
     
    }


  ngOnInit(): void {
    this.getOrganization();
  }

  private getOrganization() {
    let organizationId;
    if(this.sessionService.getSession()?.organization?.organizationId) {
      organizationId = this.sessionService.getSession()?.organization?.organizationId;
    }
    this.organizationService.findMyOrganizationById(organizationId).subscribe(
      (res) => {
        this.organization = res;
        this.getMembershipByMemberIdAndOrganizationId(this.organization);
      },
      (err: any) => {
        this.loginErrorMessage = err.error.message;
      }
    );
  }

  private getMembershipByMemberIdAndOrganizationId(organization: OrganizationResponse | null) {
      const session = this.sessionService.getSession();
      const getMembershipRequest: GetMembershipRequest = {
        organizationId: organization?.organizationId,
        memberId: session?.member.memberId
      };
  
      this.membershipService.getMembershipByMemberIdAndOrganizationId(getMembershipRequest).subscribe(
        (res) => {
          this.membership = res;
          console.log(this.membership);
        },
        (err: any) => {
          this.loginErrorMessage = err.error.message;
        }
      );
    }




}

