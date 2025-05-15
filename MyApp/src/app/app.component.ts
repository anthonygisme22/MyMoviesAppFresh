import { Component } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    NavbarComponent,
    RouterModule   // for <router-outlet>
  ],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent { }
