import React from 'react';
import { Sidebar } from '../dashboard/Sidebar';
import { TopBar } from '../dashboard/TopBar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#F3F4FF] dark:bg-slate-900 font-sans flex text-slate-600">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 transition-all duration-300">
                <TopBar />
                <div className="mt-8">
                    {children}
                </div>
            </main>
        </div>
    );
};
