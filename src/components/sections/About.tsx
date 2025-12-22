import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { Target, Users, Zap } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

export const About: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { label: t('about.stat_campuses'), value: '12' },
    { label: t('about.stat_laureates'), value: '45' },
    { label: t('about.stat_labs'), value: '100+' },
    { label: t('about.stat_legacy'), value: '300' },
  ];

  const features = [
    {
      icon: <Target className="w-6 h-6 text-accent" />,
      title: t('about.feature_precision_title'),
      description: t('about.feature_precision_desc'),
    },
    {
      icon: <Users className="w-6 h-6 text-neon" />,
      title: t('about.feature_network_title'),
      description: t('about.feature_network_desc'),
    },
    {
      icon: <Zap className="w-6 h-6 text-foreground" />,
      title: t('about.feature_quantum_title'),
      description: t('about.feature_quantum_desc'),
    },
  ];

  return (
    <Section id="about" className="bg-primary">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
              {t('about.title_line1')}{' '}
              <span className="text-accent">{t('about.title_highlight1')}</span>,<br />
              {t('about.title_line2')}{' '}
              <span className="text-neon">{t('about.title_highlight2')}</span>
            </h2>
            <p className="text-muted leading-relaxed mb-6 font-sans">{t('about.desc1')}</p>
            <p className="text-muted leading-relaxed mb-8 font-sans">{t('about.desc2')}</p>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <p className="text-3xl font-bold text-foreground mb-1 font-heading">
                    {stat.value}
                  </p>
                  <p className="text-sm text-accent/80 uppercase tracking-wide font-sans">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-neon/20 blur-3xl rounded-full" />
            <img
              src="https://picsum.photos/600/600"
              alt="Futuristic Campus"
              className="relative z-10 rounded-2xl border border-foreground/10 shadow-2xl w-full object-cover aspect-square grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-xl hover:bg-white/5 transition-all shadow-[0_0_15px_rgba(0,0,0,0.05)] hover:shadow-[0_0_20px_rgba(251,191,36,0.1)]"
            >
              <div className="bg-secondary w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 font-heading">
                {feature.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed font-sans">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
