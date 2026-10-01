import React, { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { DestinationsPage } from './pages/DestinationsPage';
import { RegionExplorePage } from './pages/RegionExplorePage';
import { BookNowModal } from './components/BookNowModal/BookNowModal';
import { FloatingSocialButtons } from './components/FloatingSocialButtons/FloatingSocialButtons';
import './styles/variables.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/responsive.css';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    const pathname = window.location.pathname;
    if (pathname === '/destinations' || hash === 'destinations') {
      return 'destinations';
    }
    if (hash.startsWith('region/') || hash.startsWith('region:')) {
      return 'region:' + hash.replace(/^region[\/:]/, '');
    }
    return 'home';
  });

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isBookModalOpen, setIsBookModalOpen] = useState<boolean>(false);
  const [bookModalTitle, setBookModalTitle] = useState<string | undefined>(undefined);

  const openBookModal = (tripTitle?: string) => {
    setBookModalTitle(tripTitle);
    setIsBookModalOpen(true);
  };

  const closeBookModal = () => {
    setIsBookModalOpen(false);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const pathname = window.location.pathname;
      if (pathname === '/destinations' || hash === 'destinations') {
        setCurrentRoute('destinations');
      } else if (hash.startsWith('region/') || hash.startsWith('region:')) {
        setCurrentRoute('region:' + hash.replace(/^region[\/:]/, ''));
      } else if (hash === 'book' || hash === 'book-now') {
        setIsBookModalOpen(true);
        setCurrentRoute('home');
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

    if (sectionId === 'book' || route === 'book') {
      openBookModal();
      return;
    }

    if (route.startsWith('region:')) {
      const regId = route.replace('region:', '');
      setCurrentRoute(route);
      window.location.hash = `region/${regId}`;
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

  return (
    <>
      {currentRoute.startsWith('region:') ? (
        <RegionExplorePage 
          regionId={currentRoute.replace('region:', '')} 
          onNavigate={navigateTo} 
          onOpenBookModal={openBookModal}
        />
      ) : currentRoute === 'destinations' ? (
        <DestinationsPage 
          onNavigate={navigateTo} 
          initialFilter={activeFilter} 
          onOpenBookModal={openBookModal}
        />
      ) : (
        <Home 
          onNavigate={navigateTo} 
          onOpenBookModal={openBookModal}
        />
      )}

      <BookNowModal 
        isOpen={isBookModalOpen} 
        onClose={closeBookModal} 
        tripTitle={bookModalTitle} 
      />

      <FloatingSocialButtons />
    </>
  );
};

export default App;
