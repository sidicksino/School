import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DashboardLayout } from '../layout/DashboardLayout';
import { WelcomeBanner } from './WelcomeBanner';
import { StatsCards } from './StatsCards';
import { AttendanceChart } from './AttendanceChart';
import { Bulletin } from '../student/Bulletin';
import { GenericTable } from './GenericTable';

export const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const isStudent = user?.role === 'student';
    const isTeacher = user?.role === 'teacher';
    const isAdmin = user?.role === 'admin';

    // Mock Data for Tables (Teachers / Admin Logs)
    const teachersData = {
        headers: ['Name', 'Subject', 'Email', 'Status'],
        rows: [
            ['Mr. Ousmane', 'Mathematics', 'ousmane@academy.td', 'Active'],
            ['Mme. Fatime', 'Physics', 'fatime@academy.td', 'In Class'],
            ['Mr. John', 'English', 'john@academy.td', 'Active'],
        ]
    };

    return (
        <DashboardLayout>
             <WelcomeBanner />
             {/* Stats Row */}
             <StatsCards />

             {/* Main Content Grid */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column (Main) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Student: Attendance + Bulletin */}
                    {isStudent && (
                        <>
                            <AttendanceChart />
                            <Bulletin />
                        </>
                    )}

                    {/* Teacher: Actions + Table */}
                    {isTeacher && (
                        <div className="bg-white p-6 rounded-3xl shadow-sm">
                            <h3 className="font-bold text-lg mb-4">Teacher Actions</h3>
                            <p className="text-slate-500">Select a class to enter grades.</p>
                            {/* TODO: Add Class Selector */}
                        </div>
                    )}

                    {/* Admin: Logs */}
                    {(isTeacher || isAdmin) && (
                         <GenericTable 
                            title={isTeacher ? "My Scheduled Classes" : "System Logs"} 
                            data={teachersData} 
                        />
                    )}
                </div>

                {/* Right Column (Side Widgets) */}
                <div className="space-y-8">
                    {/* Calendar / Notices could go here */}
                    <div className="bg-[#4D44B5] text-white p-6 rounded-3xl">
                        <h3 className="font-bold text-lg mb-2">Notice Board</h3>
                        <div className="space-y-4">
                            <div className="bg-white/10 p-3 rounded-xl">
                                <p className="text-xs opacity-70 mb-1">Dec 25, 2024</p>
                                <p className="text-sm font-medium">Christmas Holiday starts tomorrow!</p>
                            </div>
                            <div className="bg-white/10 p-3 rounded-xl">
                                <p className="text-xs opacity-70 mb-1">Jan 05, 2025</p>
                                <p className="text-sm font-medium">Term 1 Exams Results Released.</p>
                            </div>
                        </div>
                    </div>
                </div>

             </div>
        </DashboardLayout>
    );
};
