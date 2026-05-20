/* ========================================
   NAVIGATION — sticky header + hamburger menu
======================================== */
(function () {
    'use strict';

    const header    = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navMenu');
    const navLinks  = document.querySelectorAll('.nav__link');
    const sections  = document.querySelectorAll('main section[id]');

    /* ---- Sticky header on scroll ---- */
    const onScroll = () => {
        header.classList.toggle('header--scrolled', window.scrollY > 40);
        updateActiveLink();
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---- Hamburger menu toggle ---- */
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('nav__menu--open');
        navMenu.classList.toggle('nav__menu--open');
        hamburger.classList.toggle('hamburger--active');
        hamburger.setAttribute('aria-expanded', String(!isOpen));
        document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    /* Close menu when a nav link is clicked */
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    function closeMenu() {
        navMenu.classList.remove('nav__menu--open');
        hamburger.classList.remove('hamburger--active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    /* Close menu on Escape key */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    /* Close menu when clicking outside */
    document.addEventListener('click', (e) => {
        if (
            navMenu.classList.contains('nav__menu--open') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            closeMenu();
        }
    });

    /* ---- Active link on scroll ---- */
    function updateActiveLink() {
        const scrollY = window.scrollY + 100;

        let current = '';
        sections.forEach(section => {
            if (scrollY >= section.offsetTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle(
                'nav__link--active',
                href === `#${current}`
            );
        });
    }

    /* Run once on load */
    onScroll();
})();
