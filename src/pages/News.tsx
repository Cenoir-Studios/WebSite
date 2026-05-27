import { useContent } from '../content/ContentContext';
import Reveal from '../components/Reveal';

export default function NewsPage() {
  const d = useContent('news');

  return (
    <main className="page">
      <section className="news-hero">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="section-label">{d.hero.label}</span>
              <h1 className="section-title page-title">{d.hero.title}</h1>
              <p className="section-desc">{d.hero.description}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="news-feed">
            {d.entries.map((e, i) => (
              <Reveal key={i} delay={Math.min(i, 4)} className="news-item">
                <div className="news-date-block">
                  <span className="news-day">{e.day}</span>
                  <span className="news-month">{e.month}</span>
                </div>
                <div className="news-body">
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                </div>
                <span className="news-tag">{e.tag}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
