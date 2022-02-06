(function () {
  const options = {
    root: null, // check from bounding box of the viewport
    rootMargin: '0px',
    threshold: .9
  }

  const observer = new IntersectionObserver(showElement, options);

  const elements = Array.from(document.querySelectorAll('[data-step]'))
  elements.forEach(target => {
    observer.observe(target);
  })

  function showElement (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const intersectingElement = entry.target;
        intersectingElement.classList.add('visible');
        observer.unobserve(intersectingElement);
      }
    });
  }
})();