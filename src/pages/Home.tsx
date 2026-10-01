import React, { useState } from 'react';
import { SplashScreen } from '../components/SplashScreen/SplashScreen';
import { Header } from '../components/Header/Header';
import { HeroSection } from '../components/HeroSection/HeroSection';
import { EditorialIntro } from '../components/EditorialIntro/EditorialIntro';
import { TripCategories } from '../components/TripCategories/TripCategories';
import { FeaturedExpedition } from '../components/FeaturedExpedition/FeaturedExpedition';
import { FeaturedExpeditions } from '../components/FeaturedExpeditions/FeaturedExpeditions';
import { OurStory } from '../components/OurStory/OurStory';
import { TravelerStories } from '../components/TravelerStories/TravelerStories';
import { TripPlanner } from '../components/TripPlanner/TripPlanner';
import { Footer } from '../components/Footer/Footer';

interface HomeProps {
  onNavigate?: (route: string, sectionId?: string, categoryFilter?: string) => void;
  onOpenBookModal?: (title?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onOpenBookModal }) => {
  const [isReady, setIsReady] = useState<boolean>(false);

  return (
    <div className={`app-wrapper ${isReady ? 'is-loaded' : ''}`}>
      <SplashScreen onComplete={() => setIsReady(true)} />
      <Header onNavigate={onNavigate} onOpenBookModal={onOpenBookModal} currentRoute="home" />
      <main id="main-content">
        <HeroSection onNavigate={onNavigate} onOpenBookModal={onOpenBookModal} />
        <TripCategories onNavigate={onNavigate} />
        <FeaturedExpedition onNavigate={onNavigate} onOpenBookModal={onOpenBookModal} />
        <FeaturedExpeditions onOpenBookModal={onOpenBookModal} />
        <OurStory />
        <TravelerStories />
        <EditorialIntro />
        <TripPlanner onOpenBookModal={onOpenBookModal} />
      </main>
      <Footer />
    </div>
  );
};
