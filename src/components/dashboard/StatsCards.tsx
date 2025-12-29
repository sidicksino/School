import React, { useEffect, useState } from 'react';
import { User, BookOpen, GraduationCap, FileText, AlertCircle, Users, Clock, School } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../utils/rbac';

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
    const [adminStats, setAdminStats] = useState({
        total_users: 0,
        total_students: 0,
        total_teachers: 0,
        active_classes: 0
    });
    const [teacherStats, setTeacherStats] = useState({
        classes_taught: 0,
        total_students: 0,
        hours_week: 0,
        pending_grades: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.role === UserRole.STUDENT) {
            fetchStudentStats();
        } else if (user?.role === UserRole.ADMIN) {
            fetchAdminStats();
        } else if (user?.role === UserRole.TEACHER) {
            fetchTeacherStats();
        } else {
            setLoading(false);
        }
    }, [user]);

    const fetchStudentStats = async () => {
        try {
            const { data, error } = await supabase
                .rpc('get_student_stats', { 
                    p_student_id: user?.id,
                    p_term: 1 
                });

            if (error) throw error;
            if (data) setStats(data);
        } catch (err) {
            console.error('Error fetching student stats:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAdminStats = async () => {
        try {
            const { data, error } = await supabase.rpc('get_admin_stats');
            if (error) {
                console.warn('Stats fetch warning:', error);
                return; 
            }
            // Ensure data has all required keys if partial
            if (data) {
                setAdminStats({
                    total_users: data.total_users || 0,
                    total_students: data.total_students || 0,
                    total_teachers: data.total_teachers || 0,
                    active_classes: data.active_classes || 0
                });
            }
        } catch (err) {
            console.error('Error fetching admin stats:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchTeacherStats = async () => {
        try {
            const { data, error } = await supabase.rpc('get_teacher_stats', { p_teacher_id: user?.id });
            if (error) throw error;
            if (data) setTeacherStats(data);
        } catch (err) {
            console.error('Error fetching teacher stats:', err);
        } finally {
            setLoading(false);
        }
    };

    const getCards = () => {
        if (user?.role === UserRole.TEACHER) {
            return [
                { label: 'Classes Taught', value: teacherStats.classes_taught.toString(), icon: School, iconBg: 'bg-indigo-500' },
                { label: 'Total Students', value: teacherStats.total_students.toString(), icon: Users, iconBg: 'bg-emerald-500' },
                { label: 'Hours / Week', value: teacherStats.hours_week.toString(), icon: Clock, iconBg: 'bg-amber-500' },
                { label: 'Pending Grades', value: teacherStats.pending_grades.toString(), icon: FileText, iconBg: 'bg-rose-500' },
            ];
        }

        if (user?.role === UserRole.ADMIN) {
            return [
                { label: 'Total Users', value: loading ? '-' : adminStats.total_users.toString(), icon: Users, iconBg: 'bg-blue-600' },
                { label: 'Total Teachers', value: loading ? '-' : adminStats.total_teachers.toString(), icon: GraduationCap, iconBg: 'bg-purple-600' },
                { label: 'Total Students', value: loading ? '-' : adminStats.total_students.toString(), icon: BookOpen, iconBg: 'bg-green-600' },
                { label: 'Active Classes', value: loading ? '-' : adminStats.active_classes.toString(), icon: AlertCircle, iconBg: 'bg-teal-500' },
            ];
        }

        // Default: Student
        return [
            {
                label: 'Total Subjects',
                value: loading ? '-' : stats.total_subjects.toString(),
                icon: BookOpen,
                iconBg: 'bg-blue-500',
            },
            {
                label: 'Total Grades',
                value: loading ? '-' : stats.total_grades.toString(),
                icon: FileText,
                iconBg: 'bg-green-500',
            },
            {
                label: 'Absences',
                value: loading ? '-' : stats.absences.toString(),
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
    };

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
            {getCards().map((stat, idx) => {
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
