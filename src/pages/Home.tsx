import { Link } from 'react-router-dom';
import ProjectSlider from '../components/ProjectSlider';
import { useFetch } from '../lib/useFetch';
import { fetchSiteInfo } from '../lib/api';
import './Home.css';

export default function Home() {
  const { data: siteInfo, loading, error } = useFetch(fetchSiteInfo);

  if (loading) return <section className="home-hero">Loading…</section>;
  if (error || !siteInfo) return <section className="home-hero">Couldn't load this page.</section>;

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