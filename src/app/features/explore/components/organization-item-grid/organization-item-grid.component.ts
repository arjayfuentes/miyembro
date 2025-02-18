import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OrganizationResponse } from 'src/app/core/models/organization-reponse';

@Component({
  selector: 'app-organization-item-grid',
  imports: [ButtonModule],
  templateUrl: './organization-item-grid.component.html',
  styleUrl: './organization-item-grid.component.scss'
})
export class OrganizationItemGridComponent {

  @Output() organizationClickChanged = new EventEmitter<OrganizationResponse | undefined>();
  @Input() organization: OrganizationResponse | undefined;

  onClickOrganization(organization: OrganizationResponse | undefined) {
    this.organizationClickChanged.emit(organization);
  }

  // Handle keyboard events (for accessibility)
  onKeyboardEvent(event: KeyboardEvent, organization: any) {
    if (event.key === 'Enter' || event.key === ' ') {  // Space or Enter key
      this.onClickOrganization(organization);  // Trigger click action
    }
  }

}
