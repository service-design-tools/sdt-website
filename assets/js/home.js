---
layout: null
---
(function () {
    let viewportWidth = window.innerWidth;

    const toolsArray = [{% for tool in site.tools %}{'tool': "{{ tool.title }}", 'url': '{{ tool.url }}', 'svg': `{{ tool.icon | strip_newlines | normalize_whitespace }}`}{% unless forloop.last %},{% endunless %}{% endfor %}];
    const randomToolPicks = d3.shuffle(toolsArray).slice(0,4);

    const $toolCards = document.querySelectorAll('.highlights__tools a');
    $toolCards.forEach((card, index) => {
        const toolPick = randomToolPicks[index];
        card.href = toolPick.url;
        card.firstElementChild.innerHTML = `
            ${toolPick.svg}
            <p>${toolPick.tool}</p>
        `;
    });

    const tutorialsArray = [{% for tutorial in site.tutorials %}{'title': '{{ tutorial.title }}', 'url': '{{ tutorial.url }}', 'order': '{{ forloop.index }}'}{% unless forloop.last %},{% endunless %}{% endfor %}];
    const randomTutorialPicks = d3.shuffle(tutorialsArray).slice(0,2);

    const $tutorialCards = document.querySelectorAll('.tutorial__links');
    $tutorialCards.forEach((card, index) => {
        const tutorialPick = randomTutorialPicks[index];
        card.href = tutorialPick.url;
        card.firstElementChild.firstElementChild.children[1].innerText = parseInt(tutorialPick.order) > 9 ? tutorialPick.order : `0${tutorialPick.order}`;
        card.firstElementChild.firstElementChild.lastElementChild.innerText = tutorialPick.title;
    });

    const caseStudiesArray = [{% for case in site.case_studies %}{'title': "{{ case.title }}", 'tool': '{{ case.tool }}', 'image': '{{ case.images[0] }}', 'slug': "{{ case.title | slugify }}"}{% unless forloop.last %},{% endunless %}{% endfor %}];
    const randomCaseStudiesPicks = d3.shuffle(caseStudiesArray).slice(0,4);

    const $caseStudiesCards = document.querySelectorAll('.case-studies__container a');
    const caseCardsWidth = Array.from($caseStudiesCards)[0].getBoundingClientRect().width;
    const caseCardGap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--container-gap').replace(/px/, ''), 10);
    let cardsToHide = viewportWidth > 991 ? 1 : viewportWidth > 575 ? 2 : 3;
    
    $caseStudiesCards.forEach((card, index) => {
        const caseStudiesPick = randomCaseStudiesPicks[index];
        const toolMatch = toolsArray.find(tool => tool.tool === caseStudiesPick.tool);
        card.href = toolMatch.url + '#' + caseStudiesPick.slug;
        card.firstElementChild.innerHTML = `
            <img src="${caseStudiesPick.image}" alt="featured image of the case study: ${caseStudiesPick.title}"/>
            <h3>${caseStudiesPick.tool}</h3>
            <p>${caseStudiesPick.title}</p>
        `;
        card.style.position = 'absolute';
        card.style.left = (caseCardsWidth + caseCardGap) * index + 'px';
        if (index !== $caseStudiesCards.length - cardsToHide) {
            card.classList.add('card--shown');
        }
    });
})();