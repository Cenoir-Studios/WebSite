import { useState, useEffect } from 'react';
import SmartImg from './SmartImg';

interface Props {
  route: string;
}

export default function Navbar({ route }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [route]);

  const link = (to: string, label: string) => (
    <a href={`#/${to}`} className={route === to ? 'active' : ''}>{label}</a>
  );

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <a href="#/" className="logo-link">
        <SmartImg src="./assets/Logo.png" alt="Cenoir" className="logo" />
        <span className="brand">Cenoir Studios</span>
      </a>
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
      <nav className={`nav-links${open ? ' open' : ''}`}>
        {link('', 'Home')}
        {link('about', 'About')}
        {link('team', 'Team')}
        {link('projects', 'Projects')}
        {link('news', 'News')}
        {link('careers', 'Careers')}
      </nav>
      <button
        className={`nav-toggle${open ? ' open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Menu">
        <div className="hamburger" />
      </button>
    </header>
  );
}
