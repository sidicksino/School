import React, { useEffect, useState } from 'react';
import { User, BookOpen, GraduationCap, Award } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface StatsState {
  subjectsCount: number;
  gradesCount: number;
  average: number | string;
}

export const StatsCards: React.FC = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<StatsState>({
        subjectsCount: 0,
        gradesCount: 0,
        average: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchStats();
        }
    }, [user]);

    const fetchStats = async () => {
        try {
            // 1. Fetch Average
            const { data: avgData, error: avgError } = await supabase
                .rpc('get_student_average', { p_student_id: user?.id });
            
            if (avgError) console.error('Error fetching average:', avgError);

            // 2. Fetch Grades to count total grades and unique subjects
            const { data: gradesData, error: gradesError } = await supabase
                .rpc('get_student_grades', { p_student_id: user?.id });

            if (gradesError) console.error('Error fetching grades:', gradesError);

            // Calculate metrics
            const gradesList = gradesData || [];
            const uniqueSubjects = new Set(gradesList.map((g: any) => g.subject_code)).size;

            setStats({
                average: avgData !== null ? avgData : 0,
                gradesCount: gradesList.length,
                subjectsCount: uniqueSubjects
            });

        } catch (err) {
            console.error('Error fetching stats:', err);
        } finally {
            setLoading(false);
        }
    };

    const cards = [
        {
            label: 'Total Subjects',
            value: loading ? '-' : stats.subjectsCount.toString().padStart(2, '0'),
            icon: BookOpen,
            color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
            iconBg: 'bg-purple-500',
        },
        {
            label: 'Total Grades',
            value: loading ? '-' : stats.gradesCount.toString().padStart(2, '0'),
            icon: GraduationCap,
            color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600',
            iconBg: 'bg-orange-500',
        },
        {
            label: 'Absences',
            value: '02', // Still static as we don't have this table yet
            icon: User, 
            color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600',
            iconBg: 'bg-yellow-500', 
        },
        {
            label: 'Average',
            value: loading ? '-' : `${stats.average}/20`,
            icon: Award,
            color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
            iconBg: 'bg-blue-500',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((stat, idx) => {
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
