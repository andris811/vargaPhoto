// theme.js
function applyTheme(darkMode) {
    document.body.classList.toggle("dark-mode", darkMode);
    const toggle = document.getElementById("theme-toggle");
    if (toggle) toggle.checked = darkMode;
  }
  
  function setupThemeToggle() {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    applyTheme(isDark);
  
    const toggle = document.getElementById("theme-toggle");
    if (toggle) {
      toggle.addEventListener("change", (e) => {
        const dark = e.target.checked;
        applyTheme(dark);
        localStorage.setItem("theme", dark ? "dark" : "light");
      });
    }
  }
  