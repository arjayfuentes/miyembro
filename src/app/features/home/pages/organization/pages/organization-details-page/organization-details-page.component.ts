import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../services/organization.service';
import { OrganizationResponse } from 'src/app/core/models/organization-reponse';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MembershipService } from 'src/app/core/auth/services/membership.service';
import { GetMembershipRequest } from 'src/app/core/models/get-membership-request';
import { Membership } from 'src/app/core/models/membership';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { JoinOrganizationRequest } from 'src/app/core/models/join-membership-request';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { HomeService } from 'src/app/features/home/services/home.service';
import { Subscription } from 'rxjs';
import { OrganizationAboutUsComponent } from "../../components/organization-about-us/organization-about-us.component";
import { OrganizationEventsComponent } from "../../components/organization-events/organization-events.component";
import { OrganizationPhotosComponent } from "../../components/organization-photos/organization-photos.component";
import { ShrinkedHeaderComponent } from "../../../../../../shared/components/shrinked-header/shrinked-header.component";
import { ProfileHeaderComponent } from 'src/app/shared/components/profile-header/profile-header.component';
import { CollapsibleHeaderComponent } from "../../../../../../shared/components/collapsible-header/collapsible-header.component";

@Component({
  selector: 'app-organization-details-page',
  imports: [CommonModule, ButtonModule, CardModule, InfiniteScrollDirective, TabsModule, FormsModule, OrganizationAboutUsComponent, OrganizationEventsComponent, OrganizationPhotosComponent, ShrinkedHeaderComponent, ProfileHeaderComponent, CollapsibleHeaderComponent],
  templateUrl: './organization-details-page.component.html',
  styleUrl: './organization-details-page.component.scss',
})
export class OrganizationDetailsPageComponent implements OnInit {
  
  loading = false;
  loginErrorMessage: string | null = null;
  membership: Membership | null = null;
  organization: OrganizationResponse | null = null;
  organizationId: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private membershipService: MembershipService,
    private sessionService: SessionService,
    private organizationService: OrganizationService,
  ) {}

  ngOnInit() {
    this.organizationId = this.activatedRoute.snapshot.paramMap.get('organizationId');
    this.getOrganization();
  }

  joinOrganization() {
    const session = this.sessionService.getSession();
    const joinOrganizationRequest: JoinOrganizationRequest = {
      organizationId: this.organization?.organizationId,
      memberId: session?.member.memberId
    };

    this.membershipService.requestMembership(joinOrganizationRequest).subscribe(
      (res) => {
        this.alertService.success('/home/explore', 'Success', 'Successfully requested to join the group');
      },
      (err: any) => {
        this.loginErrorMessage = err.error.message;
      }
    );
  }


  private getMembershipByMemberIdAndOrganizationId(organization: OrganizationResponse | undefined) {
    this.membership = null;
    const session = this.sessionService.getSession();
    const getMembershipRequest: GetMembershipRequest = {
      organizationId: organization?.organizationId,
      memberId: session?.member.memberId
    };

    this.membershipService.getMembershipByMemberIdAndOrganizationId(getMembershipRequest).subscribe(
      (res) => {
        this.membership = res;
      },
      (err: any) => {
        this.loginErrorMessage = err.error.message;
      }
    );
  }


  private getOrganization() {
    this.organizationService.findMyOrganizationById(this.organizationId).subscribe(
      (res) => {
        console.log(res);
        this.organization = res;
      },
      (err: any) => {
        this.loading = false;
        this.loginErrorMessage = err.error.message;
      }
    );
  }

}
