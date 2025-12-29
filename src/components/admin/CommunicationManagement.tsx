import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Bell, Calendar, Plus, Trash2, X } from 'lucide-react';

interface Notice {
    id: string;
    title: string;
    content: string;
    date: string;
}

interface SchoolEvent {
    id: string;
    title: string;
    description: string;
    event_date: string;
    location: string;
    type: string;
}

export const CommunicationManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'notices' | 'events'>('notices');
    const [notices, setNotices] = useState<Notice[]>([]);
    const [events, setEvents] = useState<SchoolEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form Data
    const [noticeForm, setNoticeForm] = useState({ title: '', content: '', date: '' });
    const [eventForm, setEventForm] = useState({ title: '', description: '', event_date: '', location: '', type: 'academic' });

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        if (activeTab === 'notices') {
            const { data } = await supabase.rpc('get_active_notices');
            if (data) setNotices(data);
        } else {
            const { data } = await supabase.rpc('get_upcoming_events');
            if (data) setEvents(data);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        
        try {
            if (activeTab === 'notices') {
                await supabase.rpc('manage_notice', { p_action: 'delete', p_id: id });
            } else {
                await supabase.rpc('manage_event', { p_action: 'delete', p_id: id });
            }
            fetchData();
        } catch (error) {
            console.error('Error deleting:', error);
            alert('Failed to delete item');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (activeTab === 'notices') {
                await supabase.rpc('manage_notice', { 
                    p_action: 'create', 
                    p_title: noticeForm.title,
                    p_content: noticeForm.content,
                    p_date: noticeForm.date || new Date().toISOString()
                });
            } else {
                await supabase.rpc('manage_event', { 
                    p_action: 'create', 
                    p_title: eventForm.title,
                    p_description: eventForm.description,
                    p_event_date: eventForm.event_date,
                    p_location: eventForm.location,
                    p_type: eventForm.type
                });
            }
            setIsModalOpen(false);
            setNoticeForm({ title: '', content: '', date: '' });
            setEventForm({ title: '', description: '', event_date: '', location: '', type: 'academic' });
            fetchData();
        } catch (error) {
            console.error('Error creating:', error);
            alert('Failed to create item');
        }
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex bg-slate-100 dark:bg-slate-700/50 p-1 rounded-xl">
                    <button 
                        onClick={() => setActiveTab('notices')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                            activeTab === 'notices' 
                            ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                        }`}
                    >
                        <Bell className="w-4 h-4" /> Notices
                    </button>
                    <button 
                        onClick={() => setActiveTab('events')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                            activeTab === 'events' 
                            ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
                        }`}
                    >
                        <Calendar className="w-4 h-4" /> Events
                    </button>
                </div>

                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add {activeTab === 'notices' ? 'Notice' : 'Event'}
                </button>
            </div>

            <div className="p-6">
                {loading ? (
                    <div className="text-center py-8 text-slate-500">Loading...</div>
                ) : activeTab === 'notices' ? (
                    <div className="space-y-4">
                        {notices.map(notice => (
                            <div key={notice.id} className="flex justify-between items-start p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl group hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-colors">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-slate-400">{new Date(notice.date).toLocaleDateString()}</span>
                                        <h4 className="font-bold text-slate-700 dark:text-slate-200">{notice.title}</h4>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">{notice.content}</p>
                                </div>
                                <button onClick={() => handleDelete(notice.id)} className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        {notices.length === 0 && <p className="text-center text-slate-400 italic">No active notices.</p>}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {events.map(event => (
                            <div key={event.id} className="flex justify-between items-start p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl group hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-colors">
                                <div className="flex gap-4 items-start">
                                    <div className="bg-white dark:bg-slate-800 p-2 rounded-lg text-center min-w-[60px] shadow-sm">
                                        <div className="text-xs font-bold text-red-500 uppercase">{new Date(event.event_date).toLocaleDateString('en-US', { month: 'short' })}</div>
                                        <div className="text-xl font-bold text-slate-700 dark:text-slate-200">{new Date(event.event_date).getDate()}</div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-700 dark:text-slate-200">{event.title} <span className="text-xs font-normal text-slate-400 ml-2">({event.type})</span></h4>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-1">{event.description}</p>
                                        <div className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-slate-400"></span> {event.location}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => handleDelete(event.id)} className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        {events.length === 0 && <p className="text-center text-slate-400 italic">No upcoming events.</p>}
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-xl text-slate-800 dark:text-white">Add {activeTab === 'notices' ? 'Notice' : 'Event'}</h3>
                            <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-slate-500" /></button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {activeTab === 'notices' ? (
                                <>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                                        <input required type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl"
                                            value={noticeForm.title} onChange={e => setNoticeForm({...noticeForm, title: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Content</label>
                                        <textarea required className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl h-24"
                                            value={noticeForm.content} onChange={e => setNoticeForm({...noticeForm, content: e.target.value})}></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                                        <input type="date" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl"
                                            value={noticeForm.date} onChange={e => setNoticeForm({...noticeForm, date: e.target.value})} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Event Title</label>
                                        <input required type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl"
                                            value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                                        <textarea required className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl h-20"
                                            value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})}></textarea>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                                            <input required type="date" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl"
                                                value={eventForm.event_date} onChange={e => setEventForm({...eventForm, event_date: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Location</label>
                                            <input required type="text" className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl"
                                                value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Type</label>
                                        <select className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl"
                                            value={eventForm.type} onChange={e => setEventForm({...eventForm, type: e.target.value})}>
                                            <option value="academic">Academic</option>
                                            <option value="social">Social</option>
                                            <option value="meeting">Meeting</option>
                                            <option value="holiday">Holiday</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors mt-4">
                                {activeTab === 'notices' ? 'Publish Notice' : 'Schedule Event'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
