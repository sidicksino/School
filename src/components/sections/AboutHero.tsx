import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { useTranslation } from '../../contexts/LanguageContext';
import { Search, MapPin } from 'lucide-react';
import studentImage from '../../assets/4.webp'; // Using img4 from translations as placeholder

export const AboutHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Section className="bg-white min-h-[90vh] flex items-center relative overflow-hidden pt-32 pb-20">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0a192f] transform skew-x-[-15deg] translate-x-1/4 z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Top Navigation - Visual Mock (As per design) */}
        <div className="absolute top-[-80px] left-0 right-0 flex justify-between items-center hidden lg:flex opacity-0"> 
          {/* Hidden as it's handled by main Header, just referencing design */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h1 className="text-5xl lg:text-7xl font-heading font-bold text-[#0a192f] leading-tight">
              {t('about_hero.headline')}
            </h1>
            <h2 className="text-2xl lg:text-3xl font-sans text-primary/80 font-medium">
              {t('about_hero.subheadline')}
            </h2>
            <p className="text-muted text-lg max-w-md leading-relaxed">
              {t('about_hero.description')}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent text-[#0a192f] font-bold px-10 py-4 rounded-full w-fit shadow-lg hover:shadow-xl transition-all"
            >
              {t('about_hero.button')}
            </motion.button>

            {/* Dots Decoration */}
            <div className="flex gap-2 mt-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${i < 3 ? 'bg-[#0a192f]' : 'bg-[#0a192f]/30'}`} />
              ))}
            </div>
          </motion.div>

          {/* Right Image Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Main Circular Mask */}
            <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden border-8 border-white shadow-2xl z-10">
              <img 
                src={studentImage} 
                alt="Students" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Elements (Yellow/Blue Pills) */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 right-10 w-32 h-64 bg-accent rounded-full transform rotate-45 -z-0" 
            />
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 -left-10 w-24 h-48 bg-[#4285f4] rounded-full transform -rotate-12 -z-0" 
            />
             <motion.div 
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-10 right-20 w-40 h-12 bg-white rounded-full transform -rotate-45 z-20 border border-gray-100 hidden lg:block" 
            />
          </motion.div>

        </div>
      </div>
    </Section>
  );
};
