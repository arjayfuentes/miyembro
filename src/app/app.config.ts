import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import Material from '@primeng/themes/material';

import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { JwtTokenInterceptor } from './core/auth/interceptors/jwt-token.interceptor';
import { SessionService } from './core/auth/services/session.service';
import { MessageService } from 'primeng/api';
import { AlertService } from './shared/services/alert.service';
import { provideOAuthClient } from 'angular-oauth2-oidc';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideOAuthClient(),
    providePrimeNG({
        theme: {
            preset: Aura , options: {
              darkModeSelector: '.my-app-dark',
              cssLayer: {
                  name: 'primeng',
                  order: 'tailwind-base, primeng, tailwind-utilities'
              }
          }
        }
    }),
    provideHttpClient(),
    SessionService,
    MessageService,
    AlertService,
    provideHttpClient(withInterceptors([JwtTokenInterceptor])),
  ]
};
