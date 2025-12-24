import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, User, BookOpen, GraduationCap, Settings, LogOut, Clock, X } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const { logout } = useAuth();
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: t('nav.dashboard') || 'Dashboard', path: '/student/dashboard' },
        { icon: Clock, label: 'Schedule', path: '/student/schedule' },
        { icon: BookOpen, label: 'Courses', path: '/student/courses' },
        { icon: GraduationCap, label: 'Grades', path: '/student/grades' },
        { icon: Settings, label: 'Settings', path: '/student/settings' },
    ];

    return (
        <div className={`h-screen w-64 bg-[#4D44B5] text-white flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 md:translate-x-0 ${
            isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}>
            {/* Logo Area */}
            {/* Logo Area */}
            <div className="p-8 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="p-2 bg-gradient-to-tr from-accent to-yellow-600 rounded-lg group-hover:shadow-[0_0_20px_rgba(251,191,36,0.6)] transition-all duration-300">
                        <GraduationCap className="w-6 h-6 text-slate-900" />
                    </div>
                    <span className="font-heading font-bold text-xl tracking-wide text-white">
                        Académie <span className="text-accent">Royale</span>
                    </span>
                </Link>
                
                {/* Mobile Close Button */}
                <button 
                    onClick={onClose}
                    className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-4 px-6 py-3 rounded-full transition-all duration-200 ${
                                isActive 
                                ? 'bg-white/10 text-white' 
                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="p-6">
                 <button 
                    onClick={logout}
                    className="flex items-center gap-4 px-6 py-3 text-white/70 hover:text-white transition-colors w-full"
                >
                    <LogOut className="w-5 h-5" />
                    <span>{t('auth.logout')}</span>
                </button>
            </div>
        </div>
    );
};
