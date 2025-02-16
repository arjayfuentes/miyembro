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
import { AvatarComponent } from "../../../../../../core/auth/components/avatar/avatar.component";
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TabsModule } from 'primeng/tabs';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { HomeService } from 'src/app/features/home/services/home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-organization-details-page',
  imports: [CommonModule, ButtonModule, CardModule, AvatarComponent, InfiniteScrollDirective, TabsModule, FormsModule, AvatarModule, AvatarGroupModule],
  templateUrl: './organization-details-page.component.html',
  styleUrl: './organization-details-page.component.scss',
})
export class OrganizationDetailsPageComponent implements OnInit {
  
  imageUrl = '';
  loading = false;
  loginErrorMessage: string | null = null;
  membership: Membership | null = null;
  organization: OrganizationResponse | null = null;
  organizationId: string | null = null;
  scrollSubscription!: Subscription;
  schrunk = false;
  triggerHeight = 235; // Set the desired trigger height


  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private homeService: HomeService,
    private membershipService: MembershipService,
    private sessionService: SessionService,
    private organizationService: OrganizationService,
  ) {}

  ngOnInit() {
    this.organizationId = this.activatedRoute.snapshot.paramMap.get('organizationId');
    this.getOrganization();
    this.scrollSubscription = this.homeService.scrollObservable$.subscribe(
      (scrollTop) => {
        if (scrollTop >= this.triggerHeight) {
          this.schrunk = true;
          console.log(`Scroll reached ${this.triggerHeight}px!`);
        } else {
          this.schrunk = false;
        }
      }
    );
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
        this.imageUrl = this.organization.logoUrl;
      },
      (err: any) => {
        this.loading = false;
        this.loginErrorMessage = err.error.message;
      }
    );
  }

}
