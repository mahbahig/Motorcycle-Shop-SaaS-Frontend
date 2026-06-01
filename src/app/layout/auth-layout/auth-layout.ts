import { Component, inject } from '@angular/core';
import { Login } from '@pages/login/login';
import { ThemeService } from '@core/services/theme';

@Component({
  selector: 'app-auth-layout',
  imports: [Login],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
  standalone: true,
})
export class AuthLayout {
  private readonly themeService = inject(ThemeService);
  features: string[] = [''];

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
