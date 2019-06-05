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

    const $filters = document.querySelectorAll('.filter input');
    const $breadcrumb = document.querySelector('.breadcrumb p');
    $filters.forEach(el => {
        el.checked = sessionFilters[el.id].checked;
        el.onclick = updateFilters;
    });

    updateGallery();

    function updateFilters() {
        sessionFilters[this.id].checked = !sessionFilters[this.id].checked;
        localStorage.setItem('filtersCache', JSON.stringify(sessionFilters));
        updateGallery();
    }

    function updateGallery() {
        const $activeFilters = document.querySelectorAll(`.filter input:checked`);
        const selectionArray = [];
        $activeFilters.forEach(filter => {
            selectionArray.push(`:not(.${filter.id})`)
        })
        const newSelection = selectionArray.length ? `.tool${selectionArray.join('')}` : '.tool';
        // console.log(newSelection);

        updateBreadcrumb($activeFilters.length);
    }

    function updateBreadcrumb(filtersLength) {
        let breadcrumbString = (filtersLength === 0 || filtersLength === 16) ? 'All tools' : 'Tools';
        questions.forEach(question => {
            const filtersChecked = Array.from(document.querySelectorAll(`[name="${question.type}"]:checked`), el => el.nextSibling.innerText);
            const activeNumber = filtersChecked.length;
            if (activeNumber) {
                let newString = question.text;
                if (activeNumber === 1) {
                    newString += ` <span>${filtersChecked[0]}</span> `
                } else {
                    for (let i = 0; i < filtersChecked.length; i++) {
                        newString += i === (filtersChecked.length - 1) ? ` or <span>${filtersChecked[i]}</span>` : i === (filtersChecked.length - 2) ? ` <span>${filtersChecked[i]}</span>` : ` <span>${filtersChecked[i]}</span>,`;
                    }
                }
                breadcrumbString += ` ${newString}`;
            }
        });
        $breadcrumb.innerHTML = breadcrumbString;
    }
})();