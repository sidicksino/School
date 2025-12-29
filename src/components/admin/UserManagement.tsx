import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { User, Edit, Trash2, Plus, X, Search, Filter } from 'lucide-react';

interface SchoolUser {
    id: string;
    surname: string; // Username
    full_name: string;
    role: string;
    classe: string;
    cycle: string;
    phone: string;
}

export const UserManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'teacher' | 'student'>('teacher');
    const [users, setUsers] = useState<SchoolUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<SchoolUser | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        surname: '',
        full_name: '',
        password: '',
        phone: '',
        classe: '',
        cycle: 'Lycee'
    });

    useEffect(() => {
        fetchUsers();
    }, [activeTab]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.rpc('get_all_users', { p_role_filter: activeTab });
            if (error) throw error;
            setUsers(data || []);
        } catch (err) {
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const action = editingUser ? 'update' : 'create';
            const payload = {
                id: editingUser?.id,
                ...formData,
                role: activeTab 
            };
            
            // If editing and password is empty, remove it so it doesn't get hashed as empty string
            if (action === 'update' && !formData.password) {
                delete (payload as any).password;
            }

            const { data, error } = await supabase.rpc('manage_user', {
                p_action: action,
                p_user_data: payload
            });

            if (error) throw error;
            if (data?.error) throw new Error(data.error);

            setIsModalOpen(false);
            fetchUsers();
            resetForm();
        } catch (err: any) {
            alert('Error saving user: ' + (err.message || err));
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        
        try {
            const { error } = await supabase.rpc('manage_user', {
                p_action: 'delete',
                p_user_data: { id }
            });
            if (error) throw error;
            fetchUsers();
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    const openEdit = (user: SchoolUser) => {
        setEditingUser(user);
        setFormData({
            surname: user.surname,
            full_name: user.full_name,
            password: '', // Blank by default
            phone: user.phone || '',
            classe: user.classe || '',
            cycle: user.cycle || 'Lycee'
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditingUser(null);
        setFormData({
            surname: '',
            full_name: '',
            password: '',
            phone: '',
            classe: '',
            cycle: 'Lycee'
        });
    };

    const filteredUsers = users.filter(u => 
        u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.surname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            {/* Header / Tabs */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex bg-slate-100 dark:bg-slate-700/50 p-1 rounded-xl">
                    <button 
                        onClick={() => setActiveTab('teacher')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                            activeTab === 'teacher' 
                            ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                        }`}
                    >
                        Teachers
                    </button>
                    <button 
                        onClick={() => setActiveTab('student')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                            activeTab === 'student' 
                            ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                        }`}
                    >
                        Students
                    </button>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text"
                            placeholder="Search name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button 
                        onClick={() => { resetForm(); setIsModalOpen(true); }}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add {activeTab === 'teacher' ? 'Teacher' : 'Student'}
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Class</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                            <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                        {loading ? (
                            <tr><td colSpan={5} className="p-8 text-center text-slate-500">Loading users...</td></tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr><td colSpan={5} className="p-8 text-center text-slate-500">No users found.</td></tr>
                        ) : (
                            filteredUsers.map((u) => (
                                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                                                {u.full_name.charAt(0)}
                                            </div>
                                            <span className="font-bold text-slate-700 dark:text-slate-200">{u.full_name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300 font-mono">
                                        {u.surname}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                                        <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs font-medium">
                                            {u.classe || 'N/A'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">
                                        {u.phone || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => openEdit(u)}
                                                className="p-1.5 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 text-indigo-600 rounded-lg transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(u.id)}
                                                className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-900/50 text-rose-600 rounded-lg transition-colors"
                                            >
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-xl border border-slate-100 dark:border-slate-700">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <h3 className="font-bold text-xl text-slate-800 dark:text-white">
                                {editingUser ? 'Edit' : 'Add'} {activeTab === 'teacher' ? 'Teacher' : 'Student'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors">
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                                    <input 
                                        required
                                        type="text"
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500"
                                        value={formData.full_name}
                                        onChange={e => setFormData({...formData, full_name: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Username (Surname)</label>
                                    <input 
                                        required
                                        type="text"
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500"
                                        value={formData.surname}
                                        onChange={e => setFormData({...formData, surname: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Class</label>
                                    <input 
                                        required
                                        type="text"
                                        placeholder="e.g. Terminale S"
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500"
                                        value={formData.classe}
                                        onChange={e => setFormData({...formData, classe: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone</label>
                                    <input 
                                        type="tel"
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500"
                                        value={formData.phone}
                                        onChange={e => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                                    {editingUser ? 'New Password (Optional)' : 'Password'}
                                </label>
                                <input 
                                    type="password"
                                    required={!editingUser}
                                    placeholder={editingUser ? 'Leave blank to keep current' : ''}
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-indigo-500"
                                    value={formData.password}
                                    onChange={e => setFormData({...formData, password: e.target.value})}
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 text-slate-500 hover:text-slate-700 font-bold"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit"
                                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all"
                                >
                                    Save User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
