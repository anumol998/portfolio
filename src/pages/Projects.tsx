import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProjectInfo, fetchCategories, type ProjectInfo, type Category } from '../lib/api';
import SkeletonImage from '../components/SkeletonImage';
import './Projects.css';

export default function Projects() {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([fetchProjectInfo(), fetchCategories()])
      .then(([info, cats]) => {
        if (cancelled) return;
        setProjectInfo(info);
        setCategories(cats);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load portfolio data');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="projects-page">
        <p>Loading…</p>
      </div>
    );
  }

  if (error || !projectInfo) {
    return (
      <div className="projects-page">
        <p>Something went wrong{error ? `: ${error}` : ''}. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="projects-page">
      <div className="projects-intro">
        <h1>{projectInfo.title}</h1>
        {projectInfo.description.map((para, i) => (
          <p key={i} className={i === 0 ? 'projects-intro__lead' : 'projects-intro__body'}>
            {para}
          </p>
        ))}
      </div>

      <div className="category-grid">
        {categories.map((cat) => (
          <Link key={cat.slug} to={`/projects/${cat.slug}`} className="category-card">
            <SkeletonImage src={cat.image} alt={cat.title} />
            <h3>{cat.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}