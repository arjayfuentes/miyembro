import { Component, OnInit } from '@angular/core';
import { BackgroundComponent } from "../../../../shared/components/background/background.component";
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { OrganizationResponse } from 'src/app/core/models/organization-reponse';
import { FormsModule } from '@angular/forms';
import { MembershipService } from '../../../../shared/services/membership.service';
import { SessionService } from '../../services/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { SelectOrganizationLoginRequest } from 'src/app/core/models/select-login-organization-request';
import { Session } from 'src/app/core/models/session';
import { AlertService } from 'src/app/shared/services/alert.service';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-choose-organization',
  imports: [BackgroundComponent, CardModule, ListboxModule, FormsModule, CommonModule ],
  templateUrl: './choose-organization.component.html',
  styleUrl: './choose-organization.component.scss'
})
export class ChooseOrganizationComponent implements OnInit{
[x: string]: any;

  organizations: OrganizationResponse [] = [];
  selectedOrganization: OrganizationResponse | undefined;
  private redirectURL: string | undefined ;
  loginErrorMessage: string | null = null;
  session: Session | null = null;


  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private membershipService: MembershipService,
    private organizationService: OrganizationService,
    private router: Router,
    private sessionService: SessionService,
    private alertService: AlertService
  ) {
    
  }
  ngOnInit(): void {
    this.session = this.sessionService.getSession();
    const memberId = this.sessionService.getSession()?.member?.memberId;
    this.organizationService.getOrganizationsByMemberId(memberId).subscribe(
      (res) => {
        this.organizations = res;
      },
      (err: any) => {
        this.loginErrorMessage = err.error.message;
        console.log(err);
      }
    );
  }


  onSelectOrganization(event: any) {
    console.log(this.selectedOrganization);
    const memberId = this.sessionService.getSession()?.member.memberId;
    const selectOrganizationLoginRequest: SelectOrganizationLoginRequest = {
        organizationId: this.selectedOrganization?.organizationId ?? null,
        memberId: memberId ?? null
    }
    this.authenticationService.selectLoginOrganization(selectOrganizationLoginRequest).subscribe(
      (res) => {
        this.sessionService.setSession(res);
        console.log(this.sessionService.getSession());

        const session = this.sessionService.getSession();
        if(session) {
          localStorage.setItem('authToken', session.accessToken);
        }
        this.router.navigate(['/home/explore']);
        this.alertService.success('/login', 'Success', 'Succefully Login');
      },
      (err: any) => {
        this.loginErrorMessage = err.error.message;
      }
    );
    console.log(event);
  }


}
