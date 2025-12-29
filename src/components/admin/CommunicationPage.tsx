import React from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { CommunicationManagement } from './CommunicationManagement';

export const CommunicationPage: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                 <div className="bg-[#4D44B5] rounded-3xl p-8 text-white mb-8 relative overflow-hidden">
                    <h2 className="text-3xl font-bold mb-2 font-heading relative z-10">Communication Center</h2>
                    <p className="opacity-90 relative z-10">Manage school-wide notices and events.</p>
                    
                    {/* Decorative */}
                    <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full bg-white/10 blur-2xl"></div>
                 </div>

                <div className="grid grid-cols-1 gap-6">
                     <CommunicationManagement />
                </div>
            </div>
        </DashboardLayout>
    );
};
