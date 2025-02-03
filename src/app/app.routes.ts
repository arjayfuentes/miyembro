import { Route } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { OrganizationComponent } from './features/home/pages/organization/organization.component';
import { ExploreComponent } from './features/home/explore/explore.component';
import { MembersComponent } from './features/home/members/members.component';
import { MyCalendarComponent } from './features/home/my-calendar/my-calendar.component';
import { UnAuthGuard } from './core/guards/unauth-guard';

export const appRoutes: Route[] = [
    {
      path: '',
      redirectTo: 'home',
       pathMatch: 'full',
       canActivate: [AuthGuard],
    },
    {
      path: 'home',
      loadComponent: () => import('./features/home/pages/home/home.component').then(mod => mod.HomeComponent),
      children: [
        { path: 'explore', component: ExploreComponent },
        { path: 'organization', component: OrganizationComponent },
        { path: 'members', component: MembersComponent },
        { path: 'my-calendar', component: MyCalendarComponent },
      ],
      canActivate: [AuthGuard],
    },
    {
        path: 'login',
        loadComponent: () => import('./core/auth/pages/login/login.component').then(mod => mod.LoginComponent),
        canActivate: [UnAuthGuard],
    },
    {
      path: 'choose-organization',
      loadComponent: () => import('./core/auth/pages/choose-organization/choose-organization.component').then(mod => mod.ChooseOrganizationComponent),
      // canActivate: [UnAuthGuard],

    },
    {
        path: 'register',
        loadComponent: () => import('./core/auth/pages/register/register.component').then(mod => mod.RegisterComponent),
        canActivate: [UnAuthGuard],

    },
    //  {
    //     path: '',
    //     redirectTo: 'home',
    //     pathMatch: 'full'
    //   },
      {
        path: '**',
        loadComponent: () => import('./core/auth/pages/page-not-found/page-not-found.component')
          .then(mod => mod.PageNotFoundComponent),
          canActivate: [UnAuthGuard],
      }
];
