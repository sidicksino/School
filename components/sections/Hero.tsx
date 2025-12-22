import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTranslation } from '../../contexts/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-primary transition-colors duration-300">
      {/* Background Effects - Floating Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            y: [0, -50, 0], 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-secondary/80 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            y: [0, 50, 0], 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          className="absolute bottom-[-10%] right-[5%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, 30, 0], 
            opacity: [0.1, 0.3, 0.1] 
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-neon/10 rounded-full blur-[100px]" 
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-neon/30 text-neon mb-8 shadow-[0_0_15px_rgba(0,243,255,0.15)]"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-widest font-heading">
              {t('hero.badge')}
            </span>
          </motion.div>
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground mb-8 leading-[1.1]">
            {t('hero.title_line1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-yellow-400 to-accent drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              {t('hero.title_highlight')}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl mx-auto text-muted text-lg md:text-xl mb-12 leading-relaxed font-sans font-light">
            {t('hero.subtitle')}
          </p>

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
            <Button variant="outline" className="w-full sm:w-auto">
              {t('hero.cta_secondary')}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Futuristic Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(var(--color-neon) 1px, transparent 1px), linear-gradient(90deg, var(--color-neon) 1px, transparent 1px)', 
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }} 
      />
    </div>
  );
};