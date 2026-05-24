document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    window.addEventListener('scroll', () => {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => observer.observe(el));
    }

    const carousel = document.querySelector('.carousel-track');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        const thumbs = document.querySelectorAll('.gallery-thumb');
        let current = 0;
        let autoTimer;

        function goTo(index) {
            current = ((index % slides.length) + slides.length) % slides.length;
            carousel.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
            thumbs.forEach((t, i) => t.classList.toggle('active', i === current));
            resetAuto();
        }
        function resetAuto() {
            clearInterval(autoTimer);
            autoTimer = setInterval(() => goTo(current + 1), 5000);
        }
        if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
        dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
        thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => goTo(i)));
        resetAuto();
    }

    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lbImg = lightbox.querySelector('img');
        const lbClose = lightbox.querySelector('.lightbox-close');
        document.querySelectorAll('[data-lightbox]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                lbImg.src = el.dataset.lightbox || el.querySelector('img')?.src || el.src;
                lightbox.classList.add('open');
            });
        });
        lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
        if (lbClose) lbClose.addEventListener('click', () => lightbox.classList.remove('open'));
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.classList.remove('open'); });
    }

    document.querySelectorAll('.role-header').forEach(header => {
        header.addEventListener('click', () => {
            const card = header.closest('.role-card');
            const wasExpanded = card.classList.contains('expanded');
            document.querySelectorAll('.role-card.expanded').forEach(c => c.classList.remove('expanded'));
            if (!wasExpanded) card.classList.add('expanded');
        });
    });

    const downloadModal = document.getElementById('download-modal');
    if (downloadModal) {
        const closeBtn = downloadModal.querySelector('.modal-close');

        document.querySelectorAll('[data-download-trigger]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                downloadModal.classList.add('open');
            });
        });

        downloadModal.addEventListener('click', (e) => {
            if (e.target === downloadModal) downloadModal.classList.remove('open');
        });
        if (closeBtn) closeBtn.addEventListener('click', () => downloadModal.classList.remove('open'));
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') downloadModal.classList.remove('open');
        });
    }
});
