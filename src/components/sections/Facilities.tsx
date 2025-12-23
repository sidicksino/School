import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Library, Monitor, Trees, Utensils, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

export const Facilities: React.FC = () => {
  const { t } = useTranslation();
  const items = t('facilities.items') as unknown as Array<{ title: string; desc: string }>;
  const icons = [
    <Library className="w-6 h-6" />,
    <Monitor className="w-6 h-6" />,
    <Trees className="w-6 h-6" />,
    <Utensils className="w-6 h-6" />,
  ];

  return (
    <Section className="bg-secondary/30 dark:bg-[#0f172a] relative overflow-hidden py-32">
      {/* Abstract Shapes */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-neon/10 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/4" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight"
            >
              {t('facilities.title')}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted text-lg leading-relaxed"
            >
              {t('facilities.desc')}
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="hidden md:block"
          >
             <div className="w-16 h-1 bg-accent rounded-full mb-2" />
             <div className="w-8 h-1 bg-neon rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white dark:bg-[#1e293b] p-8 rounded-3xl shadow-lg border border-foreground/5 overflow-hidden hover:shadow-2xl hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-6 h-6 text-accent" />
              </div>
              
              <div className="w-14 h-14 rounded-2xl bg-secondary dark:bg-[#0f172a] flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300 shadow-inner">
                {icons[idx]}
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-3 font-heading group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="text-muted leading-relaxed font-sans group-hover:text-foreground/80 transition-colors">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
