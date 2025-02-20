import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { Member } from 'src/app/core/models/member';
import { Table } from 'src/app/shared/model/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MemberService } from '../../services/member.service';
import { CommonModule } from '@angular/common';
import { Session } from 'src/app/core/models/session';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ApproveJoinOrganizationRequestComponent } from '../approve-join-organization-request/approve-join-organization-request.component';
import { MembershipResponse } from 'src/app/core/models/membership-response';

@Component({
  selector: 'app-member-pending-request',
  imports: [CommonModule, TableComponent, ButtonModule, CardModule, AvatarModule, AvatarGroupModule, DynamicDialogModule],
  templateUrl: './member-pending-request.component.html',
  styleUrl: './member-pending-request.component.scss',
  providers: [DialogService, MessageService]
})
export class MemberPendingRequestComponent {

    
    first = 0; 
    loading = false;
    memberships: MembershipResponse [] = [];
    ref: DynamicDialogRef | undefined;
    rowsPerPage = 5;
    session: Session | null = null;
    sortField = "member.firstName";
    sortOrder = 1;  
    table: Table<any> = { rows: [], columns: [] };
    tableFooterCountTitle = 'Member'
    title = 'Members';
    totalRecords = 0; 
    
    constructor(
      private alertService: AlertService,
      private dialogService: DialogService,
      private memberService: MemberService, 
      private messageService: MessageService,
      private sessionService: SessionService,
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
  
      this.memberService.getPendingMembershipsByOrganization(organizationId, pageNo, pageSize, sortField, order).subscribe(
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
          // {
          //   dataField: 'member.firstName',
          //   dataType: 'string',
          //   colTemplateRefName: 'userFullnameColumn',
          //   headerText: 'First Name',
          // },
          // {
          //   dataField: 'member.lastName',
          //   dataType: 'string',
          //   colTemplateRefName: 'userFullnameColumn',
          //   headerText: 'Last Name',
          // },
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
            dataField: 'approveDeny',
            dataType: 'templateRef',
            colTemplateRefName: 'approveDenyColumn',
            headerText: 'Approve or Deny'
          },
        ],
        rows: this.memberships,
        sortField: 'member.firstName',
      };
    }


    approveJoinRequest(row: any) {
      this.ref = this.dialogService.open(ApproveJoinOrganizationRequestComponent, {
          header: 'Approve Request',
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

    denyJoinRequest(row: any) {
      console.log(row);
    }

}
