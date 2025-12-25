import React, { useEffect, useState } from 'react';
import { User, BookOpen, GraduationCap, FileText, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

interface StatsData {
    total_subjects: number;
    total_grades: number;
    average: number;
    absences: number;
}

export const StatsCards: React.FC = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<StatsData>({
        total_subjects: 0,
        total_grades: 0,
        average: 0,
        absences: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchStats();
        }
    }, [user]);

    const fetchStats = async () => {
        try {
            // Call the RPC defined in grading_schema.sql
            // Defaulting to Term 1 for the dashboard snapshot
            const { data, error } = await supabase
                .rpc('get_student_stats', { 
                    p_student_id: user?.id,
                    p_term: 1 
                });

            if (error) throw error;

            if (data) {
                setStats(data);
            }

        } catch (err) {
            console.error('Error fetching stats:', err);
        } finally {
            setLoading(false);
        }
    };

    const cards = [
        {
            label: 'Total Subjects',
            value: loading ? '-' : (stats.total_subjects?.toString() || '0'),
            icon: BookOpen,
            iconBg: 'bg-blue-500',
        },
        {
            label: 'Total Grades',
            value: loading ? '-' : (stats.total_grades?.toString() || '0'),
            icon: FileText,
            iconBg: 'bg-green-500',
        },
        {
            label: 'Absences',
            value: loading ? '-' : (stats.absences?.toString() || '0'),
            icon: AlertCircle,
            iconBg: 'bg-pink-500',
        },
        {
            label: 'Average',
            value: loading ? '-' : `${stats.average}/20`,
            icon: GraduationCap,
            iconBg: 'bg-orange-500',
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
            {cards.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                    <div 
                        key={idx} 
                        className="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-4 text-center md:text-left"
                    >
                         <div className={`${stat.iconBg} w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white shadow-lg shrink-0`}>
                            <Icon className="w-5 h-5 md:w-6 md:h-6" />
                         </div>
                         <div className="min-w-0">
                             <p className="text-slate-500 text-xs md:text-sm mb-0.5 md:mb-1 truncate">{stat.label}</p>
                             <h3 className="text-lg md:text-2xl font-bold text-slate-800 dark:text-white font-heading truncate">{stat.value}</h3>
                         </div>
                    </div>
                );
            })}
        </div>
    );
};
