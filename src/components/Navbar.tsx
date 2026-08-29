import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const linkClassName = ({ isActive }: { isActive: boolean }) =>
    `navbar__link ${isActive ? 'navbar__link--active' : ''}`;

  return (
    <nav className="navbar">
      {/* Logo */}
      <NavLink
        to="/"
        className="navbar__logo"
        aria-label="Anumol Home"
        onClick={closeMenu}
      >
        A
      </NavLink>

      {/* Navigation Links */}
      <div
        className={`navbar__links ${
          menuOpen ? 'navbar__links--open' : ''
        }`}
      >
        <NavLink to="/" className={linkClassName} onClick={closeMenu} end>
          Home
        </NavLink>

        <NavLink to="/projects" className={linkClassName} onClick={closeMenu}>
          Projects
        </NavLink>

        <NavLink to="/about" className={linkClassName} onClick={closeMenu}>
          About
        </NavLink>

        <NavLink to="/contact" className={linkClassName} onClick={closeMenu}>
          Contact
        </NavLink>
      </div>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className={`navbar__toggle ${
          menuOpen ? 'navbar__toggle--open' : ''
        }`}
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
      >
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}