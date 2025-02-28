import { Component } from '@angular/core';
import { MemberListComponent } from '../member-list/member-list.component';
import { TabsModule } from 'primeng/tabs';
import { MemberPendingRequestComponent } from "../member-pending-request/member-pending-request.component";


@Component({
  selector: 'app-member-page',
  imports: [
    MemberListComponent,
    MemberPendingRequestComponent,
    TabsModule
  ],
  templateUrl: './member-page.component.html',
  styleUrl: './member-page.component.scss'
})
export class MemberPageComponent {


}
