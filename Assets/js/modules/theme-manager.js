export class ThemeManager {
  constructor() {
    this.html = document.documentElement;
    this.body = document.body;
    this.themeToggle = document.getElementById('themeToggle');
    this.sunIcon = document.getElementById('iconSun');
    this.moonIcon = document.getElementById('iconMoon');

    this.init();
  }

  init() {
    // 1. Determine theme (LocalStorage -> OS Preference -> Default)
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const theme = savedTheme || systemTheme;

    // 2. Initial theme application WITHOUT transition
    this.body.classList.add('no-transition');
    this.applyTheme(theme);

    // Force reflow to ensure the initial theme is applied without transition
    window.getComputedStyle(this.body).opacity;
    this.body.classList.remove('no-transition');

    // 3. Setup event listener
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // 4. Listen for OS theme changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        this.applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }

  toggleTheme() {
    const currentTheme = this.html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  applyTheme(theme) {
    this.html.setAttribute('data-theme', theme);

    if (this.sunIcon && this.moonIcon) {
      if (theme === 'dark') {
        this.sunIcon.style.display = 'block';
        this.moonIcon.style.display = 'none';
      } else {
        this.sunIcon.style.display = 'none';
        this.moonIcon.style.display = 'block';
      }
    }

    // Optional: Emit event for other modules
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }
}