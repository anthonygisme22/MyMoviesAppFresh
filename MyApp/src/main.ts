/********************************************************************
 *  Stand‑alone bootstrap (Angular, no NgModule)                    *
 *******************************************************************/
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation
} from '@angular/router';

import { environment } from './environments/environment';

/* root component & helpers */
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { TokenInterceptor } from './app/auth/token.interceptor';

/* -------------------------------------------------------------- */
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    /* Router */
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation()
    ),

    /* HttpClient picks up DI‑registered interceptors */
    provideHttpClient(withInterceptorsFromDi()),

    /* Register the TokenInterceptor in DI */
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
}).catch(err => console.error(err));
