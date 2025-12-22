import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Calendar, Mail, User, Info } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTranslation } from '../../contexts/LanguageContext';

export const VisitSchool: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-secondary/5" />
        <div className="container mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
              {t('visit.hero.badge')}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
              {t('visit.hero.title_line1')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-400">
                {t('visit.hero.title_highlight')}
              </span>
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              {t('visit.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 mt-12">
        {/* Info Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="bg-secondary/5 rounded-2xl p-8 border border-white/5">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Info className="text-accent" /> {t('visit.info.title')}
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                 <div className="p-3 bg-primary rounded-lg border border-white/10">
                    <Clock className="w-6 h-6 text-neon" />
                 </div>
                 <div>
                    <h3 className="font-semibold text-lg">{t('visit.info.hours.title')}</h3>
                    <p className="text-muted">{t('visit.info.hours.desc')}</p>
                 </div>
              </div>

               <div className="flex items-start gap-4">
                 <div className="p-3 bg-primary rounded-lg border border-white/10">
                    <MapPin className="w-6 h-6 text-neon" />
                 </div>
                 <div>
                    <h3 className="font-semibold text-lg">{t('visit.info.location.title')}</h3>
                    <p className="text-muted">{t('visit.info.location.desc')}</p>
                 </div>
              </div>

               <div className="flex items-start gap-4">
                 <div className="p-3 bg-primary rounded-lg border border-white/10">
                    <Phone className="w-6 h-6 text-neon" />
                 </div>
                 <div>
                    <h3 className="font-semibold text-lg">{t('visit.info.contact.title')}</h3>
                    <p className="text-muted">{t('visit.info.contact.desc')}</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="h-[300px] w-full bg-gray-800 rounded-2xl overflow-hidden relative flex items-center justify-center border border-white/10">
             <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black opacity-80" />
             <div className="z-10 text-center">
                <MapPin className="w-12 h-12 text-accent mx-auto mb-2" />
                <p className="text-muted">Map Integration would go here</p>
                <p className="text-sm text-gray-500">{t('visit.info.location.desc')}</p>
             </div>
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-8 border border-white/10 shadow-2xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">{t('visit.form.title')}</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
                <label className="text-sm font-medium ml-1 block">{t('visit.form.name')}</label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type="text" 
                      className="w-full bg-secondary/10 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent transition-colors"
                      placeholder={t('visit.form.name')}
                    />
                </div>
            </div>

             <div className="space-y-2">
                <label className="text-sm font-medium ml-1 block">{t('visit.form.email')}</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type="email" 
                      className="w-full bg-secondary/10 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent transition-colors"
                      placeholder={t('visit.form.email')}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium ml-1 block">{t('visit.form.date')}</label>
                <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                      type="date" 
                      className="w-full bg-secondary/10 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-accent transition-colors text-gray-400"
                    />
                </div>
            </div>

            <div className="space-y-2">
                 <label className="text-sm font-medium ml-1 block">{t('visit.form.message')}</label>
                 <textarea 
                    className="w-full bg-secondary/10 border border-white/10 rounded-xl py-3 px-4 h-32 resize-none focus:outline-none focus:border-accent transition-colors"
                    placeholder={t('visit.form.message')}
                 />
            </div>

            <Button variant="primary" className="w-full py-4 text-lg">
                {t('visit.form.submit')}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
