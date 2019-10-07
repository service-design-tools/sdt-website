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
        document.querySelector('.consent').classList.remove('box--open');
        if ($analyticsCheckbox.classList.contains('consent--accepted')) {
            localStorage.setItem('consentCache', 'false');
            $analyticsCheckbox.classList.remove('consent--accepted');
            window['ga-disable-UA-149513218-1'] = true;
        } else {
            localStorage.setItem('consentCache', 'true');
            $analyticsCheckbox.classList.add('consent--accepted');
            window['ga-disable-UA-149513218-1'] = false;
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-149513218-1', { 'anonymize_ip': true });
        }
    }
})();