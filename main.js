document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => { toggle.classList.toggle('open'); navLinks.classList.toggle('open'); });
        navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => { toggle.classList.remove('open'); navLinks.classList.remove('open'); }));
    }

    window.addEventListener('scroll', () => { if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40); }, { passive: true });

    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(el => obs.observe(el));
    }

    function initCarousel() {
        const track = document.querySelector('.carousel-track');
        if (!track) return;
        const slides = track.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        const thumbs = document.querySelectorAll('.gallery-thumb');
        const prev = document.querySelector('.carousel-prev');
        const next = document.querySelector('.carousel-next');
        let cur = 0, timer;
        function goTo(i) {
            cur = ((i % slides.length) + slides.length) % slides.length;
            track.style.transform = 'translateX(-' + (cur * 100) + '%)';
            dots.forEach((d, j) => d.classList.toggle('active', j === cur));
            thumbs.forEach((t, j) => t.classList.toggle('active', j === cur));
            clearInterval(timer); timer = setInterval(() => goTo(cur + 1), 5000);
        }
        if (prev) prev.addEventListener('click', () => goTo(cur - 1));
        if (next) next.addEventListener('click', () => goTo(cur + 1));
        dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
        thumbs.forEach((t, i) => t.addEventListener('click', () => goTo(i)));
        timer = setInterval(() => goTo(cur + 1), 5000);
    }
    initCarousel();

    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const lbImg = lightbox.querySelector('img');
        document.querySelectorAll('[data-lightbox]').forEach(el => {
            el.addEventListener('click', e => { e.stopPropagation(); lbImg.src = el.dataset.lightbox; lightbox.classList.add('open'); });
        });
        lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
        const lbClose = lightbox.querySelector('.lightbox-close');
        if (lbClose) lbClose.addEventListener('click', () => lightbox.classList.remove('open'));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') lightbox.classList.remove('open'); });
    }

    document.querySelectorAll('.role-header').forEach(h => {
        h.addEventListener('click', () => {
            const card = h.closest('.role-card');
            const was = card.classList.contains('expanded');
            document.querySelectorAll('.role-card.expanded').forEach(c => c.classList.remove('expanded'));
            if (!was) card.classList.add('expanded');
        });
    });

    const dlModal = document.getElementById('download-modal');
    if (dlModal) {
        document.querySelectorAll('[data-download-trigger]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); dlModal.classList.add('open'); }));
        dlModal.addEventListener('click', e => { if (e.target === dlModal) dlModal.classList.remove('open'); });
        const cls = dlModal.querySelector('.modal-close');
        if (cls) cls.addEventListener('click', () => dlModal.classList.remove('open'));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') dlModal.classList.remove('open'); });
    }

    CL.fixImages();
});

function reInitReveal() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        obs.observe(el);
    });
}
