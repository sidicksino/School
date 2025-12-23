import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Phone, Calendar, Mail, User, Info, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTranslation } from '../../contexts/LanguageContext';
import img2 from '../../assets/2.png'; // Using existing student image

export const VisitSchool: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // EmailJS configuration (Placeholder)
  // const SERVICE_ID = 'YOUR_SERVICE_ID';
  // const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
  // const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date) {
        setStatus('error');
        return;
    }

    setStatus('loading');
    
    // Simulate API/EmailJS call
    try {
        // await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
        await new Promise(resolve => setTimeout(resolve, 1500)); // Mock delay
        setStatus('success');
        setFormData({ name: '', email: '', date: '', message: '' });
    } catch (error) {
        setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
      if (status === 'error') setStatus('idle');
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-white dark:bg-[#0f172a] relative overflow-hidden">
      {/* Abstract Background Shapes (Global) */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-secondary/30 -skew-y-6 transform origin-top-left -z-10" />
      <div className="absolute top-20 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon/10 rounded-full blur-3xl -z-10" />

      {/* NEW HERO SECTION (Split Layout) */}
      <section className="container mx-auto px-6 mb-24 relative">
         {/* Decorative Circles from Reference */}
         <div className="absolute -top-10 -left-10 w-40 h-40 bg-gray-200 dark:bg-gray-800 rounded-full -z-10 opacity-50" />
         <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-accent rounded-full -z-10 opacity-80 blur-sm" />

         <div className="bg-white dark:bg-[#1e293b] rounded-[3rem] shadow-2xl p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden border border-foreground/5 dark:border-white/5">
            {/* Geometric Pattern Overlay */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 dark:bg-white/5 -skew-x-12 transform origin-top-right z-0" />
            <div className="absolute top-10 right-10 flex gap-2 z-0 opacity-30">
                 {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-accent rounded-full" />
                 ))}
            </div>

            {/* Content Left */}
            <motion.div 
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6 }}
               className="lg:w-1/2 relative z-10"
            >
               <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">
                 {t('visit.hero.badge')}
               </span>
               <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-foreground mb-6 leading-[1.1]">
                 {t('visit.hero.title_line1')} <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">
                    {t('visit.hero.title_highlight')}
                 </span>
               </h1>
               <div className="h-1.5 w-24 bg-accent rounded-full mb-8" />
               
               <p className="text-lg text-muted leading-relaxed mb-8 max-w-md">
                 {t('visit.hero.subtitle')}
               </p>

               <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="shadow-lg shadow-accent/20">
                    {t('visit.hero.cta_schedule')}
                  </Button>
                  <Button variant="outline" size="lg" className="border-2">
                    {t('visit.hero.cta_virtual')}
                  </Button>
               </div>

               {/* Stats/Tags */}
               <div className="mt-12 flex gap-8 border-t border-foreground/10 pt-8">
                  <div>
                     <p className="font-bold text-2xl text-foreground">100%</p>
                     <p className="text-xs text-muted uppercase">{t('visit.hero.secure')}</p>
                  </div>
                  <div>
                     <p className="font-bold text-2xl text-foreground">24/7</p>
                     <p className="text-xs text-muted uppercase">{t('visit.hero.support')}</p>
                  </div>
               </div>
            </motion.div>

            {/* Image Right */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="lg:w-1/2 relative z-10"
            >
               <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
                  <img 
                    src={img2} 
                    alt="Campus Life" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Floating Badge */}
                  <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-black/80 backdrop-blur-md p-4 rounded-xl shadow-lg border border-accent/20">
                     <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent rounded-full text-white">
                           <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                           <p className="font-bold text-foreground text-sm">{t('visit.hero.location_badge_line1')}</p>
                           <p className="text-xs text-muted">{t('visit.hero.location_badge_line2')}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">
        {/* Info Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-8 border border-foreground/5 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-foreground">
              <Info className="text-accent" /> {t('visit.info.title')}
            </h2>
            
            <div className="space-y-6">
              {[
                { icon: Clock, title: t('visit.info.hours.title'), desc: t('visit.info.hours.desc') },
                { icon: MapPin, title: t('visit.info.location.title'), desc: t('visit.info.location.desc') },
                { icon: Phone, title: t('visit.info.contact.title'), desc: t('visit.info.contact.desc') }
              ].map((item, idx) => (
                 <div key={idx} className="flex items-start gap-4 p-4 hover:bg-secondary/50 rounded-xl transition-colors">
                    <div className="p-3 bg-secondary dark:bg-[#0f172a] rounded-lg text-accent">
                       <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="font-bold text-foreground text-lg">{item.title}</h3>
                       <p className="text-muted">{item.desc}</p>
                    </div>
                 </div>
              ))}
            </div>
          </div>

          {/* REAL MAP INTEGRATION */}
          <div className="h-[400px] w-full bg-gray-100 rounded-3xl overflow-hidden shadow-xl border border-foreground/5 relative group">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.980644078788!2d15.044431314798604!3d12.115867991410887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11195a6bd8c6d48b%3A0x6b8f886072e9a3b!2sN&#39;Djamena%2C%20Chad!5e0!3m2!1sen!2s!4v1625680000000!5m2!1sen!2s" 
               width="100%" 
               height="100%" 
               style={{ border: 0 }} 
               allowFullScreen 
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
               className="grayscale group-hover:grayscale-0 transition-all duration-700"
             />
             <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/10 rounded-3xl" />
          </div>
        </motion.div>

        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-[#1e293b] rounded-3xl p-8 md:p-10 border border-foreground/5 shadow-2xl relative overflow-hidden"
        >
          {/* Form Background Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -z-10" />

          <AnimatePresence mode="wait">
             {status === 'success' ? (
                <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full py-20 text-center"
                >
                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold font-heading mb-4 text-green-500">{t('visit.form.success_title')}</h2>
                    <p className="text-muted mb-8 text-lg max-w-xs mx-auto">{t('visit.form.success')}</p>
                    <Button onClick={() => setStatus('idle')} variant="outline" className="min-w-[200px]">
                        {t('visit.form.another')}
                    </Button>
                </motion.div>
             ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold font-heading text-foreground mb-2">{t('visit.form.title')}</h2>
                        <p className="text-muted text-sm">Fill out the form below to book a tour.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {[
                           { name: 'name', type: 'text', icon: User, label: t('visit.form.name') },
                           { name: 'email', type: 'email', icon: Mail, label: t('visit.form.email') },
                           { name: 'date', type: 'date', icon: Calendar, label: t('visit.form.date') }
                        ].map((field) => (
                           <div key={field.name} className="space-y-2 group">
                                <label className="text-sm font-medium ml-1 block text-foreground/80">{field.label}</label>
                                <div className="relative">
                                    <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-accent transition-colors" />
                                    <input 
                                       name={field.name}
                                       type={field.type}
                                       value={formData[field.name as keyof typeof formData]}
                                       onChange={handleChange}
                                       className="w-full bg-secondary/30 dark:bg-[#0f172a] border border-foreground/10 dark:border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all dark:text-white"
                                       placeholder={field.label}
                                    />
                                </div>
                            </div>
                        ))}

                        <div className="space-y-2 group">
                            <label className="text-sm font-medium ml-1 block text-foreground/80">{t('visit.form.message')}</label>
                            <textarea 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-secondary/30 dark:bg-[#0f172a] border border-foreground/10 dark:border-white/10 rounded-xl py-3 px-4 h-32 resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all dark:text-white"
                                placeholder={t('visit.form.message')}
                            />
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center gap-2 text-red-500 text-sm p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                                <AlertCircle className="w-4 h-4" />
                                {t('visit.form.error')}
                            </div>
                        )}

                        <Button 
                            variant="primary" 
                            className="w-full py-4 text-lg justify-center shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all font-bold"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? (
                                <span className="flex items-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" />
                                {t('visit.form.loading')}
                                </span>
                            ) : t('visit.form.submit')}
                        </Button>
                    </form>
                </motion.div>
             )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
