import React from 'react';
import { MoreVertical, Mail } from 'lucide-react';

export const GenericTable: React.FC = () => {
    // Mock data for student's teachers/contacts
    const teachers = [
        { name: 'Dr. Sarah Smith', subject: 'Mathematics', email: 'sarah@academy.com', status: 'Available' },
        { name: 'Prof. John Doe', subject: 'Physics', email: 'john@academy.com', status: 'In Class' },
        { name: 'Mme. Marie Curie', subject: 'Chemistry', email: 'marie@academy.com', status: 'Busy' },
        { name: 'Mr. Alan Turing', subject: 'Computer Sci', email: 'alan@academy.com', status: 'Available' },
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-slate-800 dark:text-white font-heading">
                    My Teachers
                </h3>
                <button className="text-[#4D44B5] font-bold text-sm hover:underline">
                    View All
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-slate-400 text-sm border-b border-slate-100 dark:border-slate-700">
                            <th className="pb-4 font-normal">Name</th>
                            <th className="pb-4 font-normal">Subject</th>
                            <th className="pb-4 font-normal">Status</th>
                            <th className="pb-4 font-normal text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-600 dark:text-slate-300">
                        {teachers.map((teacher, idx) => (
                            <tr key={idx} className="group hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                <td className="py-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                                         {/* Simulated Avatar */}
                                         <div className={`w-full h-full bg-gradient-to-br ${
                                             idx % 2 === 0 ? 'from-purple-400 to-blue-500' : 'from-orange-400 to-pink-500'
                                         }`}></div>
                                    </div>
                                    <span className="font-bold text-slate-800 dark:text-white">{teacher.name}</span>
                                </td>
                                <td className="py-4">{teacher.subject}</td>
                                <td className="py-4">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                                        teacher.status === 'Available' ? 'bg-green-100 text-green-600' :
                                        teacher.status === 'Busy' ? 'bg-red-100 text-red-600' :
                                        'bg-orange-100 text-orange-600'
                                    }`}>
                                        {teacher.status}
                                    </span>
                                </td>
                                <td className="py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-400 hover:text-[#4D44B5] transition-colors">
                                            <Mail className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-400 hover:text-[#4D44B5] transition-colors">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
