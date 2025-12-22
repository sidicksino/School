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
    <Section className="bg-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            {t('curriculum.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-secondary p-8 rounded-2xl border-t-4 border-accent shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-foreground mb-6">
                {icons[idx]}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-heading">
                {item.subject}
              </h3>
              <p className="text-muted text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
