let mobileMenuInitialized = false;

function setupMobileMenu() {
  if (mobileMenuInitialized) return;
  mobileMenuInitialized = true;

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const overlay = document.getElementById("overlay");

  if (!hamburger || !navLinks || !overlay) {
    console.error("Mobile menu elements not found:", {
      hamburger: !!hamburger,
      navLinks: !!navLinks,
      overlay: !!overlay,
    });
    return;
  }

  // Calculate scrollbar width once
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  hamburger.addEventListener("click", () => {
    const isMenuOpen = !navLinks.classList.contains("active");

    if (isMenuOpen) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "";
      document.documentElement.style.overflow = "";
    }

    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("menu-open", isMenuOpen);
  });

  // Close menu when clicking on a nav link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close menu when clicking outside
  overlay.addEventListener("click", () => {
    closeMenu();
  });
}

function closeMenu() {
  const navLinks = document.getElementById("nav-links");
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("overlay");

  if (navLinks && navLinks.classList.contains("active")) {
    hamburger?.classList.remove("active");
    navLinks.classList.remove("active");
    overlay?.classList.remove("active");
    document.body.classList.remove("menu-open");
    document.body.style.paddingRight = "";
    document.documentElement.style.overflow = "";
  }
}

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.text();
    })
    .then((data) => {
      const container = document.getElementById("navbar-container");
      if (!container) {
        console.error("#navbar-container not found");
        return;
      }
      container.innerHTML = data;
      setupThemeToggle();

      const nav = document.querySelector("nav");
      const hasHero = document.querySelector(".hero");
      if (hasHero && nav) {
        nav.classList.add("has-hero");
      }

      window.addEventListener("scroll", () => {
        if (nav) {
          nav.classList.toggle("scrolled", window.scrollY > 50);
        }
      });

      setupMobileMenu();
    })
    .catch((err) => console.error("Navbar load failed:", err));
});
