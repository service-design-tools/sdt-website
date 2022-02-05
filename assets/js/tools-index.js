import { processFilterValues, sorting, questions } from "/assets/js/globals.js";
import { debounce, listFormatter } from "/assets/js/utilities.js";

(function () {
  let state;
  const stateVersion = 'v3';
  const stateVersionCache = localStorage.getItem('stateVersion');
  if (stateVersionCache === null || stateVersionCache !== stateVersion) {
    localStorage.clear();
    localStorage.setItem('stateVersion', stateVersion);
  }
  const processFiltersCache = localStorage.getItem('processFiltersCache');
  const enhancedFilterCache = localStorage.getItem('enhancedFilterCache');
  const searchFilterCache = localStorage.getItem('searchFilterCache');
  const sortingCache = localStorage.getItem('sortingCache');

  let sessionProcessFilters = history.state ? history.state.processFilters : processFiltersCache != null ? JSON.parse(processFiltersCache) : processFilterValues;
  let sessionEnhancedFilter = history.state ? history.state.enhancedFilter : enhancedFilterCache != null ? (enhancedFilterCache === 'true' ) : false;
  let sessionSearchFilter = history.state ? history.state.searchFilter : searchFilterCache != null ? searchFilterCache : '';
  let sessionSorting = history.state ? history.state.sorting : sortingCache === null ? sorting : sortingCache;
  updateState(!history.state);
  updateCache();

  document.getElementById('enhancedCheck').checked = sessionEnhancedFilter;
  document.getElementById(sessionSorting).classList.add('selected');

  const iso = new Isotope('.tools__gallery', {
    itemSelector: '.tool',
    getSortData: {
      alphabetical: '[data-name]',
      process: function (el) {
        const processArray = el.getAttribute('data-process').slice(1).split(' ');
        const orderArray = processArray.map(process => processFilterValues[process].order);
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
  const $enhancedCheckbox = document.querySelector('.filtering input');
  const $searchbar = document.querySelector('#toolsSearchbar');
  const $sortingButtons = document.querySelectorAll(`.sorting li`);
  $filters.forEach(el => {
    el.checked = sessionProcessFilters[el.id].checked;
    el.onclick = filterView;
  });
  $enhancedCheckbox.onchange = filterView;
  $searchbar.value = sessionSearchFilter;
  $searchbar.onkeyup = debounce(filterView, 250);
  $sortingButtons.forEach(el => {
    el.onclick = sortView;
  });

  sortGallery(sessionSorting);
  filterGallery();

  window.onpopstate = function () {
    if (history.state) {
      sessionSorting = history.state.sorting;
      $sortingButtons.forEach(button => button.id === history.state.sorting ? button.classList.add('selected') : button.classList.remove('selected'));
      sessionProcessFilters = history.state.processFilters;
      $filters.forEach(el => {
        el.checked = history.state.processFilters[el.id].checked;
      });
      sessionEnhancedFilter = history.state.enhancedFilter;
      $enhancedCheckbox.checked = sessionEnhancedFilter;
      sessionSearchFilter = history.state.searchFilter;
      $searchbar.value = sessionSearchFilter;
      updateCache();
      sortGallery(sessionSorting);
      filterGallery();
    }
  };

  function updateCache() {
    localStorage.setItem('sortingCache', sessionSorting);
    localStorage.setItem('enhancedFilterCache', sessionEnhancedFilter.toString());
    localStorage.setItem('searchFilterCache', sessionSearchFilter);
    localStorage.setItem('processFiltersCache', JSON.stringify(sessionProcessFilters));
  }

  function updateState(updateHistory) {
    state = {
      processFilters: sessionProcessFilters,
      enhancedFilter: sessionEnhancedFilter,
      searchFilter: sessionSearchFilter,
      sorting: sessionSorting
    }

    if (updateHistory) {
      history.pushState(state, '', '');
    }
  }

  function filterView(ev) {
    if (ev.target.id === 'enhancedCheck') {
      sessionEnhancedFilter = !sessionEnhancedFilter;
    }
    else if (ev.target.id === 'toolsSearchbar') {
      sessionSearchFilter = ev.target.value;
    }
    else {
      let selector = ev.target.id.length > 0 ? ev.target.id : ev.target.textContent.toLowerCase().replace(/\s/, "-");
      sessionProcessFilters[selector].checked = !sessionProcessFilters[selector].checked;
      if (ev.target.id.length === 0) {
        document.getElementById(selector).checked = false;
      }
    }
    updateState(true);
    updateCache();
    filterGallery();
  }

  function sortView(ev) {
    const newSorting = ev.target.id;
    if (newSorting != sessionSorting) {
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
    let newSelection = combinationArray.length ? combinationArray.reduce((accumulator, currentValue, currentIndex) => {
      let prefix = currentIndex > 0 ? ', .tool' : '.tool';
      return accumulator + prefix + currentValue.join('');
    }, '') : '.tool';
    if (sessionEnhancedFilter) {
      newSelection += '[data-type="enhanced"]';
    }
    if (sessionSearchFilter) {
      const searchTermsArray = sessionSearchFilter.split(' ');
      searchTermsArray.forEach(term => newSelection += `[data-name*="${term}"]`);
    }

    iso.arrange({ filter: newSelection });
    $tools.forEach(tool => tool.classList.add('hidden'));
    const $selectedTools = document.querySelectorAll(newSelection);
    $selectedTools.forEach(tool => tool.classList.remove('hidden'));

    updateFilters();
    updateBreadcrumb($activeFilters.length);
  }

  function updateFilters() {
    const categories = Object.keys(processFilterValues);
    const visibleCategories = d3.merge(Array.from(document.querySelectorAll('.tool:not(.hidden)'), el => [...el.classList]));
    const uniqueCategories = [...new Set(visibleCategories)];
    const difference = categories.filter(category => uniqueCategories.indexOf(category) < 0);
    // console.log(difference);
    $filters.forEach(filter => filter.classList.remove('disabled'));
    difference.forEach(el => {
      const $disabledFilter = document.getElementById(el);
      $disabledFilter.classList.add('disabled');
    });
    const enhancedToolsVisible = Array.from(document.querySelectorAll('.tool:not(.hidden)[data-type="enhanced"]'));
    if (enhancedToolsVisible.length > 0) {
      $enhancedCheckbox.classList.remove('disabled')
    } else {
      $enhancedCheckbox.classList.add('disabled')
    }
  }

  function updateBreadcrumb(filtersLength) {
    let breadcrumbString;
    if (filtersLength === 0 || filtersLength === 16) {
      breadcrumbString = sessionEnhancedFilter ? 'All enhanced tools' : 'All tools';
    } else {
      breadcrumbString = sessionEnhancedFilter ? 'Enhanced tools' : 'Tools';
    }
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
    if (sessionSearchFilter) {
      const searchTermsArray = sessionSearchFilter.split(' ');
      breadcrumbString += ` that contain the word${searchTermsArray.length > 1 ? 's' : ''} ${listFormatter.format(searchTermsArray)}`;
    }
    $breadcrumb.innerHTML = breadcrumbString;
    const $breadcrumbTags = document.querySelectorAll('.breadcrumb span');
    $breadcrumbTags.forEach(el => {
      el.onclick = filterView;
    })
  }
})();