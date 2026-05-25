import { useState, useEffect } from 'react';
import { getContent } from '../content/loader';
import Reveal from '../components/Reveal';
import SmartImg from '../components/SmartImg';

export default function ProjectsPage() {
  const d = getContent('projects');
  const ns = d.nosains || { gallery: [], downloads: {}, tags: [] } as typeof d.nosains;
  const gallery = ns.gallery || [];
  const downloads = ns.downloads || {} as typeof ns.downloads;
  const [slide, setSlide] = useState(0);
  const [modal, setModal] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const len = gallery.length;

  useEffect(() => {
    if (!len) return;
    const t = setInterval(() => setSlide(s => (s + 1) % len), 5000);
    return () => clearInterval(t);
  }, [len]);

  const platforms = [
    { icon: '🪟', name: 'Windows', arch: 'x64 · .zip', url: downloads.windows },
    { icon: '🍎', name: 'macOS', arch: 'Universal · .zip', url: downloads.mac },
    { icon: '🐧', name: 'Linux', arch: 'x86_64 · .zip', url: downloads.linux },
  ];

  return (
    <main className="page">
      <section className="project-hero">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="section-label">{d.hero?.label}</span>
              <h1 className="section-title page-title">{d.hero?.title}</h1>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container container--wide">
          <Reveal className="project-showcase">
            <div className="project-top">
              <div className="project-info-panel">
                <h2>{ns.title}</h2>
                <span className="project-subtitle">{ns.subtitle}</span>
                <p>{ns.description}</p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.75 }}>{ns.tech}</p>
                <div className="project-tags">
                  {(ns.tags || []).map(t => <span key={t}>{t}</span>)}
                </div>
                <div className="project-actions">
                  <button className="btn btn--primary" onClick={() => setModal(true)}>▶ Download Build</button>
                  <a className="btn btn--ghost btn--small" href="#/news">Dev Updates →</a>
                </div>
              </div>
              <div className="carousel-panel">
                <div className="carousel-track" style={{ transform: `translateX(-${slide * 100}%)` }}>
                  {gallery.map((img, i) => (
                    <div key={i} className="carousel-slide">
                      <SmartImg src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
                <div className="carousel-controls">
                  <button className="carousel-btn" onClick={() => setSlide((slide - 1 + len) % len)}>‹</button>
                  <button className="carousel-btn" onClick={() => setSlide((slide + 1) % len)}>›</button>
                </div>
                <div className="carousel-dots">
                  {gallery.map((_, i) => (
                    <button key={i} className={`carousel-dot${i === slide ? ' active' : ''}`} onClick={() => setSlide(i)} />
                  ))}
                </div>
              </div>
            </div>
            <div className="gallery-section">
              <p className="gallery-label">Concept Art Gallery</p>
              <div className="gallery-grid">
                {gallery.map((img, i) => (
                  <div key={i} className={`gallery-thumb${i === slide ? ' active' : ''}`} onClick={() => setLightbox(img.src)}>
                    <SmartImg src={img.src} alt={img.alt} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {modal && (
        <div className="modal-overlay open" onClick={e => (e.target as HTMLElement).className.includes('modal-overlay') && setModal(false)}>
          <div className="modal-box">
            <button className="modal-close" onClick={() => setModal(false)}>✕</button>
            <h3>Download NoSaints</h3>
            <p>Choose your platform.</p>
            <div className="platform-options">
              {platforms.map(p => (
                <a key={p.name} className="platform-btn" href={p.url} target="_blank" rel="noopener noreferrer">
                  <span className="platform-icon">{p.icon}</span>
                  <span className="platform-name">{p.name}</span>
                  <span className="platform-arch">{p.arch}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {lightbox && (
        <div className="lightbox open" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox} alt="Concept art" />
        </div>
      )}
    </main>
  );
}
