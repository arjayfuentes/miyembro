import { Route } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { OrganizationComponent } from './features/home/pages/organization/pages/organization/organization.component';
import { UnAuthGuard } from './core/guards/unauth-guard';
import { ExplorePageComponent } from './features/home/explore/pages/explore-page/explore-page.component';
import { MemberPageComponent } from './features/home/members/pages/member-page/member-page.component';
import { CreateOrganizationPageComponent } from './features/home/create-organization/pages/create-organization-page/create-organization-page.component';
import { GoogleLoginComponent } from './core/auth/pages/google-login/google-login.component';

export const appRoutes: Route[] = [
    {
      path: '',
      redirectTo: 'home/explore',
       pathMatch: 'full',
      //  canActivate: [AuthGuard],
    },
    {
      path: 'home',
      loadComponent: () => import('./features/home/pages/home/home.component').then(mod => mod.HomeComponent),
      children: [
        { path: 'explore', component: ExplorePageComponent },
        { path: 'organization', component: OrganizationComponent },
        { path: 'members', component: MemberPageComponent },
        { path: 'create-organization', component: CreateOrganizationPageComponent },

      ],
      canActivate: [AuthGuard],
    },
    {
      path: 'edit-member-details',
      loadComponent: () => import('./features/edit-member-details/pages/edit-member-details-page/edit-member-details-page.component').then(mod => mod.EditMemberDetailsPageComponent),
      canActivate: [AuthGuard],
    },
    {
        path: 'login',
        loadComponent: () => import('./core/auth/pages/login/login.component').then(mod => mod.LoginComponent),
        canActivate: [UnAuthGuard],
    },
    {
      path: 'login/callback',
      component: GoogleLoginComponent,
      canActivate: [UnAuthGuard],
  },
    {
      path: 'choose-organization',
      loadComponent: () => import('./core/auth/pages/choose-organization/choose-organization.component').then(mod => mod.ChooseOrganizationComponent),
      canActivate: [UnAuthGuard],

    },
    {
        path: 'register',
        loadComponent: () => import('./core/auth/pages/sign-up/sign-up.component').then(mod => mod.SignUpComponent),
        canActivate: [UnAuthGuard],
    },
    
    {
      path: 'additional-info-signup',
      loadComponent: () => import('./core/auth/pages/additional-info-signup/additional-info-signup.component').then(mod => mod.AdditionalInfoSignupComponent),
      canActivate: [UnAuthGuard],
  },
  //   {
  //     path: 'register',
  //     loadComponent: () => import('./core/auth/pages/sign-up/sign-up.component').then(mod => mod.SignUpComponent),
  //     canActivate: [UnAuthGuard],

  // },
    //  {
    //     path: '',
    //     redirectTo: 'home',
    //     pathMatch: 'full'
    //   },
      {
        path: '**',
        loadComponent: () => import('./core/auth/pages/page-not-found/page-not-found.component')
          .then(mod => mod.PageNotFoundComponent),
          // canActivate: [UnAuthGuard],
      }
];
