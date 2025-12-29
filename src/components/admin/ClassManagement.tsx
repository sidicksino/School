import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Layers } from 'lucide-react';

interface ClassItem {
    id: string;
    name: string;
}

export const ClassManagement: React.FC = () => {
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [newClass, setNewClass] = useState('');
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        setLoading(true);
        const { data, error } = await supabase.rpc('get_all_classes');
        if (!error && data) {
            setClasses(data);
        }
        setLoading(false);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newClass.trim()) return;

        setAdding(true);
        const { error } = await supabase.rpc('manage_class', {
            p_action: 'create',
            p_name: newClass.trim()
        });

        if (error) {
            alert('Error adding class: ' + error.message);
        } else {
            setNewClass('');
            fetchClasses();
        }
        setAdding(false);
    };

    const handleDelete = async (name: string) => {
        if (!window.confirm(`Delete class "${name}"?`)) return;

        const { error } = await supabase.rpc('manage_class', {
            p_action: 'delete',
            p_name: name
        });

        if (error) {
            alert('Error deleting class');
        } else {
            fetchClasses();
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
            <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-500" />
                Manage Classes
            </h3>

            {/* List */}
            <div className="flex flex-wrap gap-2 mb-6">
                {loading ? (
                    <span className="text-slate-400 text-sm">Loading...</span>
                ) : (
                    classes.map(c => (
                        <div key={c.id} className="group flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-700">
                            <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">{c.name}</span>
                            <button 
                                onClick={() => handleDelete(c.name)}
                                className="text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Add Form */}
            <form onSubmit={handleAdd} className="flex gap-2">
                <input 
                    type="text"
                    placeholder="New Class Name..."
                    className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
                    value={newClass}
                    onChange={e => setNewClass(e.target.value)}
                />
                <button 
                    type="submit" 
                    disabled={adding || !newClass}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-xl transition-colors disabled:opacity-50"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};
