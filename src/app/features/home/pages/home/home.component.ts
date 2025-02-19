import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { HomeService } from '../../services/home.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, RouterModule, FooterComponent, CommonModule, InfiniteScrollDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.25s ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomeComponent {

  constructor(private homeService: HomeService, private loaderService: LoaderService) {}

  onNativeScroll(event: Event): void {
    const target = event.target as HTMLElement;
    this.homeService.emitScrollEvent(target.scrollTop);
  }
  

}
