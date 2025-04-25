function applyTheme(darkMode) {
  document.body.classList.toggle("dark-mode", darkMode);
  const toggle = document.getElementById("theme-toggle");
  if (toggle) toggle.checked = darkMode;

  // Update logo for dark mode
  const logo = document.querySelector(".logo-img");
  if (logo) {
    logo.style.filter = darkMode ? "brightness(0.8) contrast(1.2)" : "none";
  }

  // Update theme label via language system
  if (window.changeLanguage) {
    const currentLanguage = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(currentLanguage); // This will refresh the theme label text
  }
}

function setupThemeToggle() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = savedTheme ? savedTheme === "dark" : prefersDark;

  applyTheme(isDark);

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("change", (e) => {
      const dark = e.target.checked;
      applyTheme(dark);
      localStorage.setItem("theme", dark ? "dark" : "light");
    });
  }

  // Follow system preference
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches);
      }
    });
}

// Make available for initialization
window.setupThemeToggle = setupThemeToggle;