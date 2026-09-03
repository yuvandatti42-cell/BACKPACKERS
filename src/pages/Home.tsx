import React, { useState } from 'react';
import { ScrollProgress } from '../components/ScrollProgress/ScrollProgress';
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

export const Home: React.FC = () => {
  const [isReady, setIsReady] = useState<boolean>(false);

  return (
    <div className={`app-wrapper ${isReady ? 'is-loaded' : ''}`}>
      <ScrollProgress />
      <SplashScreen onComplete={() => setIsReady(true)} />
      <Header />
      <main id="main-content">
        <HeroSection />
        <EditorialIntro />
        <TripCategories />
        <FeaturedExpedition />
        <FeaturedExpeditions />
        <OurStory />
        <TravelerStories />
        <TripPlanner />
      </main>
      <Footer />
    </div>
  );
};
