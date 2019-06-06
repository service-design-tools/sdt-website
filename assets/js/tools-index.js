import {filterValues, sorting, questions} from "/assets/js/globals.js";

(function () {
    // localStorage.clear();
    const filtersCache = localStorage.getItem('filtersCache');
    const sortingCache = localStorage.getItem('sortingCache');
    if (filtersCache === null) {
        localStorage.setItem('filtersCache', JSON.stringify(filterValues));
        localStorage.setItem('sortingsCache', sorting);
    }
    const sessionFilters = filtersCache === null ? filterValues : JSON.parse(filtersCache);
    const sessionSorting = filtersCache === null ? sorting : JSON.parse(sortingCache);

    const iso = new Isotope('.tools__gallery', {
        itemSelector: '.tool'
    });
    const $filters = document.querySelectorAll('.filter input');
    const $breadcrumb = document.querySelector('.breadcrumb p');
    const $tools = document.querySelectorAll(`.tool`);
    $filters.forEach(el => {
        el.checked = sessionFilters[el.id].checked;
        el.onclick = updateView;
    });
    $tools.forEach(tool => {
        // console.log(tool.classList)
    });

    updateGallery();

    function updateView() {
        sessionFilters[this.id].checked = !sessionFilters[this.id].checked;
        localStorage.setItem('filtersCache', JSON.stringify(sessionFilters));
        updateGallery();
    }

    function updateGallery() {
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
        // console.log(newSelection);

        iso.arrange({
            // sortBy: 'number',
            filter: newSelection
        });
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
    }
})();