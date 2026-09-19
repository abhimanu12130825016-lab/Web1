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
})();