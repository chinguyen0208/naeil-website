// Preloader — a real asset-gated brand moment, not a fixed timer. Each
// page's own tiny inline <script> (right after the #preloader markup)
// starts fetching that page's hero photo as early as possible and
// stashes it on window.__preloadHero, so the fetch begins before this
// file (loaded at the very end of <body>) has even arrived. From here
// we just wait for everything that actually needs to be ready:
//   - that hero image finishing (success OR error — a broken image
//     must never leave a visitor stuck on the preloader forever)
//   - document.fonts.ready, so text doesn't flash in an unstyled font
//   - the nav logo (small, but part of the persistent chrome)
//   - the preloader logo's OWN draw-in animation finishing, via its
//     `animationend` event — so the reveal is never cut off short even
//     if every asset above happens to be cached/instant
// Only once ALL of those are true do we fade the preloader out. The
// single setTimeout below is an upper-bound safety net for a stalled
// network/font, not something normal loads should ever reach.
(function () {
  var preloader = document.getElementById('preloader');
  if (!preloader) return;

  document.documentElement.classList.add('preload-active');

  function waitForImage(imgOrUrl) {
    return new Promise(function (resolve) {
      var img = imgOrUrl instanceof HTMLImageElement || imgOrUrl instanceof Image
        ? imgOrUrl
        : null;
      if (!img) {
        if (!imgOrUrl) { resolve(); return; }
        img = new Image();
        img.src = imgOrUrl;
      }
      if (img.complete && img.naturalWidth > 0) { resolve(); return; }
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
    });
  }

  var heroReady = waitForImage(window.__preloadHero);
  var navLogoReady = waitForImage(document.querySelector('.navbar .logo-img'));
  var fontsReady = (document.fonts && document.fonts.ready)
    ? document.fonts.ready.catch(function () {})
    : Promise.resolve();

  var logoEl = preloader.querySelector('.preloader-logo');
  var logoAnimDone = new Promise(function (resolve) {
    if (!logoEl || !window.getComputedStyle(logoEl).animationName || window.getComputedStyle(logoEl).animationName === 'none') {
      resolve(); return;
    }
    logoEl.addEventListener('animationend', resolve, { once: true });
  });

  var finished = false;
  function finishPreloader() {
    if (finished) return;
    finished = true;
    clearTimeout(safetyTimer);
    preloader.classList.add('is-done');
    document.documentElement.classList.remove('preload-active');
    var removed = false;
    function remove() {
      if (removed) return;
      removed = true;
      if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
    }
    preloader.addEventListener('transitionend', remove, { once: true });
    // Fallback in case a transitionend never fires (e.g. the
    // reduced-motion path shortens/changes the transition). Matches
    // the .45s opacity transition in CSS plus a small buffer.
    setTimeout(remove, 650);
  }

  // Upper-bound safety net only — not the normal path.
  var safetyTimer = setTimeout(finishPreloader, 6000);

  Promise.all([heroReady, navLogoReady, fontsReady, logoAnimDone]).then(finishPreloader);
})();

// Mega menu — hamburger opens a full drawer (rhodeskin.com-style) listing
// every destination with a thumbnail, title and short description. The
// staggered reveal of each row is driven entirely by CSS transition-delay
// once `.is-open` is toggled here.
const navToggle = document.querySelector('.nav-toggle');
const megaMenuOverlay = document.getElementById('megaMenuOverlay');

function closeMegaMenu() {
  if (!megaMenuOverlay) return;
  megaMenuOverlay.classList.remove('is-open');
  megaMenuOverlay.setAttribute('aria-hidden', 'true');
  if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('modal-open');
}

if (navToggle && megaMenuOverlay) {
  const megaMenuClose = document.getElementById('megaMenuClose');

  function openMegaMenu() {
    megaMenuOverlay.classList.add('is-open');
    megaMenuOverlay.setAttribute('aria-hidden', 'false');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('modal-open');
  }

  navToggle.addEventListener('click', () => {
    if (megaMenuOverlay.classList.contains('is-open')) closeMegaMenu();
    else openMegaMenu();
  });
  if (megaMenuClose) megaMenuClose.addEventListener('click', closeMegaMenu);
  megaMenuOverlay.addEventListener('click', (e) => {
    if (e.target === megaMenuOverlay) closeMegaMenu();
  });
  megaMenuOverlay.querySelectorAll('.mega-menu-item').forEach((link) => {
    link.addEventListener('click', closeMegaMenu);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && megaMenuOverlay.classList.contains('is-open')) closeMegaMenu();
  });
}

// Draggable before/after comparison slider
document.querySelectorAll('.ba-slider').forEach(slider => {
  const beforeLayer = slider.querySelector('.ba-before');
  const beforeImg = beforeLayer ? beforeLayer.querySelector('img') : null;
  const handle = slider.querySelector('.ba-handle');
  if (!beforeLayer || !handle) return;

  function setPosition(pct) {
    pct = Math.min(100, Math.max(0, pct));
    beforeLayer.style.width = pct + '%';
    handle.style.left = pct + '%';
  }

  function syncImageWidth() {
    if (beforeImg) beforeImg.style.width = slider.getBoundingClientRect().width + 'px';
  }
  syncImageWidth();
  window.addEventListener('resize', syncImageWidth);

  function pctFromClientX(clientX) {
    const rect = slider.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }

  let dragging = false;
  function beginDrag(clientX) {
    dragging = true;
    slider.classList.add('is-dragging');
    setPosition(pctFromClientX(clientX));
  }
  function endDrag() {
    dragging = false;
    slider.classList.remove('is-dragging');
  }

  slider.addEventListener('mousedown', (e) => beginDrag(e.clientX));
  window.addEventListener('mousemove', (e) => { if (dragging) setPosition(pctFromClientX(e.clientX)); });
  window.addEventListener('mouseup', endDrag);

  slider.addEventListener('touchstart', (e) => beginDrag(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchmove', (e) => { if (dragging) setPosition(pctFromClientX(e.touches[0].clientX)); }, { passive: true });
  window.addEventListener('touchend', endDrag);
});

// Carousel: prev/next arrow buttons anchored to the screen edges,
// shown only when the row actually overflows; disabled at each end.
document.querySelectorAll('.carousel-wrap').forEach(wrap => {
  const track = wrap.querySelector('.services-grid, .product-grid');
  const prevBtn = wrap.querySelector('.carousel-arrow.prev');
  const nextBtn = wrap.querySelector('.carousel-arrow.next');
  if (!track || !prevBtn || !nextBtn) return;

  const imgBox = track.querySelector('.service-img, .product-img');

  function updateArrowCenter() {
    if (!imgBox) return;
    const h = imgBox.getBoundingClientRect().height;
    if (h > 0) wrap.style.setProperty('--arrow-center', h / 2 + 'px');
  }

  function updateState() {
    const overflowing = track.scrollWidth > track.clientWidth + 20;
    wrap.classList.toggle('has-overflow', overflowing);
    const atStart = track.scrollLeft <= 4;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    prevBtn.classList.toggle('is-disabled', atStart);
    nextBtn.classList.toggle('is-disabled', atEnd);
    updateArrowCenter();
  }

  function scrollStep(direction) {
    const card = track.querySelector('.service-card, .product-card');
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 48;
    const amount = card ? card.offsetWidth + gap : 400;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }

  prevBtn.addEventListener('click', () => scrollStep(-1));
  nextBtn.addEventListener('click', () => scrollStep(1));
  track.addEventListener('scroll', updateState);
  window.addEventListener('resize', updateState);
  window.addEventListener('load', updateState);
  updateState();
});

// Sticky nav + "Book →" fade-in, triggered once the hero has scrolled
// out of view. Keeps only one primary booking CTA on screen at a time:
// the hero's own CTA above the fold, then the nav Book button after.
document.querySelectorAll('header.hero').forEach(function (hero) {
  var navbar = hero.querySelector('.navbar');
  var bookBtn = navbar ? navbar.querySelector('.nav-book-btn') : null;
  if (!navbar) return;

  function setScrolledState(scrolledPastHero) {
    navbar.classList.toggle('is-fixed', scrolledPastHero);
    if (bookBtn) bookBtn.classList.toggle('is-visible', scrolledPastHero);
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        setScrolledState(!entry.isIntersecting);
      });
    }, { rootMargin: '-380px 0px 0px 0px', threshold: 0 });
    observer.observe(hero);
  } else {
    // Fallback for browsers without IntersectionObserver support.
    var ticking = false;
    function checkScroll() {
      setScrolledState(window.scrollY > 400);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(checkScroll); ticking = true; }
    }, { passive: true });
    checkScroll();
  }
});

// Booking options modal (WhatsApp / Zalo / Phone) — opened by the nav
// "Book →" button and its mobile-menu counterpart. Not a page link.
(function () {
  var overlay = document.getElementById('bookingModalOverlay');
  if (!overlay) return;

  var closeBtn = document.getElementById('bookingModalClose');
  var triggers = document.querySelectorAll('[data-book-trigger]');

  function openModal(e) {
    if (e) e.preventDefault();
    // Close the mega menu first, if open, so it doesn't sit behind the
    // modal (e.g. when the trigger is the "Book" row inside the menu
    // itself) — this must run before we lock body scroll below.
    closeMegaMenu();
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }
  function closeModal() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  triggers.forEach(function (el) { el.addEventListener('click', openModal); });
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
  });
})();

// Scroll-reveal animation
const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');
if ('IntersectionObserver' in window && revealTargets.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('in-view'));
}
