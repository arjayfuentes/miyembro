import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Member } from 'src/app/core/models/member';

@Component({
  selector: 'app-member-other-details',
  imports: [CommonModule],
  templateUrl: './member-other-details.component.html',
  styleUrl: './member-other-details.component.scss'
})
export class MemberOtherDetailsComponent {

  @Input() member: Member | undefined;

}
