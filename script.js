/* ===================================================
   GodHeals Hospital – Main JavaScript
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
     1. STICKY HEADER
  -------------------------------------------------- */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  /* --------------------------------------------------
     2. MOBILE NAV TOGGLE
  -------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // Mobile dropdown toggles
  const dropdowns = document.querySelectorAll('.dropdown > a');
  dropdowns.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = link.parentElement;
        parent.classList.toggle('open');
      }
    });
  });

  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });

  // Close nav when a nav link is clicked
  const navLinks = document.querySelectorAll('.nav-list a:not(.dropdown > a)');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });


  /* --------------------------------------------------
     3. HERO SLIDER
  -------------------------------------------------- */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('#sliderDots .dot');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function startSlideShow() {
    slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  function resetSlideShow() {
    clearInterval(slideInterval);
    startSlideShow();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetSlideShow(); });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetSlideShow(); });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToSlide(parseInt(dot.dataset.index));
      resetSlideShow();
    });
  });

  startSlideShow();


  /* --------------------------------------------------
     4. ANIMATED COUNTER (Stats Bar)
  -------------------------------------------------- */
  const statNums = document.querySelectorAll('.stat-num');
  let statsAnimated = false;

  function animateCounter(el, target, duration = 2000) {
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(update);
  }

  function checkStatsInView() {
    if (statsAnimated) return;
    const statsBar = document.querySelector('.stats-bar');
    if (!statsBar) return;
    const rect = statsBar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      statsAnimated = true;
      statNums.forEach(el => {
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
      });
    }
  }

  window.addEventListener('scroll', checkStatsInView);
  checkStatsInView();


  /* --------------------------------------------------
     5. TESTIMONIALS SLIDER
  -------------------------------------------------- */
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const testiDots = document.querySelectorAll('#testiDots .dot');
  const testiPrev = document.getElementById('testiPrev');
  const testiNext = document.getElementById('testiNext');
  let currentTesti = 0;
  let testiInterval;

  function goToTesti(index) {
    testimonialCards[currentTesti].classList.remove('active');
    testiDots[currentTesti].classList.remove('active');
    currentTesti = (index + testimonialCards.length) % testimonialCards.length;
    testimonialCards[currentTesti].classList.add('active');
    testiDots[currentTesti].classList.add('active');
  }

  function startTestiShow() {
    testiInterval = setInterval(() => goToTesti(currentTesti + 1), 6000);
  }

  function resetTestiShow() {
    clearInterval(testiInterval);
    startTestiShow();
  }

  if (testiPrev) {
    testiPrev.addEventListener('click', () => { goToTesti(currentTesti - 1); resetTestiShow(); });
  }
  if (testiNext) {
    testiNext.addEventListener('click', () => { goToTesti(currentTesti + 1); resetTestiShow(); });
  }
  testiDots.forEach(dot => {
    dot.addEventListener('click', () => {
      goToTesti(parseInt(dot.dataset.index));
      resetTestiShow();
    });
  });

  startTestiShow();


  /* --------------------------------------------------
     6. APPOINTMENT FORM SUBMIT
  -------------------------------------------------- */
  const apptForm = document.getElementById('apptForm');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');

  if (apptForm) {
    apptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showModal();
      apptForm.reset();
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showModal();
      contactForm.reset();
    });
  }

  function showModal() {
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function hideModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', hideModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) hideModal();
    });
  }


  /* --------------------------------------------------
     7. SCROLL TO TOP BUTTON
  -------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* --------------------------------------------------
     8. ACTIVE NAV HIGHLIGHTING ON SCROLL
  -------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-list > li > a');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-list > li > a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          navItems.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();


  /* --------------------------------------------------
     9. SCROLL REVEAL ANIMATION (Intersection Observer)
  -------------------------------------------------- */
  const revealEls = document.querySelectorAll(
    '.why-card, .spec-card, .doctor-card, .service-item, .testimonial-card, .stat-item'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.55s ease ${(i % 4) * 0.08}s, transform 0.55s ease ${(i % 4) * 0.08}s`;
    observer.observe(el);
  });

});
