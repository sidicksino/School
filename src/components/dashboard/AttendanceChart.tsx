import React from 'react';
import { MoreHorizontal } from 'lucide-react';

export const AttendanceChart: React.FC = () => {
    // Mock data for attendance
    const data = [
        { day: 'Mon', present: true, height: '80%' },
        { day: 'Tue', present: true, height: '90%' },
        { day: 'Wed', present: false, height: '40%' },
        { day: 'Thu', present: true, height: '85%' },
        { day: 'Fri', present: true, height: '95%' },
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm h-full">
            <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-xl text-slate-800 dark:text-white font-heading">
                    Attendance
                </h3>
                <button className="text-slate-400 hover:text-slate-600">
                    <MoreHorizontal className="w-6 h-6" />
                </button>
            </div>

            <div className="flex items-end justify-between h-48 px-2 gap-4">
                {data.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-3 w-full">
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-40 relative group">
                            {/* Bar */}
                            <div 
                                style={{ height: item.height }}
                                className={`absolute bottom-0 left-0 right-0 rounded-full transition-all duration-500 w-3 mx-auto ${
                                    item.present 
                                    ? 'bg-[#4D44B5]' 
                                    : 'bg-orange-500'
                                }`}
                            >
                                {/* Tooltip */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {item.present ? 'Present' : 'Absent'}
                                </div>
                            </div>
                        </div>
                        <span className="text-xs font-bold text-slate-400">{item.day}</span>
                    </div>
                ))}
            </div>
            
            <div className="flex justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#4D44B5]"></span>
                    <span className="text-xs text-slate-500">Present</span>
                </div>
                 <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                    <span className="text-xs text-slate-500">Absent</span>
                </div>
            </div>
        </div>
    );
};
