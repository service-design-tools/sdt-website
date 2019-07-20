(function () {
    const $viewMoreBtns = document.querySelectorAll('.btn--view-more');
    const $caseStudies = document.querySelectorAll('.case-study');
    const caseStudiesArray = [...$caseStudies];
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
    })
})();