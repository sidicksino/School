import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { AuthLayout } from './AuthLayout';
import { User, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const { error } = await login(formData.username, formData.password);
    
    if (error) {
        alert('Login failed: ' + error);
        setIsSubmitting(false);
    } else {
        console.log('Login successful');
        navigate('/student/dashboard');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClasses = "w-full bg-secondary/30 dark:bg-[#0f172a] border border-foreground/10 dark:border-white/10 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all dark:text-white";

  return (
    <AuthLayout title={t('auth.login.title')} subtitle={t('auth.login.subtitle')}>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
            <label className="text-xs font-bold uppercase text-muted mb-1 block pl-1">{t('auth.login.id_label')}</label>
            <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder={t('auth.login.id_placeholder')}
                />
            </div>
        </div>

        <div>
            <div className="flex justify-between mb-1 pl-1">
                <label className="text-xs font-bold uppercase text-muted">{t('auth.fields.password')}</label>
            </div>
            <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                    placeholder="••••••"
                />
            </div>
        </div>

        <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-accent text-slate-900 font-bold rounded-xl shadow-lg shadow-accent/20 hover:bg-yellow-400 hover:shadow-accent/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
        >
             {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            ) : (
                <>
                {t('auth.login.cta')} <ArrowRight className="w-5 h-5" />
                </>
            )}
        </button>

        <div className="text-center pt-4">
             <p className="text-muted text-sm">
                 {t('auth.login.no_account')} {' '}
                 <Link to="/student/register" className="text-accent font-bold hover:underline">
                     {t('auth.login.register_link')}
                 </Link>
             </p>
        </div>

      </form>
    </AuthLayout>
  );
};
