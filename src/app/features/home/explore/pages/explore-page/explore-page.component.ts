import { Component } from '@angular/core';
import { OrganizationListComponent } from "../../components/organization-list/organization-list.component";

@Component({
  selector: 'app-explore-page',
  imports: [OrganizationListComponent],
  templateUrl: './explore-page.component.html',
  styleUrl: './explore-page.component.scss'
})
export class ExplorePageComponent {

}
