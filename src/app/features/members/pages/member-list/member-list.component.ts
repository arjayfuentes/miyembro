import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { Table } from 'src/app/shared/model/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MemberService } from '../../services/member.service';
import { CommonModule } from '@angular/common';
import { Session } from 'src/app/core/models/session';
import { MembershipResponse } from 'src/app/core/models/membership-response';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { ButtonModule } from 'primeng/button';
import { EditMembershipComponent } from '../edit-membership/edit-membership.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { IconFieldModule } from 'primeng/iconfield';
import { TableModule } from 'primeng/table';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MembershipTypeService } from 'src/app/features/create-organization/services/membership-type.service';
import { MembershipType } from 'src/app/core/models/membership-type';
import { MultiSelectModule } from 'primeng/multiselect';
import { MembershipStatusResponse } from '../../models/membership-status-response';
import { Role } from 'src/app/core/models/role';
import { RoleService } from 'src/app/shared/services/role.service';
import { MembershipStatusService } from 'src/app/shared/services/membership-status.service';

@Component({
  selector: 'app-member-list',
  imports: [CommonModule, TableComponent, ButtonModule, FormsModule, ReactiveFormsModule, InputTextModule, InputIconModule, TableModule, IconFieldModule, CardModule, AvatarModule, AvatarGroupModule, MultiSelectModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
  providers: [DialogService, MessageService]
})
export class MemberListComponent implements OnInit {

  addressOptions: any [] = [{
    dataField: 'membership.address.city',
    name: 'City',
    value: 'membership.address.city',
  },
  {
    dataField: 'membership.address.country',
    name: 'Country',
    value: 'membership.address.country',
  }];
  first = 0; 
  loading = false;
  memberships: MembershipResponse [] = [];
  membershipStatuses: MembershipStatusResponse [] = [];
  membershipTypes: MembershipType [] = [];
  organizationId: string | undefined | null = null;
  ref: DynamicDialogRef | undefined;
  roles: Role [] = [];  
  rowsPerPage = 10;  
  sortField = "member.firstName";
  sortOrder = 1;  
  table: Table<any> = { rows: [], columns: [] };
  tableFooterCountTitle = 'Member'
  title = 'Members';
  totalRecords = 0; 
  session: Session | null = null;

  constructor(
    private alertService: AlertService,
    private dialogService: DialogService,
    private memberService: MemberService,
    private membershipStatusService: MembershipStatusService,
    private membershipTypeService: MembershipTypeService,
    private roleService: RoleService,
    private sessionService: SessionService,

  ) {}

  ngOnInit(): void {
    const pageNo = this.first;
    this.populateTable(pageNo, this.rowsPerPage, this.sortField, this.sortOrder);
    this.session = this.sessionService.getSession();
    if(this.sessionService.getSession()?.organization?.organizationId) {
      this.organizationId = this.sessionService.getSession()?.organization?.organizationId;
    }
    this.getMembershipTypes();
    this.getRoles();
    this.getMembershipStatuses();
  }

  clearFilterChangeTable() {
    this.populateTable(0, this.rowsPerPage, this.sortField, this.sortOrder);
  }

  filterChangeTable(event:any) {
    console.log(event);
  }

  onEditMembership(row: any) {
    this.ref = this.dialogService.open(EditMembershipComponent, {
        header: 'Edit Membership',
        modal: true,
        contentStyle: { overflow: 'auto' },
        breakpoints: { '960px': '75vw', '640px': '90vw' },
        data: { organizationId: row.organizationId , membership: row },
        closable: true
    });

    this.ref.onClose.subscribe((data: any) => {
        if (data?.membership) {
            console.log(data.membership);
            this.populateTable(0, this.rowsPerPage, this.sortField, this.sortOrder);
          }
    });
  }

  pageChangeTable(event: any) {
    const pageNo = event.first / event.rowsPerPage;
    this.populateTable(pageNo, event.rowsPerPage, event.sortField, event.sortOrder);
  }

  sortChangeTable(event: any) {
    const pageNo = event.first / event.rowsPerPage;
    this.populateTable(pageNo, event.rowsPerPage, event.sortField, event.sortOrder);
  } 
  
  private getMembershipStatuses() {
    this.membershipStatusService.getMemberMembershipStatuses().subscribe(
      (res) => {
        this.membershipStatuses = res;
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
    this.roleService.getMemberRoles().subscribe(
      (res) => {
        this.roles = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  private populateTable(pageNo: number, pageSize: number, sortField: string, sortOrder: number) {
    this.loading = true;
    const session = this.sessionService.getSession();
    const organizationId = session?.organization?.organizationId;
    const order = sortOrder == 1 ? 'ASC': 'DESC';

    this.memberService.getMembershipsByOrganization(organizationId, pageNo, pageSize, sortField, order).subscribe(
      (res) => {
        console.log(res);
        this.memberships = res.content;
        this.totalRecords = res.totalElements;
        this.first = pageNo * res.pageable.pageSize;
        this.setTableData();
        this.loading = false;
      },
      (err: any) => {
        console.log(err);
        this.loading = false;

      }
    );
  }

  private setTableData() {
    this.table = {
      columns: [
        {
          dataField: 'member.firstName',
          dataType: 'templateRef',
          colTemplateRefName: 'nameColumn',
          headerFilterType: 'text',
          headerText: 'Name',
        },
        {
          dataField: 'member.email',
          dataType: 'string',
          colTemplateRefName: 'userFullnameColumn',
          headerFilterType: 'text',
          headerText: 'Email',
        },
        {
          dataField: 'member.phoneNumber',
          dataType: 'string',
          colTemplateRefName: 'userFullnameColumn',
          headerText: 'Mobile Number',
        },
        {
          dataField: 'member.memberAddress.city',
          dataType: 'templateRef',
          colTemplateRefName: 'addressColumn',
          headerText: 'Address',
          headerFilterType: 'combo',
          options: this.addressOptions
        },
        {
          dataField: 'membershipStatus.name',
          dataType: 'string',
          headerFilterType: 'select',
          headerText: 'Membership Status',
          options: this.membershipStatuses
        },
        {
          dataField: 'membershipType.name',
          dataType: 'string',
          headerFilterType: 'select',
          headerText: 'Membership Type',
          options: this.membershipTypes
        },
        {
          dataField: 'role.name',
          dataType: 'string',
          headerFilterType: 'select',
          headerText: 'Role',
          options: this.roles

        },
        {
          dataField: 'startDate',
          dataType: 'templateRef',
          colTemplateRefName: 'startDateColumn',
          headerFilterType: 'customDate',
          headerText: 'Membership Start Date',
        },
        {
          dataField: 'endDate',
          dataType: 'templateRef',
          colTemplateRefName: 'endDateColumn',
          headerFilterType: 'customDate',
          headerText: 'Membership End Date',
        },
        {
          dataField: 'editMembership',
          dataType: 'templateRef',
          colTemplateRefName: 'editMembershipColumn',
          headerText: 'Edit'
        },
      ],
      rows: this.memberships,
      sortField: 'member.firstName',
    };
  }

  

}
