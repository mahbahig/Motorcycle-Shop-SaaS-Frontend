import { Component, inject, model, OnInit, signal, WritableSignal } from '@angular/core';
import { ThemeService } from '@core/services/theme';

@Component({
  selector: 'app-navbar',
  imports: [],
templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  standalone: true,
})
export class Navbar implements OnInit {
  private readonly themeService = inject(ThemeService);
  sidebarHidden = model<boolean>(true);
  dateAr: WritableSignal<string> = signal('');

  ngOnInit() {
    const today = new Date();

    this.dateAr.set(
      today.toLocaleDateString('ar-EG', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    );
  }
  openSidebar(): void {
    this.sidebarHidden.set(false);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
