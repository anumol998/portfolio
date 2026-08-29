import { Link } from 'react-router-dom';
import ProjectSlider from '../components/ProjectSlider';
import { siteInfo } from '../data/projects';
import './Home.css';

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <h1>{siteInfo.name.toUpperCase()}</h1>
        <h2>{siteInfo.title.toUpperCase()}</h2>
        <p>{siteInfo.intro}</p>
        <Link to="/projects" className="cta-link">View Projects</Link>
      </section>

      <ProjectSlider />
    </>
  );
}