import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Plus, Trash2, CheckCircle, Loader } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const TIMES = [
    { start: '07:00', end: '08:00' },
    { start: '08:00', end: '09:00' },
    { start: '09:00', end: '10:00' },
    { start: '10:00', end: '10:45', isBreak: true, label: 'RECREATION' },
    { start: '10:45', end: '11:45' },
    { start: '11:45', end: '12:45' },
    { start: '12:45', end: '13:45' }, // Sometimes lunch, but let's keep it generic
];

interface ScheduleSlot {
    id?: string;
    day_of_week: string;
    start_time: string;
    end_time: string;
    subject: string;
    code: string;
    room: string;
}

interface Subject {
    id: string;
    name: string;
    code: string;
}

export const ScheduleEditor: React.FC = () => {
    const [selectedClass, setSelectedClass] = useState('Terminale S');
    const [schedule, setSchedule] = useState<ScheduleSlot[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]); // Need to fetch subjects
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // Fetch classes dynamically
    const [classes, setClasses] = useState<string[]>([]);

    useEffect(() => {
        const fetchClasses = async () => {
             const { data } = await supabase.rpc('get_all_classes');
             if (data) setClasses(data.map((c: any) => c.name));
        };
        fetchClasses();
    }, []);

    useEffect(() => {
        fetchSchedule();
        fetchSubjects();
    }, [selectedClass]);

    const fetchSubjects = async () => {
        const { data } = await supabase.rpc('get_all_subjects');
        if (data) setSubjects(data);
    };

    const fetchSchedule = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.rpc('get_class_schedule', { p_classe: selectedClass });

            if (error) throw error;
            
            const formatted: ScheduleSlot[] = (data || []).map((item: any) => ({
                id: item.id,
                day_of_week: item.day_of_week,
                start_time: item.start_time.slice(0, 5), // Remove seconds
                end_time: item.end_time.slice(0, 5),
                subject: item.subject_name,
                code: item.subject_code,
                room: item.room
            }));

            setSchedule(formatted);
        } catch (err) {
            console.error('Error fetching schedule:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCellChange = async (day: string, timeSlot: typeof TIMES[0], subjectCode: string) => {
        if (!subjectCode) return; // Don't save empty selections immediately or handle delete?

        setSaving(true);
        try {
             // Find existing slot to get room or default it
             const existing = schedule.find(s => 
                s.day_of_week === day && s.start_time === timeSlot.start
             );

             const { error } = await supabase.rpc('manage_schedule_slot', {
                 p_classe: selectedClass,
                 p_day: day,
                 p_start_time: timeSlot.start,
                 p_end_time: timeSlot.end,
                 p_subject_code: subjectCode,
                 p_room: existing?.room || 'Salle 1' // Default room
             });

             if (error) throw error;
             
             // Refresh data
             await fetchSchedule();

        } catch (err) {
            console.error('Save error:', err);
            alert('Failed to save slot');
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteSlot = async (day: string, startTime: string) => {
        if(!window.confirm("Clear this slot?")) return;
        setSaving(true);
        try {
             const { error } = await supabase.rpc('delete_schedule_slot', {
                 p_classe: selectedClass,
                 p_day: day,
                 p_start_time: startTime
             });
             if (error) throw error;
             await fetchSchedule();
        } catch (err) {
            console.error('Delete error', err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <label className="font-bold text-slate-700 dark:text-slate-200">Select Class:</label>
                    <select 
                        value={selectedClass} 
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-slate-800 border-none rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-500 font-bold text-indigo-600"
                    >
                        {classes.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                {saving && (
                    <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold bg-indigo-50 px-3 py-1.5 rounded-lg animate-pulse">
                        <Loader className="w-4 h-4 animate-spin" />
                        Saving...
                    </div>
                )}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
                                                <td key={day} className="p-2 border-r border-slate-100 dark:border-slate-800 last:border-none relative group">
                                                    {loading ? (
                                                        <div className="h-10 bg-slate-50 dark:bg-slate-700/50 rounded animate-pulse"></div>
                                                    ) : (
                                                        <div className="relative">
                                                            <select
                                                                className={`w-full px-3 py-2 rounded-lg text-xs font-bold appearance-none cursor-pointer transition-colors ${
                                                                    slot 
                                                                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' 
                                                                    : 'bg-transparent text-gray-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                                                                }`}
                                                                value={slot?.code || ''}
                                                                onChange={(e) => handleCellChange(day, time, e.target.value)}
                                                            >
                                                                    <option value="">Empty</option>
                                                                {subjects.map(subj => (
                                                                    <option key={subj.id} value={subj.code}>{subj.code} - {subj.name}</option>
                                                                ))}
                                                            </select>
                                                            {slot && (
                                                                <button 
                                                                    onClick={() => handleDeleteSlot(day, time.start)}
                                                                    className="absolute -top-2 -right-2 p-1 bg-white shadow-md rounded-full text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-50"
                                                                    title="Clear Slot"
                                                                >
                                                                    <Trash2 className="w-3 h-3" />
                                                                </button>
                                                            )}
                                                        </div>
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
        </div>
    );
};
