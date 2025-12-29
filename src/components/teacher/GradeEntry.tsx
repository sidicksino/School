import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { supabase } from '../../lib/supabase';
import { Save, Search, Calculator, CheckCircle, AlertCircle } from 'lucide-react';

interface Student {
    id: string;
    surname: string;
    full_name: string;
}

const TERMS = [1, 2, 3];
const TYPES = ['devoir', 'composition'];

import { useAuth } from '../../contexts/AuthContext';

export const GradeEntry: React.FC = () => {
    const { user } = useAuth();
    const [classes, setClasses] = useState<string[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    
    // Selection State
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState(''); // Code
    const [selectedTerm, setSelectedTerm] = useState(1);
    const [selectedType, setSelectedType] = useState('devoir');

    // Grades State: { [studentId]: gradeValue }
    const [grades, setGrades] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{type: 'success'|'error', msg: string} | null>(null);

    // 1. Fetch Initial Metadata
    // We store raw data to map class -> subjects
    const [assignmentsMap, setAssignmentsMap] = useState<any[]>([]);

    useEffect(() => {
        const fetchMeta = async () => {
            if (!user) return;
            
            // Fetch valid class-subject pairs for this teacher
            // Using surname fallback for robustness
            const { data } = await supabase.rpc('get_teacher_classes_list', { 
                p_teacher_id: user.id,
                p_surname: user.surname 
            });
            
            if (data) {
                setAssignmentsMap(data);
                
                // unique classes
                const uniqueClasses = Array.from(new Set(data.map((item: any) => item.class_name)));
                setClasses(uniqueClasses as string[]);
                
                // Select first class if any
                if (uniqueClasses.length > 0) {
                    const firstClass = uniqueClasses[0] as string;
                    setSelectedClass(firstClass);
                }
            }
        };
        if (user) fetchMeta();
    }, [user]);

    // Update subjects when class changes
    useEffect(() => {
        if (selectedClass && assignmentsMap.length > 0) {
            const validSubjects = assignmentsMap.filter((x: any) => x.class_name === selectedClass);
            setSubjects(validSubjects);
            
            // Auto-select first subject
            if (validSubjects.length > 0) {
                setSelectedSubject(validSubjects[0].subject_code);
            } else {
                setSelectedSubject('');
            }
        }
    }, [selectedClass, assignmentsMap]);

    // 2. Fetch Students when Class changes
    useEffect(() => {
        if (!selectedClass) return;
        
        const fetchStudents = async () => {
            setLoading(true);
            const { data } = await supabase.rpc('get_students_by_class', { p_classe: selectedClass });
            setStudents(data || []);
            setGrades({}); // Reset grades on class change
            setLoading(false);
        };
        fetchStudents();
    }, [selectedClass]);

    const handleGradeChange = (studentId: string, value: string) => {
        // Allow empty or number 0-20
        if (value === '' || (Number(value) >= 0 && Number(value) <= 20)) {
            setGrades(prev => ({ ...prev, [studentId]: value }));
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setStatus(null);
        let errorCount = 0;
        let successCount = 0;

        for (const [studentId, value] of Object.entries(grades)) {
            if (value === '') continue; // Skip empty

            const { error } = await supabase.rpc('upsert_grade', {
                p_student_id: studentId,
                p_subject_code: selectedSubject,
                p_term: selectedTerm,
                p_type: selectedType,
                p_value: parseFloat(value)
            });

            if (error) {
                console.error(error);
                errorCount++;
            } else {
                successCount++;
            }
        }

        setSaving(false);
        if (errorCount > 0) {
            setStatus({ type: 'error', msg: `Saved ${successCount}, Failed ${errorCount}. Check console.` });
        } else {
            setStatus({ type: 'success', msg: `Successfully saved ${successCount} grades!` });
            // Optional: clear grades or keep them? Keep them so teacher sees what they entered.
        }
    };

    return (
        <DashboardLayout>
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                            <Calculator className="w-6 h-6 text-[#4D44B5]" />
                            Grade Entry
                        </h2>
                        <p className="text-slate-500 mt-1">Select parameters and enter grades.</p>
                    </div>
                    
                     <button 
                        onClick={handleSave}
                        disabled={saving || students.length === 0}
                        className="flex items-center gap-2 px-6 py-3 bg-[#4D44B5] text-white rounded-xl font-bold hover:bg-[#3d3691] transition-colors disabled:opacity-50"
                    >
                        {saving ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div> : <Save className="w-5 h-5" />}
                        <span>Save Grades</span>
                    </button>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-slate-50 dark:bg-slate-700/30 p-4 rounded-2xl">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Class</label>
                        <select 
                            value={selectedClass} 
                            onChange={e => setSelectedClass(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 rounded-xl border-none shadow-sm font-bold text-slate-700 dark:text-white"
                        >
                            {classes.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Subject</label>
                        <select 
                            value={selectedSubject} 
                            onChange={e => setSelectedSubject(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-800 rounded-xl border-none shadow-sm font-bold text-slate-700 dark:text-white"
                        >
                            {subjects.map((s: any) => <option key={s.subject_code} value={s.subject_code}>{s.subject_code} - {s.subject_name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Term</label>
                        <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm">
                            {TERMS.map(t => (
                                <button
                                    key={t}
                                    onClick={() => setSelectedTerm(t)}
                                    className={`flex-1 py-1 rounded-lg text-sm font-bold transition-all ${
                                        selectedTerm === t 
                                        ? 'bg-[#4D44B5] text-white shadow-md' 
                                        : 'text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    T{t}
                                </button>
                            ))}
                        </div>
                    </div>

                     <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Type</label>
                        <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm">
                            {TYPES.map(t => (
                                <button
                                    key={t}
                                    onClick={() => setSelectedType(t)}
                                    className={`flex-1 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                                        selectedType === t 
                                        ? 'bg-orange-500 text-white shadow-md' 
                                        : 'text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    {t.slice(0,3)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Status Message */}
                {status && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                        status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                        {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span className="font-bold">{status.msg}</span>
                    </div>
                )}

                {/* Students List */}
                <div className="overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-700">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#4D44B5]/5 dark:bg-slate-700/50">
                            <tr>
                                <th className="px-6 py-4 font-bold text-slate-600 dark:text-slate-300">Student Name</th>
                                <th className="px-6 py-4 font-bold text-slate-600 dark:text-slate-300 w-48 text-right">
                                    Grade <span className="text-slate-400 font-normal">/ 20</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={2} className="px-6 py-10 text-center text-slate-400">Loading students...</td>
                                </tr>
                            ) : students.length === 0 ? (
                                <tr>
                                    <td colSpan={2} className="px-6 py-10 text-center text-slate-400">No students found in {selectedClass}</td>
                                </tr>
                            ) : (
                                students.map(student => (
                                    <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-800 dark:text-white">
                                            {student.surname} <span className="text-slate-500 font-normal">{student.full_name}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <input 
                                                type="number" 
                                                min="0"
                                                max="20"
                                                step="0.01"
                                                placeholder="0-20"
                                                value={grades[student.id] || ''}
                                                onChange={(e) => handleGradeChange(student.id, e.target.value)}
                                                className="w-24 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg text-right font-bold focus:ring-2 focus:ring-[#4D44B5] focus:border-transparent outline-none transition-all"
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};
