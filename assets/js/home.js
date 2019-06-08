---
layout: null
---
(function () {
    const toolsArray = [{% for tool in site.tools %}{'tool': '{{ tool.title }}', 'url': '{{ tool.url }}', 'svg': `{{ tool.icon | strip_newlines | normalize_whitespace }}`}{% unless forloop.last %},{% endunless %}{% endfor %}];
    const randomPicks = d3.shuffle(toolsArray).slice(0,4);

    const $toolCards = document.querySelectorAll('.highlights__tools a');
    $toolCards.forEach((card, index) => {
        const toolPick = randomPicks[index];
        card.href = toolPick.url;
        card.firstElementChild.innerHTML = `
            ${toolPick.svg}
            <p>${toolPick.tool}</p>
        `;
    });
})();