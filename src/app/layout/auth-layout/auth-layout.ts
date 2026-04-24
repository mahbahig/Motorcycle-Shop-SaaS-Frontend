import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
})
export class AuthLayout {

  applyTheme = (theme: string) => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('kp-theme', theme);

      const isDark = theme === 'dark';
      // Update moon / sun icons
      document.getElementById('login-moon-icon').style.display = isDark  ? 'inline' : 'none';
      document!.getElementById('login-sun-icon').style.display  = !isDark ? 'inline' : 'none';
      document!.getElementById('login-theme-label').textContent = isDark ? 'Dark' : 'Light';
  }

  toggleTheme = () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      this.applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  constructor() {
      this.applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');
  }
}

