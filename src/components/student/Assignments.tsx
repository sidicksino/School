import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, Calendar, Clock, CheckCircle } from 'lucide-react';

interface Assignment {
    id: string;
    title: string;
    description: string;
    due_date: string;
    subject_name: string;
    subject_code: string;
    is_overdue: boolean;
}

export const Assignments: React.FC = () => {
    const { user } = useAuth();
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchAssignments();
        }
    }, [user]);

    const fetchAssignments = async () => {
        try {
            const { data, error } = await supabase.rpc('get_student_assignments', { p_student_id: user?.id });
            if (error) throw error;
            setAssignments(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('fr-FR', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    const getDaysRemaining = (dateStr: string) => {
        const diff = new Date(dateStr).getTime() - new Date().getTime();
        const days = Math.ceil(diff / (1000 * 3600 * 24));
        if (days < 0) return 'Overdue';
        if (days === 0) return 'Today';
        return `${days} days left`;
    };

    // Group by status
    const pending = assignments.filter(a => !a.is_overdue);
    const past = assignments.filter(a => a.is_overdue);

    return (
        <DashboardLayout>
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm min-h-[80vh]">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-[#4D44B5]" />
                            Assignments
                        </h2>
                        <p className="text-slate-500 mt-1">
                            Homework and projects for <span className="font-bold text-[#4D44B5]">{user?.classe}</span>
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-slate-400">Loading assignments...</div>
                ) : assignments.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 dark:bg-slate-700/30 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-600">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-700 dark:text-white">All Caught Up!</h3>
                        <p className="text-slate-500">No pending assignments at the moment.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* PENDING */}
                        <div>
                            <h3 className="text-lg font-bold text-slate-700 dark:text-white mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-orange-500" />
                                Upcoming
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {pending.map(a => (
                                    <div key={a.id} className="group relative bg-white dark:bg-slate-700/30 border border-slate-100 dark:border-slate-600 rounded-2xl p-6 hover:shadow-md transition-all">
                                        <div className={`absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded-full ${
                                            getDaysRemaining(a.due_date) === 'Today' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                            {getDaysRemaining(a.due_date)}
                                        </div>

                                        <div className="mb-4">
                                            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                                {a.subject_name} ({a.subject_code})
                                            </span>
                                            <h4 className="text-lg font-bold text-slate-800 dark:text-white mt-1 group-hover:text-[#4D44B5] transition-colors">{a.title}</h4>
                                        </div>

                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-3">
                                            {a.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-xs text-slate-400 border-t border-slate-100 dark:border-slate-600 pt-4">
                                            <Calendar className="w-4 h-4" />
                                            Due: {formatDate(a.due_date)}
                                        </div>
                                    </div>
                                ))}
                                {pending.length === 0 && <p className="text-slate-500 italic">No upcoming assignments.</p>}
                            </div>
                        </div>

                         {/* PAST */}
                         {past.length > 0 && (
                             <div className="opacity-60 hover:opacity-100 transition-opacity">
                                <h3 className="text-lg font-bold text-slate-700 dark:text-white mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-slate-400" />
                                    Past / Completed
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {past.map(a => (
                                        <div key={a.id} className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-6 grayscale">
                                            <div className="mb-2">
                                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                                                    {a.subject_code}
                                                </span>
                                                <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">{a.title}</h4>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
                                                <Calendar className="w-4 h-4" />
                                                Due: {formatDate(a.due_date)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                         )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};
