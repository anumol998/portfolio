import { aboutInfo } from '../data/projects';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <div className="about-intro">
        <div className="about-intro__text">
          <h1 className="about-intro__greeting">
            {aboutInfo.greeting.split('\n').map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </h1>
          {aboutInfo.paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <div className="about-intro__photo">
          <img src={aboutInfo.photo} alt={aboutInfo.greeting} />
        </div>
      </div>

      {aboutInfo.skills.length > 0 && (
        <div className="about-skills">
          <h2>Skills</h2>
          <ul>
            {aboutInfo.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="about-cv">
        <div className="about-cv__column">
          <h2>Experience</h2>
          {aboutInfo.experience.map((entry, i) => (
            <div className="about-cv__entry" key={i}>
              <p className="about-cv__period">{entry.period}</p>
              <p className="about-cv__place">{entry.place}</p>
              {entry.role && <p className="about-cv__role">Role: {entry.role}</p>}
            </div>
          ))}
        </div>

        <div className="about-cv__column">
          <h2>Education</h2>
          {aboutInfo.education.map((entry, i) => (
            <div className="about-cv__entry" key={i}>
              <p className="about-cv__period">{entry.period}</p>
              <p className="about-cv__place">{entry.place}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}