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
  members: Member [] = [];
  title = 'Member';
  session: Session | null = null;

  constructor(
    private alertService: AlertService,
    private sessionService: SessionService,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.populateTable();
    this.session = this.sessionService.getSession();
  }

  private populateTable() {
    const session = this.sessionService.getSession();
    const organizationId = session?.organization?.organizationId;
    this.memberService.getMembersByOrganization(organizationId).subscribe(
      (res) => {
        console.log(res);
        this.members = res;
        this.setTableData();
      },
      (err: any) => {
        console.log(err);
      }
    );
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
