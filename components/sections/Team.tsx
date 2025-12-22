import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { useTranslation } from '../../contexts/LanguageContext';

export const Team: React.FC = () => {
  const { t } = useTranslation();
  const team = t('team.items') as unknown as Array<{name: string, role: string}>;

  return (
    <Section className="bg-primary border-t border-foreground/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-bold tracking-widest uppercase mb-2 block">
            {t('team.subtitle')}
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
            {t('team.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center group"
            >
              <div className="w-48 h-48 mx-auto mb-6 rounded-full p-1 bg-gradient-to-br from-foreground/10 to-transparent border border-foreground/10 group-hover:border-accent/50 transition-colors relative overflow-hidden">
                 {/* Placeholder for team images */}
                 <div className="w-full h-full rounded-full bg-secondary dark:bg-secondary flex items-center justify-center text-3xl font-heading text-muted">
                    {member.name.charAt(0)}
                 </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1 font-heading">{member.name}</h3>
              <p className="text-accent text-sm uppercase tracking-wide">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};