import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'theme';

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  isDarkMode(): boolean {
    return document.documentElement.classList.contains('dark');
  }

  toggle(): void {
    const isDark = this.isDarkMode();
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem(this.storageKey, !isDark ? 'dark' : 'light');
  }
}
