import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Blocks, BookOpen, PenTool, GraduationCap, ArrowUpRight } from 'lucide-react';
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
      whileHover={{ y: -10 }}
      className="group relative flex flex-col h-full p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden hover:border-accent/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(251,191,36,0.1)]"
    >
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Decorative Blur Circle */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute top-6 right-6 text-muted/50 group-hover:text-accent transition-colors z-10">
        <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>

      <div className="mb-8 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-300 shadow-inner group-hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]">
            {program.icon}
        </div>
      </div>

      <h3 className="text-2xl font-heading font-bold text-foreground mb-4 relative z-10 group-hover:text-accent transition-colors">
        {program.title}
      </h3>

      <p className="text-muted font-sans leading-relaxed mb-8 flex-grow relative z-10 group-hover:text-foreground transition-colors">
        {program.description}
      </p>

      <div className="pt-6 border-t border-white/10 flex items-center justify-between relative z-10 mt-auto">
        <span className="text-sm font-medium text-accent/90 bg-accent/10 px-4 py-1.5 rounded-full border border-accent/20">
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
      id: 'kindergarten',
      title: t('programs.items.kindergarten.title'),
      description: t('programs.items.kindergarten.desc'),
      duration: t('programs.items.kindergarten.duration'),
      icon: <Blocks className="w-8 h-8" />,
    },
    {
      id: 'primary',
      title: t('programs.items.primary.title'),
      description: t('programs.items.primary.desc'),
      duration: t('programs.items.primary.duration'),
      icon: <BookOpen className="w-8 h-8" />,
    },
    {
      id: 'college',
      title: t('programs.items.college.title'),
      description: t('programs.items.college.desc'),
      duration: t('programs.items.college.duration'),
      icon: <PenTool className="w-8 h-8" />,
    },
    {
      id: 'lycee',
      title: t('programs.items.lycee.title'),
      description: t('programs.items.lycee.desc'),
      duration: t('programs.items.lycee.duration'),
      icon: <GraduationCap className="w-8 h-8" />,
    },
  ];

  return (
    <Section id="programs" className="bg-[#0f172a] relative overflow-hidden py-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-[#0f172a] -z-10" />
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-[80px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6"
          >
            {t('programs.title_line1')}{' '}
            <span className="text-accent">{t('programs.title_highlight')}</span>
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
            <ProgramCard
              key={program.id}
              program={program}
              index={idx}
              exploreText={t('programs.explore')}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};
