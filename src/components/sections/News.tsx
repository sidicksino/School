import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Calendar, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

const NewsCard: React.FC<{ item: { title: string; date: string; desc: string }, index: number }> = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer bg-white dark:bg-[#1e293b] rounded-3xl p-6 hover:shadow-xl transition-all border border-foreground/5 dark:border-white/5 relative overflow-hidden"
    >
      <div className="aspect-video bg-secondary dark:bg-white/5 rounded-2xl mb-6 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500">
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Abstract Pattern as Placeholder Image */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                <Calendar className="w-8 h-8" />
            </div>
        </div>
        
        <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            NEWS
        </div>
      </div>

      <div className="flex items-center gap-2 text-accent text-sm mb-3 font-semibold">
        <Calendar className="w-4 h-4" />
        <span>{item.date}</span>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors font-heading leading-tight">
        {item.title}
      </h3>

      <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-2">
        {item.desc}
      </p>

      <div className="flex items-center gap-2 text-sm font-bold text-foreground group-hover:text-accent group-hover:translate-x-1 transition-all">
         Read Article <ArrowRight className="w-4 h-4" />
      </div>
    </motion.div>
  );
};

export const News: React.FC = () => {
  const { t } = useTranslation();
  const news = t('news.items') as unknown as Array<{ title: string; date: string; desc: string }>;

  return (
    <Section className="bg-secondary/30 dark:bg-[#0f172a] relative py-32 border-t border-foreground/5 dark:border-white/5">
       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-xl">
             <span className="text-accent font-bold tracking-widest uppercase text-sm mb-2 block">Our Stories</span>
             <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                {t('news.title')}
             </h2>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full border border-foreground/10 hover:border-accent hover:text-accent transition-all font-semibold flex items-center gap-2 group bg-primary/50 backdrop-blur-sm"
          >
             View All News <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, idx) => (
             <NewsCard key={idx} item={item} index={idx} />
          ))}
        </div>
      </div>
    </Section>
  );
};
