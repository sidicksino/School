import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Download, FileText } from 'lucide-react';

interface BulletinRow {
  subject_name: string;
  subject_code: string;
  category: string;
  coefficient: number;
  moy_devoir: number;
  moy_composition: number;
  moy_general: number;
  total_points: number;
  appreciation: string;
}

export const Bulletin: React.FC = () => {
    const { user } = useAuth();
    const [rows, setRows] = useState<BulletinRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [term, setTerm] = useState(1); // Default to Term 1

    useEffect(() => {
        if (user) {
            fetchBulletin();
        }
    }, [user, term]);

    const fetchBulletin = async () => {
        try {
            const { data, error } = await supabase
                .rpc('get_student_bulletin', { 
                    p_student_id: user?.id,
                    p_term: term
                });

            if (error) throw error;
            if (data) setRows(data);
        } catch (err) {
            console.error('Error fetching bulletin:', err);
        } finally {
            setLoading(false);
        }
    };

    // Calculate Totals
    const totalCoef = rows.reduce((sum, row) => sum + row.coefficient, 0);
    const totalPoints = rows.reduce((sum, row) => sum + row.total_points, 0);
    const termAverage = totalCoef > 0 ? (totalPoints / totalCoef).toFixed(2) : '0.00';

    if (loading) return <div className="p-8 text-center text-slate-500">Loading Bulletin...</div>;

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white font-heading">
                        Bulletin de Notes
                    </h3>
                    <p className="text-sm text-slate-500">Trimestre {term} • {user?.classe || 'Terminale S'}</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#F3F4FF] text-[#4D44B5] rounded-xl font-bold text-sm hover:bg-[#E0E2FF] transition-colors">
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download PDF</span>
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b-2 border-slate-100 dark:border-slate-700 text-slate-500 text-xs uppercase tracking-wider">
                            <th className="py-4 px-2">Discipline</th>
                            <th className="py-4 px-2 text-center text-[10px] sm:text-xs">M. Dev</th>
                            <th className="py-4 px-2 text-center text-[10px] sm:text-xs">M. Comp</th>
                            <th className="py-4 px-2 text-center text-[10px] sm:text-xs">M. Gén</th>
                            <th className="py-4 px-2 text-center">Coef</th>
                            <th className="py-4 px-2 text-center font-bold text-slate-700 dark:text-slate-300">Total</th>
                            <th className="py-4 px-2 text-right">Appréciation</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50 text-sm">
                        {rows.map((row) => (
                            <tr key={row.subject_code} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                <td className="py-4 px-2 font-medium text-slate-700 dark:text-slate-200">
                                    {row.subject_name}
                                    <span className="block text-[10px] text-slate-400 font-normal">{row.category}</span>
                                </td>
                                <td className="py-4 px-2 text-center text-slate-600 dark:text-slate-400">
                                    {row.moy_devoir}
                                </td>
                                <td className="py-4 px-2 text-center text-slate-600 dark:text-slate-400">
                                    {row.moy_composition}
                                </td>
                                <td className="py-4 px-2 text-center font-bold text-[#4D44B5]">
                                    {row.moy_general}
                                </td>
                                <td className="py-4 px-2 text-center text-slate-600 dark:text-slate-400">
                                    {row.coefficient}
                                </td>
                                <td className="py-4 px-2 text-center font-bold text-slate-800 dark:text-white">
                                    {row.total_points}
                                </td>
                                <td className="py-4 px-2 text-right">
                                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                                        row.moy_general >= 16 ? 'bg-green-100 text-green-600' :
                                        row.moy_general >= 12 ? 'bg-blue-100 text-blue-600' :
                                        row.moy_general >= 10 ? 'bg-orange-100 text-orange-600' :
                                        'bg-red-100 text-red-600'
                                    }`}>
                                        {row.appreciation}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="bg-slate-50 dark:bg-slate-900 overflow-hidden rounded-b-xl border-t-2 border-slate-200 dark:border-slate-700">
                        <tr>
                            <td colSpan={4} className="py-4 px-4 text-right font-bold text-slate-600 dark:text-slate-300">
                                TOTAL
                            </td>
                            <td className="py-4 px-2 text-center font-bold text-slate-800 dark:text-white text-lg">
                                {totalCoef}
                            </td>
                            <td className="py-4 px-2 text-center font-bold text-[#4D44B5] text-lg">
                                {totalPoints.toFixed(2)}
                            </td>
                            <td className="py-4 px-2"></td>
                        </tr>
                        <tr>
                             <td colSpan={5} className="py-4 px-4 text-right font-bold text-slate-800 dark:text-white uppercase tracking-widest text-xs">
                                Moyenne Trimestrielle
                            </td>
                            <td colSpan={2} className="py-4 px-4 text-left">
                                <span className="text-2xl font-black text-[#4D44B5]">
                                    {termAverage}
                                </span>
                                <span className="text-sm text-slate-400 ml-1">/ 20</span>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};
