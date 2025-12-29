import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Clock } from 'lucide-react';

import { ScheduleEditor } from '../admin/ScheduleEditor';
import { UserRole } from '../../utils/rbac';

interface ScheduleSlot {
    id: string;
    day_of_week: string;
    start_time: string;
    end_time: string;
    subject_name: string;
    subject_code: string;
    room: string;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIMES = [
    { start: '07:00', end: '08:00' },
    { start: '08:00', end: '09:00' },
    { start: '09:00', end: '10:00' },
    { start: '10:00', end: '10:45', isBreak: true, label: 'RECREATION' },
    { start: '10:45', end: '11:45' },
    { start: '11:45', end: '12:45' },
    { start: '12:45', end: '13:45' },
];

export const Schedule: React.FC = () => {
    const { user } = useAuth();
    const isAdmin = user?.role === UserRole.ADMIN;
    const [schedule, setSchedule] = useState<ScheduleSlot[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && !isAdmin) {
            fetchSchedule();
        }
    }, [user, isAdmin]);

    const fetchSchedule = async () => {
        try {
            // Use the new get_class_schedule RPC
            // For students, we use their assigned class
            const { data, error } = await supabase
                .rpc('get_class_schedule', { p_classe: user?.classe });
            
            if (error) throw error;
            
            // Map RPC result to local interface
            const formatted: ScheduleSlot[] = (data || []).map((item: any) => ({
                id: item.id,
                day_of_week: item.day_of_week,
                start_time: item.start_time.slice(0, 5),
                end_time: item.end_time.slice(0, 5),
                subject_name: item.subject_name,
                subject_code: item.subject_code,
                room: item.room
            }));

            setSchedule(formatted);
        } catch (error) {
            console.error('Error fetching schedule:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm overflow-x-auto">
                {isAdmin ? (
                    <div>
                         <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2 mb-8">
                            <Clock className="w-6 h-6 text-[#4D44B5]" />
                            Master Schedule Editor
                        </h2>
                        <ScheduleEditor />
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                                <Calendar className="w-6 h-6 text-[#4D44B5]" />
                                Weekly Schedule
                            </h2>
                            <div className="text-sm text-slate-500">
                                Class: <span className="font-bold text-[#4D44B5]">{user?.classe || 'Not Assigned'}</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50 dark:bg-slate-900/50">
                                        <tr>
                                            <th className="px-4 py-4 text-left font-bold text-slate-500 uppercase tracking-wider w-32 border-r border-slate-200 dark:border-slate-700">Time / Day</th>
                                            {DAYS.map(day => (
                                                <th key={day} className="px-4 py-4 text-center font-bold text-slate-500 uppercase tracking-wider min-w-[140px]">
                                                    {day}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                        {TIMES.map((time, idx) => (
                                            <tr key={idx} className={time.isBreak ? "bg-slate-100 dark:bg-slate-900" : ""}>
                                                <td className="px-4 py-4 font-mono font-bold text-slate-600 dark:text-slate-300 border-r border-slate-200 dark:border-slate-700">
                                                    {time.start} - {time.end}
                                                </td>
                                                {time.isBreak ? (
                                                    <td colSpan={DAYS.length} className="px-4 py-4 text-center font-bold text-slate-400 tracking-[0.2em]">
                                                        {time.label}
                                                    </td>
                                                ) : (
                                                    DAYS.map(day => {
                                                        const slot = schedule.find(s => s.day_of_week === day && s.start_time === time.start);
                                                        return (
                                                            <td key={day} className="p-2 border-r border-slate-100 dark:border-slate-800 last:border-none relative">
                                                                {loading ? (
                                                                    <div className="h-10 bg-slate-50 dark:bg-slate-700/50 rounded animate-pulse"></div>
                                                                ) : (
                                                                    slot ? (
                                                                        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-lg text-center group relative cursor-default">
                                                                            <div className="flex flex-col items-center">
                                                                                {/* SHOW CODE: e.g. 'M' or 'PC' */}
                                                                                <span className="font-bold text-indigo-700 dark:text-indigo-300 text-base">
                                                                                    {slot.subject_code}
                                                                                </span>
                                                                                {/* Full name on hover? or small? User asked for Code display format. */}
                                                                            </div>
                                                                            {/* Tooltip for full name */}
                                                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                                                                {slot.subject_name}
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="min-h-[40px]"></div>
                                                                    )
                                                                )}
                                                            </td>
                                                        );
                                                    })
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
};
