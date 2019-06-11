import {filterValues, sorting, questions} from "/assets/js/globals.js";

(function () {
    // localStorage.clear();
    const filtersCache = localStorage.getItem('filtersCache');
    const sortingCache = localStorage.getItem('sortingCache');
    if (filtersCache === null) {
        localStorage.setItem('filtersCache', JSON.stringify(filterValues));
    }
    if (sortingCache === null) {
        localStorage.setItem('sortingCache', sorting);
    }
    const sessionFilters = filtersCache === null ? filterValues : JSON.parse(filtersCache);
    let sessionSorting = sortingCache === null ? sorting : sortingCache;
    document.getElementById(sessionSorting).classList.add('selected');

    const iso = new Isotope('.tools__gallery', {
        itemSelector: '.tool',
        getSortData: {
            alphabetical: '[data-name]',
            process: function(el) {
                const processArray = el.getAttribute('data-process').slice(1).split(' ');
                const orderArray = processArray.map(process => filterValues[process].order);
                const order = d3.least(orderArray);
                return order;
            }
        }
    });

    const $body = document.querySelector('body');
    const $filtersButton = document.querySelector('.filters__button');
    const $filtersHeader = document.querySelector('.filters__header');
    const $filtersApply = document.querySelector('.filters__apply');
    const $filtersTitle = document.querySelectorAll('.filter__title');
    $filtersButton.onclick = () => $body.classList.add('filters--open');
    $filtersHeader.onclick = () => $body.classList.remove('filters--open');
    $filtersApply.onclick = () => $body.classList.remove('filters--open');
    $filtersTitle.forEach(el => {
        el.onclick = (ev) => ev.target.classList.contains('closed') ? ev.target.classList.remove('closed') : ev.target.classList.add('closed');
    })

    const $filters = document.querySelectorAll('.filter input');
    const $breadcrumb = document.querySelector('.breadcrumb p');
    const $tools = document.querySelectorAll(`.tool`);
    const $sortingButtons = document.querySelectorAll(`.sorting li`);
    $filters.forEach(el => {
        el.checked = sessionFilters[el.id].checked;
        el.onclick = filterView;
    });
    $sortingButtons.forEach(el => {
        el.onclick = sortView;
    });

    sortGallery(sessionSorting);
    filterGallery();

    function filterView(ev) {
        let selector = ev.target.id.length > 0 ? ev.target.id : ev.target.textContent.toLowerCase().replace(/\s/, "-");
        sessionFilters[selector].checked = !sessionFilters[selector].checked;
        localStorage.setItem('filtersCache', JSON.stringify(sessionFilters));
        if (ev.target.id.length === 0) {
            document.getElementById(selector).checked = false;
        }
        filterGallery();
    }

    function sortView() {
        const newSorting = this.id;

        if(newSorting != sessionSorting) {
            localStorage.setItem('sortingCache', newSorting);
            sessionSorting = newSorting;
            $sortingButtons.forEach(button => button.classList.remove('selected'));
            this.classList.add('selected');
            sortGallery(newSorting);
        }
    }

    function sortGallery(sortingOrder) {
        iso.arrange({
            sortBy: sortingOrder === 'process' ? ['process', 'alphabetical'] : ['alphabetical', 'process']
        });
    }

    function filterGallery() {
        const $activeFilters = document.querySelectorAll('.filter input:checked');
        let checkedFiltersByGroup = [];
        let combinationArray = [];
        for (let i = 0; i < questions.length; i++) {
            const filtersChecked = Array.from(document.querySelectorAll(`[name="${questions[i].type}"]:checked`), el => `.${el.id}`);
            const activeNumber = filtersChecked.length;
            if (activeNumber === 4) {
                checkedFiltersByGroup = [];
                break;
            } else if (activeNumber) {
                checkedFiltersByGroup.push(filtersChecked);
            }
        }
        if (checkedFiltersByGroup.length) {
            combinationArray = d3.cross.apply(null, checkedFiltersByGroup);
        }
        const newSelection = combinationArray.length ? combinationArray.reduce((accumulator, currentValue, currentIndex) => {
            let prefix = currentIndex > 0 ? ', .tool' : '.tool';
            return accumulator + prefix + currentValue.join('');
        }, '') : '.tool';

        iso.arrange({ filter: newSelection });
        $tools.forEach(tool => tool.classList.add('hidden'));
        const $selectedTools = document.querySelectorAll(newSelection);
        $selectedTools.forEach(tool => tool.classList.remove('hidden'));

        updateFilters();
        updateBreadcrumb($activeFilters.length);
    }

    function updateFilters() {
        const categories = Object.keys(filterValues);
        const visibleCategories = d3.merge(Array.from(document.querySelectorAll('.tool:not(.hidden)'), el => [...el.classList]));
        const uniqueCategories = [...new Set(visibleCategories)];
        const difference = categories.filter(category => uniqueCategories.indexOf(category) < 0);
        // console.log(difference);
        $filters.forEach(filter => filter.classList.remove('disabled'));
        difference.forEach(el => {
            const $disabledFilter = document.getElementById(el);
            $disabledFilter.classList.add('disabled');
        });
    }

    function updateBreadcrumb(filtersLength) {
        let breadcrumbString = (filtersLength === 0 || filtersLength === 16) ? 'All tools' : 'Tools';
        for (let i = 0; i < questions.length; i++) {
            const filtersChecked = Array.from(document.querySelectorAll(`[name="${questions[i].type}"]:checked`), el => el.nextSibling.innerText);
            const activeNumber = filtersChecked.length;
            if (activeNumber === 4) {
                breadcrumbString = 'All tools';
                break;
            } else if (activeNumber) {
                let newString = questions[i].text;
                if (activeNumber === 1) {
                    newString += ` <span>${filtersChecked[0]}</span> `
                } else {
                    for (let i = 0; i < filtersChecked.length; i++) {
                        newString += i === (filtersChecked.length - 1) ? ` or <span>${filtersChecked[i]}</span>` : i === (filtersChecked.length - 2) ? ` <span>${filtersChecked[i]}</span>` : ` <span>${filtersChecked[i]}</span>,`;
                    }
                }
                breadcrumbString += ` ${newString}`;
            }
        }
        $breadcrumb.innerHTML = breadcrumbString;
        const $breadcrumbTags = document.querySelectorAll('.breadcrumb span');
        $breadcrumbTags.forEach(el => {
            el.onclick = filterView;
        })
    }
})();