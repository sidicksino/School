import React from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { TeacherAttendance } from './TeacherAttendance';

export const TeacherAttendancePage: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white font-heading">
                    Attendance Management
                </h1>
                <p className="text-slate-500">Manage daily attendance for your classes.</p>
            </div>
            <TeacherAttendance />
        </DashboardLayout>
    );
};
