import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DashboardLayout } from '../layout/DashboardLayout';
import { WelcomeBanner } from '../dashboard/WelcomeBanner';
import { StatsCards } from '../dashboard/StatsCards';
import { AttendanceChart } from '../dashboard/AttendanceChart';
import { GenericTable } from '../dashboard/GenericTable';

export const DashboardPage: React.FC = () => {
    const { user } = useAuth();

    return (
        <DashboardLayout>
            <WelcomeBanner />
            <StatsCards />
            
            {/* Student View */}
            {user?.role === 'student' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                     <div className="lg:col-span-1">
                        <AttendanceChart />
                    </div>
                    <div className="lg:col-span-2">
                        <GenericTable />
                    </div>
                </div>
            )}

            {/* Teacher View */}
            {user?.role === 'teacher' && (
                <div className="grid grid-cols-1 gap-8 mb-8">
                     <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-4 dark:text-white">Active Classes</h2>
                         {/* Placeholder for Teacher's Class List */}
                         <div className="p-4 bg-purple-50 text-purple-700 rounded-xl">
                            You have 3 active classes today.
                        </div>
                     </div>
                     <GenericTable /> {/* Reusing simple table for now, maybe rename GenericTable to ContactList later */}
                </div>
            )}

            {/* Admin View */}
            {user?.role === 'admin' && (
                <div className="grid grid-cols-1 gap-8 mb-8">
                     <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm">
                        <h2 className="text-xl font-bold mb-4 dark:text-white">System Logs</h2>
                         <div className="p-4 bg-blue-50 text-blue-700 rounded-xl">
                            System is running smoothly. No recent errors.
                        </div>
                     </div>
                </div>
            )}
        </DashboardLayout>
    );
};
