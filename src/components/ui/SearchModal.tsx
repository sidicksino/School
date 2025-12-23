import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../contexts/LanguageContext';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  path: string;
  tags: string[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Dynamic Search Index using translations
  const searchIndex: SearchItem[] = [
    { id: '1', title: t('search.items.home.title'), description: t('search.items.home.desc'), path: '/', tags: ['home', 'accueil', 'index'] },
    { id: '2', title: t('search.items.programs.title'), description: t('search.items.programs.desc'), path: '/programs', tags: ['programs', 'levels', 'kindergarten', 'primary', 'curriculum'] },
    { id: '3', title: t('search.items.about.title'), description: t('search.items.about.desc'), path: '/about', tags: ['about', 'history', 'mission', 'team', 'facilities'] },
    { id: '4', title: t('search.items.contact.title'), description: t('search.items.contact.desc'), path: '/contact', tags: ['contact', 'email', 'phone', 'address'] },
    { id: '5', title: t('search.items.visit.title'), description: t('search.items.visit.desc'), path: '/visit', tags: ['visit', 'tour', 'map', 'location'] },
    { id: '6', title: t('search.items.news.title'), description: t('search.items.news.desc'), path: '/#news', tags: ['news', 'events', 'blog', 'updates'] },
    { id: '7', title: t('search.items.admissions.title'), description: t('search.items.admissions.desc'), path: '/contact', tags: ['admissions', 'enroll', 'join', 'register'] },
  ];

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const filtered = searchIndex.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.tags.some(tag => tag.includes(lowerQuery))
    );
    setResults(filtered);
  }, [query, t]); // dependency on t to update if language changes

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[70] flex items-start justify-center pt-24 px-4 pointer-events-none"
          >
            <div className="bg-white dark:bg-[#1e293b] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-foreground/10 pointer-events-auto flex flex-col max-h-[70vh]">
              {/* Search Header */}
              <div className="flex items-center gap-4 p-4 border-b border-foreground/5">
                <Search className="w-5 h-5 text-muted" />
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  className="flex-grow bg-transparent text-lg font-medium text-foreground placeholder:text-muted/50 focus:outline-none"
                />
                <button 
                  onClick={onClose}
                  className="p-1 hover:bg-secondary rounded-lg transition-colors text-muted hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results Area */}
              <div className="overflow-y-auto flex-grow p-2">
                {query === '' ? (
                   <div className="p-8 text-center text-muted">
                      <Command className="w-12 h-12 mx-auto mb-4 opacity-20" />
                      <p>{t('search.initial')}</p>
                   </div>
                ) : results.length > 0 ? (
                  <div className="space-y-1">
                    {results.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelect(item.path)}
                        className="w-full text-left p-3 rounded-xl hover:bg-secondary dark:hover:bg-white/5 transition-colors group flex items-center justify-between"
                      >
                        <div>
                          <h4 className="font-bold text-foreground group-hover:text-accent transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted">{item.description}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted">
                    <p>{t('search.no_results')} "{query}"</p>
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="p-3 border-t border-foreground/5 bg-secondary/30 text-xs text-muted flex justify-between">
                 <span>{t('search.close')}</span>
                 <span><strong>{results.length}</strong> {t('search.results_count')}</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
