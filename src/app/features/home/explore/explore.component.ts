import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { Session } from 'src/app/core/models/session';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-explore',
  imports: [CommonModule],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {


  session: Session | null = null;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService
  ) {
    this.session = this.sessionService.getSession();
  }

  goToLogin() {
    this.router.navigate(['/login']);

  }

}
