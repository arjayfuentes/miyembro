import { Component, Input, OnInit } from '@angular/core';
import { ShrinkedHeaderComponent } from '../shrinked-header/shrinked-header.component';
import { ProfileHeaderComponent } from '../profile-header/profile-header.component';
import { HomeService } from 'src/app/features/home/services/home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-collapsible-header',
  imports: [ShrinkedHeaderComponent, ProfileHeaderComponent],
  templateUrl: './collapsible-header.component.html',
  styleUrl: './collapsible-header.component.scss'
})
export class CollapsibleHeaderComponent implements OnInit{

  @Input() backgroundImageUrl: string | undefined;
  @Input() logoUrl: string | undefined;
  @Input() title: string | undefined;

  scrollSubscription!: Subscription;
  schrunk = false;
  triggerHeight = 235;


  constructor(
    private homeService: HomeService
  ) {
    
  }

  ngOnInit(): void {
    this.scrollSubscription = this.homeService.scrollObservable$.subscribe(
      (scrollTop) => {
        if (scrollTop >= this.triggerHeight) {
          this.schrunk = true;
        } else {
          this.schrunk = false;
        }
      }
    );
  }
  
}
