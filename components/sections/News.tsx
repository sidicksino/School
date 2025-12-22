import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Calendar, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

export const News: React.FC = () => {
  const { t } = useTranslation();
  const news = t('news.items') as unknown as Array<{title: string, date: string, desc: string}>;

  return (
    <Section className="bg-secondary border-t border-foreground/5 dark:border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            {t('news.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer bg-primary dark:bg-white/5 rounded-2xl p-4 hover:shadow-lg transition-all border border-foreground/5 dark:border-transparent"
            >
              <div className="aspect-video bg-secondary dark:bg-white/5 rounded-xl mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/20 dark:bg-primary/20 group-hover:bg-transparent transition-colors" />
                {/* Placeholder for dynamic images */}
                <div className="absolute inset-0 flex items-center justify-center text-muted/30 font-heading text-4xl font-bold">
                  NEWS
                </div>
              </div>
              <div className="flex items-center gap-2 text-accent text-sm mb-3">
                <Calendar className="w-4 h-4" />
                <span>{item.date}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors font-heading">
                {item.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
                {item.desc}
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent group-hover:translate-x-2 transition-all">
                {t('news.read_more')} <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};