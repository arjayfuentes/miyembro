import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { OrganizationResponse } from 'src/app/core/models/organization-reponse';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OrganizationService } from '../../../../shared/services/organization.service';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { OrganizationInformationComponent } from '../../components/organization-information/organization-information.component';
import { OrganizationComponent } from '../../components/organization/organization.component';
import { GetMembershipRequest } from 'src/app/core/models/get-membership-request';
import { MembershipService } from 'src/app/shared/services/membership.service';
import { Membership } from 'src/app/core/models/membership';
import { PhotoControlComponent } from 'src/app/shared/components/photo-control/photo-control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-organization',
  imports: [PhotoControlComponent, CardModule, ButtonModule, AvatarGroupModule, AvatarModule, FormsModule, CommonModule, OrganizationInformationComponent, OrganizationComponent],
  templateUrl: './my-organization.component.html',
  styleUrl: './my-organization.component.scss'
})
export class MyOrganizationComponent implements OnInit{

  loginErrorMessage: string | null = null;
  membership: Membership | null = null;
  organization: OrganizationResponse | null = null;
  imageUrl = "https://scontent-bru2-1.xx.fbcdn.net/v/t39.30808-6/465271309_4020391881535162_8134093441895466262_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=2285d6&_nc_ohc=qWoSFncPQYwQ7kNvgHCvszG&_nc_oc=Adg8uYYekz8CZB6EDVepVMYtz1KcBKDMG2s-DTnkeDl2eP3jXbJdta14ABJjwNYiICs&_nc_zt=23&_nc_ht=scontent-bru2-1.xx&_nc_gid=A-kpt-hwQ41Ry_GZR9Qwih6&oh=00_AYCLIRPf42tRT2ccC-gAaWS5Wt82CTXVf9dlSInI3p4ceA&oe=67B536E5";
  backgroundUrl: string | null = null;

  constructor(
      private organizationService: OrganizationService,
      private membershipService: MembershipService,
      private sessionService: SessionService,
  ) {
    
  }


  ngOnInit(): void {
    this.getOrganization();
    this.organizationService.getOrganizationUpdate().subscribe((res) => {
      if(res) {
        this.organization = res;
      }
    });
  }

  private getOrganization() {
    let organizationId;
    if(this.sessionService.getSession()?.organization?.organizationId) {
      organizationId = this.sessionService.getSession()?.organization?.organizationId;
    }
    this.organizationService.findMyOrganizationById(organizationId).subscribe(
      (res) => {
        this.organization = res;
        if(this.organization) {
          this.imageUrl = this.organization.logoUrl;
          this.backgroundUrl = this.organization.backgroundImageUrl
        }
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

