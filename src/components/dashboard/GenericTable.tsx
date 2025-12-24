import React from 'react';
import { MoreVertical, Mail } from 'lucide-react';

interface TableData {
    headers: string[];
    rows: (string | React.ReactNode)[][];
}

interface GenericTableProps {
    title?: string;
    data?: TableData;
}

export const GenericTable: React.FC<GenericTableProps> = ({ title = "List", data }) => {
    // Default mock data if none provided
    const defaultData = {
        headers: ['Name', 'Subject', 'Status', 'Actions'],
        rows: [
            ['Dr. Sarah Smith', 'Mathematics', 'Available', ''],
            ['Prof. John Doe', 'Physics', 'In Class', ''],
            ['Mme. Marie Curie', 'Chemistry', 'Busy', ''],
            ['Mr. Alan Turing', 'Computer Sci', 'Available', ''],
        ]
    };

    const tableData = data || defaultData;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-slate-800 dark:text-white font-heading">
                    {title}
                </h3>
                <button className="text-[#4D44B5] font-bold text-sm hover:underline">
                    View All
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-slate-400 text-sm border-b border-slate-100 dark:border-slate-700">
                            {tableData.headers.map((header, idx) => (
                                <th key={idx} className={`pb-4 font-normal ${idx === tableData.headers.length - 1 ? 'text-right' : ''}`}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-slate-600 dark:text-slate-300">
                        {tableData.rows.map((row, rowIdx) => (
                            <tr key={rowIdx} className="group hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                {row.map((cell, cellIdx) => (
                                    <td key={cellIdx} className={`py-4 ${cellIdx === row.length - 1 ? 'text-right' : ''}`}>
                                        {/* Simple rendering for now - could be enhanced with custom cell renderers later */}
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
