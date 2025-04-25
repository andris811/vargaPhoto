// Translation data
const translations = {
  en: {
    siteTitle: "Varga Photography",
    navHome: "Home",
    navGallery: "Gallery",
    navContact: "Contact",
    heroTitle: "Varga Photography",
    heroDescription: "Exploring the beauty of travel and nature through my lens.",
    viewGallery: "View Gallery",
    introTitle: "Welcome to My World",
    introText: "Hello! I'm a passionate traveler and nature lover, capturing unique moments and breathtaking landscapes from around the world. This website is my personal showcase, where each photo tells a story. Dive in and explore!",
    galleryTitle: "Gallery",
    contactTitle: "Contact Me",
    namePlaceholder: "Your Name",
    emailPlaceholder: "Your Email",
    messagePlaceholder: "Your Message",
    sendButton: "Send",
    copyright: "© {year} Varga Photography"
  },
  hu: {
    siteTitle: "Varga Fotó",
    navHome: "Kezdőlap",
    navGallery: "Galéria",
    navContact: "Kapcsolat",
    heroTitle: "Varga Fotó",
    heroDescription: "Utazás és természet szépségének felfedezése a lencsém mögül.",
    viewGallery: "Galéria Megtekintése",
    introTitle: "Üdvözöllek a világomban",
    introText: "Sziasztok! Szenvedélyes utazó és természetkedvelő vagyok, aki egyedi pillanatokat és lenyűgöző tájakat örökít meg a világ minden tájáról. Ez a weboldal a személyes kiállításom, ahol minden fotó egy történetet mesél el. Fedezd fel!",
    galleryTitle: "Galéria",
    contactTitle: "Kapcsolat",
    namePlaceholder: "Neved",
    emailPlaceholder: "Email címed",
    messagePlaceholder: "Üzeneted",
    sendButton: "Küldés",
    copyright: "© {year} Varga Fotó"
  },
  zh: {
    siteTitle: "瓦尔加摄影",
    navHome: "首页",
    navGallery: "画廊",
    navContact: "联系",
    heroTitle: "瓦尔加摄影",
    heroDescription: "通过我的镜头探索旅行和自然的美丽。",
    viewGallery: "查看画廊",
    introTitle: "欢迎来到我的世界",
    introText: "你好！我是一个充满激情的旅行者和自然爱好者，捕捉来自世界各地的独特时刻和令人叹为观止的风景。这个网站是我的个人展示，每张照片都讲述一个故事。快来探索吧！",
    galleryTitle: "画廊",
    contactTitle: "联系我",
    namePlaceholder: "您的姓名",
    emailPlaceholder: "您的邮箱",
    messagePlaceholder: "您的留言",
    sendButton: "发送",
    copyright: "© {year} 瓦尔加摄影"
  }
};

// Main function to change language
async function changeLanguage(lang) {
  try {
    // Try loading from JSON first
    const response = await fetch(`public/lang/${lang}.json`);
    const langData = response.ok ? await response.json() : translations[lang];
    
    // 1. Update UI elements with support for nested keys
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      let translation = langData;
      
      // Handle nested keys (e.g., filters.nature)
      const keys = key.split('.');
      for (const k of keys) {
        translation = translation?.[k];
        if (!translation) break;
      }

      if (translation) {
        if (el.placeholder) {
          el.placeholder = translation;
        } else {
          el.textContent = translation;
        }
      }
    });

    // 2. Update theme toggle label based on current mode
    const themeLabel = document.querySelector('.theme-label');
    if (themeLabel) {
      const darkMode = document.body.classList.contains('dark-mode');
      themeLabel.textContent = darkMode 
        ? langData.theme?.light || 'Light Mode' 
        : langData.theme?.dark || 'Dark Mode';
    }

    // 3. Update active button state
    document.querySelectorAll('.language-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // 4. Save preference and update HTML lang attribute
    localStorage.setItem('preferredLanguage', lang);
    document.documentElement.lang = lang;

    // 5. Update page title
    const pageMap = {
      'index.html': langData.siteTitle,
      'gallery.html': `${langData.navGallery} - ${langData.siteTitle}`,
      'contact.html': `${langData.navContact} - ${langData.siteTitle}`
    };
    const currentPage = window.location.pathname.split('/').pop();
    if (pageMap[currentPage]) document.title = pageMap[currentPage];

    // 6. Update copyright
    const year = new Date().getFullYear();
    document.querySelectorAll('footer p').forEach(el => {
      el.textContent = langData.copyright?.replace('{year}', year) || `© ${year} Varga Photography`;
    });

  } catch (error) {
    console.error('Language change failed:', error);
    // Fallback to English if error occurs
    if (lang !== 'en') changeLanguage('en');
  }
}

// Initialize language system
function initLanguage() {
  // 1. Set up button listeners
  document.querySelectorAll('.language-option').forEach(btn => {
    btn.addEventListener('click', () => changeLanguage(btn.dataset.lang));
  });

  // 2. Determine default language
  const savedLang = localStorage.getItem('preferredLanguage');
  const browserLang = navigator.language.substring(0, 2);
  const defaultLang = savedLang || (['en', 'hu', 'zh'].includes(browserLang) ? browserLang : 'en');
  
  // 3. Apply default language
  changeLanguage(defaultLang);
}

// Modified waitForNavbar function
function waitForNavbar() {
  if (document.getElementById('nav-links')) {
    initLanguage();
    setupMobileMenu();
  } else {
    setTimeout(waitForNavbar, 100);
  }
}

// Start everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  waitForNavbar(); // This will initialize both language system and mobile menu when navbar is ready
});

// Make changeLanguage available globally for theme.js
window.changeLanguage = changeLanguage;