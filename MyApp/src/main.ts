import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';

import { AuthInterceptor } from './app/auth/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    // Tell HttpClient to look for HTTP_INTERCEPTORS in DI
    provideHttpClient(withInterceptorsFromDi()),

    // Register our AuthInterceptor so JWT is attached to every request
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },

    // Provide the router with our exported `routes`
    provideRouter(routes)
  ]
})
  .catch(err => console.error(err));
