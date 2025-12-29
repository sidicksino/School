import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { supabase } from '../../lib/supabase';
import { BookOpen, Calendar, Save, CheckCircle, AlertCircle, Trash2, Paperclip, UploadCloud } from 'lucide-react';

export const TeacherAssignments: React.FC = () => {
    const [classes, setClasses] = useState<string[]>([]);
    const [subjects, setSubjects] = useState<any[]>([]);
    
    // Form State
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [file, setFile] = useState<File | null>(null); // New state
    
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{type: 'success'|'error', msg: string} | null>(null);
    const [recentAssignments, setRecentAssignments] = useState<any[]>([]);

    useEffect(() => {
        fetchMeta();
        fetchRecent();
    }, []);

    const fetchMeta = async () => {
        const { data: c } = await supabase.rpc('get_all_classes');
        if (c) {
            setClasses(c.map((x: any) => x.name));
            if (c.length > 0) setSelectedClass(c[0].name);
        }
        const { data: s } = await supabase.rpc('get_all_subjects');
        if (s) {
            setSubjects(s);
            if (s.length > 0) setSelectedSubject(s[0].code);
        }
    };

    const fetchRecent = async () => {
        const { data, error } = await supabase
            .from('assignments')
            .select('id, title, due_date, class_name, subjects ( code )')
            .order('created_at', { ascending: false })
            .limit(10);
            
        if (!error && data) setRecentAssignments(data);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            let fileUrl = null;

            // Upload File if present
            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('assignments')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                // Get Public URL
                const { data: { publicUrl } } = supabase.storage
                    .from('assignments')
                    .getPublicUrl(filePath);
                
                fileUrl = publicUrl;
            }

            const { error } = await supabase.rpc('create_assignment', {
                p_title: title,
                p_description: desc,
                p_due_date: dueDate,
                p_class_name: selectedClass,
                p_subject_code: selectedSubject,
                p_file_url: fileUrl // Updated RPC call
            });

            if (error) throw error;

            setStatus({ type: 'success', msg: 'Assignment created successfully!' });
            setTitle('');
            setDesc('');
            setDueDate('');
            setFile(null); // Reset file
            fetchRecent();
        } catch (err: any) {
            console.error(err);
            setStatus({ type: 'error', msg: err.message || 'Failed to create assignment' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Delete this assignment?')) return;
        const { error } = await supabase.from('assignments').delete().eq('id', id);
        if (!error) fetchRecent();
    };

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* LEFT: Create Form */}
                    <div className="flex-1">
                         <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-[#4D44B5]" />
                                Create Assignment
                            </h2>

                            {status && (
                                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                                    status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                }`}>
                                    {status.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                                    <span className="font-bold text-sm">{status.msg}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Class</label>
                                        <select 
                                            value={selectedClass}
                                            onChange={e => setSelectedClass(e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                                        >
                                            {classes.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subject</label>
                                        <select 
                                            value={selectedSubject}
                                            onChange={e => setSelectedSubject(e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                                        >
                                            {subjects.map(s => <option key={s.id} value={s.code}>{s.code} - {s.name}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                                    <input 
                                        type="text"
                                        required
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        placeholder="e.g., Algebra Chapter 1 Exercises"
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#4D44B5] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                                    <textarea 
                                        rows={4}
                                        value={desc}
                                        onChange={e => setDesc(e.target.value)}
                                        placeholder="Detailed instructions..."
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#4D44B5] outline-none resize-none"
                                    />
                                </div>

                                {/* File Upload */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Attachment (PDF)</label>
                                    <div className="relative">
                                        <input 
                                            type="file"
                                            accept=".pdf,.doc,.docx,.jpg,.png"
                                            onChange={handleFileChange}
                                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#4D44B5] outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#4D44B5] file:text-white hover:file:bg-[#3d3691]"
                                        />
                                    </div>
                                    {file && <p className="text-xs text-green-600 mt-1 flex items-center gap-1"><Paperclip className="w-3 h-3" /> Selected: {file.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Due Date</label>
                                    <input 
                                        type="date"
                                        required
                                        value={dueDate}
                                        onChange={e => setDueDate(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#4D44B5] outline-none"
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#4D44B5] text-white rounded-xl font-bold hover:bg-[#3d3691] transition-colors disabled:opacity-50"
                                >
                                    {loading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white"></div> : <UploadCloud className="w-5 h-5" />}
                                    <span>{loading ? 'Uploading...' : 'Publish Assignment'}</span>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT: Recent List */}
                    <div className="w-full md:w-80">
                         <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Posts</h3>
                         <div className="space-y-3">
                            {recentAssignments.map(a => (
                                <div key={a.id} className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative group">
                                    <button 
                                        onClick={() => handleDelete(a.id)}
                                        className="absolute top-2 right-2 p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md mb-2 inline-block">
                                        {a.class_name} • {a.subjects?.code}
                                    </span>
                                    <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-1">{a.title}</h4>
                                    <div className="flex items-center gap-1 text-xs text-slate-400">
                                        <Calendar className="w-3 h-3" />
                                        Due: {new Date(a.due_date).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                            {recentAssignments.length === 0 && (
                                <p className="text-slate-400 text-sm italic">No assignments yet.</p>
                            )}
                         </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};
