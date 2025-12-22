import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles =
    'px-6 py-3 rounded-lg font-medium tracking-wide transition-all duration-300 relative overflow-hidden group font-sans flex items-center justify-center gap-2';

  const variants = {
    primary:
      'bg-accent text-slate-900 font-bold hover:bg-yellow-400 shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/40',
    secondary:
      'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:bg-white/5 dark:border-white/10 dark:text-neon dark:hover:bg-white/10 dark:hover:text-white backdrop-blur-md',
    outline:
      'border-2 border-accent text-accent hover:bg-accent hover:text-slate-900 font-semibold',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
      )}
    </motion.button>
  );
};
