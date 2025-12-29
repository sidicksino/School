import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit, Save, X, BookOpen, User } from 'lucide-react';

interface ClassItem {
    id: string;
    name: string;
}

interface SubjectItem {
    id: string;
    name: string;
    code: string;
}

interface TeacherItem {
    id: string;
    full_name: string;
}

interface CurriculumItem {
    id: string;
    subject_id: string;
    subject_name: string;
    subject_code: string;
    coefficient: number;
    teacher_id: string | null;
    teacher_name: string | null;
}

export const CurriculumManagement: React.FC = () => {
    // Selection State
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [selectedClassId, setSelectedClassId] = useState<string>('');
    
    // Data State
    const [curriculum, setCurriculum] = useState<CurriculumItem[]>([]);
    const [subjects, setSubjects] = useState<SubjectItem[]>([]);
    const [teachers, setTeachers] = useState<TeacherItem[]>([]);
    
    // UI State
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<CurriculumItem | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        subject_id: '',
        teacher_id: '',
        coefficient: 2
    });

    // 1. Initial Load: Fetch Classes, All Subjects, All Teachers
    useEffect(() => {
        const loadBasics = async () => {
            const [classesRes, subjectsRes, teachersRes] = await Promise.all([
                supabase.rpc('get_all_classes'),
                supabase.rpc('get_all_subjects'),
                supabase.rpc('get_all_users', { p_role_filter: 'teacher' })
            ]);

            if (classesRes.data) setClasses(classesRes.data);
            if (subjectsRes.data) setSubjects(subjectsRes.data);
            if (teachersRes.data) setTeachers(teachersRes.data);
            
            // Auto-select first class if available
            if (classesRes.data && classesRes.data.length > 0) {
                setSelectedClassId(classesRes.data[0].id);
            }
        };
        loadBasics();
    }, []);

    // 2. Fetch Curriculum when Selected Class Changes
    useEffect(() => {
        if (!selectedClassId) return;
        fetchCurriculum();
    }, [selectedClassId]);

    const fetchCurriculum = async () => {
        setLoading(true);
        const { data, error } = await supabase.rpc('get_class_curriculum', { p_class_id: selectedClassId });
        if (!error && data) {
            setCurriculum(data);
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const action = editingItem ? 'update' : 'create';
            
            const payload = {
                p_action: action,
                p_id: editingItem?.id,
                p_class_id: selectedClassId,
                p_subject_id: formData.subject_id,
                p_teacher_id: formData.teacher_id || null,
                p_coefficient: parseInt(formData.coefficient.toString())
            };

            const { error } = await supabase.rpc('manage_class_subject', payload);

            if (error) throw error;
            
            setIsModalOpen(false);
            fetchCurriculum();
            resetForm();
        } catch (err: any) {
            alert('Error saving: ' + err.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Remove this subject from the class curriculum?')) return;
        
        try {
            const { error } = await supabase.rpc('manage_class_subject', {
                p_action: 'delete',
                p_id: id
            });
            if (error) throw error;
            fetchCurriculum();
        } catch (err: any) {
            alert('Error deleting: ' + err.message);
        }
    };

    const openModal = (item?: CurriculumItem) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                subject_id: item.subject_id,
                teacher_id: item.teacher_id || '',
                coefficient: item.coefficient
            });
        } else {
            setEditingItem(null);
            setFormData({
                subject_id: '',
                teacher_id: '',
                coefficient: 2
            });
        }
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditingItem(null);
        setFormData({ subject_id: '', teacher_id: '', coefficient: 2 });
    };

    return (
        <div className="h-full flex flex-col p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h3 className="font-bold text-xl text-slate-800 dark:text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-500" />
                        Curriculum Manager
                    </h3>
                    <p className="text-sm text-slate-500">Assign subjects and teachers to classes</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <select 
                        value={selectedClassId}
                        onChange={(e) => setSelectedClassId(e.target.value)}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-xl font-bold text-sm border-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="" disabled>Select Class</option>
                        {classes.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    
                    <button 
                        onClick={() => openModal()}
                        disabled={!selectedClassId}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus className="w-4 h-4" />
                        Add Subject
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0 z-10">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Subject</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Coef</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Assigned Teacher</th>
                            <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {loading ? (
                            <tr><td colSpan={4} className="p-8 text-center text-slate-500">Loading curriculum...</td></tr>
                        ) : curriculum.length === 0 ? (
                            <tr><td colSpan={4} className="p-8 text-center text-slate-500">No subjects assigned to this class yet.</td></tr>
                        ) : (
                            curriculum.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-4 py-3">
                                        <div className="font-bold text-slate-700 dark:text-slate-200">{item.subject_name}</div>
                                        <div className="text-xs text-slate-400 font-mono">{item.subject_code}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold">
                                            x{item.coefficient}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.teacher_name ? (
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                <User className="w-3 h-3" />
                                                {item.teacher_name}
                                            </div>
                                        ) : (
                                            <span className="text-xs text-orange-500 italic">No teacher assigned</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openModal(item)} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(item.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md shadow-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg">{editingItem ? 'Edit Assignment' : 'Add Subject to Class'}</h3>
                            <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!editingItem && (
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase">Subject</label>
                                    <select 
                                        required
                                        className="w-full px-4 py-2 mt-1 bg-slate-50 dark:bg-slate-900 rounded-xl border-none"
                                        value={formData.subject_id}
                                        onChange={e => setFormData({...formData, subject_id: e.target.value})}
                                    >
                                        <option value="">Select Subject</option>
                                        {subjects.map(s => (
                                            <option key={s.id} value={s.id}>{s.name} ({s.code})</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Coefficient</label>
                                <input 
                                    type="number"
                                    min="1"
                                    max="10"
                                    required
                                    className="w-full px-4 py-2 mt-1 bg-slate-50 dark:bg-slate-900 rounded-xl border-none"
                                    value={formData.coefficient}
                                    onChange={e => setFormData({...formData, coefficient: parseInt(e.target.value)})}
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Teacher (Optional)</label>
                                <select 
                                    className="w-full px-4 py-2 mt-1 bg-slate-50 dark:bg-slate-900 rounded-xl border-none"
                                    value={formData.teacher_id}
                                    onChange={e => setFormData({...formData, teacher_id: e.target.value})}
                                >
                                    <option value="">No Teacher Assigned</option>
                                    {teachers.map(t => (
                                        <option key={t.id} value={t.id}>{t.full_name}</option>
                                    ))}
                                </select>
                            </div>

                            <button type="submit" className="w-full py-2 bg-purple-600 text-white font-bold rounded-xl mt-4">
                                Save Assignment
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
