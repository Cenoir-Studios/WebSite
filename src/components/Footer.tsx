import { useContent } from '../content/ContentContext';
import Socials from './Socials';

export default function Footer() {
  const s = useContent('shared');
  const e = s.emails || ({} as Record<string, string>);
  const ui = s.ui;
  const nav = s.nav;
  const mailto = (key: keyof typeof e) => <a href={`mailto:${e[key]}`}>{e[key]}</a>;

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <Socials items={s.socials} />
        </div>
        <div className="footer-columns">
          <div className="footer-col">
            <h4>{ui?.footer_studio || 'Studio'}</h4>
            <a href="#/">{nav?.home || 'Home'}</a>
            <a href="#/about">{nav?.about || 'About'}</a>
            <a href="#/team">{nav?.team || 'Team'}</a>
            <a href="#/projects">{nav?.projects || 'Projects'}</a>
            <a href="#/news">{nav?.news || 'News'}</a>
            <a href="#/careers">{nav?.careers || 'Careers'}</a>
            <a href="#/timeline">{nav?.timeline || 'Timeline'}</a>
          </div>
          <div className="footer-col">
            <h4>{ui?.footer_contact || 'Contact'}</h4>
            {mailto('contact')}{mailto('careers')}{mailto('support')}
          </div>
          <div className="footer-col">
            <h4>{ui?.footer_other || 'Other'}</h4>
            {mailto('social')}{mailto('legal')}
          </div>
        </div>
        <p className="footer-copy">{s.copyright}</p>
      </div>
    </footer>
  );
}
