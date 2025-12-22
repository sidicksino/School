import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTranslation } from '../../contexts/LanguageContext';
import { translations } from '../../lib/translations';

export const Hero: React.FC = () => {
  const { t, language } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const slides = translations[language].hero.slides || [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Preload images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, [slides]);

  const currentContent = slides[currentSlide];

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-primary transition-colors duration-300">
      
      {/* Background Carousel */}
      <AnimatePresence mode="popLayout">
        <motion.div
           key={currentContent.image}
           initial={{ opacity: 0, scale: 1.1 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 1.5, ease: "easeInOut" }}
           className="absolute inset-0 z-0"
        >
           <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay for text readability */}
           <img 
             src={currentContent.image} 
             alt="Background" 
             className="w-full h-full object-cover"
           />
        </motion.div>
      </AnimatePresence>

      {/* Floating Orbs (Subtle on top of image) */}
      <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">
         {/* Simplified orbs for performance over image */}
         <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-neon/30 text-neon mb-8 shadow-[0_0_15px_rgba(0,243,255,0.15)] bg-black/40 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-widest font-heading">
              {t('hero.badge')}
            </span>
          </motion.div>
        <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide} // Trigger animation on slide change
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }} // Optional: slight exit movement
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-8 leading-[1.1]">
            <motion.span 
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
                {currentContent.title_line1}
            </motion.span> 
            <motion.span 
              className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-400 to-accent drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {currentContent.title_highlight}
            </motion.span>
          </h1>

          {/* Subheadline */}
          <motion.p 
            className="max-w-2xl mx-auto text-gray-200 text-lg md:text-xl mb-12 leading-relaxed font-sans font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {currentContent.subtitle}
          </motion.p>
        </motion.div>
        </AnimatePresence>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button variant="primary" className="w-full sm:w-auto">
              {t('hero.cta_primary')} <ArrowRight className="w-4 h-4" />
            </Button>
            <Link to="/visit">
              <Button variant="outline" className="w-full sm:w-auto bg-black/20 hover:bg-black/40 backdrop-blur-sm border-white/30 text-white">
                {t('hero.cta_secondary')}
              </Button>
            </Link>
          </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-accent w-8' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation Arrows (Desktop) */}
      <button 
        onClick={prevSlide}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 text-white/50 hover:bg-black/40 hover:text-white transition-all backdrop-blur-sm"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button 
        onClick={nextSlide}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 text-white/50 hover:bg-black/40 hover:text-white transition-all backdrop-blur-sm"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 z-10 opacity-[0.05] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
};
