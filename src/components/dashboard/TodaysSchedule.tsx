import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Clock, MapPin, Calendar } from 'lucide-react';

interface ScheduleItem {
    id: string;
    subject: string;
    code: string;
    start_time: string;
    end_time: string;
    room: string;
}

export const TodaysSchedule: React.FC = () => {
    const { user } = useAuth();
    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [todayName, setTodayName] = useState('');

    useEffect(() => {
        if (user) {
            fetchSchedule();
            setTodayName(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
        }
    }, [user]);

    const fetchSchedule = async () => {
        try {
            const { data, error } = await supabase
                .rpc('get_student_today_schedule', { p_student_id: user?.id });

            if (error) throw error;
            setSchedule(data || []);
        } catch (err) {
            console.error('Error fetching today\'s schedule:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm animate-pulse">
                <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                <div className="space-y-3">
                    {[1, 2].map(i => (
                        <div key={i} className="h-20 bg-slate-100 dark:bg-slate-700/50 rounded-xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white flex items-center justify-between">
                <span>Today's Classes</span>
                <span className="text-xs font-normal text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-lg">
                    {todayName}
                </span>
            </h3>

            {schedule.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                    <Calendar className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p>No classes scheduled for today.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {schedule.map((cls) => (
                        <div key={cls.id} className="flex gap-3 items-start p-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 rounded-xl transition-colors">
                            <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 border border-indigo-200 dark:border-indigo-800">
                                <span className="text-xs font-bold">{cls.start_time}</span>
                                <Clock className="w-3 h-3 my-0.5 opacity-50" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="font-bold text-slate-700 dark:text-slate-200 text-sm truncate">{cls.subject}</p>
                                <div className="flex items-center gap-3 mt-1">
                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {cls.start_time} - {cls.end_time}
                                    </p>
                                    <p className="text-xs text-slate-500 flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        {cls.room || 'TBA'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
