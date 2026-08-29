import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import './ProjectList.css'

export default function ProjectList() {
  const { category } = useParams<{ category: string }>();
  const list = category ? projects[category] ?? [] : [];

  return (
    <section>
      <h1>{category}</h1>
      <div className="project-list">
        {list.map((p) => (
          <Link key={p.slug} to={`/projects/${category}/${p.slug}`} className="project-card">
            <img src={p.cover} alt={p.title} />
            <div className="project-info">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}