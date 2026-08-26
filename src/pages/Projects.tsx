import { Link } from 'react-router-dom';
import { categories } from '../data/projects';

export default function Projects() {
  return (
    <section>
      <h1>PORTFOLIO</h1>
      <div className="category-grid">
        {categories.map((cat) => (
          <Link key={cat.slug} to={`/projects/${cat.slug}`} className="category-card">
            <img src={cat.image} alt={cat.title} />
            <h3>{cat.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}