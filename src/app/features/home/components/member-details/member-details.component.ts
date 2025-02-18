import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { Member } from 'src/app/core/models/member';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-member-details',
  imports: [AvatarModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.scss'
})
export class MemberDetailsComponent {

    @Input() member: Member | undefined;
    @Input() role: Role | undefined;

}
