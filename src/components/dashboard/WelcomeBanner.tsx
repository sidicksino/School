import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const WelcomeBanner: React.FC = () => {
    const { user } = useAuth();
    
    const getRoleContent = () => {
        switch (user?.role) {
            case 'admin':
                return {
                    message: "Manage the school system, users, and global settings effectively.",
                    buttonText: "Go to Dashboard",
                    buttonAction: () => {}
                };
            case 'teacher':
                return {
                    message: "Manage your classes, enter grades, and track attendance efficiently.",
                    buttonText: "Mark Attendance",
                    buttonAction: () => window.location.hash = '#/teacher/attendance'
                };
            case 'student':
            default:
                return {
                    message: "Always stay updated in your student portal. Check your grades, schedule and announcements here.",
                    buttonText: "View Schedule",
                    buttonAction: () => window.location.hash = '#/student/schedule'
                };
        }
    };

    const content = getRoleContent();

    return (
        <div className="bg-[#4D44B5] rounded-3xl p-8 mb-8 relative overflow-hidden flex justify-between items-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
            <div className="z-10 relative">
                <p className="opacity-80 mb-1 font-medium text-indigo-200">
                    {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <h2 className="text-3xl font-bold mb-4 font-heading">
                    Welcome back, {user?.full_name?.split(' ')[0] || 'User'}!
                </h2>
                <p className="max-w-md opacity-90 mb-6 text-lg leading-relaxed">
                    {content.message}
                </p>
                <button 
                    onClick={content.buttonAction}
                    className="px-6 py-3 bg-white text-[#4D44B5] rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-900/20"
                >
                    {content.buttonText}
                </button>
            </div>
            
            {/* Abstract Decorative Circles/Shapes simulating illustration */}
            <div className="absolute right-0 bottom-0 h-full w-1/3 pointer-events-none">
                 <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
                 <div className="absolute top-[-20px] left-[-20px] w-32 h-32 rounded-full bg-orange-500/20 blur-2xl"></div>
            </div>
        </div>
    );
};
