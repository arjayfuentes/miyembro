import { Component, Input } from '@angular/core';
import { Address } from '../../model/address';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  imports: [CommonModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {

  @Input() address: Address | undefined;
  @Input() email: string | undefined;
  @Input() phoneNumber: string | undefined;
  @Input() websiteUrl: string | undefined;
  @Input() showEmail = false;
  @Input() showTitleHeader = false;
  @Input() textSize = 'normal';

}
