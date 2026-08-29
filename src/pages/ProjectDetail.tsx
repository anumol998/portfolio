import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProject, type Project } from '../lib/api';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { category, slug } = useParams<{ category: string; slug: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!category || !slug) return;
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchProject(category, slug)
      .then((data) => {
        if (cancelled) return;
        setProject(data);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load project');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [category, slug]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setZoomed(false);
  }, []);

  const showPrev = useCallback(() => {
    if (!project?.drawings) return;
    setZoomed(false);
    setLightboxIndex((i) => (i === null ? null : (i - 1 + project.drawings!.length) % project.drawings!.length));
  }, [project]);

  const showNext = useCallback(() => {
    if (!project?.drawings) return;
    setZoomed(false);
    setLightboxIndex((i) => (i === null ? null : (i + 1) % project.drawings!.length));
  }, [project]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong: {error}</p>;
  if (!project) return <p>Project not found.</p>;

  const details = [
    { label: 'Project Type', value: project.projectType },
    { label: 'Stage', value: project.stage },
    { label: 'Location', value: project.location },
    { label: 'Role', value: project.role },
  ].filter((d) => d.value);

  const activeDrawing =
    lightboxIndex !== null && project.drawings ? project.drawings[lightboxIndex] : null;

  return (
    <div className="project-detail">
      <div className="project-detail__hero">
        <img src={project.cover} alt={project.title} />
        <h1>{project.title}</h1>
      </div>

      <div className="project-detail__body">
        {details.length > 0 && (
          <div className="project-detail__meta">
            {details.map((d) => (
              <div className="project-detail__meta-item" key={d.label}>
                <h3>{d.label}</h3>
                <p>{d.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="project-detail__description">
          {project.description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {project.drawings && project.drawings.length > 0 && (
          <div className="drawings-gallery">
            {project.drawings.map((d, i) => (
              <figure
                className="drawings-gallery__item"
                key={i}
                onClick={() => setLightboxIndex(i)}
              >
                <img src={d.image} alt={d.caption} />
                <figcaption>{d.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>

      {activeDrawing && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Close">
            &times;
          </button>

          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous"
          >
            &#8249;
          </button>

          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeDrawing.image}
              alt={activeDrawing.caption}
              className={zoomed ? 'lightbox__image lightbox__image--zoomed' : 'lightbox__image'}
              onClick={() => setZoomed((z) => !z)}
            />
            <p className="lightbox__caption">{activeDrawing.caption}</p>
          </div>

          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}