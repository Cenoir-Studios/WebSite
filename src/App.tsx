import { useState, useEffect, type FC } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { LangProvider, useLang } from './content/LangContext';
import { loadAllContent, setCurrentLang } from './content/loader';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import TeamPage from './pages/Team';
import ProjectsPage from './pages/Projects';
import NewsPage from './pages/News';
import CareersPage from './pages/Careers';
import TimelinePage from './pages/Timeline';

function useRoute(): string {
  const [route, setRoute] = useState(window.location.hash.replace('#/', '') || '');
  useEffect(() => {
    const handler = () => {
      setRoute(window.location.hash.replace('#/', '') || '');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return route;
}

const pages: Record<string, FC> = {
  '': HomePage,
  about: AboutPage,
  team: TeamPage,
  projects: ProjectsPage,
  news: NewsPage,
  careers: CareersPage,
  timeline: TimelinePage,
};

function AppInner() {
  const route = useRoute();
  const { lang } = useLang();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCurrentLang(lang);
    loadAllContent(lang).then(() => { setReady(true); });
  }, [lang]);

  useEffect(() => {
    setReady(false);
    setCurrentLang(lang);
    loadAllContent(lang).then(() => { setReady(true); });
  }, [lang]);

  const Page = pages[route] || HomePage;

  if (!ready) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="loading-spinner" />
    </div>
  );

  return (
    <>
      <Navbar route={route} />
      <ErrorBoundary>
        <Page key={lang} />
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}
