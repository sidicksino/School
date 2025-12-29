import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Calendar, CheckCircle, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Student {
    id: string;
    full_name: string;
    classe: string;
}

export const TeacherAttendance: React.FC = () => {
    const { user } = useAuth();
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [students, setStudents] = useState<Student[]>([]);
    const [attendance, setAttendance] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [classes, setClasses] = useState<string[]>([]);

    useEffect(() => {
        const fetchClasses = async () => {
            if (!user) return;

            if (user.role === 'admin') {
                // Admin sees ALL classes
                const { data } = await supabase.rpc('get_all_classes');
                if (data) {
                    setClasses(data.map((c: any) => c.name));
                }
            } else {
                // Teacher sees only assigned classes (with surname fallback)
                const { data } = await supabase.rpc('get_teacher_classes_list', { 
                    p_teacher_id: user.id,
                    p_surname: user.surname 
                });
                if (data) {
                    // Map to unique class names
                    const classNames = Array.from(new Set(data.map((c: any) => c.class_name)));
                    setClasses(classNames as string[]);
                }
            }
        };
        fetchClasses();
    }, [user]);

    useEffect(() => {
        if (selectedClass) {
            fetchStudentsAndAttendance();
        } else {
            setStudents([]);
            setAttendance({});
        }
    }, [selectedClass, date]);

    const fetchStudentsAndAttendance = async () => {
        setLoading(true);
        setMessage(null);
        try {
            // 1. Fetch Students & Attendance via RPC
            // logic: get_class_attendance_sheet returns all students with their status
            const { data, error } = await supabase
                .rpc('get_class_attendance_sheet', { 
                    p_classe: selectedClass,
                    p_date: date
                });

            if (error) throw error;

            if (data) {
                // Map RPC result to local state
                const studentsList: Student[] = data.map((row: any) => ({
                    id: row.student_id,
                    full_name: row.full_name,
                    classe: selectedClass
                }));
                setStudents(studentsList);

                const attMap: Record<string, string> = {};
                data.forEach((row: any) => {
                    attMap[row.student_id] = row.status || 'Present';
                });
                setAttendance(attMap);
            }

        } catch (err: any) {
            console.error('Error fetching data:', err);
            setMessage({ type: 'error', text: 'Failed to load class data.' });
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = (studentId: string, status: string) => {
        setAttendance(prev => ({
            ...prev,
            [studentId]: status
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage(null);
        try {
            const records = students.map(student => ({
                student_id: student.id,
                date: date,
                status: attendance[student.id] || 'Present'
            }));

            // Call Bulk Save RPC
            const { data, error } = await supabase
                .rpc('save_attendance_bulk', { p_records: records });

            if (error) throw error;
            if (data && data.error) throw new Error(data.error);
            
            setMessage({ type: 'success', text: 'Attendance saved successfully!' });
            setTimeout(() => setMessage(null), 3000);

        } catch (err: any) {
            console.error('Error saving attendance:', err);
            setMessage({ type: 'error', text: 'Failed to save attendance.' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                     <h3 className="font-bold text-xl text-slate-800 dark:text-white font-heading">
                        Class Attendance
                    </h3>
                    <p className="text-slate-500 text-sm">Select class and date to manage records</p>
                </div>
               
                <div className="flex gap-3">
                     {/* Save Button (Top) */}
                     {selectedClass && (
                        <button 
                            onClick={handleSave}
                            disabled={saving || loading}
                            className="bg-[#4D44B5] hover:bg-[#3d3691] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
                        >
                            {saving ? (
                                <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></span>
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Save Changes
                        </button>
                     )}
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Class</label>
                    <div className="relative">
                        <select 
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-[#4D44B5] outline-none transition-all"
                        >
                            <option value="">-- Select Class --</option>
                            {classes.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <Search className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Date</label>
                    <div className="relative">
                         <input 
                            type="date" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-700 dark:text-slate-200 font-bold focus:ring-2 focus:ring-[#4D44B5] outline-none transition-all"
                        />
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <Calendar className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Message */}
            {message && (
                <div className={`p-4 rounded-xl mb-6 flex items-center gap-2 text-sm font-bold ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : null}
                    {message.text}
                </div>
            )}

            {/* Student List */}
            {selectedClass && (
                <div className="overflow-x-auto">
                    {loading ? (
                         <div className="py-12 text-center text-slate-400 animate-pulse">
                            Loading students...
                        </div>
                    ) : students.length === 0 ? (
                        <div className="py-12 text-center text-slate-400">
                            No students found in this class.
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-500 text-xs uppercase tracking-wider border-b-2 border-slate-100 dark:border-slate-700">
                                    <th className="pb-3 pl-2 w-1/3">Student</th>
                                    <th className="pb-3 text-center">Present</th>
                                    <th className="pb-3 text-center">Absent</th>
                                    <th className="pb-3 text-center">Sick</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {students.map((student) => (
                                    <tr key={student.id} className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                                        <td className="py-3 pl-2 font-bold text-slate-700 dark:text-slate-200">
                                            {student.full_name}
                                        </td>
                                        <td className="py-3 text-center">
                                            <input 
                                                type="radio" 
                                                name={`status-${student.id}`} 
                                                checked={attendance[student.id] === 'Present'}
                                                onChange={() => handleStatusChange(student.id, 'Present')}
                                                className="w-5 h-5 text-[#4D44B5] focus:ring-[#4D44B5] cursor-pointer"
                                            />
                                        </td>
                                        <td className="py-3 text-center">
                                            <input 
                                                type="radio" 
                                                name={`status-${student.id}`} 
                                                checked={attendance[student.id] === 'Absent'}
                                                onChange={() => handleStatusChange(student.id, 'Absent')}
                                                className="w-5 h-5 text-orange-500 focus:ring-orange-500 cursor-pointer"
                                            />
                                        </td>
                                        <td className="py-3 text-center">
                                            <input 
                                                type="radio" 
                                                name={`status-${student.id}`} 
                                                checked={attendance[student.id] === 'Sick'}
                                                onChange={() => handleStatusChange(student.id, 'Sick')}
                                                className="w-5 h-5 text-red-500 focus:ring-red-500 cursor-pointer"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};
