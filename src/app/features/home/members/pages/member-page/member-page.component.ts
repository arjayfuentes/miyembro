import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { Member } from 'src/app/core/models/member';
import { Table } from 'src/app/shared/model/table';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MemberService } from '../../services/member.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from "../../../../../shared/components/table/table.component";
import { Session } from 'src/app/core/models/session';

@Component({
  selector: 'app-member-page',
  imports: [CommonModule, TableComponent],
  templateUrl: './member-page.component.html',
  styleUrl: './member-page.component.scss'
})
export class MemberPageComponent implements OnInit {

  table: Table<any> = { rows: [], columns: [] };
  loading = false;
  members: Member [] = [];
  title = 'Members';
  tableFooterCountTitle = 'Member'
  session: Session | null = null;
  totalRecords = 0;  // Total records count
  rowsPerPage = 10;  // Default page size
  first = 0; // 

  sortField = "firstName";
  sortOrder = 1;  

  constructor(
    private alertService: AlertService,
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
    sortField = "Member." + sortField;

    this.memberService.getMembersByOrganizationPage(organizationId, pageNo, pageSize, sortField, order).subscribe(
      (res) => {
        console.log(res);
        this.members = res.content;
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
          dataField: 'firstName',
          dataType: 'templateRef',
          colTemplateRefName: 'userFullnameColumn',
          headerText: 'First Name',
        },
        {
          dataField: 'lastName',
          dataType: 'templateRef',
          colTemplateRefName: 'userFullnameColumn',
          headerText: 'Last Name',
        },
        {
          dataField: 'email',
          dataType: 'any',
          colTemplateRefName: 'userFullnameColumn',
          headerText: 'Email',
        },
        {
          dataField: 'phoneNumber',
          dataType: 'templateRef',
          colTemplateRefName: 'userFullnameColumn',
          headerText: 'Mobile Number',
        },
        // {
        //   dataField: 'phoneNumber',
        //   dataType: 'templateRef',
        //   colTemplateRefName: 'userFullnameColumn',
        //   headerText: 'Mobile Number',
        // }
        // {
        //   dataField: 'jiraAccountId',
        //   dataType: 'id',
        //   headerText: 'JIRA Profile',
        //   textAlign: 'center',
        // },
        // {
        //   dataField: 'startDate',
        //   dataType: 'date',
        //   dateFormat: 'EEE dd-LLL-yyyy',
        //   headerText: 'Start Date',
        // },
        // {
        //   dataField: 'regularizationDate',
        //   dataType: 'date',
        //   dateFormat: 'EEE dd-LLL-yyyy',
        //   headerText: 'Regularization Date',
        // },
        // {
        //   dataField: 'enabled',
        //   dataType: 'templateRef',
        //   textAlign: 'center',
        //   colTemplateRefName: 'enableUserColumn',
        // },
      ],
      rows: this.members,
      sortField: 'firstName',
    };
  }


}
