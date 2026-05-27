import { useState, useEffect } from 'react';
import SmartImg from './SmartImg';
import { useLang, LANG_FLAGS, type Lang } from '../content/LangContext';
import { getContent } from '../content/loader';

interface Props {
  route: string;
}

export default function Navbar({ route }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { lang, setLang } = useLang();

  const nav = getContent('shared').nav || { home: 'Home', about: 'About', team: 'Team', projects: 'Projects', news: 'News', careers: 'Careers', timeline: 'Timeline' };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); setLangOpen(false); }, [route]);

  const link = (to: string, label: string) => (
    <a href={`#/${to}`} className={route === to ? 'active' : ''}>{label}</a>
  );

  const pickLang = (l: Lang) => { setLang(l); setLangOpen(false); };

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <a href="#/" className="logo-link">
        <SmartImg src="./assets/Logo.png" alt="Cenoir" className="logo" />
        <span className="brand">Cenoir Studios</span>
      </a>
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
      <nav className={`nav-links${open ? ' open' : ''}`}>
        {link('', nav.home)}
        {link('about', nav.about)}
        {link('team', nav.team)}
        {link('projects', nav.projects)}
        {link('news', nav.news)}
        {link('careers', nav.careers)}
        {link('timeline', nav.timeline)}
      </nav>
      <div className="nav-right">
        <div className={`lang-picker${langOpen ? ' open' : ''}`}>
          <button className="lang-btn" onClick={() => setLangOpen(!langOpen)}>
            {LANG_FLAGS[lang]} {lang.toUpperCase()}
          </button>
          {langOpen && (
            <div className="lang-dropdown">
              {(['en', 'ua', 'pl'] as Lang[]).map(l => (
                <button key={l} className={`lang-option${l === lang ? ' active' : ''}`} onClick={() => pickLang(l)}>
                  {LANG_FLAGS[l]} {l.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          className={`nav-toggle${open ? ' open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu">
          <div className="hamburger" />
        </button>
      </div>
    </header>
  );
}
