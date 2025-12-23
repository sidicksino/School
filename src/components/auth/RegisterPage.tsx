import React, { useState } from 'react';
import { useTranslation } from '../../contexts/LanguageContext';
import { AuthLayout } from './AuthLayout';
import { User, Phone, Lock, BookOpen, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    surname: '',
    firstname: '',
    nickname: '',
    cycle: '',
    phone: '',
    password: '',
    confirm_password: '',
    terms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Mock checking if nickname is taken
  const checkNickname = (nickname: string) => {
    // In a real app, this would be an API call
    const takenNicknames = ['royal_student', 'admin', 'test'];
    return takenNicknames.includes(nickname.toLowerCase());
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.surname) newErrors.surname = t('auth.errors.required');
    if (!formData.firstname) newErrors.firstname = t('auth.errors.required');
    if (!formData.cycle) newErrors.cycle = t('auth.errors.required');
    
    // Nickname validation
    if (!formData.nickname) {
        newErrors.nickname = t('auth.errors.required');
    } else if (checkNickname(formData.nickname)) {
        newErrors.nickname = t('auth.errors.nickname_taken');
    }

    // Phone validation (Simple check for digits)
    if (!formData.phone) {
        newErrors.phone = t('auth.errors.required');
    } else if (!/^\d{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = t('auth.errors.phone_format');
    }

    // Password validation
    if (!formData.password) {
        newErrors.password = t('auth.errors.required');
    } else if (formData.password.length < 6) {
        newErrors.password = 'Min 6 characters'; // Could be translated too
    }

    if (formData.password !== formData.confirm_password) {
        newErrors.confirm_password = t('auth.errors.password_match');
    }

    if (!formData.terms) {
        newErrors.terms = t('auth.errors.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Registered:', formData);
    setSuccess(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Handle checkbox
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    // Clear error when user types
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (success) {
      return (
          <AuthLayout title={t('auth.register.title')} subtitle={t('auth.register.subtitle')}>
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10"
              >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Registration Successful!</h3>
                  <p className="text-muted mb-8">Your account has been created. You can now log in.</p>
                  <Link to="/student/login">
                    <button className="w-full py-4 text-white bg-accent rounded-xl font-bold shadow-lg shadow-accent/20 hover:bg-yellow-400 transition-colors">
                        {t('auth.register.login_link')}
                    </button>
                  </Link>
              </motion.div>
          </AuthLayout>
      );
  }

  const inputClasses = "w-full bg-secondary/30 dark:bg-[#0f172a] border border-foreground/10 dark:border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all dark:text-white";

  return (
    <AuthLayout title={t('auth.register.title')} subtitle={t('auth.register.subtitle')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-xs font-bold uppercase text-muted mb-1 block pl-1">{t('auth.fields.surname')}</label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                        name="surname"
                        type="text"
                        value={formData.surname}
                        onChange={handleChange}
                        className={`${inputClasses} ${errors.surname ? 'border-red-500' : ''}`}
                        placeholder="Ex: Mahamat"
                    />
                </div>
                {errors.surname && <p className="text-red-500 text-xs mt-1 ml-1">{errors.surname}</p>}
            </div>
            <div>
                <label className="text-xs font-bold uppercase text-muted mb-1 block pl-1">{t('auth.fields.firstname')}</label>
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                        name="firstname"
                        type="text"
                        value={formData.firstname}
                        onChange={handleChange}
                        className={`${inputClasses} ${errors.firstname ? 'border-red-500' : ''}`}
                        placeholder="Ex: Moussa"
                    />
                </div>
                 {errors.firstname && <p className="text-red-500 text-xs mt-1 ml-1">{errors.firstname}</p>}
            </div>
        </div>

        {/* Nickname & Cycle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label className="text-xs font-bold uppercase text-muted mb-1 block pl-1">{t('auth.fields.nickname')}</label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold text-lg">@</span>
                    <input
                        name="nickname"
                        type="text"
                        value={formData.nickname}
                        onChange={handleChange}
                        className={`${inputClasses}`}
                        placeholder="Unique ID"
                    />
                </div>
                {errors.nickname && <p className="text-red-500 text-xs mt-1 ml-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.nickname}</p>}
            </div>

            <div>
                <label className="text-xs font-bold uppercase text-muted mb-1 block pl-1">{t('auth.fields.cycle')}</label>
                <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <select
                        name="cycle"
                        value={formData.cycle}
                        onChange={handleChange}
                        className={`${inputClasses} appearance-none cursor-pointer`}
                    >
                        <option value="">{t('auth.fields.select_cycle')}</option>
                        <option value="college">{t('auth.cycles.college')}</option>
                        <option value="lycee">{t('auth.cycles.lycee')}</option>
                    </select>
                </div>
                {errors.cycle && <p className="text-red-500 text-xs mt-1 ml-1">{errors.cycle}</p>}
            </div>
        </div>

        {/* Phone */}
        <div>
            <label className="text-xs font-bold uppercase text-muted mb-1 block pl-1">{t('auth.fields.phone')}</label>
            <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${inputClasses} ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="Ex: 66 00 00 00"
                />
            </div>
             {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
        </div>

        {/* Passwords */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="text-xs font-bold uppercase text-muted mb-1 block pl-1">{t('auth.fields.password')}</label>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`${inputClasses} ${errors.password ? 'border-red-500' : ''}`}
                        placeholder="••••••"
                    />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>}
            </div>
             <div>
                <label className="text-xs font-bold uppercase text-muted mb-1 block pl-1">{t('auth.fields.confirm_password')}</label>
                <div className="relative">
                     <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                    <input
                        name="confirm_password"
                        type="password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                         className={`${inputClasses} ${errors.confirm_password ? 'border-red-500' : ''}`}
                        placeholder="••••••"
                    />
                </div>
                {errors.confirm_password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.confirm_password}</p>}
            </div>
        </div>

        {/* Terms */}
        <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                    type="checkbox" 
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-accent text-accent focus:ring-accent cursor-pointer" 
                />
                <span className="text-sm text-muted group-hover:text-foreground transition-colors select-none">
                    {t('auth.register.terms')}
                </span>
            </label>
            {errors.terms && <p className="text-red-500 text-xs mt-1 ml-1">{errors.terms}</p>}
        </div>

        <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 mt-6 bg-accent text-slate-900 font-bold rounded-xl shadow-lg shadow-accent/20 hover:bg-yellow-400 hover:shadow-accent/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
        >
            {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            ) : (
                <>
                {t('auth.register.cta')} <ArrowRight className="w-5 h-5" />
                </>
            )}
        </button>

        <div className="text-center pt-4">
             <p className="text-muted text-sm">
                 {t('auth.register.has_account')} {' '}
                 <Link to="/student/login" className="text-accent font-bold hover:underline">
                     {t('auth.register.login_link')}
                 </Link>
             </p>
        </div>

      </form>
    </AuthLayout>
  );
};
