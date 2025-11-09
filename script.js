/* ---------- Elements ---------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');
const mobileClose = document.getElementById('mobileClose');
const langBtn = document.getElementById('langBtn');
const langOptions = document.querySelectorAll('.lang-option');
const htmlRoot = document.documentElement;

/* WhatsApp number (with country code) */
const WHATSAPP_NUMBER = '919105179774';

/* ---------- Hamburger open/close ---------- */
function openMenu() {
  mobileMenu.classList.add('open');
  overlay.classList.add('show');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.setAttribute('aria-hidden', 'false');
}
function closeMenu() {
  mobileMenu.classList.remove('open');
  overlay.classList.remove('show');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
}

hamburger.addEventListener('click', () => {
  if (mobileMenu.classList.contains('open')) closeMenu(); else openMenu();
});
mobileClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

/* Close menu on link click (smooth UX) */
document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', () => closeMenu());
});

/* ---------- Language toggle (simple text swap) ---------- */
/* Translations for the menu keys */
const translations = {
  en: {
    home: 'Home', about: 'About Us', tests: 'Tests / Services', book: 'Book Test',
    contact: 'Contact / Help', offers: 'Offers / Discounts', language: 'Language',
    login: 'Login', register: 'Register'
  },
  hi: {
    home: 'होम', about: 'हमारे बारे में', tests: 'टेस्ट / सर्विसेज', book: 'टेस्ट बुक करें',
    contact: 'संपर्क / सहायता', offers: 'ऑफर / डिस्काउंट', language: 'भाषा',
    login: 'लॉगिन', register: 'रजिस्टर'
  }
};

function setLanguage(lang) {
  htmlRoot.setAttribute('data-lang', lang);
  // Update desktop nav & mobile menu text
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.getAttribute('data-key');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  // Update mobile nav span texts
  document.querySelectorAll('.mobile-nav .m-link').forEach(link => {
    const key = link.getAttribute('data-key');
    const span = link.querySelector('span');
    if (span && translations[lang] && translations[lang][key]) {
      span.textContent = translations[lang][key];
    }
  });
  // Update top lang button label (show other language suggestion)
  langBtn.textContent = (lang === 'en') ? 'हिंदी' : 'English';
}

/* Initialize language from root or default en */
let currentLang = htmlRoot.getAttribute('data-lang') || 'en';
setLanguage(currentLang);

/* Desktop toggle */
langBtn.addEventListener('click', () => {
  currentLang = (currentLang === 'en') ? 'hi' : 'en';
  setLanguage(currentLang);
});

/* Mobile lang options */
langOptions.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang');
    currentLang = lang;
    setLanguage(lang);
  });
});

/* ---------- WhatsApp booking form logic ---------- */
const testForm = document.getElementById('testForm');
if (testForm) {
  testForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = encodeURIComponent(document.getElementById('name').value.trim());
    const phone = encodeURIComponent(document.getElementById('phone').value.trim());
    const test = encodeURIComponent(document.getElementById('test').value.trim());
    const message = `Hello Testeasy,%0AName: ${name}%0APhone: ${phone}%0ATest: ${test}%0AI want to book this test.`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(url, '_blank');
  });
}

/* ---------- Accessibility: close menu on ESC ---------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
});
