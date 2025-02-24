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
import { MembershipFilters } from '../../models/membership-filters';

@Component({
  selector: 'app-member-list',
  imports: [CommonModule, TableComponent, ButtonModule, FormsModule, ReactiveFormsModule, InputTextModule, InputIconModule, TableModule, IconFieldModule, CardModule, AvatarModule, AvatarGroupModule, MultiSelectModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
  providers: [DialogService, MessageService]
})
export class MemberListComponent implements OnInit {

  addressOptions: any [] = [];
  first = 0; 
  loading = false;
  memberships: MembershipResponse [] = [];
  membershipFilters: MembershipFilters | undefined;
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
    this.addressOptions = [{
      dataField: 'member.memberAddress.city',
      name: 'City',
      value: 'member.memberAddress.city',
    },
    {
      dataField: 'member.memberAddress.country',
      name: 'Country',
      value: 'member.memberAddress.country',
    }];
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
    this.membershipFilters = {} as MembershipFilters;
    console.log(this.membershipFilters);
    this.sortField = "member.firstName";
    this.sortOrder = 1;
    this.populateTable(0, this.rowsPerPage, this.sortField, this.sortOrder);
  }

  filterChangeTable(event:any) {
    const eventFilters = event.filters;
    const membershipStatuses = eventFilters['membershipStatus.name'][0].value;
    const membershipTypes = eventFilters['membershipType.name'][0].value;
    const membershipRoles = eventFilters['role.name'][0].value;

    const memberAddress =  eventFilters['member.memberAddress.city'][0].value;

    const memberMemberAddressCity = memberAddress && memberAddress.dataField !== 'member.memberAddress.country' ? memberAddress.value : null;
    const memberMemberAddressCountry = memberAddress && memberAddress.dataField === 'member.memberAddress.country' ? memberAddress.value : null;
        
    const filters = {
      memberFirstName: eventFilters['member.firstName'][0].value,
      memberEmail: eventFilters['member.email'][0].value,
      memberMemberAddressCity: memberMemberAddressCity,
      memberMemberAddressCountry: memberMemberAddressCountry,
      membershipStatusNames: membershipStatuses? membershipStatuses.map((filter: any) => filter.name) : null,
      membershipTypeNames: membershipTypes ? membershipTypes.map((filter: any) => filter.name) : null,
      roleNames:  membershipRoles ? membershipRoles.map((filter: any) => filter.name) : null,
      startDates:  eventFilters['startDate'][0].value,
      endDates:  eventFilters['endDate'][0].value,
    }
    this.membershipFilters = filters;
    console.log(this.membershipFilters);
    this.sortField = "member.firstName";
    this.sortOrder = 1;
    this.populateTable(0, this.rowsPerPage, this.sortField, this.sortOrder);
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

    const filters = this.membershipFilters ?? {} as MembershipFilters

    this.memberService.getMembershipsByOrganization(organizationId, pageNo, pageSize, sortField, order, filters).subscribe(
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
          sortable: true
        },
        {
          dataField: 'member.email',
          dataType: 'string',
          colTemplateRefName: 'userFullnameColumn',
          headerFilterType: 'text',
          headerText: 'Email',
          sortable: true
        },
        {
          dataField: 'member.phoneNumber',
          dataType: 'string',
          colTemplateRefName: 'userFullnameColumn',
          headerText: 'Mobile Number',
          sortable: true
        },
        {
          dataField: 'member.memberAddress.city',
          dataType: 'templateRef',
          colTemplateRefName: 'addressColumn',
          headerText: 'Address',
          headerFilterType: 'combo',
          options: this.addressOptions,
          sortable: true
        },
        {
          dataField: 'membershipStatus.name',
          dataType: 'string',
          headerFilterType: 'select',
          headerText: 'Membership Status',
          options: this.membershipStatuses,
          sortable: true
        },
        {
          dataField: 'membershipType.name',
          dataType: 'string',
          headerFilterType: 'select',
          headerText: 'Membership Type',
          options: this.membershipTypes,
          sortable: true
        },
        {
          dataField: 'role.name',
          dataType: 'string',
          headerFilterType: 'select',
          headerText: 'Role',
          options: this.roles,
          sortable: true

        },
        {
          dataField: 'startDate',
          dataType: 'templateRef',
          colTemplateRefName: 'startDateColumn',
          headerFilterType: 'customDate',
          headerText: 'Membership Start Date',
          sortable: true
        },
        {
          dataField: 'endDate',
          dataType: 'templateRef',
          colTemplateRefName: 'endDateColumn',
          headerFilterType: 'customDate',
          headerText: 'Membership End Date',
          sortable: true
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
