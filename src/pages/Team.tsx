import { useContent } from '../content/ContentContext';
import Reveal from '../components/Reveal';
import TeamAvatar from '../components/TeamAvatar';

export default function TeamPage() {
  const d = useContent('team');

  return (
    <main className="page">
      <section className="about-hero">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="section-label">{d.label}</span>
              <h1 className="section-title page-title">{d.title}</h1>
              <p className="section-desc">{d.description}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {(d.departments || []).map((dept, di) => (
            <Reveal key={di} delay={Math.min(di, 3)} className="team-department">
              <h3 className="team-dept-label">{dept.name}</h3>
              <div className="team-grid">
                {dept.members.map(m => (
                  <div key={m.photo} className="team-member">
                    <TeamAvatar photo={m.photo} initials={m.initials} />
                    <div className="team-name">{m.name}</div>
                    <div className="team-role">{m.role}</div>
                    <div className="team-fav">Favorite games: {m.games}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
