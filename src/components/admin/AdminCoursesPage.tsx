import React from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { SubjectManagement } from './SubjectManagement';

export const AdminCoursesPage: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
                 <div className="bg-[#4D44B5] rounded-3xl p-8 text-white mb-8 relative overflow-hidden shrink-0">
                    <h2 className="text-3xl font-bold mb-2 font-heading relative z-10">Course Management</h2>
                    <p className="opacity-90 relative z-10">Create, edit, and remove academic subjects.</p>
                    
                    <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
                 </div>

                <div className="flex-1 min-h-0">
                     <SubjectManagement />
                </div>
            </div>
        </DashboardLayout>
    );
};
