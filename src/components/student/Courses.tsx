import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../layout/DashboardLayout';
import { supabase } from '../../lib/supabase';
import { BookOpen, User } from 'lucide-react';

interface Subject {
    id: string;
    name: string;
    code: string;
    coefficient: number;
    // series/cycle if needed
}

export const Courses: React.FC = () => {
    const [courses, setCourses] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            // Fetch all subjects for now (filtering by cycle/series would be better in a real app)
            // Assuming the schema allows public read on subjects.
            const { data, error } = await supabase
                .from('subjects')
                .select('*')
                .order('name');
            
            if (error) throw error;
            setCourses(data || []);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
             <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold font-heading text-slate-900 dark:text-white flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-orange-500" />
                        My Courses
                    </h2>
                </div>

                {loading ? (
                    <div className="text-center py-10 text-slate-400">Loading courses...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div key={course.id} className="border border-slate-100 dark:border-slate-700 rounded-2xl p-6 hover:shadow-md transition-all group">
                                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 text-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <span className="font-bold text-lg">{course.code}</span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{course.name}</h3>
                                
                                <div className="flex items-center justify-between text-sm text-slate-500 mt-4">
                                    <span className="bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                                        Coef: {course.coefficient}
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <User className="w-4 h-4" />
                                        <span>Teacher Name</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};
