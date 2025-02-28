import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarComponent } from '../avatar/avatar.component';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { FormsModule } from '@angular/forms';
import { PhotoControlComponent } from '../photo-control/photo-control.component';
import { ReadableTitleComponent } from '../readable-title/readable-title.component';
import { ChipModule } from 'primeng/chip';
import { ProfileHeaderService } from '../../../core/services/profile-header.service';

@Component({
  selector: 'app-profile-header',
  imports: [CommonModule, AvatarModule, AvatarGroupModule, ChipModule, ImageCropperComponent, FormsModule, AvatarComponent, PhotoControlComponent, ReadableTitleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {

  @Input() backgroundImageUrl: string | undefined;
  @Input() logoUrl: string | undefined;
  @Input() title: string | undefined;
  @Input() isEditAllowed = false;

  @Output() backgroundImageUrlChange = new EventEmitter<string>(); 
  @Output() logoUrlChange = new EventEmitter<string>(); 

  constructor(
    private profileHeaderService: ProfileHeaderService
  ) {
    
  }

  onLogoChange(newLogoUrl: string) {
    this.profileHeaderService.setLogoImage(newLogoUrl);
  }

  onBackgroundImageChange(newBackgroundImageUrl: string) {
    this.profileHeaderService.setBackgroundImage(newBackgroundImageUrl);
  }

}
