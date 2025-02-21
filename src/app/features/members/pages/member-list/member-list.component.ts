import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { Member } from 'src/app/core/models/member';
import { Table } from 'src/app/shared/model/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MemberService } from '../../services/member.service';
import { CommonModule } from '@angular/common';
import { Session } from 'src/app/core/models/session';
import { MembershipResponse } from 'src/app/core/models/membership-response';
import { TabsModule } from 'primeng/tabs';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { ButtonModule } from 'primeng/button';
import { EditMembershipComponent } from '../edit-membership/edit-membership.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-member-list',
  imports: [CommonModule, TableComponent, ButtonModule, MemberListComponent, CardModule, AvatarModule, AvatarGroupModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
  providers: [DialogService, MessageService]
})
export class MemberListComponent {

  table: Table<any> = { rows: [], columns: [] };
  loading = false;
  memberships: MembershipResponse [] = [];
  title = 'Members';
  tableFooterCountTitle = 'Member'
  ref: DynamicDialogRef | undefined;
  session: Session | null = null;
  totalRecords = 0;  // Total records count
  rowsPerPage = 10;  // Default page size
  first = 0; // 

  sortField = "member.firstName";
  sortOrder = 1;  

  constructor(
    private alertService: AlertService,
    private dialogService: DialogService,
    private sessionService: SessionService,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    const pageNo = this.first;
    this.populateTable(pageNo, this.rowsPerPage, this.sortField, this.sortOrder);
    this.session = this.sessionService.getSession();
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

  private setTableData() {
    this.table = {
      columns: [
        {
          dataField: 'member.firstName',
          dataType: 'templateRef',
          colTemplateRefName: 'nameColumn',
          headerText: 'Name',
        },
        {
          dataField: 'member.email',
          dataType: 'string',
          colTemplateRefName: 'userFullnameColumn',
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
        },
        {
          dataField: 'membershipStatus.name',
          dataType: 'string',
          colTemplateRefName: 'userFullnameColumn',
          headerText: 'Membership Status',
        },
        {
          dataField: 'membershipType.name',
          dataType: 'string',
          headerText: 'Membership Type',
        },
        {
          dataField: 'role.name',
          dataType: 'string',
          headerText: 'Role',
        },
        {
          dataField: 'startDate',
          dataType: 'templateRef',
          colTemplateRefName: 'startDateColumn',
          headerText: 'Membership Start Date',
        },
        {
          dataField: 'endDate',
          dataType: 'templateRef',
          colTemplateRefName: 'endDateColumn',
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
