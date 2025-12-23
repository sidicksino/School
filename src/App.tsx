import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LanguageProvider, useTranslation } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SEO } from './components/SEO';
import { Hero } from './components/sections/Hero';
import { Stats } from './components/sections/Stats';
import { Programs } from './components/sections/Programs';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';

import { LevelsHero } from './components/sections/LevelsHero';
import { AboutHero } from './components/sections/AboutHero';
import { Welcome } from './components/sections/Welcome';
import { WhyChooseUs } from './components/sections/WhyChooseUs';
import { Testimonials } from './components/sections/Testimonials';
import { News } from './components/sections/News';
import { Team } from './components/sections/Team';
import { Facilities } from './components/sections/Facilities';
import { Curriculum } from './components/sections/Curriculum';
import { FAQ } from './components/sections/FAQ';
import { VisitSchool } from './components/sections/VisitSchool';

// Wrapper component to ensure content isn't hidden behind fixed header on non-hero pages
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="pt-20">{children}</div>
);

const App: React.FC = () => {
    // We need to use translation hook inside a component that is inside LanguageProvider.
    // However, App is the one rendering LanguageProvider.
    // Solution: Move SEO logic to a child component or use a wrapper.
    // For simplicity, we'll keep the structure but we can't use 't' here directly if it's outside.
    // Wait, the page components (Home, AboutPage, etc) are defined OUTSIDE App component in this file.
    // They need to be React components to use hook.
    // The current definition `const Home = () => ...` is correct for a component.
    // We just need to move `useTranslation` hook INSIDE them.
    return (
    <ErrorBoundary>
      <HelmetProvider>
        <LanguageProvider>
          <ThemeProvider>
             <AppContent />
          </ThemeProvider>
        </LanguageProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

const AppContent = () => {
  return (
        <HashRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col font-sans bg-primary text-foreground transition-colors duration-300 overflow-x-hidden">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/programs"
                  element={
                    <PageWrapper>
                      <ProgramsPage />
                    </PageWrapper>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PageWrapper>
                      <AboutPage />
                    </PageWrapper>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PageWrapper>
                      <ContactPage />
                    </PageWrapper>
                  }
                />
                <Route
                  path="/visit"
                  element={
                    <PageWrapper>
                      <VisitPage />
                    </PageWrapper>
                  }
                />
                {/* Fallback route for 404s */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
  );
};

// Now update the page components to use useTranslation

const ProgramsPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t('seo.programs.title')} description={t('seo.programs.desc')} />
      <LevelsHero />
      <Programs />
      <Curriculum />
    </>
  );
};

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t('seo.home.title')} description={t('seo.home.desc')} />
      <Hero />
      <Stats />
      <Welcome />
      <WhyChooseUs />
      <Testimonials />
      <News />
    </>
  );
};

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t('seo.about.title')} description={t('seo.about.desc')} />
      <AboutHero />
      <About />
      <Team />
      <Facilities />
    </>
  );
};

const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t('seo.contact.title')} description={t('seo.contact.desc')} />
      <Contact />
      <FAQ />
    </>
  );
};

const VisitPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t('seo.visit.title')} description={t('seo.visit.desc')} />
      <VisitSchool />
    </>
  );
};

export default App;
