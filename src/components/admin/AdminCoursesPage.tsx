import React, { useState } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { SubjectManagement } from './SubjectManagement';
import { CurriculumManagement } from './CurriculumManagement';

export const AdminCoursesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'subjects' | 'curriculum'>('subjects');

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] flex flex-col">
                 <div className="bg-slate-900 rounded-3xl p-8 text-white mb-8 relative overflow-hidden shrink-0 shadow-xl">
                    <div className="relative z-10 flex justify-between items-end">
                        <div>
                            <h2 className="text-3xl font-bold mb-2 font-heading">Course Management</h2>
                            <p className="opacity-70 text-lg">Create subjects and build class curriculums.</p>
                        </div>
                        
                        <div className="flex bg-white/10 p-1 rounded-xl backdrop-blur-sm">
                            <button 
                                onClick={() => setActiveTab('subjects')}
                                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                                    activeTab === 'subjects' ? 'bg-white text-slate-900 shadow-lg' : 'text-white/70 hover:text-white'
                                }`}
                            >
                                Global Subjects
                            </button>
                            <button 
                                onClick={() => setActiveTab('curriculum')}
                                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                                    activeTab === 'curriculum' ? 'bg-white text-slate-900 shadow-lg' : 'text-white/70 hover:text-white'
                                }`}
                            >
                                Class Curriculum
                            </button>
                        </div>
                    </div>
                    
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl -ml-12 -mb-12"></div>
                 </div>

                <div className="flex-1 min-h-0 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden relative">
                     {activeTab === 'subjects' ? <SubjectManagement /> : <CurriculumManagement />}
                </div>
            </div>
        </DashboardLayout>
    );
};
