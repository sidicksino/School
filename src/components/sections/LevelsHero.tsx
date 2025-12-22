import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, Book, Ruler, MousePointer2 } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';
import imgStudent from '../../assets/2.png'; // Using a placeholder student image

export const LevelsHero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[90vh] bg-[#f0f8ff] flex items-center overflow-hidden pt-20">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2">
              <Book className="w-5 h-5 text-accent" />
              <span className="font-heading font-bold text-foreground/80">
                Académie Royale
              </span>
            </div>

            <div className="space-y-2">
               <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4"
              >
                {t('levels_hero.badge')}
              </motion.span>
              
              <h1 className="text-5xl md:text-7xl font-heading font-bold text-slate-800 leading-tight">
                <span className="block font-handwriting text-slate-500 text-4xl md:text-5xl mb-2 italic">
                  {t('levels_hero.headline_line1')}
                </span>
                {t('levels_hero.headline_line2')}
              </h1>
            </div>

            <p className="text-slate-600 text-lg max-w-lg leading-relaxed font-sans">
              {t('levels_hero.description')}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-[#1e293b] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
            >
              {t('levels_hero.button')}
              <MousePointer2 className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Main Circular Image Wrapper */}
            <div className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px]">
               {/* Soft Glow Behind */}
              <div className="absolute inset-4 bg-teal-100 rounded-full blur-2xl transform translate-y-4" />
              
              {/* Outer Ring */}
              <div className="absolute inset-0 border-[20px] border-white/50 rounded-full shadow-xl" />

              {/* Image with Mask */}
              <div className="absolute inset-4 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-white">
                <img 
                  src={imgStudent} 
                  alt="Student ready for school" 
                  className="w-full h-full object-cover"
                />
              </div>

               {/* Floating Icons */}
               <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-0 bg-white p-3 rounded-xl shadow-lg border border-slate-100 rotate-[-15deg]"
              >
                  <PenTool className="w-6 h-6 text-orange-400" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 right-0 bg-white p-3 rounded-xl shadow-lg border border-slate-100 rotate-[15deg]"
              >
                  <Ruler className="w-6 h-6 text-blue-400" />
              </motion.div>
                
               <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 right-[-20px] w-4 h-4 bg-yellow-400 rounded-full opacity-80"
              />
               <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-10 left-10 w-6 h-6 bg-teal-400 rounded-full opacity-60"
              />
            </div>
            
             {/* Vertical divider line decoration */}
             <div className="hidden lg:block absolute right-[-40px] top-1/2 -translate-y-1/2 h-48 w-px bg-slate-200">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-300 rounded-full" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-400 rounded-full" />
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-300 rounded-full" />
             </div>
          </motion.div>
        </div>
        
         {/* Scroll Down Indicator */}
        {/* <motion.div
          initial={{ opacity: 2 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
        >
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center p-1">
             <div className="w-1 h-2 bg-slate-400 rounded-full animate-scroll" />
          </div>
          <span className="text-xs font-medium uppercase tracking-widest">Scroll down</span>
        </motion.div> */}

      </div>
    </section>
  );
};
