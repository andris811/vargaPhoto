function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('overlay');
  
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open', navLinks.classList.contains('active'));
      });
  
      // Close menu when clicking on a nav link
      document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          closeMenu();
        });
      });
  
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        const isClickInside = hamburger.contains(e.target) || navLinks.contains(e.target);
        if (!isClickInside && navLinks.classList.contains('active')) {
          closeMenu();
        }
      });
    }
  }
  
  function closeMenu() {
    document.getElementById('hamburger')?.classList.remove('active');
    document.getElementById('nav-links')?.classList.remove('active');
    document.getElementById('overlay')?.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
  
  // Wait for DOM to load
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('nav-links')) {
      setupMobileMenu();
    }
  });

  // back to top button
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  