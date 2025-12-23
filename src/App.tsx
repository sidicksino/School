import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LanguageProvider } from './contexts/LanguageContext';
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

// ... other imports

const ProgramsPage = () => (
  <>
    <SEO title="Academic Levels" description="Discover our comprehensive curriculum from Kindergarten to Primary School." />
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
    <SEO title="Home" description="Académie Royale - Nurturing the Future Leaders of Chad with Excellence and Values." />
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
    <SEO title="About Us" description="Learn about our mission, history, and the dedicated team behind Académie Royale." />
    <AboutHero />
    <About />
    <Team />
    <Facilities />
  </>
);

const ContactPage = () => (
  <>
    <SEO title="Contact Us" description="Get in touch with Académie Royale for admissions, inquiries, or to schedule a visit." />
    <Contact />
    <FAQ />
  </>
);

const VisitPage = () => (
  <>
    <SEO title="Visit Our Campus" description="Book a tour to see our modern facilities and meet our educators." />
    <VisitSchool />
  </>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <LanguageProvider>
      <ThemeProvider>
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
      </ThemeProvider>
    </LanguageProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
