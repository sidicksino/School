import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Star, MessageSquareQuote } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

export const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const reviews = t('testimonials.items') as unknown as Array<{
    name: string;
    role: string;
    text: string;
  }>;

  return (
    <Section className="bg-primary relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <MessageSquareQuote className="w-12 h-12 text-accent mb-4" />
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-4">
            {t('testimonials.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-secondary dark:bg-secondary/50 p-8 rounded-2xl border border-foreground/5 dark:border-white/5 relative shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-muted italic mb-8 leading-relaxed font-sans">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-yellow-600 flex items-center justify-center font-bold text-primary-darker font-heading text-white">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-foreground font-bold font-heading">{review.name}</h4>
                  <p className="text-xs text-muted uppercase tracking-wider">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
