const { useState, useEffect, useRef, Component } = React;
const html = htm.bind(React.createElement);
const PHOTO_EXTS = ['png', 'jpg'];
const D = (page) => CONTENT[page] || {};

/* ═══════ ERROR BOUNDARY ═══════ */
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  render() {
    if (this.state.err) return html`<div style=${{ padding: '4rem', textAlign: 'center', color: '#9a8e82' }}>
      <h2 style=${{ color: '#f0ebe4', marginBottom: '1rem' }}>Something went wrong</h2>
      <p>${this.state.err.message}</p>
      <button onClick=${() => { this.setState({ err: null }); window.location.hash = '#/'; }} class="btn btn--ghost" style=${{ marginTop: '1.5rem' }}>Go Home</button>
    </div>`;
    return this.props.children;
  }
}

/* ═══════ IMAGES ═══════ */
function SmartImg({ src, alt, className, style }) {
  const ref = useRef();
  useEffect(() => {
    const img = ref.current;
    if (!img) return;
    function tryAlts() {
      const s = img.getAttribute('src'), dot = s.lastIndexOf('.');
      if (dot === -1) return;
      const base = s.substring(0, dot), ext = s.substring(dot + 1);
      const alts = PHOTO_EXTS.filter(e => e !== ext);
      let j = 0;
      function next() { if (j >= alts.length) return; img.onerror = next; img.src = base + '.' + alts[j++]; }
      next();
    }
    img.onerror = tryAlts;
    if (img.complete && img.naturalWidth === 0) tryAlts();
  }, [src]);
  return html`<img ref=${ref} src=${src} alt=${alt || ''} className=${className || ''} style=${style} />`;
}

function TeamAvatar({ photo, initials }) {
  const [imgSrc, setImgSrc] = useState(null);
  useEffect(() => {
    let i = 0, dead = false;
    function go() {
      if (i >= PHOTO_EXTS.length || dead) return;
      const url = './assets/Team/' + photo + '.' + PHOTO_EXTS[i++];
      const img = new Image();
      img.onload = () => { if (!dead && img.naturalWidth > 0) setImgSrc(url); };
      img.onerror = () => { if (!dead) go(); };
      try { img.src = url; } catch(e) { go(); }
    }
    go();
    return () => { dead = true; };
  }, [photo]);
  return html`<div class="team-avatar">
    ${imgSrc ? html`<img src=${imgSrc} alt=${photo} style=${{ width: '100%', height: '100%', objectFit: 'cover' }} />`
             : html`<div class="team-avatar-placeholder">${initials}</div>`}
  </div>`;
}

/* ═══════ REVEAL ═══════ */
function Reveal({ children, className, delay }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el); } }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return html`<div ref=${ref} class=${'reveal' + (delay ? ' reveal-delay-' + delay : '') + (className ? ' ' + className : '')}>${children}</div>`;
}

/* ═══════ SOCIALS ═══════ */
const SVG = {
  x:'<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  linkedin:'<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  youtube:'<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  instagram:'<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
  tiktok:'<svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>'
};
function Socials({ items }) {
  return html`<div class="footer-social">${(items||[]).map(s =>
    html`<a key=${s.label} href=${s.url} target="_blank" class="social-link" aria-label=${s.label} dangerouslySetInnerHTML=${{ __html: SVG[s.icon]||'' }} />`)}</div>`;
}

/* ═══════ NAVBAR ═══════ */
function Navbar({ route }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn); }, []);
  useEffect(() => { setOpen(false); }, [route]);
  const link = (to, label) => html`<a href=${'#/' + to} class=${route === to ? 'active' : ''}>${label}</a>`;
  return html`<header class=${'navbar' + (scrolled ? ' scrolled' : '')}>
    <a href="#/" class="logo-link"><${SmartImg} src="./assets/Logo.png" alt="Cenoir" className="logo" /><span class="brand">Cenoir Studios</span></a>
    ${open && html`<div class="nav-backdrop" onClick=${() => setOpen(false)} />`}
    <nav class=${'nav-links' + (open ? ' open' : '')}>${link('','Home')}${link('about','About')}${link('team','Team')}${link('projects','Projects')}${link('news','News')}${link('careers','Careers')}</nav>
    <button class=${'nav-toggle' + (open ? ' open' : '')} onClick=${() => setOpen(!open)} aria-label="Menu"><div class="hamburger" /></button>
  </header>`;
}

/* ═══════ FOOTER ═══════ */
function Footer() {
  const s = D('shared');
  const e = s.emails || {};
  const ml = (k) => html`<a href=${'mailto:'+e[k]}>${e[k]}</a>`;
  return html`<footer class="footer"><div class="footer-inner">
    <div class="footer-brand"><${SmartImg} src="./assets/Logo.png" alt="Cenoir" /><span>Cenoir Studios</span><${Socials} items=${s.socials} /></div>
    <div class="footer-columns">
      <div class="footer-col"><h4>Studio</h4><a href="#/">Home</a><a href="#/about">About</a><a href="#/team">Team</a><a href="#/projects">Projects</a><a href="#/news">News</a><a href="#/careers">Careers</a></div>
      <div class="footer-col"><h4>Contact</h4>${ml('contact')}${ml('careers')}${ml('support')}</div>
      <div class="footer-col"><h4>Other</h4>${ml('social')}${ml('legal')}</div>
    </div>
    <p class="footer-copy">${s.copyright}</p>
  </div></footer>`;
}

/* ═══════ HOME ═══════ */
function HomePage() {
  const d = D('index');
  const h = d.hero || {};
  return html`<main class="page">
    <section class="hero"><div class="hero-content">
      <span class="hero-tag">${h.tag}</span>
      <h1 dangerouslySetInnerHTML=${{ __html: h.title || '' }} />
      <p class="hero-desc">${h.description}</p>
      <div class="hero-actions">
        <a href="#/projects" class="btn btn--primary">${(h.cta_primary||{}).text}</a>
        <a href="#/about" class="btn btn--ghost">${(h.cta_secondary||{}).text}</a>
      </div>
    </div></section>
    <div class="container"><div class="divider" /></div>
    <section class="section"><div class="container">
      <${Reveal}><div class="section-header">
        <span class="section-label">${(d.featured||{}).label}</span>
        <h2 class="section-title">${(d.featured||{}).title}</h2>
        <p class="section-desc">${(d.featured||{}).description}</p>
      </div><//>
      <div class="featured-grid">${((d.featured||{}).images||[]).map((img, i) =>
        html`<${Reveal} key=${i} delay=${i+1} className="featured-img-wrap"><${SmartImg} src=${img.src} alt=${img.alt} style=${{ width:'100%', height:'100%', objectFit:'cover' }} /><//>`)}</div>
      <${Reveal} delay=${3}><div style=${{ textAlign:'center', marginTop:'2rem' }}><a href="#/projects" class="btn btn--ghost">View Full Project →</a></div><//>
    </div></section>
    <section class="section section--glow"><div class="container"><div class="pillars-grid">
      ${(d.pillars||[]).map((p, i) => html`<${Reveal} key=${i} delay=${i} className="card">
        <span class="pillar-icon">${p.icon}</span><h3 class="pillar-title">${p.title}</h3><p>${p.text}</p><//>`)}</div></div></section>
  </main>`;
}

/* ═══════ ABOUT ═══════ */
function AboutPage() {
  const d = D('about');
  const h = d.hero || {};
  const j = d.journey || {};
  const tr = d.trailers || {};
  return html`<main class="page">
    <section class="about-hero"><div class="container"><${Reveal}><div class="section-header">
      <span class="section-label">${h.label}</span>
      <h1 class="section-title page-title" dangerouslySetInnerHTML=${{ __html: h.title || '' }} />
      <p class="section-desc" style=${{ maxWidth:620 }}>${h.description}</p>
    </div><//></div></section>
    <section class="section" style=${{ paddingTop:0 }}><div class="container">
      <div class="about-grid">${(d.cards||[]).map((c, i) => html`<${Reveal} key=${i} delay=${i} className="card">
        <h3>${c.title}</h3>${c.paragraphs.map((p, k) => html`<p key=${k}>${p}</p>`)}<//>`)}
      </div>
      <div class="value-strip">${(d.values||[]).map((v, i) => html`<${Reveal} key=${i} delay=${i} className="value-item">
        <span class="value-icon">${v.icon}</span><h4>${v.title}</h4><p>${v.text}</p><//>`)}
      </div>
    </div></section>
    <section class="section section--glow"><div class="container">
      <${Reveal}><div class="section-header">
        <span class="section-label">${j.label}</span><h2 class="section-title">${j.title}</h2><p class="section-desc">${j.description}</p>
      </div><//>
      <${Reveal} className="timeline">${(j.milestones||[]).map((m, i) =>
        html`<div key=${i} class="timeline-item"><span class="timeline-year">${m.year}</span><h3>${m.title}</h3><p>${m.text}</p></div>`)}<//>
      <${Reveal}><div class="section-header" style=${{ marginTop:'4rem' }}>
        <span class="section-label">${tr.label}</span><h2 class="section-title">${tr.title}</h2><p class="section-desc">${tr.description}</p>
      </div>
      <div class="video-grid">${(tr.videos||[]).map(v => html`<a key=${v.id} href=${'https://youtu.be/'+v.id} target="_blank" class="video-thumb">
        <img src=${'https://img.youtube.com/vi/'+v.id+'/hqdefault.jpg'} alt=${v.caption} />
        <div class="video-play-btn"><svg viewBox="0 0 68 48"><path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red"/><path d="M45 24L27 14v20" fill="white"/></svg></div>
        <span class="video-label">${v.caption}</span></a>`)}</div><//></div></section>
  </main>`;
}

/* ═══════ TEAM ═══════ */
function TeamPage() {
  const d = D('team');
  return html`<main class="page">
    <section class="about-hero"><div class="container"><${Reveal}><div class="section-header">
      <span class="section-label">${d.label}</span>
      <h1 class="section-title page-title">${d.title}</h1>
      <p class="section-desc">${d.description}</p>
    </div><//></div></section>
    <section class="section" style=${{ paddingTop:0 }}><div class="container">
      ${(d.departments||[]).map((dept, di) => html`<${Reveal} key=${di} delay=${Math.min(di,3)} className="team-department">
        <h3 class="team-dept-label">${dept.name}</h3>
        <div class="team-grid">${dept.members.map(m => html`<div key=${m.photo} class="team-member">
          <${TeamAvatar} photo=${m.photo} initials=${m.initials} />
          <div class="team-name">${m.name}</div><div class="team-role">${m.role}</div>
          <div class="team-fav">Favorite games: ${m.games}</div></div>`)}</div><//>`)}
    </div></section>
  </main>`;
}

/* ═══════ PROJECTS ═══════ */
function ProjectsPage() {
  const d = D('projects');
  const ns = d.nosains || {};
  const gallery = ns.gallery || [];
  const downloads = ns.downloads || {};
  const [slide, setSlide] = useState(0);
  const [modal, setModal] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const len = gallery.length;

  useEffect(() => {
    if (!len) return;
    const t = setInterval(() => setSlide(s => (s + 1) % len), 5000);
    return () => clearInterval(t);
  }, [len]);

  const platforms = [
    { icon: '🪟', name: 'Windows', arch: 'x64 · .zip', url: downloads.windows },
    { icon: '🍎', name: 'macOS', arch: 'Universal · .zip', url: downloads.mac },
    { icon: '🐧', name: 'Linux', arch: 'x86_64 · .zip', url: downloads.linux }
  ];

  return html`<main class="page">
    <section class="project-hero"><div class="container"><${Reveal}><div class="section-header">
      <span class="section-label">${(d.hero||{}).label}</span>
      <h1 class="section-title page-title">${(d.hero||{}).title}</h1>
    </div><//></div></section>
    <section class="section" style=${{ paddingTop:0 }}><div class="container container--wide">
      <${Reveal} className="project-showcase"><div class="project-top">
        <div class="project-info-panel">
          <h2>${ns.title}</h2><span class="project-subtitle">${ns.subtitle}</span>
          <p>${ns.description}</p>
          <p style=${{ color:'var(--text-secondary)', marginBottom:'1.5rem', lineHeight:1.75 }}>${ns.tech}</p>
          <div class="project-tags">${(ns.tags||[]).map(t => html`<span key=${t}>${t}</span>`)}</div>
          <div class="project-actions">
            <button class="btn btn--primary" onClick=${() => setModal(true)}>▶ Download Build</button>
            <a class="btn btn--ghost btn--small" href="#/news">Dev Updates →</a>
          </div>
        </div>
        <div class="carousel-panel">
          <div class="carousel-track" style=${{ transform: 'translateX(-'+(slide*100)+'%)' }}>
            ${gallery.map((img, i) => html`<div key=${i} class="carousel-slide"><${SmartImg} src=${img.src} alt=${img.alt} style=${{ width:'100%', height:'100%', objectFit:'cover' }} /></div>`)}</div>
          <div class="carousel-controls">
            <button class="carousel-btn" onClick=${() => setSlide((slide-1+len)%len)}>‹</button>
            <button class="carousel-btn" onClick=${() => setSlide((slide+1)%len)}>›</button></div>
          <div class="carousel-dots">${gallery.map((_, i) => html`<button key=${i} class=${'carousel-dot'+(i===slide?' active':'')} onClick=${() => setSlide(i)} />`)}</div>
        </div>
      </div>
      <div class="gallery-section"><p class="gallery-label">Concept Art Gallery</p>
        <div class="gallery-grid">${gallery.map((img, i) => html`<div key=${i} class=${'gallery-thumb'+(i===slide?' active':'')}
          onClick=${() => setLightbox(img.src)}><${SmartImg} src=${img.src} alt=${img.alt} /></div>`)}</div>
      </div><//>
    </div></section>
    ${modal && html`<div class="modal-overlay open" onClick=${e => e.target.className.includes('modal-overlay') && setModal(false)}>
      <div class="modal-box"><button class="modal-close" onClick=${() => setModal(false)}>✕</button>
        <h3>Download NoSaints</h3><p>Choose your platform.</p>
        <div class="platform-options">${platforms.map(p => html`<a key=${p.name} class="platform-btn" href=${p.url} target="_blank">
          <span class="platform-icon">${p.icon}</span><span class="platform-name">${p.name}</span><span class="platform-arch">${p.arch}</span></a>`)}</div>
      </div></div>`}
    ${lightbox && html`<div class="lightbox open" onClick=${() => setLightbox(null)}>
      <button class="lightbox-close" onClick=${() => setLightbox(null)}>✕</button><img src=${lightbox} alt="Concept art" /></div>`}
  </main>`;
}

/* ═══════ NEWS ═══════ */
function NewsPage() {
  const d = D('news');
  return html`<main class="page">
    <section class="news-hero"><div class="container"><${Reveal}><div class="section-header">
      <span class="section-label">${(d.hero||{}).label}</span>
      <h1 class="section-title page-title">${(d.hero||{}).title}</h1>
      <p class="section-desc">${(d.hero||{}).description}</p>
    </div><//></div></section>
    <section class="section" style=${{ paddingTop:0 }}><div class="container"><div class="news-feed">
      ${(d.entries||[]).map((e, i) => html`<${Reveal} key=${i} delay=${Math.min(i,4)} className="news-item">
        <div class="news-date-block"><span class="news-day">${e.day}</span><span class="news-month">${e.month}</span></div>
        <div class="news-body"><h3>${e.title}</h3><p>${e.text}</p></div>
        <span class="news-tag">${e.tag}</span><//>`)}
    </div></div></section>
  </main>`;
}

/* ═══════ CAREERS ═══════ */
function RoleCard({ role }) {
  const [open, setOpen] = useState(false);
  const email = (D('shared').emails||{}).careers||'';
  return html`<div class=${'role-card'+(open?' expanded':'')}>
    <div class="role-header" onClick=${() => setOpen(!open)}>
      <div class="role-info"><h3>${role.title}</h3><div class="role-meta"><span>${role.dept}</span><span>${role.location}</span><span>${role.type}</span></div></div>
      <button class="role-toggle">+</button></div>
    <div class="role-body"><div class="role-body-inner">
      <h4>About the Role</h4><p>${role.about}</p>
      <h4>What You'll Do</h4><ul>${(role.tasks||[]).map((t, i) => html`<li key=${i}>${t}</li>`)}</ul>
      ${role.tools && html`<h4>Tools</h4><ul>${role.tools.map((t, i) => html`<li key=${i}>${t}</li>`)}</ul>`}
      <div class="role-apply-row"><a href=${'mailto:'+email+'?subject=Application: '+role.title} class="btn btn--primary btn--small">Apply Now →</a></div>
    </div></div></div>`;
}

function CareersPage() {
  const d = D('careers');
  const email = (D('shared').emails||{}).careers||'';
  return html`<main class="page">
    <section class="careers-hero"><div class="container"><${Reveal} className="careers-intro">
      <span class="section-label">${(d.hero||{}).label}</span>
      <h1 class="section-title page-title" dangerouslySetInnerHTML=${{ __html: (d.hero||{}).title||'' }} />
      <p>${(d.hero||{}).description}</p><//></div></section>
    <section class="section" style=${{ paddingTop:0 }}><div class="container">
      <${Reveal}><div class="section-header"><span class="section-label">Open Roles</span><h2 class="section-title">Current opportunities</h2>
        <p class="section-desc">Click a role to see the full description and apply.</p></div><//>
      <div class="open-roles">${(d.roles||[]).map((r, i) => html`<${Reveal} key=${i} delay=${Math.min(i,4)}><${RoleCard} role=${r} /><//>`)}</div>
      <${Reveal} className="contact-block"><h3>Don't see your role?</h3>
        <p>We're always open to hearing from passionate people.</p>
        <a href=${'mailto:'+email+'?subject=General Application'} class="btn btn--primary">Get in Touch</a><//>
    </div></section>
  </main>`;
}

/* ═══════ APP ═══════ */
function useRoute() {
  const [r, setR] = useState(window.location.hash.replace('#/','') || '');
  useEffect(() => { const fn = () => { setR(window.location.hash.replace('#/','') || ''); window.scrollTo(0,0); }; window.addEventListener('hashchange', fn); return () => window.removeEventListener('hashchange', fn); }, []);
  return r;
}

function App() {
  const route = useRoute();
  const pages = { '': HomePage, about: AboutPage, team: TeamPage, projects: ProjectsPage, news: NewsPage, careers: CareersPage };
  const Page = pages[route] || HomePage;
  return html`<${Navbar} route=${route} /><${ErrorBoundary}><${Page} /><//><${Footer} />`;
}

/* Fetch JSON files, overwrite CONTENT, then mount React */
(async function boot() {
  const names = ['shared', 'index', 'about', 'team', 'projects', 'news', 'careers'];
  const fetches = names.map(async (name) => {
    try {
      const res = await fetch('./assets/content/' + name + '.json');
      if (!res.ok) throw new Error(res.status);
      const data = await res.json();
      CONTENT[name] = data;
      console.log('[content] loaded ' + name + '.json from server');
    } catch (e) {
      console.warn('[content] ' + name + '.json fetch failed, using fallback:', e.message);
    }
  });
  await Promise.all(fetches);
  ReactDOM.createRoot(document.getElementById('root')).render(html`<${App} />`);
})();
