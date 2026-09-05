import { Injectable } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: ThemeMode = 'light';

  constructor() {
    this.initTheme();
  }

  initTheme(): void {
    const savedTheme = localStorage.getItem('dealnepal_theme') as ThemeMode;
    if (savedTheme === 'dark' || savedTheme === 'light') {
      this.currentTheme = savedTheme;
    } else {
      this.currentTheme = 'light'; // Default to Light Mode as requested
    }
    this.applyTheme(this.currentTheme);
  }

  getCurrentTheme(): ThemeMode {
    return this.currentTheme;
  }

  isDarkMode(): boolean {
    return this.currentTheme === 'dark';
  }

  toggleTheme(): void {
    const nextTheme: ThemeMode = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(nextTheme);
  }

  setTheme(theme: ThemeMode): void {
    this.currentTheme = theme;
    localStorage.setItem('dealnepal_theme', theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: ThemeMode): void {
    const root = document.documentElement;
    const body = document.body;

    if (theme === 'dark') {
      root.classList.add('dark', 'dark-theme');
      root.classList.remove('light-theme');
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark', 'dark-theme');
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
    }
  }
}
