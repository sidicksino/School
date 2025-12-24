import React from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { Bulletin } from './Bulletin';

export const GradesPage: React.FC = () => {
    return (
        <DashboardLayout>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 font-heading">
                    My Grades
                </h2>
                <p className="text-slate-500 dark:text-slate-400">
                    Detailed breakdown of your academic performance.
                </p>
            </div>
            <Bulletin />
        </DashboardLayout>
    );
};
