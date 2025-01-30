import { Component, OnInit } from '@angular/core';
import { BackgroundComponent } from "../../../../shared/components/background/background.component";
import { CardModule } from 'primeng/card';
import { ListboxModule } from 'primeng/listbox';
import { OrganizationResponse } from 'src/app/core/models/organization-reponse';
import { FormsModule } from '@angular/forms';
import { MembershipService } from '../../services/membership.service';
import { SessionService } from '../../services/session.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-choose-organization',
  imports: [BackgroundComponent, CardModule, ListboxModule, FormsModule ],
  templateUrl: './choose-organization.component.html',
  styleUrl: './choose-organization.component.scss'
})
export class ChooseOrganizationComponent implements OnInit{

  organizations: OrganizationResponse [] = [];
  selectedOrganization: OrganizationResponse | undefined;
  private redirectURL: string | undefined ;
  loginErrorMessage: string | null = null;


  constructor(
    private activatedRoute: ActivatedRoute,
    private membershipService: MembershipService,
    private router: Router,
    private sessionService: SessionService
  ) {
    
  }
  ngOnInit(): void {
    const memberId = localStorage.getItem('memberId'); // Get token from localStorage
    this.membershipService.getOrganizationByMemberId(memberId).subscribe(
      (res) => {
        this.organizations = res;
        // if(this.organizations.length == 0) {
        //   this.router.navigate(['/']);
        // } else {
        //   if (this.redirectURL) {
        //     this.router.navigateByUrl(this.redirectURL);
        //   } else {
        //     this.router.navigate(['/']);
        //   }
        // }
        
      },
      (err: any) => {
        console.log(err);
        this.loginErrorMessage = err.error.message;
      }
    );
  }



}
