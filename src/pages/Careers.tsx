import { useState } from 'react';
import { useContent } from '../content/ContentContext';
import Reveal from '../components/Reveal';
import type { Role } from '../content/types';

function RoleCard({ role }: { role: Role }) {
  const [open, setOpen] = useState(false);
  const email = useContent('shared').emails?.careers || '';

  return (
    <div className={`role-card${open ? ' expanded' : ''}`}>
      <div className="role-header" onClick={() => setOpen(!open)}>
        <div className="role-info">
          <h3>{role.title}</h3>
          <div className="role-meta">
            <span>{role.dept}</span>
            <span>{role.location}</span>
            <span>{role.type}</span>
          </div>
        </div>
        <button className="role-toggle">+</button>
      </div>
      <div className="role-body">
        <div className="role-body-inner">
          <h4>About the Role</h4>
          <p>{role.about}</p>
          <h4>What You'll Do</h4>
          <ul>{role.tasks.map((t, i) => <li key={i}>{t}</li>)}</ul>
          {role.tools && (
            <>
              <h4>Tools</h4>
              <ul>{role.tools.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </>
          )}
          <div className="role-apply-row">
            <a href={`mailto:${email}?subject=Application: ${role.title}`} className="btn btn--primary btn--small">
              Apply Now →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CareersPage() {
  const d = useContent('careers');
  const email = useContent('shared').emails?.careers || '';

  return (
    <main className="page">
      <section className="careers-hero">
        <div className="container">
          <Reveal className="careers-intro">
            <span className="section-label">{d.hero.label}</span>
            <h1 className="section-title page-title" dangerouslySetInnerHTML={{ __html: d.hero.title }} />
            <p>{d.hero.description}</p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="section-label">Open Roles</span>
              <h2 className="section-title">Current opportunities</h2>
              <p className="section-desc">Click a role to see the full description and apply.</p>
            </div>
          </Reveal>
          <div className="open-roles">
            {d.roles.map((r, i) => (
              <Reveal key={i} delay={Math.min(i, 4)}>
                <RoleCard role={r} />
              </Reveal>
            ))}
          </div>
          <Reveal className="contact-block">
            <h3>Don't see your role?</h3>
            <p>We're always open to hearing from passionate people.</p>
            <a href={`mailto:${email}?subject=General Application`} className="btn btn--primary">Get in Touch</a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
