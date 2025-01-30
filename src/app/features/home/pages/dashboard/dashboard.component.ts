import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { Ripple } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-dashboard',
  imports: [Menubar, BadgeModule, AvatarModule, ButtonModule, FloatLabelModule, InputTextModule, Ripple, CommonModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              label: 'Home',
              icon: 'pi pi-home',
          },
          {
            label: 'Home',
            icon: 'pi pi-home',
        },
          {
              label: 'Projects',
              icon: 'pi pi-search',
              badge: '3',
              items: [
                  {
                      label: 'Core',
                      icon: 'pi pi-bolt',
                      shortcut: '⌘+S',
                  },
                  {
                      label: 'Blocks',
                      icon: 'pi pi-server',
                      shortcut: '⌘+B',
                  },
                  {
                      separator: true,
                  },
                  {
                      label: 'UI Kit',
                      icon: 'pi pi-pencil',
                      shortcut: '⌘+U',
                  },
              ],
          },
      ];
  }

}
