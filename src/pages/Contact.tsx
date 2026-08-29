import { contactInfo } from '../data/projects';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page">
      <h1 className="contact-heading">CONTACT</h1>

      <div className="contact-card">
        {/* Left column: all contact info */}
        <div className="contact-info">
          <a
            href={`mailto:${contactInfo.email}`}
            className="contact-line contact-line--primary"
          >
            {contactInfo.email}
          </a>

          {contactInfo.phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="contact-line contact-line--phone"
            >
              {phone}
            </a>
          ))}

          <p className="contact-line contact-line--address">{contactInfo.address}</p>

          {contactInfo.website && (
            <a
              href={`https://${contactInfo.website.replace(/^https?:\/\//, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-line contact-line--link"
            >
              {contactInfo.website}
            </a>
          )}

          {contactInfo.socials.length > 0 && (
            <div className="contact-socials">
              {contactInfo.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-socials__link"
                >
                  {social.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right column: photo (square) */}
        {contactInfo.photo && (
          <div className="contact-photo-wrapper">
            <img
              src={contactInfo.photo}
              alt="Anumol T Regi"
              className="contact-photo"
            />
          </div>
        )}
      </div>
    </div>
  );
}