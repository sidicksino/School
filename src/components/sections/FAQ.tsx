import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Plus } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

export const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const items = t('faq.items') as unknown as Array<{ q: string; a: string }>;

  return (
    <Section className="bg-secondary border-t border-foreground/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl font-heading font-bold text-foreground mb-12 text-center">
          {t('faq.title')}
        </h2>

        <div className="space-y-4">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-primary border border-foreground/5 rounded-xl overflow-hidden shadow-sm"
            >
              <details className="group">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="font-heading font-semibold text-foreground text-lg">
                    {item.q}
                  </span>
                  <Plus className="w-5 h-5 text-accent transition-transform group-open:rotate-45" />
                </summary>
                <div className="px-6 pb-6 text-muted leading-relaxed border-t border-foreground/5 pt-4">
                  {item.a}
                </div>
              </details>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
