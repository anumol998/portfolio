
import { contactInfo } from '../data/projects';
import { FaInstagram, FaLinkedinIn } from 'react-icons/fa';

import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page">
      <h1 className="contact-heading">CONTACT</h1>

      <div className="contact-card">
        <div className="contact-info">

          {/* Email */}
          <a
            href={`mailto:${contactInfo.email}`}
            className="contact-line contact-line--primary"
          >
            {contactInfo.email}
          </a>

          {/* Phone numbers */}
          {contactInfo.phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="contact-line contact-line--phone"
            >
              {phone}
            </a>
          ))}

          {/* Address */}
          <p className="contact-line contact-line--address">
            {contactInfo.address}
          </p>

          {/* Website */}
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

          {/* Social media */}
          {contactInfo.socials.length > 0 && (
            <div className="contact-socials">
              {contactInfo.socials.map((social) => {
                const label = social.label.toLowerCase();

                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-socials__link"
                    aria-label={social.label}
                    title={social.label}
                  >
                    {label.includes('instagram') && <FaInstagram />}
                    {label.includes('linkedin') && <FaLinkedinIn />}
                  </a>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
