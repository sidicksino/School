import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary border border-white/10 hover:border-accent/50 text-accent transition-colors relative overflow-hidden group"
      aria-label="Toggle Theme"
    >
      <div className="relative z-10">
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </div>
      <div className="absolute inset-0 bg-accent/10 scale-0 group-hover:scale-100 transition-transform rounded-full" />
    </motion.button>
  );
};