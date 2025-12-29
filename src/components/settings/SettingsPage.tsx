import React, { useState } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from '../../contexts/LanguageContext';
import { supabase } from '../../lib/supabase';
import { Moon, Sun, Globe, Lock, Save, CheckCircle, AlertCircle, Shield } from 'lucide-react';

export const SettingsPage: React.FC = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useTranslation();
    
    // Password Change State
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{type: 'success'|'error', text: string} | null>(null);

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: "New passwords don't match" });
            return;
        }

        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: "Password must be at least 6 characters" });
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase.rpc('change_user_password', {
                p_user_id: user?.id,
                p_old_password: oldPassword,
                p_new_password: newPassword
            });

            if (error) throw error;

            if (data && data.error) {
                throw new Error(data.error);
            }

            setMessage({ type: 'success', text: "Password changed successfully!" });
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            console.error(err);
            setMessage({ type: 'error', text: err.message || "Failed to change password" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                        <Shield className="w-7 h-7 text-[#4D44B5]" />
                        Settings
                    </h1>
                    <p className="text-slate-500">Manage your preferences and security.</p>
                </div>

                <div className="space-y-6">
                    {/* Appearance & Language */}
                    <section className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
                            Preferences
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Theme */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                                        theme === 'dark' ? 'bg-indigo-900/50 text-indigo-300' : 'bg-orange-100 text-orange-500'
                                    }`}>
                                        {theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">Appearance</h3>
                                        <p className="text-sm text-slate-500">
                                            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={toggleTheme}
                                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                                        theme === 'dark' ? 'bg-[#4D44B5]' : 'bg-slate-200'
                                    }`}
                                >
                                    <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                                        theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                                    }`} />
                                </button>
                            </div>

                            {/* Language */}
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">Language</h3>
                                        <p className="text-sm text-slate-500">
                                            {language === 'fr' ? 'Français' : 'English'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
                                    <button 
                                        onClick={() => setLanguage('en')}
                                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                                            language === 'en' ? 'bg-white dark:bg-slate-600 text-[#4D44B5] shadow-sm' : 'text-slate-500'
                                        }`}
                                    >
                                        EN
                                    </button>
                                    <button 
                                        onClick={() => setLanguage('fr')}
                                        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                                            language === 'fr' ? 'bg-white dark:bg-slate-600 text-[#4D44B5] shadow-sm' : 'text-slate-500'
                                        }`}
                                    >
                                        FR
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Security */}
                    <section className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-700 pb-4 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-slate-400" />
                            Security
                        </h2>

                        <form onSubmit={handlePasswordChange} className="max-w-md">
                            {message && (
                                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                                    message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                }`}>
                                    {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                    <span className="font-bold text-sm">{message.text}</span>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Current Password</label>
                                    <input 
                                        type="password"
                                        required
                                        value={oldPassword}
                                        onChange={e => setOldPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#4D44B5] outline-none transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">New Password</label>
                                    <input 
                                        type="password"
                                        required
                                        minLength={6}
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#4D44B5] outline-none transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Confirm New Password</label>
                                    <input 
                                        type="password"
                                        required
                                        minLength={6}
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#4D44B5] outline-none transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={loading}
                                className="mt-6 flex items-center gap-2 px-6 py-3 bg-[#4D44B5] text-white rounded-xl font-bold hover:bg-[#3d3691] transition-colors disabled:opacity-50"
                            >
                                {loading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div> : <Save className="w-5 h-5" />}
                                <span>Update Password</span>
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </DashboardLayout>
    );
};
