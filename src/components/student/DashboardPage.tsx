import React from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { WelcomeBanner } from '../dashboard/WelcomeBanner';
import { StatsCards } from '../dashboard/StatsCards';
import { AttendanceChart } from '../dashboard/AttendanceChart';
import { GenericTable } from '../dashboard/GenericTable';

export const DashboardPage: React.FC = () => {
    return (
        <DashboardLayout>
            <WelcomeBanner />
            <StatsCards />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Chart takes up 1 column (or more depending on pref, image shows side by side) */}
                 <div className="lg:col-span-1">
                    <AttendanceChart />
                </div>

                {/* Table takes up remaining space */}
                <div className="lg:col-span-2">
                    <GenericTable />
                </div>
            </div>
        </DashboardLayout>
    );
};
