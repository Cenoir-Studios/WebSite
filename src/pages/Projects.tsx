import Reveal from '../components/Reveal';
import ProjectCard from '../components/ProjectCard';
import { useContent } from '../content/ContentContext';

type Project = {
  id?: string;
  title: string;
  subtitle?: string;
  description?: string;
  tech?: string;
  tags?: string[];
  status?: string;
  downloads?: {
    windows?: string;
    mac?: string;
    linux?: string;
  };
  gallery?: {
    src: string;
    alt?: string;
  }[];
};

type ProjectsContent = {
  hero?: {
    label?: string;
    title?: string;
  };
  projects?: Project[];
};

export default function ProjectsPage() {
  const d = useContent('projects') as ProjectsContent;

  return (
    <main className="page">
      <section className="project-hero">
        <div className="container">
          <Reveal>
            <div className="section-header">
              <span className="section-label">
                {d.hero?.label}
              </span>

              <h1 className="section-title page-title">
                {d.hero?.title}
              </h1>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container container--wide">
          {(d.projects || []).map(
            (project: Project, i: number) => (
              <ProjectCard
                key={project.id || i}
                project={project}
              />
            )
          )}
        </div>
      </section>
    </main>
  );
}