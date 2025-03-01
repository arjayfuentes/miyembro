import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { MemberFormComponent } from 'src/app/core/auth/components/member-form/member-form.component';
import { MembershipResponse } from 'src/app/core/models/membership-response';
import { MembershipStatusResponse } from 'src/app/core/models/membership-status-response';
import { MembershipType } from 'src/app/core/models/membership-type';
import { Role } from 'src/app/core/models/role';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog.service';
import { MembershipStatusService } from 'src/app/core/services/membership-status.service';
import { MembershipTypeService } from 'src/app/core/services/membership-type.service';
import { MembershipService } from 'src/app/core/services/membership.service';
import { RoleService } from 'src/app/core/services/role.service';
import { MemberDetailsComponent } from 'src/app/features/home/components/member-details/member-details.component';
import { MembershipFormComponent } from '../../components/membership-form/membership-form.component';
import { MembershipRequest } from 'src/app/core/models/membership-request';
import { SessionService } from 'src/app/core/services/session.service';
import { UpdateMembershipRequests } from 'src/app/core/models/update-membership-requests';
import { ListboxModule } from 'primeng/listbox';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-edit-multiple-memberships',
  imports: [
    ButtonModule,
    FloatLabelModule,
    FormsModule,
    ListboxModule,
    MemberDetailsComponent,
    MemberFormComponent,
    MembershipFormComponent,
    ReactiveFormsModule,
    SelectModule
  ],
  templateUrl: './edit-multiple-memberships.component.html',
  styleUrl: './edit-multiple-memberships.component.scss'
})
export class EditMultipleMembershipsComponent {

  memberships: MembershipResponse [] = [];
  membershipForm: FormGroup; 
  membershipTypes: MembershipType [] = [];
  membershipStatuses: MembershipStatusResponse [] = [];
  organizationId: string | null = null;
  roles: Role [] = [];

  constructor(
    private alertService: AlertService,
    private config: DynamicDialogConfig, 
    private confirmDialogService: ConfirmDialogService,   
    private formBuilder: FormBuilder,
    private membershipService: MembershipService,
    private membershipStatusService: MembershipStatusService,
    private membershipTypeService: MembershipTypeService,
    private ref: DynamicDialogRef,
    private roleService: RoleService,
    private router: Router,
    private sessionService: SessionService
  ) {
    if (config.data) {
      this.organizationId = config.data.organizationId;
      this.memberships = config.data.memberships;
    }
    this.membershipForm = this.formBuilder.group({
      membershipId: [null],
      organizationId: [null],
      member: [null],
      membershipType: [null],
      membershipStatus: [null],
      role: [null],
      startDate: [null],
      endDate: [null]
    });
  }

  ngOnInit(): void {
    this.getMembershipTypes();
    this.getRoles();
    this.getMembershipStatuses();
  }

  onCancelEditMemberships() {
    this.ref.close();
  }

  onDeleteMemberships(event: Event) {
    const key = this.router.url;
    this.confirmDialogService.warning(
      key,
      "Are you sure you want to remove these members from the organization", 
      "Remove Members", 
      true,
      "Remove Members",
      event,
      () => {
        this.deleteMemberships();
      },
      () => {
        console.log('sadas');
      },
    );
  }
  
  onUpdateMemberships() {
    const membership = this.membershipForm.value;
    const organizationId = this.sessionService.organizationId;
    const membershipRequests: MembershipRequest[] = this.memberships.map(m => m as MembershipRequest);

    const updateMembershipRequests: UpdateMembershipRequests = {
      membershipType: membership.membershipType,
      membershipStatus: membership.membershipStatus,
      role: membership.role,
      startDate: membership.startDate,
      endDate: membership.endDate,
      organizationId: organizationId,
      membershipRequests: membershipRequests
    }

    this.membershipService.updateMemberships(updateMembershipRequests).subscribe(
      (res) => {
        this.memberships = res;
        this.alertService.success(this.router.url, 'Success', "Succesfully updated memberships");
        this.ref.close({
          memberships: this.memberships
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  private deleteMemberships() {
    const organizationId = this.sessionService.organizationId;
    const membershipRequests: MembershipRequest[] = this.memberships.map(m => m as MembershipRequest);
  
    this.membershipService.deleteMembershipsFromOrganization(organizationId, membershipRequests).subscribe(
      (res) => {
        //this.memberships = res;
        this.alertService.success(this.router.url, 'Success', "Succesfully deleted memberships");
        this.ref.close({
          memberships: this.memberships
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  private getMembershipTypes() {
    this.membershipTypeService.getMembershipTypesByOrganizationId(this.organizationId).subscribe(
      (res) => {
        this.membershipTypes = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  private getRoles() {
    this.roleService.getVisibleRoles().subscribe(
      (res) => {
        this.roles = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  private getMembershipStatuses() {
    this.membershipStatusService.getApprovedMembershipStatuses().subscribe(
      (res) => {
        this.membershipStatuses = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
