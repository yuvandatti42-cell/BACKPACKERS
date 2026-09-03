/**
 * BACKPACKERS DESTINATIONS — INTERACTION LOGIC
 * Clean Vanilla ES6 script with focus on accessibility and performance.
 */

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initHeaderAndScrollProgress();
  initMobileMenu();
  initCategoriesInteraction();
  initDestinationSpotlight();
  initPlannerForm();
});

/**
 * Splash Screen Animation & Session Handling
 */
function initSplashScreen() {
  const splash = document.getElementById('splashScreen');
  if (!splash) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasSeenSplash = sessionStorage.getItem('bd_splash_seen');

  if (hasSeenSplash) {
    splash.style.display = 'none';
  } else {
    const duration = prefersReducedMotion ? 500 : 2200;
    setTimeout(() => {
      splash.classList.add('is-exiting');
    }, duration);
    setTimeout(() => {
      splash.style.display = 'none';
      sessionStorage.setItem('bd_splash_seen', 'true');
    }, duration + 600);
  }
}

/**
 * Header Scroll & Hairline Reading Progress
 */
function initHeaderAndScrollProgress() {
  const header = document.querySelector('.site-header');
  const progressBar = document.querySelector('.scroll-progress-bar');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Scroll Progress
    if (progressBar && totalScroll > 0) {
      const progress = Math.min(100, Math.max(0, (scrollY / totalScroll) * 100));
      progressBar.style.width = `${progress}%`;
    }

    // Header Scroll Styling
    if (header) {
      if (scrollY > 40) {
        header.classList.add('nav-scrolled');
      } else {
        header.classList.remove('nav-scrolled');
      }
    }
  }, { passive: true });
}

/**
 * Accessible Mobile Navigation Drawer
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const links = document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn');

  if (!toggleBtn || !drawer) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !drawer.classList.contains('is-open');
    drawer.classList.toggle('is-open', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  toggleBtn.addEventListener('click', () => toggleMenu());

  links.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      toggleMenu(false);
    }
  });
}

/**
 * Categories Interactive Sibling Focus & Navigation
 */
function initCategoriesInteraction() {
  const catGrid = document.getElementById('categoriesGrid');
  const catCards = document.querySelectorAll('.category-lead-card, .category-sub-card');
  if (!catGrid || !catCards.length) return;

  catCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      catGrid.classList.add('has-active-child');
      catCards.forEach(c => {
        if (c === card) {
          c.classList.add('is-active');
          c.classList.remove('is-dimmed');
        } else {
          c.classList.remove('is-active');
          c.classList.add('is-dimmed');
        }
      });
    });

    card.addEventListener('mouseleave', () => {
      catGrid.classList.remove('has-active-child');
      catCards.forEach(c => {
        c.classList.remove('is-active', 'is-dimmed');
      });
    });

    // Sub-card click smooth scroll to planner
    if (card.classList.contains('category-sub-card')) {
      card.addEventListener('click', () => {
        const plannerEl = document.getElementById('planner');
        if (plannerEl) plannerEl.scrollIntoView({ behavior: 'smooth' });
      });
    }
  });
}

/**
 * Destination Spotlight Switcher
 * Real verified destinations: Ladakh, Kerala, Karnataka, Tamil Nadu
 */
const DESTINATIONS_DATA = {
  ladakh: {
    title: "Ladakh High Passes",
    terrain: "Mountain Passes, High-Altitude Valleys, Cold Desert",
    description: "High mountain roads across Khardung La and Chang La. Cold desert landscapes, high-altitude lakes, and raw Himalayan passes.",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
    alt: "Rugged high-altitude mountain valley road in Ladakh",
    badge: "LADAKH CORRIDOR",
    code: "BD-EXP-01"
  },
  kerala: {
    title: "Kerala Backwaters & Western Ghats",
    terrain: "Coastal Roads, Tropical Forests, Tea Plantations",
    description: "Winding routes through Munnar tea hills, misty Ghat passes, and tranquil backwater coastal paths.",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    alt: "Misty tea hills and winding roads in Western Ghats, Kerala",
    badge: "KERALA CORRIDOR",
    code: "BD-EXP-02"
  },
  karnataka: {
    title: "Karnataka Heritage & Western Ghats",
    terrain: "Ancient Boulders, Western Ghats Ridge, Dense Foliage",
    description: "From the boulder terrain of Hampi to the dense rainforest corridors of Coorg and Chikmagalur.",
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80",
    alt: "Historical stone architecture and landscape in Karnataka",
    badge: "KARNATAKA CORRIDOR",
    code: "BD-EXP-03"
  },
  tamilnadu: {
    title: "Tamil Nadu Mountain Corridors",
    terrain: "Hairpin Bends, Shola Forests, High Ridges",
    description: "The 36 hairpin bends of Valparai, high Nilgiri mountain passes, and historic temple-flanked routes.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    alt: "Dramatic mountain roads and viewpoints in Tamil Nadu",
    badge: "TAMIL NADU CORRIDOR",
    code: "BD-EXP-04"
  }
};

function initDestinationSpotlight() {
  const buttons = document.querySelectorAll('.dest-nav-btn');
  const previewBox = document.querySelector('.destination-preview-box');
  const imgElement = document.getElementById('destSpotlightImg');
  const titleElement = document.getElementById('destSpotlightTitle');
  const terrainElement = document.getElementById('destSpotlightTerrain');
  const descElement = document.getElementById('destSpotlightDesc');
  const badgeElement = document.getElementById('destSpotlightBadge');
  const codeElement = document.getElementById('destSpotlightCode');

  if (!buttons.length || !imgElement) return;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.classList.contains('is-active')) return;

      const key = button.getAttribute('data-dest');
      const data = DESTINATIONS_DATA[key];
      if (!data) return;

      buttons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
        const dot = b.querySelector('.branch-node-dot');
        if (dot) dot.classList.remove('is-active-dot');
      });
      button.classList.add('is-active');
      button.setAttribute('aria-selected', 'true');
      const activeDot = button.querySelector('.branch-node-dot');
      if (activeDot) activeDot.classList.add('is-active-dot');

      if (previewBox) {
        previewBox.classList.remove('is-entering');
        previewBox.classList.add('is-exiting');
      }

      setTimeout(() => {
        imgElement.src = data.image;
        imgElement.alt = data.alt;
        if (titleElement) titleElement.textContent = data.title;
        if (terrainElement) terrainElement.textContent = data.terrain;
        if (descElement) descElement.textContent = data.description;
        if (badgeElement) badgeElement.textContent = data.badge;
        if (codeElement) codeElement.textContent = data.code;

        if (previewBox) {
          previewBox.classList.remove('is-exiting');
          previewBox.classList.add('is-entering');
        }
      }, 200);
    });
  });
}

/**
 * Trip Planner Form with Accessible Validation & Loading State
 */
function initPlannerForm() {
  const form = document.getElementById('inquiryForm');
  const feedback = document.getElementById('formFeedback');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('userName');
    const phoneInput = document.getElementById('userPhone');
    const destSelect = document.getElementById('userDestination');
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');

    // Validation
    if (!nameInput.value.trim()) {
      nameInput.classList.add('is-error');
      if (nameError) nameError.style.display = 'block';
      isValid = false;
    } else {
      nameInput.classList.remove('is-error');
      if (nameError) nameError.style.display = 'none';
    }

    const phoneRegex = /^[0-9+\s-]{8,15}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
      phoneInput.classList.add('is-error');
      if (phoneError) phoneError.style.display = 'block';
      isValid = false;
    } else {
      phoneInput.classList.remove('is-error');
      if (phoneError) phoneError.style.display = 'none';
    }

    if (!isValid) return;

    // Loading State
    const originalText = submitBtn.innerHTML;
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>SUBMITTING INQUIRY...</span>';

    // Simulate API Dispatch
    await new Promise(resolve => setTimeout(resolve, 900));

    // Success State
    submitBtn.classList.remove('is-loading');
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;

    if (feedback) {
      feedback.textContent = `Thank you, ${nameInput.value.trim()}! Your expedition inquiry for ${destSelect.value || 'your route'} has been received. Our team will contact you within 24 hours.`;
      feedback.classList.add('is-visible');
      form.reset();

      setTimeout(() => {
        feedback.classList.remove('is-visible');
      }, 7000);
    }
  });
}
