import { useContent } from '../content/ContentContext';
import Reveal from '../components/Reveal';

export default function AboutPage() {
  const d = useContent('about');

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
                <div key={v.id} className="video-embed-wrap">
                  <div className="video-embed">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&modestbranding=1`}
                      title={v.caption}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                  <p className="video-caption">{v.caption}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
