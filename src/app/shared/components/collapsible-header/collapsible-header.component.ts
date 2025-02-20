import {  Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ShrinkedHeaderComponent } from '../shrinked-header/shrinked-header.component';
import { ProfileHeaderComponent } from '../profile-header/profile-header.component';
import { HomeService } from 'src/app/features/home/services/home.service';
import { Subscription } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { AvatarComponent } from '../avatar/avatar.component';
import { FormsModule } from '@angular/forms';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-collapsible-header',
  imports: [ShrinkedHeaderComponent, ProfileHeaderComponent, ButtonModule, CommonModule, SplitButtonModule, FormsModule, AvatarComponent],
  templateUrl: './collapsible-header.component.html',
  styleUrl: './collapsible-header.component.scss'
})
export class CollapsibleHeaderComponent implements OnInit{

  @Input() backgroundImageUrl: string | undefined;
  @Input() isEditAllowed = false;
  @Input() logoUrl: string | undefined;
  @Input() title: string | undefined;
  @Output() backgroundImageUrlChange = new EventEmitter<string>(); 
  @Output() logoUrlChange = new EventEmitter<string>(); 
  
  scrollSubscription!: Subscription;
  schrunk = false;
  triggerHeight = 250;


  constructor(
    private homeService: HomeService,
    private organizationService: OrganizationService,
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

  
  
  onLogoChange(newLogoUrl: string) {
    this.logoUrl = newLogoUrl;
    this.logoUrlChange.emit(newLogoUrl); 
  }

  onBackgroundImageChange(newBackgroundImageUrl: string) {
    this.backgroundImageUrl = newBackgroundImageUrl;
    this.backgroundImageUrlChange.emit(newBackgroundImageUrl); 
  }
  
}
