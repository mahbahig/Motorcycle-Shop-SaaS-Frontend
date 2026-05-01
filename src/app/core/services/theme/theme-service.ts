import { Injectable, signal, computed, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  // ── State ──────────────────────────────────────────────
  readonly theme = signal<Theme>(this.getSavedTheme());

  // ── Derived ────────────────────────────────────────────
  readonly isDark = computed(() => this.theme() === 'dark');
  readonly isLight = computed(() => this.theme() === 'light');
  readonly icon = computed(() => (this.isDark() ? '☀️' : '🌙'));
  readonly label = computed(() => (this.isDark() ? 'Light Mode' : 'Dark Mode'));

  // ── Apply on every change ──────────────────────────────
  constructor() {
    effect(() => {
      const theme = this.theme();
      const html = document.documentElement;

      html.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('app-theme', theme);
    });
  }

  // ── Public API ─────────────────────────────────────────
  toggle(): void {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  // ── Init ───────────────────────────────────────────────
  private getSavedTheme(): Theme {
    const saved = localStorage.getItem('app-theme') as Theme | null;
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return saved ?? system; // respect OS preference on first visit
  }
}
