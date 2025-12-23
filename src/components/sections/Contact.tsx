import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { useTranslation } from '../../contexts/LanguageContext';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      // Simple validation mock
      if (email.includes('@')) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  return (
    <Section id="contact" className="bg-primary relative">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary to-primary z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-r from-secondary to-primary border border-foreground/10 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-accent/20 blur-[100px] rounded-full" />

          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            {t('contact.title_line1')}{' '}
            <span className="text-accent">{t('contact.title_highlight')}</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto mb-10 text-lg font-sans">
            {t('contact.desc')}
          </p>

          <div className="max-w-md mx-auto min-h-[160px]"> {/* Min height to prevent layout shift */}
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-500 mb-2">{t('contact.success')}</h3>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-green-500/30 hover:bg-green-500/10"
                    onClick={() => setStatus('idle')}
                  >
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4"
                  onSubmit={handleSubmit}
                >
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('contact.placeholder')}
                      disabled={status === 'loading'}
                      className="w-full bg-primary/50 dark:bg-black/30 border border-foreground/20 rounded-lg px-6 py-4 text-foreground placeholder-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-sans disabled:opacity-50"
                    />
                  </div>
                  
                  {status === 'error' && (
                     <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                        <AlertCircle className="w-4 h-4" />
                        {t('contact.error')}
                     </div>
                  )}

                  <Button 
                    className="w-full justify-center relative" 
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                       <>
                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                         {t('contact.loading')}
                       </>
                    ) : (
                      t('contact.button')
                    )}
                  </Button>
                  <p className="text-xs text-muted mt-2 font-sans">{t('contact.disclaimer')}</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
};
