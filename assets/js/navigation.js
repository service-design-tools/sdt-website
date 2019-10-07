(function () {
    const $body = document.querySelector('body');
    // Check for consent
    let consentCache = localStorage.getItem('consentCache');
    const $consent = document.querySelector('.consent');
    if (consentCache) {
        // console.log(consentCache);
        if (consentCache === 'true') {
            window['ga-disable-UA-149513218-1'] = false;
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-149513218-1', { 'anonymize_ip': true });
        } else {
            window['ga-disable-UA-149513218-1'] = true;
        }
    } else {
        window['ga-disable-UA-149513218-1'] = true;
        $consent.classList.add('box--open');
        const $consentButton = $consent.querySelector('.button__accept');
        const $optoutButton = $consent.querySelector('.button__optout');
        $consentButton.onclick = handleConsent;
        $optoutButton.onclick = handleConsent;
    }

    const $menuButton = document.querySelector('.nav__burger');
    $menuButton.onclick = () => {
        $body.classList.contains('menu--open') ? $body.classList.remove('menu--open') : $body.classList.add('menu--open');
    }

    function handleConsent(ev) {
        let accept = ev.target.classList.contains('button__accept');
        localStorage.setItem('consentCache', JSON.stringify(accept));
        $consent.classList.remove('box--open');
        if (accept) {
            window['ga-disable-UA-149513218-1'] = false;
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-149513218-1', { 'anonymize_ip': true });
        } else {
            window['ga-disable-UA-149513218-1'] = true;
        }
    }
})();