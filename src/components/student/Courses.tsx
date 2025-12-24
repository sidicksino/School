import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth
import { BookOpen, User, Calculator, Beaker, Globe, PenTool } from 'lucide-react';

interface Course {
    id: string;
    name: string;
    code: string;
    coefficient: number;
    category: string;
}

export const Courses: React.FC = () => {
    const { user } = useAuth(); // Get current user
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchCourses();
        }
    }, [user]);

    const fetchCourses = async () => {
        try {
            // Use RPC to get courses specific to the student's class (Track S vs L)
            const { data, error } = await supabase
                .rpc('get_student_courses', { p_student_id: user?.id });
            
            if (error) throw error;
            setCourses(data || []);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    // Helper to pick icons based on subject code
    const getIcon = (code: string) => {
        const c = code.toUpperCase();
        if (c.includes('MATH')) return Calculator;
        if (c.includes('PC') || c.includes('SVT')) return Beaker;
        if (c.includes('ANG') || c.includes('AR') || c.includes('HG')) return Globe;
        return PenTool; // Default for Lit/Philo
    };

    return (
        <DashboardLayout>
             <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-orange-500" />
                            My Courses
                        </h2>
                        <p className="text-slate-500 mt-1">
                            Curriculum for <span className="font-bold text-[#4D44B5]">{user?.classe}</span>
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-10 text-slate-400">Loading curriculum...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => {
                            const Icon = getIcon(course.code);
                            return (
                                <div key={course.id} className="border border-slate-100 dark:border-slate-700 rounded-2xl p-6 hover:shadow-md transition-all group bg-slate-50 dark:bg-slate-700/20">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-12 h-12 bg-white dark:bg-slate-600 text-orange-500 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                                            course.category === 'Scientifique' 
                                            ? 'bg-blue-100 text-blue-600' 
                                            : 'bg-pink-100 text-pink-600'
                                        }`}>
                                            {course.category}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{course.name}</h3>
                                    <p className="text-xs text-slate-400 font-mono mb-4">{course.code}</p>
                                    
                                    <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-200 dark:border-slate-600">
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                                            Coef: {course.coefficient}
                                        </span>
                                        <div className="flex items-center gap-1 opacity-50">
                                            <User className="w-4 h-4" />
                                            <span>Instructor</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};
