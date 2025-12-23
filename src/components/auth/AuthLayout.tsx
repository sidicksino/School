import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center relative overflow-hidden bg-primary dark:bg-[#0f172a]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-secondary/10 -skew-y-6 transform origin-top-left -z-10" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 relative z-10 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 dark:bg-[#1e293b]/90 backdrop-blur-xl border border-foreground/5 dark:border-white/5 shadow-2xl rounded-3xl p-8 md:p-10 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent to-neon" />
            
            <div className="text-center mb-8">
                <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
                    <div className="p-2 bg-gradient-to-tr from-accent to-yellow-600 rounded-xl shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform">
                        <GraduationCap className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-heading font-bold tracking-wide text-foreground">
                        Académie <span className="text-accent">Royale</span>
                    </span>
                </Link>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-2">{title}</h1>
                <p className="text-muted">{subtitle}</p>
            </div>

            {children}
        </motion.div>
      </div>
    </div>
  );
};
