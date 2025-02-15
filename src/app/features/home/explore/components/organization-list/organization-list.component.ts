import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OrganizationService } from '../../../pages/organization/services/organization.service';
import { OrganizationResponse } from 'src/app/core/models/organization-reponse';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { JoinOrganizationRequest } from 'src/app/core/models/join-membership-request';
import { MembershipService } from 'src/app/core/auth/services/membership.service';
import { GetMembershipRequest } from 'src/app/core/models/get-membership-request';
import { Membership } from 'src/app/core/models/membership';
import { OrganizationItemGridComponent } from '../organization-item-grid/organization-item-grid.component';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-organization-list',
  imports: [DataViewModule, ButtonModule, Tag, Skeleton, InfiniteScrollDirective, CommonModule, DialogModule, SelectButtonModule, OrganizationItemGridComponent],
  templateUrl: './organization-list.component.html',
  styleUrl: './organization-list.component.scss'
})
export class OrganizationListComponent implements OnInit{

  layout = 'grid';
  options = ['list', 'grid'];
  organizations: OrganizationResponse [] = [];
  loginErrorMessage: string | null = null;
  selectedOrganization: OrganizationResponse | undefined;


  // Infinite Scroll properties
  page = 0; // Start from page 1
  size = 10;
  loading = false;
  hasMore = true;

  constructor(
        private activatedRoute: ActivatedRoute,
        private organizationService: OrganizationService,
        private router: Router,
        private sessionService: SessionService,
        private alertService: AlertService,
        private membershipService: MembershipService

      ) {
       
      }
  
  ngOnInit(): void {
    this.size = this.calculateDynamicSize();
    this.loadOrganizations(this.page, this.size);
  }

    // Load organizations based on the current page and size
  loadOrganizations(page: number, size: number): void {
    this.loading = true;
    this.organizationService.getAllOrganizations(page, size).subscribe(
      (res) => {
        this.organizations = [...this.organizations, ...res.content];  // Append new data to existing
        this.loading = false;

        if (res.content.length === 0) {
          this.hasMore = false;  // No more data available
        }
      },
      (err: any) => {
        this.loading = false;
        this.loginErrorMessage = err.error.message;
      }
    );
  }

  counterArray(): any[] {
    return Array(this.calculateDynamicSize());
  }

  onScroll(): void {
    if (this.loading || !this.hasMore) return;
  
    this.page++;  // Increment the page number
  
    // Calculate the dynamic size based on screen width for subsequent loads
    this.size = this.calculateDynamicSize();
    this.loadOrganizations(this.page, this.size);  // Load the next set of data
  }

  visible = false;

  onClickOrganization(organization: OrganizationResponse | undefined) {
    this.visible = true;
    this.selectedOrganization = organization;
    this.getMembershipByMemberIdAndOrganizationId(organization);
  }

  joinOrganization() {
    const session = this.sessionService.getSession();
    const joinOrganizationRequest: JoinOrganizationRequest = {
      organizationId: this.selectedOrganization?.organizationId,
      memberId: session?.member.memberId
    };

    this.membershipService.requestMembership(joinOrganizationRequest).subscribe(
      (res) => {
        console.log(res);
        this.visible = false;
        this.alertService.success('/home/explore', 'Success', 'Successfully requested to join the group');
      },
      (err: any) => {
        this.loginErrorMessage = err.error.message;
      }
    );
  }

  membership: Membership | null = null;

  getMembershipByMemberIdAndOrganizationId(organization: OrganizationResponse | undefined) {
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

  private calculateDynamicSize(): number {
    const screenWidth = window.innerWidth;
  
    if (screenWidth >= 1280) {  // XL screen (Large screens)
      return 18;  // Load 18 items for large screens
    } else if (screenWidth >= 1024) {  // LG screen (Large screens)
      return 18;  // Load 18 items for large screens
    } else if (screenWidth >= 768) {  // MD screen (Medium screens)
      return 12;  // Load 12 items for medium screens
    } else if (screenWidth >= 640) {  // SM screen (Small screens)
      return 10;  // Load 10 items for small screens
    } else {
      return 10;  // Default: Load 10 items for very small screens
    }
  }


}
