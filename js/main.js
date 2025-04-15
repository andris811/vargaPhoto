// import { setupMobileMenu } from './navbar.js';
// import { initLanguage } from './language.js';

// document.addEventListener('DOMContentLoaded', () => {
//   waitForNavbar();
// });

// function waitForNavbar() {
//   if (document.getElementById('nav-links')) {
//     setupMobileMenu();
//     initLanguage();
//   } else {
//     setTimeout(waitForNavbar, 100);
//   }
// }


// Footer
async function loadFooter() {
    try {
      const response = await fetch('footer.html');
      const footerHTML = await response.text();
      document.getElementById('footer-placeholder').innerHTML = footerHTML;
    } catch (error) {
      console.error('Error loading footer:', error);
    }
  }

  document.addEventListener('DOMContentLoaded', loadFooter);