import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface ScheduleItem {
    id: string;
    subject: string;
    code: string;
    day: string;
    start_time: string;
    end_time: string;
    room: string;
}

export const Schedule: React.FC = () => {
    const { user } = useAuth();
    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchSchedule();
        }
    }, [user]);

    const fetchSchedule = async () => {
        try {
            const { data, error } = await supabase
                .rpc('get_student_schedule', { p_student_id: user?.id });
            
            if (error) throw error;
            setSchedule(data || []);
        } catch (error) {
            console.error('Error fetching schedule:', error);
        } finally {
            setLoading(false);
        }
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

    // Helper to position items
    const getPosition = (day: string, startTime: string, endTime: string) => {
        const dayIndex = days.indexOf(day);
        if (dayIndex === -1) return null;

        const startHour = parseInt(startTime.split(':')[0]);
        // const startMin = parseInt(startTime.split(':')[1]);
        const endHour = parseInt(endTime.split(':')[0]);
        const duration = endHour - startHour; // Simplified for hourly blocks

        // Grid starts at col 2 (col 1 is time labels)
        // Grid starts at row 2 (row 1 is day labels)
        // Assuming grid rows are 1 hour each, starting at 8am (row 1 is header)
        // 8am = row 2
        
        const rowStart = (startHour - 8) + 2; 
        const colStart = dayIndex + 2;

        return {
            gridColumn: `${colStart} / span 1`,
            gridRow: `${rowStart} / span ${duration}`
        };
    };

    return (
        <DashboardLayout>
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm overflow-x-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                        <Calendar className="w-6 h-6 text-[#4D44B5]" />
                        Weekly Schedule
                    </h2>
                    <div className="text-sm text-slate-500">
                        Class: <span className="font-bold text-[#4D44B5]">{user?.classe}</span>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-slate-400">Loading schedule...</div>
                ) : (
                    <div className="min-w-[800px] grid grid-cols-[100px_repeat(6,1fr)] gap-4">
                        {/* Header Row */}
                        <div className="font-bold text-slate-400 text-sm py-4">Time</div>
                        {days.map(day => (
                            <div key={day} className="font-bold text-slate-800 dark:text-white text-center py-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                {day}
                            </div>
                        ))}

                        {/* Time Slots & Content */}
                        {/* We use a CSS grid approach where rows are times */}
                         <div className="contents">
                            {/* Time Labels */}
                             <div className="row-span-full grid grid-rows-[repeat(10,100px)] pt-5">
                                 {timeSlots.map(t => (
                                     <div key={t} className="text-slate-400 text-xs font-mono relative">
                                        <span className="absolute -top-3">{t}</span>
                                        <div className="w-full h-px bg-slate-100 dark:bg-slate-700 absolute top-0 left-12 right-[-900px]"></div>
                                     </div>
                                 ))}
                             </div>
                             
                             {/* Schedule Items Grid Overlay */}
                             <div className="col-start-2 col-span-6 grid grid-cols-6 grid-rows-[repeat(10,100px)] gap-2 relative z-10">
                                {schedule.map((item) => {
                                    const style = getPosition(item.day, item.start_time, item.end_time);
                                    if (!style) return null;

                                    return (
                                        <div 
                                            key={item.id}
                                            style={style}
                                            className="bg-[#4D44B5]/10 border-l-4 border-[#4D44B5] rounded-lg p-3 hover:shadow-md transition-shadow flex flex-col justify-center gap-1 group"
                                        >
                                            <div className="font-bold text-[#4D44B5] text-sm break-words leading-tight">
                                                {item.subject}
                                            </div>
                                            
                                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                                <Clock className="w-3 h-3" />
                                                <span>{item.start_time.slice(0,5)} - {item.end_time.slice(0,5)}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                                 <MapPin className="w-3 h-3" />
                                                 <span>{item.room}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                             </div>
                         </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};
