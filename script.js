// Neon Nest Studios enhancements that sit alongside the existing portal logic.
(function () {
  var title = document.querySelector('.hero-title');
  if (!title) return;

  title.querySelectorAll('span').forEach(function (line) {
    line.dataset.title = line.textContent;
  });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduceMotion.matches) return;

  title.addEventListener('pointermove', function (event) {
    var bounds = title.getBoundingClientRect();
    var x = ((event.clientX - bounds.left) / bounds.width - .5) * 8;
    var y = ((event.clientY - bounds.top) / bounds.height - .5) * -6;
    title.style.transform = 'rotateY(' + x + 'deg) rotateX(' + y + 'deg)';
  });

  title.addEventListener('pointerleave', function () {
    title.style.transform = '';
  });

  var revealTargets = document.querySelectorAll('.section-head, .audience-card, .pillar-card, .step-list li, .testimonial, .about-panel, .application-form');
  revealTargets.forEach(function (element, index) {
    element.classList.add('motion-reveal');
    element.style.setProperty('--reveal-delay', Math.min(index % 4, 3) * 70 + 'ms');
  });

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach(function (element) { element.classList.add('is-visible'); });
    return;
  }

  var revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .16, rootMargin: '0px 0px -8% 0px' });

  revealTargets.forEach(function (element) { revealObserver.observe(element); });

  document.querySelectorAll('.pillar-card, .audience-card, .testimonial').forEach(function (card) {
    card.classList.add('tilt-card');
    card.addEventListener('pointermove', function (event) {
      var bounds = card.getBoundingClientRect();
      var pointerX = (event.clientX - bounds.left) / bounds.width;
      var pointerY = (event.clientY - bounds.top) / bounds.height;
      var tiltX = (pointerX - .5) * 8;
      var tiltY = (pointerY - .5) * -8;
      card.style.setProperty('--pointer-x', pointerX * 100 + '%');
      card.style.setProperty('--pointer-y', pointerY * 100 + '%');
      card.style.setProperty('--tilt-x', tiltX + 'deg');
      card.style.setProperty('--tilt-y', tiltY + 'deg');
    });
    card.addEventListener('pointerleave', function () {
      card.style.removeProperty('--pointer-x');
      card.style.removeProperty('--pointer-y');
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    });
  });

  var heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    heroVisual.addEventListener('pointermove', function (event) {
      var bounds = heroVisual.getBoundingClientRect();
      var x = ((event.clientX - bounds.left) / bounds.width - .5) * 7;
      var y = ((event.clientY - bounds.top) / bounds.height - .5) * -6;
      heroVisual.style.setProperty('--scene-x', x + 'deg');
      heroVisual.style.setProperty('--scene-y', y + 'deg');
    });
    heroVisual.addEventListener('pointerleave', function () {
      heroVisual.style.removeProperty('--scene-x');
      heroVisual.style.removeProperty('--scene-y');
    });
  }
})();