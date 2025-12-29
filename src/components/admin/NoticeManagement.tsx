import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Calendar, MapPin, Bell } from 'lucide-react';

interface Notice {
    id: string;
    title: string;
    content: string;
    date: string;
    is_active: boolean;
}

interface Event {
    id: string;
    title: string;
    description: string;
    event_date: string;
    location: string;
    type: string;
}

export const NoticeManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'notices' | 'events'>('notices');
    const [notices, setNotices] = useState<Notice[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);
    
    // Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        if (activeTab === 'notices') {
            const { data } = await supabase.rpc('get_all_notices');
            if (data) setNotices(data);
        } else {
            const { data } = await supabase.rpc('get_all_events');
            if (data) setEvents(data);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        const rpcName = activeTab === 'notices' ? 'manage_notice' : 'manage_event';
        const payload = {
            p_action: editingItem ? 'update' : 'create',
            p_id: editingItem?.id,
            ...formData
        };

        // Date formatting fixes if needed
        if (activeTab === 'events' && payload.p_event_date) {
             // ensure standard YYYY-MM-DD
        }

        const { error } = await supabase.rpc(rpcName, payload);
        
        if (!error) {
            setIsModalOpen(false);
            setEditingItem(null);
            setFormData({});
            fetchData();
        } else {
            console.error(error);
            alert('Failed to save');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        const rpcName = activeTab === 'notices' ? 'manage_notice' : 'manage_event';
        await supabase.rpc(rpcName, { p_action: 'delete', p_id: id });
        fetchData();
    };

    const openModal = (item?: any) => {
        setEditingItem(item);
        setFormData(item || (activeTab === 'notices' ? 
            { p_title: '', p_content: '', p_date: new Date().toISOString().split('T')[0] } : 
            { p_title: '', p_description: '', p_event_date: new Date().toISOString().split('T')[0], p_location: '', p_type: 'academic' }
        ));
        setIsModalOpen(true);
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-xl">
                    <button 
                        onClick={() => setActiveTab('notices')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'notices' ? 'bg-white shadow text-[#4D44B5]' : 'text-slate-500'}`}
                    >
                        Notices
                    </button>
                    <button 
                         onClick={() => setActiveTab('events')}
                         className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'events' ? 'bg-white shadow text-[#4D44B5]' : 'text-slate-500'}`}
                    >
                        Events
                    </button>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-[#4D44B5] text-white rounded-xl font-bold hover:bg-[#3d3691] transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add {activeTab === 'notices' ? 'Notice' : 'Event'}</span>
                </button>
            </div>

            <div className="space-y-4">
                {activeTab === 'notices' ? (
                    notices.map(notice => (
                        <div key={notice.id} className="flex justify-between items-start p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                    <Bell className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-white">{notice.title}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{notice.content}</p>
                                    <p className="text-xs text-slate-400">{notice.date}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => openModal(notice)} className="p-2 text-slate-400 hover:text-[#4D44B5] transition-colors"><Edit2 className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(notice.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))
                ) : (
                    events.map(event => (
                        <div key={event.id} className="flex justify-between items-start p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-white">{event.title} <span className="text-xs font-normal px-2 py-0.5 bg-slate-200 dark:bg-slate-600 rounded-lg ml-2">{event.type}</span></h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{event.description}</p>
                                    <div className="flex items-center gap-4 text-xs text-slate-400">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.event_date}</span>
                                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => openModal(event)} className="p-2 text-slate-400 hover:text-[#4D44B5] transition-colors"><Edit2 className="w-4 h-4" /></button>
                                <button onClick={() => handleDelete(event.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))
                )}
                {!loading && (activeTab === 'notices' ? notices.length === 0 : events.length === 0) && (
                    <div className="text-center py-8 text-slate-400 italics">No items found.</div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">
                            {editingItem ? 'Edit' : 'Add'} {activeTab === 'notices' ? 'Notice' : 'Event'}
                        </h3>
                        
                        <div className="space-y-4">
                             {/* Dynamic Inputs based on Tab */}
                             {activeTab === 'notices' ? (
                                <>
                                    <input 
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl"
                                        placeholder="Title"
                                        value={formData.p_title || ''}
                                        onChange={e => setFormData({...formData, p_title: e.target.value})}
                                    />
                                    <textarea 
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl h-24"
                                        placeholder="Content"
                                        value={formData.p_content || ''}
                                        onChange={e => setFormData({...formData, p_content: e.target.value})}
                                    />
                                    <input 
                                        type="date"
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl"
                                        value={formData.p_date || ''}
                                        onChange={e => setFormData({...formData, p_date: e.target.value})}
                                    />
                                </>
                             ) : (
                                <>
                                    <input 
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl"
                                        placeholder="Event Title"
                                        value={formData.p_title || ''}
                                        onChange={e => setFormData({...formData, p_title: e.target.value})}
                                    />
                                    <textarea 
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl h-24"
                                        placeholder="Description"
                                        value={formData.p_description || ''}
                                        onChange={e => setFormData({...formData, p_description: e.target.value})}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input 
                                            type="date"
                                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl"
                                            value={formData.p_event_date || ''}
                                            onChange={e => setFormData({...formData, p_event_date: e.target.value})}
                                        />
                                        <select 
                                            className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl"
                                            value={formData.p_type || 'academic'}
                                            onChange={e => setFormData({...formData, p_type: e.target.value})}
                                        >
                                            <option value="academic">Academic</option>
                                            <option value="social">Social</option>
                                            <option value="meeting">Meeting</option>
                                            <option value="holiday">Holiday</option>
                                        </select>
                                    </div>
                                    <input 
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl"
                                        placeholder="Location (e.g. Main Hall)"
                                        value={formData.p_location || ''}
                                        onChange={e => setFormData({...formData, p_location: e.target.value})}
                                    />
                                </>
                             )}
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSave}
                                className="flex-1 py-3 bg-[#4D44B5] text-white font-bold rounded-xl hover:bg-[#3d3691] transition-colors"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
