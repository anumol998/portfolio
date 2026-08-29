import { Link } from 'react-router-dom';
import { categories, siteInfo } from '../data/projects';
import './Projects.css';

export default function Projects() {
  return (
    <div className="projects-page">
      <div className="projects-intro">
        <h1>PORTFOLIO</h1>
        <p className="projects-intro__lead">{siteInfo.intro}</p>
        <p className="projects-intro__body">
          Buildings are shaped around human stories, designed to support everyday
          life and make it more seamless and enjoyable. The following categories
          reflect a range of residential, interior, and commercial work — each
          shaping an understanding of space, purpose, and design.
        </p>
      </div>

      <div className="category-grid">
        {categories.map((cat) => (
          <Link key={cat.slug} to={`/projects/${cat.slug}`} className="category-card">
            <img src={cat.image} alt={cat.title} />
            <h3>{cat.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}