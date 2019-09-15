import {filterValues, sorting, questions} from "/assets/js/globals.js";

(function () {
    let state;
    const filtersCache = localStorage.getItem('filtersCache');
    const sortingCache = localStorage.getItem('sortingCache');
    let sessionFilters = history.state ? history.state.filters : filtersCache === null ? filterValues : JSON.parse(filtersCache);
    let sessionSorting = history.state ? history.state.sorting : sortingCache === null ? sorting : sortingCache;
    updateState(!history.state);
    updateCache();

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

    window.onpopstate = function () {
        if (history.state) {
            sessionSorting = history.state.sorting;
            $sortingButtons.forEach(button => button.id === history.state.sorting ? button.classList.add('selected') : button.classList.remove('selected'));
            sessionFilters = history.state.filters;
            $filters.forEach(el => {
                el.checked = history.state.filters[el.id].checked;
            });
            updateCache();
            sortGallery(sessionSorting);
            filterGallery();
        }
    };

    function updateCache() {
        localStorage.setItem('sortingCache', sessionSorting);
        localStorage.setItem('filtersCache', JSON.stringify(sessionFilters));
    }

    function updateState(updateHistory) {
        state = {
            filters: sessionFilters,
            sorting: sessionSorting
        }
    
        if (updateHistory) {
            history.pushState(state, '', '');
        }
    }

    function filterView(ev) {
        let selector = ev.target.id.length > 0 ? ev.target.id : ev.target.textContent.toLowerCase().replace(/\s/, "-");
        sessionFilters[selector].checked = !sessionFilters[selector].checked;
        if (ev.target.id.length === 0) {
            document.getElementById(selector).checked = false;
        }
        updateState(true);
        updateCache();
        filterGallery();
    }

    function sortView(ev) {
        const newSorting = ev.target.id;
        if(newSorting != sessionSorting) {
            sessionSorting = newSorting;
            $sortingButtons.forEach(button => button.id === newSorting ? button.classList.add('selected') : button.classList.remove('selected'));
            updateState(true);
            updateCache();
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