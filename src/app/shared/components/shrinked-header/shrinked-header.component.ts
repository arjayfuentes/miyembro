import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-shrinked-header',
  imports: [CommonModule, AvatarModule, AvatarGroupModule],
  templateUrl: './shrinked-header.component.html',
  styleUrl: './shrinked-header.component.scss'
})
export class ShrinkedHeaderComponent implements OnChanges{

  @Input() backgroundImageUrl: string | undefined;
  @Input() logoUrl: string | undefined;
  @Input() title: string | undefined;
  @Input() visible = false;


   ngOnChanges(changes: SimpleChanges): void {
      if (changes['backgroundImageUrl'] && this.backgroundImageUrl) {
        console.log('SRHINK HEADER', this.backgroundImageUrl);
      }
    }

}
