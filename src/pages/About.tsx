import { getContent } from '../content/loader';
import Reveal from '../components/Reveal';

export default function AboutPage() {
  const d = getContent('about');

  return (
    <main className="page">
      <section className="about-hero">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="section-label">{d.hero.label}</span>
              <h1 className="section-title page-title" dangerouslySetInnerHTML={{ __html: d.hero.title }} />
              <p className="section-desc" style={{ maxWidth: 620 }}>{d.hero.description}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="about-grid">
            {d.cards.map((c, i) => (
              <Reveal key={i} delay={i} className="card">
                <h3>{c.title}</h3>
                {c.paragraphs.map((p, k) => <p key={k}>{p}</p>)}
              </Reveal>
            ))}
          </div>
          <div className="value-strip">
            {d.values.map((v, i) => (
              <Reveal key={i} delay={i} className="value-item">
                <span className="value-icon">{v.icon}</span>
                <h4>{v.title}</h4>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--glow">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="section-label">{d.journey.label}</span>
              <h2 className="section-title">{d.journey.title}</h2>
              <p className="section-desc">{d.journey.description}</p>
            </div>
          </Reveal>
          <Reveal className="timeline">
            {d.journey.milestones.map((m, i) => (
              <div key={i} className="timeline-item">
                <span className="timeline-year">{m.year}</span>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </div>
            ))}
          </Reveal>

          <Reveal>
            <div className="section-header" style={{ marginTop: '4rem' }}>
              <span className="section-label">{d.trailers.label}</span>
              <h2 className="section-title">{d.trailers.title}</h2>
              <p className="section-desc">{d.trailers.description}</p>
            </div>
            <div className="video-grid">
              {d.trailers.videos.map(v => (
                <a key={v.id} href={`https://youtu.be/${v.id}`} target="_blank" rel="noopener noreferrer" className="video-thumb">
                  <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.caption} />
                  <div className="video-play-btn">
                    <svg viewBox="0 0 68 48">
                      <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="red" />
                      <path d="M45 24L27 14v20" fill="white" />
                    </svg>
                  </div>
                  <span className="video-label">{v.caption}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
