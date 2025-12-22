import React from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { useTranslation } from '../../contexts/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Section id="contact" className="bg-primary relative">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary to-primary z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-r from-secondary to-primary border border-foreground/10 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-accent/20 blur-[100px] rounded-full" />

          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            {t('contact.title_line1')}{' '}
            <span className="text-accent">{t('contact.title_highlight')}</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto mb-10 text-lg font-sans">
            {t('contact.desc')}
          </p>

          <form
            className="max-w-md mx-auto flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative">
              <input
                type="email"
                placeholder={t('contact.placeholder')}
                className="w-full bg-primary/50 dark:bg-black/30 border border-foreground/20 rounded-lg px-6 py-4 text-foreground placeholder-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-sans"
              />
            </div>
            <Button className="w-full justify-center">{t('contact.button')}</Button>
            <p className="text-xs text-muted mt-2 font-sans">{t('contact.disclaimer')}</p>
          </form>
        </div>
      </div>
    </Section>
  );
};
