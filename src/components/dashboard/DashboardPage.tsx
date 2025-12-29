import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DashboardLayout } from '../layout/DashboardLayout';
import { WelcomeBanner } from './WelcomeBanner';
import { StatsCards } from './StatsCards';
import { AttendanceChart } from './AttendanceChart';
import { WeeklyAttendance } from './WeeklyAttendance';
import { GenericTable } from './GenericTable';
import { RoleGuard } from '../auth/RoleGuard';
import { TodaysSchedule } from './TodaysSchedule';
import { UserManagement } from '../admin/UserManagement';
import { ClassManagement } from '../admin/ClassManagement';
import { SubjectManagement } from '../admin/SubjectManagement';

// Helper Component for Teacher View
const TeacherDashboardContent: React.FC<{ user: any }> = ({ user }) => {
    const [classes, setClasses] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchClasses = async () => {
            const { data } = await import('../../lib/supabase').then(m => m.supabase.rpc('get_teacher_classes_list', { p_teacher_id: user.id }));
            if (data) setClasses(data);
            setLoading(false);
        };
        fetchClasses();
    }, [user]);

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm">
                <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">My Classes</h3>
                <div className="space-y-3">
                    {loading ? <div className="p-4 text-center text-slate-400">Loading classes...</div> : classes.length === 0 ? (
                        <div className="p-4 text-center text-slate-400 italic">No classes assigned.</div>
                    ) : (
                        classes.map((cls, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                                        {cls.class_name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-700 dark:text-slate-200">{cls.class_name} - {cls.subject_name}</p>
                                        <p className="text-xs text-slate-500">{cls.student_count} Students</p>
                                    </div>
                                </div>
                                <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Manage
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
            
            <GenericTable 
                title="Recent Activity" 
                data={{
                    headers: ['Student', 'Action', 'Time', 'Status'],
                    rows: [
                        ['Amadou Diallo', 'Submitted Assignment', '2 mins ago', 'Pending'],
                        ['Fatima Zara', 'Grade Updated', '1 hour ago', 'Completed'],
                        ['Moussa Koné', 'Attendance Marked', '3 hours ago', 'Present'],
                    ]
                }} 
            />
        </div>
    );
};

export const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const isStudent = user?.role === 'student';
    const isTeacher = user?.role === 'teacher';
    const isAdmin = user?.role === 'admin';

    // Mock Data for Tables (Teachers / Admin Logs)
    const teachersData = {
        headers: ['Name', 'Subject', 'Email', 'Status'],
        rows: [
            ['Mr. Ousmane', 'Mathematics', 'ousmane@academy.td', 'Active'],
            ['Mme. Fatime', 'Physics', 'fatime@academy.td', 'In Class'],
            ['Mr. John', 'English', 'john@academy.td', 'Active'],
        ]
    };

    return (
        <DashboardLayout>
             <WelcomeBanner />
             {/* Stats Row */}
             <StatsCards />

             {/* Main Content Grid */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column (Main) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Student View */}
                    {isStudent && (
                        <div className="space-y-8">
                            <WeeklyAttendance />
                            {/* Student can also have a 'Recent Grades' summary here if requested later */}
                        </div>
                    )}

                    {/* Teacher View */}
                    {isTeacher && (
                        <TeacherDashboardContent user={user} />
                    )}

                    {/* Admin View */}
                    {isAdmin && (
                        <div className="space-y-8">
                            {/* Academic Management - Classes & Subjects */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <ClassManagement />
                                <SubjectManagement />
                            </div>

                             {/* User Management Section */}
                             <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-l-4 border-l-purple-500">
                                <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-6">User Management</h3>
                                <UserManagement />
                             </div>
                        </div>
                    )}
                </div>

                {/* Right Column (Side Widgets) */}
                <div className="space-y-8">
                    {/* Notice Board */}
                    <div className="bg-[#4D44B5] text-white p-6 rounded-3xl shadow-lg shadow-indigo-200 dark:shadow-none">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                             Notice Board
                        </h3>
                        <div className="space-y-3">
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                <p className="text-xs text-indigo-200 mb-1">Dec 25, 2024</p>
                                <p className="text-sm font-medium">Christmas Holiday starts tomorrow! School closed until Jan 5th.</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                <p className="text-xs text-indigo-200 mb-1">Jan 05, 2025</p>
                                <p className="text-sm font-medium">Term 1 Exams Results will be published on the portal.</p>
                            </div>
                        </div>
                        <button className="w-full mt-4 py-2 bg-white text-[#4D44B5] rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors">
                            View All Notices
                        </button>
                    </div>

                    {/* Quick Access / Calendar / Schedule */}
                    {isStudent ? (
                        <TodaysSchedule />
                    ) : (
                        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm">
                            <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">Upcoming Events</h3>
                             <div className="space-y-4">
                                <div className="flex gap-3 items-start">
                                    <div className="bg-orange-100 text-orange-600 w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0">
                                        <span className="text-xs font-bold">JAN</span>
                                        <span className="text-lg font-bold leading-none">15</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">Parent Meeting</p>
                                        <p className="text-xs text-slate-500">10:00 AM - Main Hall</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0">
                                        <span className="text-xs font-bold">FEB</span>
                                        <span className="text-lg font-bold leading-none">01</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-700 dark:text-slate-200 text-sm">Science Fair</p>
                                        <p className="text-xs text-slate-500">All Day - Campus</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

             </div>
        </DashboardLayout>
    );
};
