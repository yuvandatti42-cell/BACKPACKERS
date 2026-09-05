import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { DestinationsPage } from './pages/DestinationsPage';
import { ToursPage } from './pages/ToursPage';
import './styles/variables.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/responsive.css';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    const pathname = window.location.pathname;
    if (pathname === '/tours' || hash === 'tours') {
      return 'tours';
    }
    if (pathname === '/destinations' || hash === 'destinations') {
      return 'destinations';
    }
    return 'home';
  });

  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const pathname = window.location.pathname;
      if (pathname === '/tours' || hash === 'tours') {
        setCurrentRoute('tours');
      } else if (pathname === '/destinations' || hash === 'destinations') {
        setCurrentRoute('destinations');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const navigateTo = (route: string, sectionId?: string, categoryFilter?: string) => {
    if (categoryFilter) {
      setActiveFilter(categoryFilter);
    } else if (route === 'destinations') {
      setActiveFilter('all');
    }

    if (route === 'tours') {
      setCurrentRoute('tours');
      window.location.hash = 'tours';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (route === 'destinations') {
      setCurrentRoute('destinations');
      window.location.hash = 'destinations';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentRoute('home');
      if (sectionId) {
        window.location.hash = sectionId;
        const scrollToTarget = () => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        };
        scrollToTarget();
        setTimeout(scrollToTarget, 50);
        setTimeout(scrollToTarget, 200);
      } else {
        window.location.hash = 'hero';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  if (currentRoute === 'tours') {
    return <ToursPage onNavigate={navigateTo} />;
  }

  if (currentRoute === 'destinations') {
    return <DestinationsPage onNavigate={navigateTo} initialFilter={activeFilter} />;
  }

  return <Home onNavigate={navigateTo} />;
};

export default App;
