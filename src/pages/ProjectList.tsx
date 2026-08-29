import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProjects, type Project } from '../lib/api';
import './ProjectList.css';

export default function ProjectList() {
  const { category } = useParams<{ category: string }>();
  const [list, setList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetchProjects()
      .then((projects) => {
        if (cancelled) return;
        setList(category ? projects[category] ?? [] : []);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [category]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  return (
    <section>
      <h1>{category}</h1>
      <div className="project-list">
        {list.map((p) => (
          <Link key={p.slug} to={`/projects/${category}/${p.slug}`} className="project-card">
            <img src={p.cover} alt={p.title} />
            <div className="project-info">
              <h3>{p.title}</h3>
              <p>{p.description[0]}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}