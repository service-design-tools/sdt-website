(function () {
    const $analyticsCheckbox = document.querySelector('.analytics__checkbox');
    let consentCache = localStorage.getItem('consentCache');
    if (consentCache) {
        if (consentCache === 'true') {
            $analyticsCheckbox.classList.add('consent--accepted');
        } else {
            $analyticsCheckbox.classList.remove('consent--accepted');
        }
    }
    $analyticsCheckbox.onclick = function() {
        $consent.classList.remove('box--open');
        if ($analyticsCheckbox.classList.contains('consent--accepted')) {
            localStorage.setItem('consentCache', 'false');
            $analyticsCheckbox.classList.remove('consent--accepted');
        } else {
            localStorage.setItem('consentCache', 'true');
            $analyticsCheckbox.classList.add('consent--accepted');
            // gtag('js', new Date());
            // gtag('config', 'UA-5816319-19', { 'anonymize_ip': true });
        }
    }
})();