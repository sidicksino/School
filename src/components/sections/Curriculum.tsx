import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Calculator, Book, FlaskConical, Gavel } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

export const Curriculum: React.FC = () => {
  const { t } = useTranslation();
  const items = t('curriculum.items') as unknown as Array<{ subject: string; desc: string }>;
  const icons = [
    <Calculator className="w-6 h-6" />,
    <Book className="w-6 h-6" />,
    <FlaskConical className="w-6 h-6" />,
    <Gavel className="w-6 h-6" />,
  ];

  return (
    <Section className="bg-primary dark:bg-[#0b1120] border-t border-foreground/5 dark:border-white/5 py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            {t('curriculum.title')}
          </h2>
          <div className="h-1 w-20 bg-accent rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-secondary dark:bg-[#1e293b] p-8 rounded-3xl border border-foreground/5 dark:border-white/5 shadow-sm hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 relative overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-1 h-full bg-accent/30 group-hover:bg-accent transition-colors duration-300" />
               <div className="absolute top-0 left-0 w-1 h-full bg-accent/30 group-hover:bg-accent transition-colors duration-300 blur-lg opacity-0 group-hover:opacity-50" />

              <div className="w-14 h-14 bg-primary dark:bg-[#0f172a] rounded-2xl flex items-center justify-center text-foreground mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <div className="text-muted group-hover:text-accent transition-colors">
                    {icons[idx]}
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3 font-heading group-hover:text-accent transition-colors">
                {item.subject}
              </h3>
              
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
