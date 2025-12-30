import React from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { ScheduleEditor } from './ScheduleEditor';

export const AdminSchedulePage: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Schedule Management</h1>
                        <p className="text-slate-500 text-sm">Manage weekly class schedules</p>
                    </div>
                </div>

                <ScheduleEditor />
            </div>
        </DashboardLayout>
    );
};
