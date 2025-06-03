// File: frontend/src/app/shared/navbar/navbar.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchTerm = '';
  isDarkMode = false;
  isMobileOpen = false; // <- add this

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.isDarkMode = document.documentElement.classList.contains('dark');
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  onSearch(): void {
    const q = this.searchTerm.trim();
    if (q) {
      this.router.navigate(['/movies'], { queryParams: { q } });
    }
    this.searchTerm = '';
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}
