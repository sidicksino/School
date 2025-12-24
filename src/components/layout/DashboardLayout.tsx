import React, { useState } from 'react';
import { Sidebar } from '../dashboard/Sidebar';
import { TopBar } from '../dashboard/TopBar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F3F4FF] dark:bg-slate-900 font-sans flex text-slate-600 relative overflow-x-hidden">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden glass-effect"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar 
                isOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
            />

            {/* Main Content */}
            <main className="flex-1 w-full md:ml-64 flex flex-col min-h-screen transition-all duration-300">
                <TopBar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                <div className="flex-1 p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};
