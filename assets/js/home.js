---
layout: null
---
(function () {
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
})();