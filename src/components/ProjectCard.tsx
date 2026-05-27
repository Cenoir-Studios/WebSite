import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import SmartImg from './SmartImg';
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

export default function ProjectCard({ project }: { project: Project }) {
  const ui = useContent('shared').ui;
  const gallery = project.gallery || [];
  const hasGallery = gallery.length > 0;

  const [slide, setSlide] = useState(0);
  const [modal, setModal] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const len = gallery.length;

  useEffect(() => {
    if (!hasGallery) return;

    const t = setInterval(() => {
      setSlide(s => (s + 1) % len);
    }, 5000);

    return () => clearInterval(t);
  }, [len, hasGallery]);

  const platforms = [
    {
      icon: '🪟',
      name: 'Windows',
      arch: 'x64 · .zip',
      url: project.downloads?.windows,
    },
    {
      icon: '🍎',
      name: 'macOS',
      arch: 'Universal · .zip',
      url: project.downloads?.mac,
    },
    {
      icon: '🐧',
      name: 'Linux',
      arch: 'x86_64 · .zip',
      url: project.downloads?.linux,
    },
  ].filter(p => p.url);

  return (
    <Reveal className="project-showcase">
      <div className="project-top">
        <div className="project-info-panel">
          <h2>{project.title}</h2>

          {project.subtitle && (
            <span className="project-subtitle">
              {project.subtitle}
            </span>
          )}

          {project.description && <p>{project.description}</p>}

          {project.tech && (
            <p
              style={{
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem',
                lineHeight: 1.75,
              }}
            >
              {project.tech}
            </p>
          )}

          <div className="project-tags">
            {(project.tags || []).map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>

          <div className="project-actions">
            {platforms.length > 0 && (
              <button
                className="btn btn--primary"
                onClick={() => setModal(true)}
              >
                ▶ Download Build
              </button>
            )}

            {project.status && (
              <span className="project-status-badge">
                {project.status}
              </span>
            )}
          </div>
        </div>

        <div className="carousel-panel">
          {hasGallery ? (
            <>
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${slide * 100}%)`,
                }}
              >
                {gallery.map((img, i) => (
                  <div key={i} className="carousel-slide">
                    <SmartImg
                      src={img.src}
                      alt={img.alt || ''}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="carousel-controls">
                <button
                  className="carousel-btn"
                  onClick={() =>
                    setSlide((slide - 1 + len) % len)
                  }
                >
                  ‹
                </button>

                <button
                  className="carousel-btn"
                  onClick={() =>
                    setSlide((slide + 1) % len)
                  }
                >
                  ›
                </button>
              </div>

              <div className="carousel-dots">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot${
                      i === slide ? ' active' : ''
                    }`}
                    onClick={() => setSlide(i)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="project-placeholder">
              <span>{ui?.in_development || "In Development"}</span>
            </div>
          )}
        </div>
      </div>

      {hasGallery && (
        <div className="gallery-section">
          <p className="gallery-label">{ui?.concept_gallery || "Gallery"}</p>

          <div className="gallery-grid">
            {gallery.map((img, i) => (
              <div
                key={i}
                className={`gallery-thumb${
                  i === slide ? ' active' : ''
                }`}
                onClick={() => setLightbox(img.src)}
              >
                <SmartImg
                  src={img.src}
                  alt={img.alt || ''}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {modal && (
        <div
          className="modal-overlay open"
          onClick={e =>
            (e.target as HTMLElement)
              .className
              .includes('modal-overlay') &&
            setModal(false)
          }
        >
          <div className="modal-box">
            <button
              className="modal-close"
              onClick={() => setModal(false)}
            >
              ✕
            </button>

            <h3>{(ui?.download_title || "Download") + " " + project.title}</h3>

            <p>{ui?.choose_platform || "Choose your platform."}</p>

            <div className="platform-options">
              {platforms.map(p => (
                <a
                  key={p.name}
                  className="platform-btn"
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="platform-icon">
                    {p.icon}
                  </span>

                  <span className="platform-name">
                    {p.name}
                  </span>

                  <span className="platform-arch">
                    {p.arch}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {lightbox && (
        <div
          className="lightbox open"
          onClick={() => setLightbox(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>

          <img src={lightbox} alt="Project" />
        </div>
      )}
    </Reveal>
  );
}