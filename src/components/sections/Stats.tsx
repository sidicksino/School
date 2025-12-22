import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { useTranslation } from '../../contexts/LanguageContext';

interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, value, {
        duration: 2,
        ease: 'circOut',
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = Math.floor(latest).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <div className="flex items-baseline">
      <span ref={ref} className="tabular-nums">
        0
      </span>
      <span>{suffix}</span>
    </div>
  );
};

export const Stats: React.FC = () => {
  const { t } = useTranslation();

  const stats: StatItem[] = [
    { label: t('stats.experience'), value: 20, suffix: '+' },
    { label: t('stats.alumni'), value: 5000, suffix: '+' },
    { label: t('stats.certified'), value: 100, suffix: '%' },
  ];

  return (
    <section className="relative z-20 bg-secondary/30 backdrop-blur-md border-y border-foreground/5">
      {/* HUD Decoration Lines */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-foreground/5">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="py-8 md:py-12 flex flex-col items-center justify-center text-center group"
            >
              <div className="relative mb-2">
                <div className="text-4xl md:text-5xl font-mono font-bold text-foreground group-hover:text-accent transition-colors duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                {/* Decorative corner markers for HUD look */}
                <div className="absolute -top-2 -left-4 w-2 h-2 border-t border-l border-foreground/20 group-hover:border-accent/50 transition-colors" />
                <div className="absolute -bottom-2 -right-4 w-2 h-2 border-b border-r border-foreground/20 group-hover:border-accent/50 transition-colors" />
              </div>

              <p className="text-sm font-heading uppercase tracking-[0.2em] text-muted group-hover:text-foreground transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
