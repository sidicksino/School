import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Blocks, BookOpen, Languages, Music, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

interface ProgramDisplay {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: React.ReactNode;
}

interface ProgramCardProps {
  program: ProgramDisplay;
  index: number;
  exploreText: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program, index, exploreText }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="group relative flex flex-col h-full p-8 rounded-2xl bg-primary shadow-lg border border-foreground/10 hover:border-accent hover:shadow-[0_0_30px_rgba(251,191,36,0.15)] transition-all duration-300"
    >
      {/* Holographic Gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="absolute top-6 right-6 text-muted group-hover:text-accent transition-colors z-10">
        <ArrowUpRight className="w-5 h-5" />
      </div>

      <div className="mb-6 p-4 bg-secondary border border-foreground/5 rounded-xl inline-block text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-300 shadow-lg relative z-10">
        {program.icon}
      </div>

      <h3 className="text-2xl font-heading font-bold text-foreground mb-4 relative z-10 group-hover:text-accent transition-colors">
        {program.title}
      </h3>
      
      <p className="text-muted font-sans leading-relaxed mb-8 flex-grow relative z-10 group-hover:text-foreground transition-colors">
        {program.description}
      </p>
      
      <div className="pt-6 border-t border-foreground/10 flex items-center justify-between relative z-10">
        <span className="text-sm font-medium text-accent/90 bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
          {program.duration}
        </span>
        <span className="text-xs font-heading font-semibold uppercase tracking-widest text-muted group-hover:text-foreground transition-colors">
          {exploreText}
        </span>
      </div>
    </motion.div>
  );
};

export const Programs: React.FC = () => {
  const { t } = useTranslation();

  const programs: ProgramDisplay[] = [
    {
      id: '1',
      title: t('programs.items.kindergarten.title'),
      description: t('programs.items.kindergarten.desc'),
      duration: t('programs.items.kindergarten.duration'),
      icon: <Blocks className="w-8 h-8" />
    },
    {
      id: '2',
      title: t('programs.items.primary.title'),
      description: t('programs.items.primary.desc'),
      duration: t('programs.items.primary.duration'),
      icon: <BookOpen className="w-8 h-8" />
    },
    {
      id: '3',
      title: t('programs.items.bilingual.title'),
      description: t('programs.items.bilingual.desc'),
      duration: t('programs.items.bilingual.duration'),
      icon: <Languages className="w-8 h-8" />
    },
    {
      id: '4',
      title: t('programs.items.activities.title'),
      description: t('programs.items.activities.desc'),
      duration: t('programs.items.activities.duration'),
      icon: <Music className="w-8 h-8" />
    }
  ];

  return (
    <Section id="programs" className="bg-secondary relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6"
          >
            {t('programs.title_line1')} <span className="text-accent">{t('programs.title_highlight')}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted font-sans text-lg"
          >
            {t('programs.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, idx) => (
            <ProgramCard key={program.id} program={program} index={idx} exploreText={t('programs.explore')} />
          ))}
        </div>
      </div>
    </Section>
  );
};