function setupMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const overlay = document.getElementById("overlay");

  // Calculate scrollbar width once
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isMenuOpen = !navLinks.classList.contains("active");

      if (isMenuOpen) {
        // Apply compensation before opening
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        document.documentElement.style.overflow = "hidden"; // Prevent scrolling
      } else {
        // Remove compensation after closing
        document.body.style.paddingRight = "";
        document.documentElement.style.overflow = "";
      }

      // Toggle menu states
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.classList.toggle("menu-open", isMenuOpen);
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll("#nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Close menu when clicking outside
    overlay.addEventListener("click", () => {
      closeMenu();
    });
  }
}

function closeMenu() {
  const navLinks = document.getElementById("nav-links");
  if (navLinks && navLinks.classList.contains("active")) {
    document.getElementById("hamburger")?.classList.remove("active");
    navLinks.classList.remove("active");
    document.getElementById("overlay")?.classList.remove("active");
    document.body.classList.remove("menu-open");

    // Remove compensation
    document.body.style.paddingRight = "";
    document.documentElement.style.overflow = "";
  }
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;
      setupThemeToggle();
    });
  if (document.getElementById("nav-links")) {
    setupMobileMenu();
  }
});
