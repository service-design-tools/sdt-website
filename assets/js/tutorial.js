(function () {
    const $timelineSteps = document.querySelectorAll('.timeline__step');
    const timelineStepsArray = [...$timelineSteps];
    enterView({
        selector: '.step',
        enter: function(el) {
            const stepIndex = el.getAttribute('data-step');
            $timelineSteps.forEach(step => {
                step.classList.remove('active');
                step.classList.remove('inactive-backward');
                step.classList.remove('active-backward');
            });
            timelineStepsArray[stepIndex].classList.add('active');
        },
        exit: function(el) {
            const stepIndex = parseInt(el.getAttribute('data-step'));
            $timelineSteps.forEach(step => {
                step.classList.remove('active');
                step.classList.remove('inactive-backward');
                step.classList.remove('active-backward');
            });
            timelineStepsArray[stepIndex].classList.add('inactive-backward');
            if (stepIndex > 0) {
                timelineStepsArray[stepIndex - 1].classList.add('active-backward');
            }
        },
        offset: 0.5
    });
    const scroll = new SmoothScroll('.timeline__step a[href*="#"]', {
        speed: 1000,
        easeing: 'easeInOutCubic',
        speedAsDuration: true,
        offset: function () { return window.innerWidth > 768 ? 180 : 70 }
    });
})();