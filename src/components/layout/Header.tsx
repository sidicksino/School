import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, Search, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';
import { SearchModal } from '../ui/SearchModal';
import { useTranslation } from '../../contexts/LanguageContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.programs'), path: '/programs' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled || isMobileMenuOpen
            ? 'bg-primary/95 backdrop-blur-md border-foreground/10 py-3 shadow-lg'
            : 'bg-transparent border-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer z-50">
            <div className="p-2 bg-gradient-to-tr from-accent to-yellow-600 rounded-lg group-hover:shadow-[0_0_20px_rgba(251,191,36,0.6)] transition-all duration-300">
              <GraduationCap className="text-primary-dark dark:text-primary w-6 h-6" />
            </div>
            <span className="text-xl font-heading font-bold tracking-wide text-foreground">
              Académie <span className="text-accent">Royale</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`text-sm font-medium transition-colors uppercase tracking-wider relative group font-sans ${
                    isActive ? 'text-accent' : 'text-muted hover:text-accent'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                  />
                </Link>
              );
            })}

            <div className="h-6 w-px bg-foreground/20 mx-2" />
            
            <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-muted hover:text-accent transition-colors rounded-full hover:bg-secondary/50"
                aria-label="Open search"
            >
                <Search className="w-5 h-5" />
            </button>

            <ThemeToggle />
            <LanguageSwitcher />

            {user ? (
                <Link 
                  to="/student/dashboard" 
                  className="flex items-center gap-2 px-4 py-2 bg-accent text-slate-900 rounded-full font-bold hover:bg-yellow-400 transition-colors"
                >
                    <User className="w-4 h-4" />
                    <span>{user.surname}</span>
                </Link>
            ) : (
                <Link to="/student/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 text-sm font-bold text-accent bg-transparent border border-accent rounded-full shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_rgba(251,191,36,0.6)] hover:bg-accent hover:text-white transition-all duration-300 font-heading tracking-wide"
                  >
                    {t('nav.join')}
                  </motion.button>
                </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4 z-50">
            <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-foreground hover:text-accent transition-colors"
                aria-label="Open search"
            >
                <Search className="w-5 h-5" />
            </button>
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              className="text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: '100vh' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="fixed inset-0 z-40 bg-primary/98 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col gap-6 items-center border-t border-foreground/10 overflow-hidden"
            style={{ top: 0 }}
          >
            {navItems.map((item, idx) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                   key={item.label}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 + idx * 0.1 }}
                >
                  <Link
                    to={item.path}
                    className={`text-2xl font-heading font-medium transition-colors ${
                      isActive ? 'text-accent' : 'text-muted hover:text-accent'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="w-full max-w-xs mt-4"
            >
              <Link
                to={user ? "/student/dashboard" : "/student/login"}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="primary" className="w-full flex items-center justify-center gap-2">
                  {user ? (
                      <>
                        <User className="w-4 h-4" />
                        {t('nav.dashboard') || 'Mon Espace'}
                      </>
                  ) : (
                      t('nav.join')
                  )}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
