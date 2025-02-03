import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { SessionService } from 'src/app/core/auth/services/session.service';
import { Session } from 'src/app/core/models/session';
import { PopoverModule } from 'primeng/popover';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { AuthenticationService } from 'src/app/core/auth/services/authentication.service';

@Component({
  selector: 'app-header',
  imports: [Menubar, BadgeModule, CardModule, ButtonGroupModule, DividerModule, PopoverModule, RouterModule, AvatarModule, ButtonModule, FloatLabelModule, InputTextModule, Ripple, CommonModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

    items: MenuItem[] | undefined;
    session: Session | null = null;

    members = [
        { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
    ];

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private sessionService: SessionService    
    ) {}

    ngOnInit() {
        this.session = this.sessionService.getSession();
        this.items = [
            {
                label: 'Explore',
                icon: 'pi pi-search-plus',
                route: '/home/explore'
            },
            {
                label: 'My Organization',
                icon: 'pi pi-sitemap',
                route: '/home/organization'
            },
            // {
            //     label: 'Co-Members',
            //     icon: 'pi pi-users',
            //     route: '/home/members' , My organization (to edit), Explore (theres an option to create your own organization), Members (assign admin)
            // },
            // {
            //     label: 'Calendar',
            //     icon: 'pi pi-calendar-plus',
            //     route: '/home/my-calendar'
            // },
            // {
            //     label: 'Programmatic',
            //     icon: 'pi pi-link',
            //     command: () => {
            //         this.router.navigate(['/installation']);
            //     }
            // },
            // {
            //     label: 'External',
            //     icon: 'pi pi-home',
            //     items: [
            //         {
            //             label: 'Angular',
            //             url: 'https://angular.io/'
            //         },
            //         {
            //             label: 'Vite.js',
            //             url: 'https://vitejs.dev/'
            //         }
            //     ]
            // }
        ];
    }

    onClickLogout() {
    this.authenticationService.logout().subscribe(
        (res) => {
            this.sessionService.clearSession();
            console.log(res);

            this.router.navigate(['/login']);
        },
        (err: any) => {
            console.log(err);
        }
        );
    }
}
