import React from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { SubjectManagement } from './SubjectManagement';

export const AdminCoursesPage: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] flex flex-col">
                 <div className="bg-slate-900 rounded-3xl p-8 text-white mb-8 relative overflow-hidden shrink-0 shadow-xl">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-2 font-heading">Course Management</h2>
                        <p className="opacity-70 text-lg">Create, edit, and organize the academic curriculum.</p>
                    </div>
                    
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl -ml-12 -mb-12"></div>
                 </div>

                <div className="flex-1 min-h-0 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                     <SubjectManagement />
                </div>
            </div>
        </DashboardLayout>
    );
};
