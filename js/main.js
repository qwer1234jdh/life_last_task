/* ========================================
   MAIN — scroll reveal + count-up animation
======================================== */
(function () {
    'use strict';

    /* ---- Scroll Reveal ---- */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ---- Count-up Animation ---- */
    function animateCount(el) {
        const target   = parseInt(el.dataset.target, 10);
        const suffix   = el.dataset.suffix || '';
        const duration = 1800;
        const start    = performance.now();

        const easeOut = t => 1 - Math.pow(1 - t, 3);

        const tick = (now) => {
            const elapsed  = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const value    = Math.round(easeOut(progress) * target);
            el.textContent = value.toLocaleString() + suffix;

            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.hero__count').forEach(el => countObserver.observe(el));

    /* ---- FAQ Accordion ---- */
    document.querySelectorAll('.faq__question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq__item');
            const isOpen = item.classList.contains('faq__item--open');

            document.querySelectorAll('.faq__item').forEach(el => {
                el.classList.remove('faq__item--open');
                el.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
                el.querySelector('.faq__answer').setAttribute('aria-hidden', 'true');
            });

            if (!isOpen) {
                item.classList.add('faq__item--open');
                btn.setAttribute('aria-expanded', 'true');
                item.querySelector('.faq__answer').setAttribute('aria-hidden', 'false');
            }
        });
    });
})();
