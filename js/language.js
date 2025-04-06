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

// Function to change language
function changeLanguage(lang) {
  // Save to localStorage
  localStorage.setItem('preferredLanguage', lang);
  
  // Update active button state
  document.querySelectorAll('.language-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  // Update all translatable elements
  document.querySelectorAll('[data-translate]').forEach(el => {
    const key = el.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      if (el.placeholder) {
        el.placeholder = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });
  
  // Update page titles
  const pageTitles = {
    'index.html': translations[lang].siteTitle,
    'gallery.html': `${translations[lang].navGallery} - ${translations[lang].siteTitle}`,
    'contact.html': `${translations[lang].navContact} - ${translations[lang].siteTitle}`
  };
  
  const currentPage = window.location.pathname.split('/').pop();
  if (pageTitles[currentPage]) {
    document.title = pageTitles[currentPage];
  }
  
  // Update copyright year
  const year = new Date().getFullYear();
  document.querySelectorAll('footer p').forEach(el => {
    el.textContent = translations[lang].copyright.replace('{year}', year);
  });
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

// Initialize language
function initLanguage() {
  // Check for saved preference or browser language
  const savedLang = localStorage.getItem('preferredLanguage');
  const browserLang = navigator.language.substring(0, 2);
  const defaultLang = savedLang || (['en', 'hu', 'zh'].includes(browserLang) ? browserLang : 'en');
  
  changeLanguage(defaultLang);
  
  // Add event listeners to language buttons
  document.querySelectorAll('.language-option').forEach(btn => {
    btn.addEventListener('click', () => {
      changeLanguage(btn.dataset.lang);
    });
  });
}

// Wait for navbar to load then initialize
function waitForNavbar() {
  if (document.querySelector('.language-switcher')) {
    initLanguage();
  } else {
    setTimeout(waitForNavbar, 100);
  }
}

document.addEventListener('DOMContentLoaded', waitForNavbar);