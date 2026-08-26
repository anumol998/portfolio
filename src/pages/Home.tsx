import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="home-hero">
      <h1>ANUMOL T REGI</h1>
      <h2>ARCHITECTURAL PORTFOLIO</h2>
      <p>Self introduction text goes here.</p>
      <Link to="/projects" className="cta-link">View Projects</Link>
    </section>
  );
}