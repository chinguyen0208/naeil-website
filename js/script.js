// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
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
    const overflowing = track.scrollWidth > track.clientWidth + 4;
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
