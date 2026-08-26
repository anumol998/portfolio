import { useParams } from 'react-router-dom';
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const project = (category && projects[category])?.find((p) => p.slug === slug);

  if (!project) return <p>Project not found.</p>;

  return (
    <section className="project-detail">
      <img src={project.cover} alt={project.title} className="main-image" />
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      {/* drawings gallery */}
      {/* <div className="drawings-gallery"><img src="..." /></div> */}
    </section>
  );
}