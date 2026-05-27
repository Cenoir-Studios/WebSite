import { useContent } from '../content/ContentContext';
import Reveal from '../components/Reveal';

const STATUS_STYLES: Record<string, { color: string; label: string }> = {
  completed: { color: '#4ade80', label: '✓' },
  'in-progress': { color: '#f5b642', label: '◉' },
  upcoming: { color: '#d4892a', label: '○' },
  planned: { color: '#6b6057', label: '○' },
};

export default function TimelinePage() {
  const d = useContent('timeline');
  const milestones = d.milestones || [];

  return (
    <main className="page">
      <section className="about-hero">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="section-label">{d.hero?.label}</span>
              <h1 className="section-title page-title">{d.hero?.title}</h1>
              <p className="section-desc">{d.hero?.description}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="roadmap">
            {milestones.map((m, i) => {
              const st = STATUS_STYLES[m.status] || STATUS_STYLES.planned;
              return (
                <Reveal key={i} delay={Math.min(i, 4)} className="roadmap-item">
                  <div className="roadmap-marker" style={{ borderColor: st.color }}>
                    <span style={{ color: st.color }}>{st.label}</span>
                  </div>
                  <div className="roadmap-content">
                    <span className="roadmap-date">{m.date}</span>
                    <h3>{m.title}</h3>
                    <p>{m.description}</p>
                    <span className={`roadmap-status roadmap-status--${m.status}`}>{m.status.replace('-', ' ')}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
