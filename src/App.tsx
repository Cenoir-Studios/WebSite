import { useState, useEffect, type FC } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import TeamPage from './pages/Team';
import ProjectsPage from './pages/Projects';
import NewsPage from './pages/News';
import CareersPage from './pages/Careers';

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
};

export default function App() {
  const route = useRoute();
  const Page = pages[route] || HomePage;

  return (
    <>
      <Navbar route={route} />
      <ErrorBoundary>
        <Page />
      </ErrorBoundary>
      <Footer />
    </>
  );
}
