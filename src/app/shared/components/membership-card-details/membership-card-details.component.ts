import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { MembershipResponse } from 'src/app/core/models/membership-response';
import { OrganizationResponse } from 'src/app/core/models/organization-reponse';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-membership-card-details',
  imports: [CardModule, CommonModule, AvatarModule],
  templateUrl: './membership-card-details.component.html',
  styleUrl: './membership-card-details.component.scss'
})
export class MembershipCardDetailsComponent {

  @Input() organization: OrganizationResponse | undefined;
  @Input() membership: MembershipResponse | undefined;

}
