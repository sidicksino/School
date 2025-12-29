import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, BookOpen, Edit, X } from 'lucide-react';

interface Subject {
    id: string;
    name: string;
    code: string;
}

export const SubjectManagement: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    
    const [formData, setFormData] = useState({ name: '', code: '' });

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        setLoading(true);
        const { data, error } = await supabase.rpc('get_all_subjects');
        if (!error && data) {
            setSubjects(data);
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const action = editingId ? 'update' : 'create';
            const { error } = await supabase.rpc('manage_subject', {
                p_action: action,
                p_id: editingId,
                p_name: formData.name,
                p_code: formData.code
            });

            if (error) throw error;
            
            closeModal();
            fetchSubjects();
        } catch (err: any) {
            alert('Error saving subject: ' + err.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this subject?')) return;
        
        const { error } = await supabase.rpc('manage_subject', {
            p_action: 'delete',
            p_id: id
        });
        
        if (!error) fetchSubjects();
    };

    const openModal = (subject?: Subject) => {
        if (subject) {
            setEditingId(subject.id);
            setFormData({ name: subject.name, code: subject.code });
        } else {
            setEditingId(null);
            setFormData({ name: '', code: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ name: '', code: '' });
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-slate-800 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-indigo-500" />
                    Manage Courses
                </h3>
                <button 
                    onClick={() => openModal()}
                    className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-100 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-2">
                {loading ? <div className="text-center text-slate-400">Loading...</div> : (
                    subjects.map(s => (
                        <div key={s.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100">
                            <div>
                                <div className="font-bold text-slate-700 dark:text-white text-sm">{s.name}</div>
                                <div className="text-xs text-slate-400 font-mono">{s.code}</div>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openModal(s)} className="p-1.5 text-indigo-500 hover:bg-indigo-50 rounded-lg">
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(s.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-sm shadow-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg">{editingId ? 'Edit' : 'Add'} Subject</h3>
                            <button onClick={closeModal}><X className="w-5 h-5 text-slate-400" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Subject Name</label>
                                <input 
                                    required
                                    className="w-full px-4 py-2 mt-1 bg-slate-50 dark:bg-slate-900 rounded-xl border-none"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Code</label>
                                <input 
                                    required
                                    className="w-full px-4 py-2 mt-1 bg-slate-50 dark:bg-slate-900 rounded-xl border-none font-mono uppercase"
                                    value={formData.code}
                                    onChange={e => setFormData({...formData, code: e.target.value})}
                                />
                            </div>
                            <button type="submit" className="w-full py-2 bg-indigo-600 text-white font-bold rounded-xl mt-2">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
