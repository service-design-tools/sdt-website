import {filterValues, sorting} from "/assets/js/globals.js";

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
    // console.log(sessionFilters, sessionSorting);

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
        console.log($breadcrumb)
    }
})();