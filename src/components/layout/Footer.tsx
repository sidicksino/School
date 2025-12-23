import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-gradient-to-b from-primary to-white dark:from-primary dark:to-[#0f172a] border-t border-foreground/5 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-tr from-accent to-yellow-600 rounded-xl shadow-lg shadow-accent/20">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-heading font-bold tracking-wide text-foreground">
                Académie <span className="text-accent">Royale</span>
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-xs font-sans">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3 pt-2">
              {[Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center justify-center text-muted hover:text-white hover:bg-accent hover:border-accent transition-all duration-300 group"
                  aria-label={`Visit our ${['Twitter', 'LinkedIn', 'Instagram'][i]} page`}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-foreground font-heading font-bold mb-6 text-lg relative inline-block">
              {t('footer.headers.programs')}
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-accent rounded-full" />
            </h3>
            <ul className="space-y-4 text-muted text-sm font-sans">
              {['quantum', 'neural', 'ethics', 'space'].map((key) => (
                <li key={key}>
                  <a href="#" className="flex items-center gap-2 hover:text-accent transition-colors group">
                    <ArrowRight className="w-3 h-3 text-accent/0 group-hover:text-accent transition-all -translate-x-2 group-hover:translate-x-0" />
                    <span className="group-hover:translate-x-1 transition-transform">{t(`footer.links.${key}`)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h3 className="text-foreground font-heading font-bold mb-6 text-lg relative inline-block">
              {t('footer.headers.resources')}
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-neon rounded-full" />
            </h3>
            <ul className="space-y-4 text-muted text-sm font-sans">
              {['portal', 'library', 'career', 'alumni'].map((key) => (
                <li key={key}>
                  <a href="#" className="hover:text-neon transition-colors block hover:translate-x-1 duration-300">
                    {t(`footer.links.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-foreground font-heading font-bold mb-6 text-lg relative inline-block">
              {t('footer.headers.connect')}
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-accent to-neon rounded-full" />
            </h3>
            <ul className="space-y-5 text-sm font-sans">
              <li className="flex items-start gap-3 text-muted">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span>Quartier Klémat, N'Djamena, Tchad</span>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Phone className="w-5 h-5 text-neon shrink-0" />
                <span>+235 66 00 00 00</span>
              </li>
              <li className="flex items-center gap-3 text-muted">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:admissions@academieroyale.edu" className="hover:text-accent transition-colors">
                  admissions@academieroyale.td
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted/60 font-sans"
        >
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Settings</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
