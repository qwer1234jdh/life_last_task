/* ========================================
   CURRICULUM — tab UI
======================================== */
(function () {
    'use strict';

    const tabBtns  = document.querySelectorAll('#curriculum .tab-btn');
    const panels   = document.querySelectorAll('#curriculum .tab-panel');

    if (!tabBtns.length) return;

    function activate(btn) {
        /* Deactivate all */
        tabBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        panels.forEach(p => {
            p.classList.remove('active');
            p.setAttribute('hidden', '');
        });

        /* Activate selected */
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const panel = document.getElementById('panel-' + btn.dataset.tab);
        if (panel) {
            panel.classList.add('active');
            panel.removeAttribute('hidden');
        }
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => activate(btn));

        /* Keyboard: Arrow Left / Right to move between tabs */
        btn.addEventListener('keydown', (e) => {
            const btns = [...tabBtns];
            const idx  = btns.indexOf(btn);

            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const next = btns[(idx + 1) % btns.length];
                next.focus();
                activate(next);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prev = btns[(idx - 1 + btns.length) % btns.length];
                prev.focus();
                activate(prev);
            } else if (e.key === 'Home') {
                e.preventDefault();
                btns[0].focus();
                activate(btns[0]);
            } else if (e.key === 'End') {
                e.preventDefault();
                btns[btns.length - 1].focus();
                activate(btns[btns.length - 1]);
            }
        });
    });
})();
