(function () {
  const options = {
    root: null, // check from bounding box of the viewport
    rootMargin: '0px',
    threshold: [.2, .3, .4, .5, .6]
  }

  const observer = new IntersectionObserver(showElement, options);

  const elements = Array.from(document.querySelectorAll('.introduction > svg'))
  elements.forEach(target => {
    observer.observe(target);
  })

  function showElement (entries, observer) {
    entries.forEach(entry => {
      console.log(entry)
      if (entry.isIntersecting) {
        const intersectingElement = entry.target;
        const intersectionRatio = entry.intersectionRatio;
        const stepIndex = Math.trunc(intersectionRatio * 10) - 1;
        for (let index = 1; index <= stepIndex; index++) {
          const element = intersectingElement.querySelector(`g[data-step="${index}"]`);
          if (!element.classList.contains('visible')) element.classList.add('visible');
        }
        if (intersectionRatio > .6) observer.unobserve(intersectingElement);
      }
    });
  }
})();