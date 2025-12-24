import React from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from '../../contexts/LanguageContext';
import { User, BookOpen, Hash, Phone, Shield, Calendar } from 'lucide-react';

export const Profile: React.FC = () => {
    const { user } = useAuth();
    const { t } = useTranslation();

    if (!user) return null;

    // Helper to format date if we had a created_at in the user object context
    // For now we'll just show static or available data
    
    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto">
                {/* Header Card */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-[#4D44B5] to-[#7F77D7] opacity-10"></div>
                     
                     <div className="w-24 h-24 bg-[#4D44B5] rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white dark:border-slate-800 z-10 shadow-lg">
                        {user.surname.charAt(0).toUpperCase()}
                     </div>
                     
                     <div className="text-center md:text-left z-10">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{user.full_name}</h1>
                        <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2">
                             <User className="w-4 h-4" />
                             @{user.surname}
                        </p>
                         <span className="inline-block mt-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full text-xs font-bold uppercase">
                            {user.role}
                        </span>
                     </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Academic Info */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-[#4D44B5]" />
                            Academic Information
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg flex items-center justify-center">
                                        <Hash className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-bold">Cycle</p>
                                        <p className="font-bold text-slate-800 dark:text-white">{user.cycle}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg flex items-center justify-center">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-bold">Class</p>
                                        <p className="font-bold text-slate-800 dark:text-white">{user.classe}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Personal & Account Info */}
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                             <Shield className="w-5 h-5 text-orange-500" />
                            Account Details
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg flex items-center justify-center">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-bold">Phone</p>
                                        <p className="font-bold text-slate-800 dark:text-white">{user.phone || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>

                             <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-600 text-slate-600 dark:text-slate-300 rounded-lg flex items-center justify-center">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-bold">Student ID</p>
                                        <p className="font-mono text-xs text-slate-800 dark:text-white truncate max-w-[150px]">{user.id}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
