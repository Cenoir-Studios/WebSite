import { getContent } from '../content/loader';
import Reveal from '../components/Reveal';
import SmartImg from '../components/SmartImg';

export default function HomePage() {
  const d = getContent('index');
  const h = d.hero;
  const f = d.featured;

  return (
    <main className="page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">{h.tag}</span>
          <h1 dangerouslySetInnerHTML={{ __html: h.title }} />
          <p className="hero-desc">{h.description}</p>
          <div className="hero-actions">
            <a href="#/projects" className="btn btn--primary">{h.cta_primary.text}</a>
            <a href="#/about" className="btn btn--ghost">{h.cta_secondary.text}</a>
          </div>
        </div>
      </section>

      <div className="container"><div className="divider" /></div>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="section-label">{f.label}</span>
              <h2 className="section-title">{f.title}</h2>
              <p className="section-desc">{f.description}</p>
            </div>
          </Reveal>
          <div className="featured-grid">
            {f.images.map((img, i) => (
              <Reveal key={i} delay={i + 1} className="featured-img-wrap">
                <SmartImg src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={3}>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a href="#/projects" className="btn btn--ghost">View Full Project →</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--glow">
        <div className="container">
          <div className="pillars-grid">
            {d.pillars.map((p, i) => (
              <Reveal key={i} delay={i} className="card">
                <span className="pillar-icon">{p.icon}</span>
                <h3 className="pillar-title">{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
