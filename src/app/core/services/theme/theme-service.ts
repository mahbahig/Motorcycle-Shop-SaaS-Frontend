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
      this.persistTheme(theme);
    });
  }

  // ── Public API ─────────────────────────────────────────
  /**
   * Toggle between light and dark themes
   */
  toggle(): void {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }

  /**
   * Set a specific theme
   */
  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  /**
   * Get the current theme without subscribing to changes
   */
  getCurrentTheme(): Theme {
    return this.theme();
  }

  /**
   * Initialize theme immediately on app startup (prevents flash of unstyled content)
   * Call this early in main.ts before app bootstrap
   */
  initializeTheme(): void {
    const theme = this.getSavedTheme();
    this.theme.set(theme);
    const html = document.documentElement;
    html.classList.toggle('dark', theme === 'dark');
  }

  // ── Private Helpers ───────────────────────────────────
  /**
   * Get saved theme from localStorage, with fallback to OS preference on first visit.
   * Always guarantees a valid theme is returned (never null/undefined).
   */
  private getSavedTheme(): Theme {
    try {
      const saved = localStorage.getItem('app-theme') as Theme | null;
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch (e) {
      // localStorage might be blocked or unavailable in some environments
      console.warn('LocalStorage unavailable for theme persistence', e);
    }

    // Fallback: use OS preference on first visit (user requirement: no device default on refresh)
    // This only happens if localStorage is empty or inaccessible
    const system = globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    return system;
  }

  /**
   * Persist theme to localStorage with error handling
   */
  private persistTheme(theme: Theme): void {
    try {
      localStorage.setItem('app-theme', theme);
    } catch (e) {
      // localStorage might be blocked (private browsing, storage full, etc.)
      console.warn('Failed to persist theme to localStorage', e);
    }
  }
}
