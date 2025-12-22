import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Quote } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

export const Welcome: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Section className="bg-primary relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-accent/20 translate-x-4 translate-y-4 rounded-2xl" />
            <img 
              src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop" 
              alt="School Director" 
              className="rounded-2xl shadow-2xl relative z-10 w-full object-cover h-[400px] lg:h-[500px]"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <Quote className="w-12 h-12 text-accent mb-6 opacity-50" />
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
              {t('welcome.title')}
            </h2>
            <h3 className="text-xl text-accent mb-6 font-sans">{t('welcome.subtitle')}</h3>
            
            <div className="space-y-6 text-muted font-sans leading-relaxed text-lg">
              <p>{t('welcome.text1')}</p>
              <p>{t('welcome.text2')}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-foreground/10">
              <p className="font-heading font-bold text-foreground text-xl tracking-wide">
                {t('welcome.sign')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};