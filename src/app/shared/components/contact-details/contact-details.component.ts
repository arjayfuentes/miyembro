import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../../model/address';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-details',
  imports: [CommonModule, ButtonModule],
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

  @Output() editAddress = new EventEmitter<boolean>(); 


  onEditAddress() {
    this.editAddress.emit(true);
  }

}
