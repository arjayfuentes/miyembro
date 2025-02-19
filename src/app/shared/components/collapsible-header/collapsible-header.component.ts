import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('logoUrlControl') logoUrlControl: AvatarComponent | null = null;

  items: MenuItem[];
  scrollSubscription!: Subscription;
  schrunk = false;
  triggerHeight = 235;


  constructor(
    private homeService: HomeService
  ) {
    this.items = [
      {
          label: 'Update Background',
          command: () => {
              this.updateBackgroundImage();
          }
      },
      {
          label: 'Update Profile Photo',
          command: () => {
              this.updateProfileImage();
          }
      }
  ];
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

  private updateBackgroundImage() {
    console.log('dadsad');
  }

  private updateProfileImage() {
    const avatarControl = this.logoUrlControl as AvatarComponent;
    if (avatarControl && avatarControl.fileInput) {
      avatarControl.triggerFileInput();
    }
  }
  
}
