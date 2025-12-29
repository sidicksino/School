import React, { useState, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { UserRole } from '../../utils/rbac';

export const WeeklyAttendance: React.FC = () => {
    const { user } = useAuth();
    const canEdit = user?.role === UserRole.TEACHER || user?.role === UserRole.ADMIN;

    const [attendanceData, setAttendanceData] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);

    // Get current week's dates (Mon - Sat)
    const getCurrentWeekDates = () => {
        const today = new Date();
        const day = today.getDay(); // 0 (Sun) - 6 (Sat)
        const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        
        const monday = new Date(today.setDate(diff));
        const dates: { dayName: string; dateStr: string }[] = [];
        
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        for (let i = 0; i < 6; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            dates.push({
                dayName: dayNames[i],
                dateStr: d.toISOString().split('T')[0] // YYYY-MM-DD
            });
        }
        return dates;
    };

    const weekDates = getCurrentWeekDates();

    useEffect(() => {
        if (user) {
            fetchAttendance();
        }
    }, [user]);

    const fetchAttendance = async () => {
        try {
            const startDate = weekDates[0].dateStr;
            const endDate = weekDates[5].dateStr;

            // Use RPC
            const { data, error } = await supabase
                .rpc('get_student_attendance_range', {
                    p_student_id: user?.id,
                    p_start_date: startDate,
                    p_end_date: endDate
                });

            if (error) throw error;
            
            const mapping: Record<string, string> = {};
            data?.forEach((row: any) => {
                mapping[row.date] = row.status;
            });
            setAttendanceData(mapping);
        } catch (err) {
            console.error('Error fetching attendance:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCheck = async (dateStr: string, status: string) => {
        if (!canEdit) return;
        
        const previousStatus = attendanceData[dateStr];
        if (previousStatus === status) return; 

        setAttendanceData(prev => ({
            ...prev,
            [dateStr]: status
        }));

        try {
            // Use Bulk Save RPC for consistency (even for 1 item)
            // or we can direct insert if RLS is off, but RPC is safer if we want validation later.
            // Let's use RPC.
            const records = [{
                student_id: user?.id,
                date: dateStr,
                status: status
            }];
            
            const { data, error } = await supabase
                .rpc('save_attendance_bulk', { p_records: records });

            if (error) throw error;
            if (data && data.error) throw new Error(data.error);

        } catch (err) {
            console.error('Error updating attendance:', err);
            setAttendanceData(prev => ({
                ...prev,
                [dateStr]: previousStatus || ''
            }));
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white font-heading">
                    Weekly Attendance (Current Week)
                </h3>
                 <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                            <th className="pb-3 pl-2">Day</th>
                            <th className="pb-3 text-center">Present</th>
                            <th className="pb-3 text-center">Absent</th>
                            <th className="pb-3 text-center">Sick</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        {weekDates.map(({ dayName, dateStr }) => (
                             <tr key={dateStr} className="border-b border-slate-50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                <td className="py-3 pl-2">
                                    {dayName}
                                    <span className="block text-[10px] text-slate-400 font-normal">{dateStr}</span>
                                </td>
                                <td className="py-3 text-center">
                                    <input 
                                        type="checkbox" 
                                        checked={attendanceData[dateStr] === 'Present'} 
                                        onChange={() => handleCheck(dateStr, 'Present')}
                                        disabled={!canEdit}
                                        className={`w-4 h-4 rounded border-slate-300 focus:ring-[#4D44B5] ${canEdit ? 'cursor-pointer text-[#4D44B5]' : 'cursor-not-allowed text-slate-400 bg-slate-100'}`}
                                    />
                                </td>
                                <td className="py-3 text-center">
                                    <input 
                                        type="checkbox" 
                                        checked={attendanceData[dateStr] === 'Absent'} 
                                        onChange={() => handleCheck(dateStr, 'Absent')}
                                        disabled={!canEdit}
                                        className={`w-4 h-4 rounded border-slate-300 focus:ring-orange-500 ${canEdit ? 'cursor-pointer text-orange-500' : 'cursor-not-allowed text-slate-400 bg-slate-100'}`}
                                    />
                                </td>
                                <td className="py-3 text-center">
                                    <input 
                                        type="checkbox" 
                                        checked={attendanceData[dateStr] === 'Sick'} 
                                        onChange={() => handleCheck(dateStr, 'Sick')}
                                        disabled={!canEdit}
                                        className={`w-4 h-4 rounded border-slate-300 focus:ring-red-500 ${canEdit ? 'cursor-pointer text-red-500' : 'cursor-not-allowed text-slate-400 bg-slate-100'}`}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-4 flex justify-end">
                 <button className="text-xs font-bold text-[#4D44B5] hover:underline">
                    View History
                </button>
            </div>
        </div>
    );
};
