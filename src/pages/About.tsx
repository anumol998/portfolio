import { useEffect, useRef, useState } from 'react';
import { useFetch } from '../lib/useFetch';
import { fetchAboutInfo } from '../lib/api';
import SkeletonImage from '../components/SkeletonImage';
import './About.css';

const BAR_COLOR = '#8b5cf6'; // violet

export default function About() {
  const { data: aboutInfo, loading, error } = useFetch(fetchAboutInfo);

  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = skillsRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
          observer.disconnect(); // animate once
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [aboutInfo]); // re-attach once aboutInfo (and the skills section) actually renders

  if (loading) return <div className="about-page">Loading…</div>;
  if (error || !aboutInfo) return <div className="about-page">Couldn't load this page.</div>;

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
          <SkeletonImage src={aboutInfo.photo} alt={aboutInfo.greeting} />
        </div>
      </div>

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

      {aboutInfo.skills.length > 0 && (
        <div className="about-skills" ref={skillsRef}>
          <h2>Skills</h2>
          <div className="about-skills__grid">
            {aboutInfo.skills.map((skill, i) => (
              <div className="skill-bar" key={skill.name}>
                <div className="skill-bar__head">
                  <span className="skill-bar__name">{skill.name}</span>
                  <span className="skill-bar__percent">
                    {skillsVisible ? skill.level : 0}%
                  </span>
                </div>
                <div className="skill-bar__track">
                  <div
                    className="skill-bar__fill"
                    style={{
                      width: skillsVisible ? `${skill.level}%` : '0%',
                      background: BAR_COLOR,
                      transitionDelay: `${i * 0.12}s`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}