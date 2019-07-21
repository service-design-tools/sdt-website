(function () {
    const $viewMoreBtns = document.querySelectorAll('.btn--view-more');
    if ($viewMoreBtns.length) {
        const $caseStudies = document.querySelectorAll('.case-study');
        const caseStudiesArray = [...$caseStudies];
        const $caseImages = document.querySelectorAll('.case-study__image');

        $viewMoreBtns.forEach((btn, index) => {
            const caseStudy = caseStudiesArray[index];
            btn.onclick = function() {
                caseStudy.classList.toggle('case--reduced');
                if (caseStudy.classList.contains('case--reduced')) {
                    btn.innerText = 'View more';
                } else {
                    btn.innerText = 'View less';
                }
            }
        });

        $caseImages.forEach((image, index) => {
            const images = image.getAttribute('data-images').split(',');
            const title = image.getAttribute('data-title');
            image.onclick = function() {
                const $body = document.querySelector('body');
                const modal = document.createElement('div');
                modal.classList.add('tool__modal');
                modal.innerHTML = `
                    <div class="modal__close"><span class="btn--close">+</span></div>
                    <h4>${title}</h4>`;
                for (let i = 0; i < images.length; i++) {
                    modal.innerHTML += `
                        <div class="modal__image ${ i == 0 ? 'shown' : '' }">
                            <img src="" data-src="${images[i]}"
                            alt="Complementary image of the project">
                        </div>`; 
                }
                if (images.length > 1) {
                    modal.innerHTML += `
                        <div class="prev"><span>&#8249;</span></div>
                        <div class="next"><span>&#8250;</span></div>`;
                }
                
                $body.appendChild(modal);
                $body.classList.add('modal--open');

                const $images = document.querySelectorAll('.modal__image img');
                $images.forEach(img => {
                    loadImages(img);
                });

                const $closeBtn = document.querySelector('.modal__close');
                $closeBtn.onclick = function() {
                    $body.classList.remove('modal--open');
                    $body.removeChild(modal);
                }
                
                if (images.length > 1) {
                    const $imageContainers = document.querySelectorAll('.modal__image');
                    const $nextBtn = document.querySelector('.next');
                    $nextBtn.onclick = function() {
                        const $activeImg = document.querySelector('.modal__image.shown');
                        const $sibiling = $activeImg.nextElementSibling;
                        $activeImg.classList.remove('shown');
                        if ($sibiling.matches('.modal__image')) {
                            $sibiling.classList.add('shown');
                        } else {
                            [...$imageContainers][0].classList.add('shown');
                        }
                    }
                    const $prevBtn = document.querySelector('.prev');
                    $prevBtn.onclick = function() {
                        const $activeImg = document.querySelector('.modal__image.shown');
                        const $sibiling = $activeImg.previousElementSibling;
                        $activeImg.classList.remove('shown');
                        if ($sibiling.matches('.modal__image')) {
                            $sibiling.classList.add('shown');
                        } else {
                            [...$imageContainers][$imageContainers.length - 1].classList.add('shown');
                        }
                    }
                }
            }
        })
    }
})();

var loadImages = function (image) {
    if (image.getAttribute('data-src') != null) {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.onload = function () {
            image.removeAttribute('data-src');
        };
    }
};