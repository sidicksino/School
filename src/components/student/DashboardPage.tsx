
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from '../../contexts/LanguageContext';
import { LogOut, User, BookOpen, GraduationCap, Phone } from 'lucide-react';

export const DashboardPage: React.FC = () => {
    const { user, logout } = useAuth();
    const { t } = useTranslation();

    if (!user) return null;

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mb-8">
                    <div className="bg-accent h-32 relative">
                        <div className="absolute -bottom-12 left-8">
                            <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full p-2 shadow-lg">
                                <div className="w-full h-full bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                                    <User className="w-10 h-10 text-muted" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-16 pb-6 px-8 flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">{user.full_name}</h1>
                            <p className="text-muted">@{user.surname}</p>
                        </div>
                        <button 
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>{t('auth.logout') || 'Déconnexion'}</span>
                        </button>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Academic Info */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
                        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <GraduationCap className="w-5 h-5 text-accent" />
                            Informations Académiques
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-xl">
                                <span className="text-muted">Cycle</span>
                                <span className="font-bold text-foreground">{user.cycle}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-xl">
                                <span className="text-muted">Classe</span>
                                <span className="font-bold text-foreground">{user.classe}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-xl">
                                <span className="text-muted">Role</span>
                                <span className="font-bold text-accent capitalize">{user.role}</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
                        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                            <Phone className="w-5 h-5 text-accent" />
                            Coordonnées
                        </h2>
                        <div className="space-y-4">
                             <div className="flex items-center justify-between p-3 bg-secondary/10 rounded-xl">
                                <span className="text-muted">Téléphone</span>
                                <span className="font-bold text-foreground min-h-[1.5rem]">{user.phone || 'Non renseigné'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
