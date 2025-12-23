import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { useTranslation } from '../../contexts/LanguageContext';

export const Team: React.FC = () => {
  const { t } = useTranslation();
  const team = t('team.items') as unknown as Array<{ name: string; role: string }>;

  return (
    <Section className="bg-gradient-to-br from-primary via-white to-primary/10 dark:from-[#0a192f] dark:via-[#112240] dark:to-[#0a192f] relative overflow-hidden">
      {/* Background Decorators */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-neon/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-accent text-sm font-bold tracking-[0.2em] uppercase mb-4 block"
          >
            {t('team.subtitle')}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4"
          >
            {t('team.title')}
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            className="h-1.5 bg-gradient-to-r from-accent to-neon rounded-full mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white/80 dark:bg-[#112240]/80 backdrop-blur-md p-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-accent/10 transition-all border border-foreground/5 group"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full p-1 bg-gradient-to-br from-accent to-neon group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-white dark:bg-[#0a192f] flex items-center justify-center text-4xl font-heading font-bold text-muted group-hover:text-foreground transition-colors">
                  {member.name.charAt(0)}
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 font-heading text-center group-hover:text-accent transition-colors">{member.name}</h3>
              <p className="text-muted text-sm uppercase tracking-wide text-center font-sans font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
