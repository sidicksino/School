import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Stats } from './components/sections/Stats';
import { Programs } from './components/sections/Programs';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';

import { LevelsHero } from './components/sections/LevelsHero';

// ... other imports

const ProgramsPage = () => (
  <>
    <LevelsHero />
    <Programs />
    <Curriculum />
  </>
);
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

const Home = () => (
  <>
    <Hero />
    <Stats />
    <Welcome />
    <WhyChooseUs />
    <Testimonials />
    <News />
  </>
);



const AboutPage = () => (
  <>
    <About />
    <Team />
    <Facilities />
  </>
);

const ContactPage = () => (
  <>
    <Contact />
    <FAQ />
  </>
);

const VisitPage = () => (
  <>
    <VisitSchool />
  </>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Helmet>
          <title>Académie Royale</title>
          <meta name="description" content="A prestigious academy for the future." />
        </Helmet>
        <LanguageProvider>
      <ThemeProvider>
        <HashRouter>
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
      </ThemeProvider>
    </LanguageProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
