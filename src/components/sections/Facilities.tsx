import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Library, Monitor, Trees, Utensils } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

export const Facilities: React.FC = () => {
  const { t } = useTranslation();
  const items = t('facilities.items') as unknown as Array<{ title: string; desc: string }>;
  const icons = [
    <Library className="w-8 h-8" />,
    <Monitor className="w-8 h-8" />,
    <Trees className="w-8 h-8" />,
    <Utensils className="w-8 h-8" />,
  ];

  return (
    <Section className="bg-secondary relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            {t('facilities.title')}
          </h2>
          <p className="text-muted max-w-2xl">{t('facilities.desc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-6 p-6 rounded-xl bg-primary dark:bg-white/5 border border-foreground/5 dark:border-white/5 hover:border-accent/30 hover:shadow-md transition-all"
            >
              <div className="p-3 bg-secondary dark:bg-primary rounded-lg text-accent shadow-sm">
                {icons[idx]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2 font-heading">
                  {item.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
