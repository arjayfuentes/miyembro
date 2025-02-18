import { Component, Input } from '@angular/core';
import { OrganizationResponse } from 'src/app/core/models/organization-reponse';
import { ContactDetailsComponent } from 'src/app/shared/components/contact-details/contact-details.component';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-organization-about-us',
  imports: [ContactDetailsComponent, CardModule],
  templateUrl: './organization-about-us.component.html',
  styleUrl: './organization-about-us.component.scss'
})
export class OrganizationAboutUsComponent {

  @Input() organization: OrganizationResponse | null = null;

}
