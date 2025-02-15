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
import { ScrollerModule } from 'primeng/scroller';

@Component({
  selector: 'app-organization-list',
  imports: [DataViewModule, ButtonModule, Tag, ScrollerModule, CommonModule, DialogModule, SelectButtonModule, OrganizationItemGridComponent],
  templateUrl: './organization-list.component.html',
  styleUrl: './organization-list.component.scss'
})
export class OrganizationListComponent implements OnInit{

  layout = 'grid';
  options = ['list', 'grid'];
  organizations: OrganizationResponse [] = [];
  loginErrorMessage: string | null = null;
  selectedOrganization: OrganizationResponse | undefined;

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  @ViewChild('dv') dataView!: DataView;

  onScroll() {
    const element = this.scrollContainer.nativeElement;
    if (element.scrollTop + element.clientHeight >= element.scrollHeight - 10) {
      alert('dsadsadas');
    }
  }

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
    this.organizationService.viewAllOrganization().subscribe(
      (res) => {
        this.organizations = res;
      },
      (err: any) => {
        this.loginErrorMessage = err.error.message;
      }
    );
  }


  // onClickOrganization(organizationId: OrganizationResponse) {
  //   alert(organizationId);
  // }

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


}
