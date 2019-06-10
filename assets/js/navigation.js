(function () {
    const $body = document.querySelector('body');
    const $menuButton = document.querySelector('.nav__burger');
    $menuButton.onclick = () => {
        $body.classList.contains('menu--open') ? $body.classList.remove('menu--open') : $body.classList.add('menu--open');
    }
})();