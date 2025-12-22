import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '../ui/Section';
import { ShieldCheck, Bus, Globe2, BrainCircuit } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

export const WhyChooseUs: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    { icon: <Globe2 className="w-8 h-8" />, key: 0, color: 'text-blue-500' },
    { icon: <Bus className="w-8 h-8" />, key: 1, color: 'text-yellow-500' },
    { icon: <BrainCircuit className="w-8 h-8" />, key: 2, color: 'text-purple-500' },
    { icon: <ShieldCheck className="w-8 h-8" />, key: 3, color: 'text-green-500' },
  ];

  const items = t('why_choose_us.items') as unknown as Array<{ title: string; desc: string }>;

  return (
    <Section className="bg-secondary relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground">
            {t('why_choose_us.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-primary dark:bg-white/5 p-8 rounded-2xl border border-foreground/5 dark:border-white/10 hover:border-accent/30 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div
                className={`mb-6 p-4 rounded-xl bg-secondary dark:bg-primary/50 inline-block ${features[idx].color} group-hover:scale-110 transition-transform shadow-sm`}
              >
                {features[idx].icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4 font-heading">{item.title}</h3>
              <p className="text-muted leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};
