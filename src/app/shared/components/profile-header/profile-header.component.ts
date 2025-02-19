import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarComponent } from '../avatar/avatar.component';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { FormsModule } from '@angular/forms';
import { PhotoControlComponent } from '../photo-control/photo-control.component';

@Component({
  selector: 'app-profile-header',
  imports: [CommonModule, AvatarModule, AvatarGroupModule, ImageCropperComponent, FormsModule, AvatarComponent, PhotoControlComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {

  @Input() backgroundImageUrl: string | undefined;
  @Input() logoUrl: string | undefined;
  @Input() title: string | undefined;
  @Input() isEditAllowed = false;

}
