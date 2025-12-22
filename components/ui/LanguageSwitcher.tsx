import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../contexts/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center bg-secondary dark:bg-white/5 border border-foreground/10 dark:border-white/10 rounded-full p-1 relative shadow-sm">
      {/* Background slider */}
      <motion.div
        className="absolute w-1/2 h-[calc(100%-8px)] top-1 bg-accent/20 dark:bg-accent/20 rounded-full"
        initial={false}
        animate={{
          left: language === 'fr' ? '4px' : '50%',
          x: language === 'fr' ? 0 : -4
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
      
      <button
        onClick={() => setLanguage('fr')}
        className={`relative z-10 px-3 py-1 text-xs font-heading font-bold transition-colors ${
          language === 'fr' ? 'text-accent' : 'text-muted hover:text-foreground'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`relative z-10 px-3 py-1 text-xs font-heading font-bold transition-colors ${
          language === 'en' ? 'text-accent' : 'text-muted hover:text-foreground'
        }`}
      >
        EN
      </button>
    </div>
  );
};