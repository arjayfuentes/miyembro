import { Component } from '@angular/core';
import { MemberListComponent } from '../member-list/member-list.component';
import { TabsModule } from 'primeng/tabs';
import { MemberJoinRequestsComponent } from '../member-join-requests/member-join-requests.component';


@Component({
  selector: 'app-member-page',
  imports: [
    MemberListComponent,
    MemberJoinRequestsComponent,
    TabsModule
  ],
  templateUrl: './member-page.component.html',
  styleUrl: './member-page.component.scss'
})
export class MemberPageComponent {


}
