module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        primaryHover: 'var(--color-primary-hover)',
        primaryMuted: 'var(--color-primary-muted)',
        primaryGlow: 'var(--color-primary-glow)',
        secondary: 'var(--color-secondary)',
        secondaryHover: 'var(--color-secondary-hover)',
        accent: 'var(--color-accent)',

        bgBase: 'var(--color-bg-base)',
        bgSurface: 'var(--color-bg-surface)',
        bgElevated: 'var(--color-bg-elevated)',
        bgRaised: 'var(--color-bg-raised)',
        bgInput: 'var(--color-bg-input)',
        bgOverlay: 'var(--color-bg-overlay)',

        textBase: 'var(--color-text-base)',
        textSecondary: 'var(--color-text-secondary)',
        textMuted: 'var(--color-text-muted)',
        textFaint: 'var(--color-text-faint)',
        textInverse: 'var(--color-text-inverse)',

        border: 'var(--color-border)',
        borderStrong: 'var(--color-border-strong)',
        borderFocus: 'var(--color-border-focus)',

        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        btn: 'var(--shadow-btn)',
        modal: 'var(--shadow-modal)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius-base)',
        lg: 'var(--radius-lg)',
      },
    },
  },
  plugins: [],
};
