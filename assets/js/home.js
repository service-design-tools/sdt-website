---
layout: null
---
(function () {
  let viewportWidth = window.innerWidth;
  let resizeTimer;
  let carousel;

  const toolsArray = [
    {% for tool in site.tools %}
      {
        'tool': "{{ tool.title }}", 
        'url': '{{ tool.url }}', 
        'svg': `{{ tool.icon | strip_newlines | normalize_whitespace }}`, 
        'isEnhanced': {{ tool.isEnhanced }},
        'publicable': {{ tool.publicable }}
      }
      {% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];
  const randomToolPicks = d3.shuffle(d3.filter(toolsArray, d => !d.isEnhanced && d.publicable)).slice(0,4);

  const $toolCards = document.querySelectorAll('.highlights__container a[data-type="normal"]');
  $toolCards.forEach((card, index) => {
    const toolPick = randomToolPicks[index];
    card.href = toolPick.url;
    card.firstElementChild.innerHTML = `
      ${toolPick.svg}
      <p>${toolPick.tool}</p>
    `;
  });

  const randomEnhancedToolPicks = d3.shuffle(d3.filter(toolsArray, d => d.isEnhanced && d.publicable)).slice(0,4);

  const $enhancedToolCards = document.querySelectorAll('.highlights__container a[data-type="enhanced"]');
  $enhancedToolCards.forEach((card, index) => {
    const toolPick = randomEnhancedToolPicks[index];
    card.href = toolPick.url;
    card.firstElementChild.innerHTML = `
      <p class="card__label">enhanced</p>
      ${toolPick.svg}
      <p>${toolPick.tool}</p>
    `;
  });

  const tutorialsArray = [{% for tutorial in site.tutorials %}{'title': "{{ tutorial.title }}", 'url': '{{ tutorial.url }}', 'category': '{{ tutorial.category }}'}{% unless forloop.last %},{% endunless %}{% endfor %}];
  const randomTutorialPicks = d3.shuffle(tutorialsArray).slice(0,2);

  const $tutorialCards = document.querySelectorAll('.tutorial__links');
  $tutorialCards.forEach((card, index) => {
    const tutorialPick = randomTutorialPicks[index];
    card.href = tutorialPick.url;
    if (tutorialPick.category !== 'Basics') card.firstElementChild.classList.add('card--thematic');
    card.firstElementChild.querySelector('h3 span').innerText = tutorialPick.category;
    card.firstElementChild.firstElementChild.lastElementChild.innerText = tutorialPick.title;
  });

  const caseStudiesArray = [{% for case in site.case_studies %}{'title': "{{ case.title }}", 'tool': "{{ case.tool }}", 'image': '{{ case.images[0] }}', 'slug': "{{ case.title | slugify }}"}{% unless forloop.last %},{% endunless %}{% endfor %}];
  const randomCaseStudiesPicks = d3.shuffle(caseStudiesArray).slice(0,4);

  const $caseStudiesCards = document.querySelectorAll('.case-studies__container a');
  let cardsToShow = viewportWidth > 991 ? 3 : viewportWidth > 575 ? 2 : 1;
  $caseStudiesCards.forEach((card, index) => {
    const caseStudiesPick = randomCaseStudiesPicks[index];
    const toolMatch = toolsArray.find(tool => tool.tool === caseStudiesPick.tool);
    card.href = toolMatch.url + '#' + caseStudiesPick.slug;
    card.firstElementChild.innerHTML = `
      <img src="${caseStudiesPick.image}" alt="featured image of the case study: ${caseStudiesPick.title}"/>
      <h3>${caseStudiesPick.tool}</h3>
      <p>${caseStudiesPick.title}</p>
    `;
    if (index === $caseStudiesCards.length - 1) {
      setupCarousel();
    }
  });

  // Credits to Chris Coyier https://css-tricks.com/snippets/jquery/done-resizing-event/ 
  window.onresize = function (e) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      viewportWidth = window.innerWidth;
      cardsToShow = viewportWidth > 991 ? 3 : viewportWidth > 575 ? 2 : 1;
      carousel.resize();
    }, 250);
  }

  function setupCarousel() {
    carousel = new Flickity( '.case-studies__container', {
      prevNextButtons: false,
      wrapAround: true,
      cellAlign: 'left',
      autoPlay: 4500,
      on: {
        ready: function() {
          $caseStudiesCards.forEach(card => card.classList.remove('is--visible'));
          if (cardsToShow > 1) {
            let nextCard = (this.selectedIndex + 1) % this.slides.length;
            Array.from($caseStudiesCards)[nextCard].classList.add('is--visible');
          }
          if (cardsToShow > 2) {
            let secondNextCard = (this.selectedIndex + 2) % this.slides.length;
            Array.from($caseStudiesCards)[secondNextCard].classList.add('is--visible');
          }
        },
        select: function() {
          $caseStudiesCards.forEach(card => card.classList.remove('is--visible'));
          if (cardsToShow > 1) {
            let nextCard = (this.selectedIndex + 1) % this.slides.length;
            Array.from($caseStudiesCards)[nextCard].classList.add('is--visible');
          }
          if (cardsToShow > 2) {
            let secondNextCard = (this.selectedIndex + 2) % this.slides.length;
            Array.from($caseStudiesCards)[secondNextCard].classList.add('is--visible');
          }
        },
        dragStart: function() {
          $caseStudiesCards.forEach(card => card.classList.add('is--moving'));
        },
        dragEnd: function() {
          $caseStudiesCards.forEach(card => card.classList.remove('is--moving'));
          carousel.playPlayer();
        }
      }
    });
  }

})();