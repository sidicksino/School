import React from 'react';
import { User, BookOpen, GraduationCap, Award } from 'lucide-react';

export const StatsCards: React.FC = () => {
    // Mock data based on the student context or the image inspiration
    const stats = [
        {
            label: 'Total Subjects',
            value: '07',
            icon: BookOpen,
            color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
            iconBg: 'bg-purple-500',
        },
        {
            label: 'Total Grades',
            value: '12',
            icon: GraduationCap,
            color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
            iconBg: 'bg-orange-500',
        },
        {
            label: 'Absences',
            value: '02',
            icon: User, // Replacing 'Teachers' from image with 'Absences' relevant to student
            color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600',
            iconBg: 'bg-yellow-500', 
        },
        {
            label: 'Average',
            value: '14.5',
            icon: Award,
            color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
            iconBg: 'bg-blue-500',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                    <div 
                        key={idx} 
                        className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
                    >
                         <div className={`${stat.iconBg} w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg`}>
                            <Icon className="w-6 h-6" />
                         </div>
                         <div>
                             <p className="text-slate-500 text-sm mb-1">{stat.label}</p>
                             <h3 className="text-2xl font-bold text-slate-800 dark:text-white font-heading">{stat.value}</h3>
                         </div>
                    </div>
                );
            })}
        </div>
    );
};
