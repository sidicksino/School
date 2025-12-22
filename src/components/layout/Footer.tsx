import React from 'react';
import { GraduationCap, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary border-t border-foreground/10 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="text-accent w-8 h-8" />
              <span className="text-2xl font-heading font-bold text-foreground">
                Académie Royale
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">{t('footer.tagline')}</p>
          </div>

          <div>
            <h3 className="text-foreground font-heading font-semibold mb-6 uppercase tracking-wider text-sm">
              {t('footer.headers.programs')}
            </h3>
            <ul className="space-y-3 text-muted text-sm">
              <li className="hover:text-accent cursor-pointer transition-colors">
                {t('footer.links.quantum')}
              </li>
              <li className="hover:text-accent cursor-pointer transition-colors">
                {t('footer.links.neural')}
              </li>
              <li className="hover:text-accent cursor-pointer transition-colors">
                {t('footer.links.ethics')}
              </li>
              <li className="hover:text-accent cursor-pointer transition-colors">
                {t('footer.links.space')}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-heading font-semibold mb-6 uppercase tracking-wider text-sm">
              {t('footer.headers.resources')}
            </h3>
            <ul className="space-y-3 text-muted text-sm">
              <li className="hover:text-accent cursor-pointer transition-colors">
                {t('footer.links.portal')}
              </li>
              <li className="hover:text-accent cursor-pointer transition-colors">
                {t('footer.links.library')}
              </li>
              <li className="hover:text-accent cursor-pointer transition-colors">
                {t('footer.links.career')}
              </li>
              <li className="hover:text-accent cursor-pointer transition-colors">
                {t('footer.links.alumni')}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-heading font-semibold mb-6 uppercase tracking-wider text-sm">
              {t('footer.headers.connect')}
            </h3>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-muted hover:text-primary hover:bg-accent transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-muted hover:text-primary hover:bg-accent transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-muted hover:text-primary hover:bg-accent transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-muted text-sm">
              <Mail className="w-4 h-4 text-accent" />
              <span>admissions@academieroyale.edu</span>
            </div>
          </div>
        </div>

        <div className="border-t border-foreground/5 pt-8 text-center text-muted text-sm">
          <p>
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};
