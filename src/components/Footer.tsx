import { getContent } from '../content/loader';
import SmartImg from './SmartImg';
import Socials from './Socials';

export default function Footer() {
  const s = getContent('shared');
  const e = s.emails || ({} as Record<string, string>);
  const mailto = (key: keyof typeof e) => <a href={`mailto:${e[key]}`}>{e[key]}</a>;

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <SmartImg src="./assets/Logo.png" alt="Cenoir" />
          <span>Cenoir Studios</span>
          <Socials items={s.socials} />
        </div>
        <div className="footer-columns">
          <div className="footer-col">
            <h4>Studio</h4>
            <a href="#/">Home</a><a href="#/about">About</a><a href="#/team">Team</a>
            <a href="#/projects">Projects</a><a href="#/news">News</a><a href="#/careers">Careers</a><a href="#/timeline">Timeline</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            {mailto('contact')}{mailto('careers')}{mailto('support')}
          </div>
          <div className="footer-col">
            <h4>Other</h4>
            {mailto('social')}{mailto('legal')}
          </div>
        </div>
        <p className="footer-copy">{s.copyright}</p>
      </div>
    </footer>
  );
}
