export default function ProjectsPage() {
  const d = getContent('projects');

  return (
    <main className="page">
      <section className="project-hero">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="section-label">{d.hero?.label}</span>
              <h1 className="section-title page-title">
                {d.hero?.title}
              </h1>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container container--wide">
          {(d.projects || []).map((project, i) => (
            <ProjectCard key={project.id || i} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}