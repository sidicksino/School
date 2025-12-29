import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface Course {
    id: string;
    name: string;
    code: string;
    teacher_id?: string;
    classe: string;
    description?: string;
}

export const useCourses = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                let query = supabase.from('subjects').select('*');

                // RBAC: Class-Based Filtering
                if (user?.role === 'student' && user.classe) {
                    query = query.eq('classe', user.classe);
                }
                // Optional: Teachers might only see courses they teach?
                // if (user?.role === 'teacher') {
                //    query = query.eq('teacher_id', user.id);
                // }

                const { data, error } = await query;

                if (error) throw error;
                setCourses(data || []);
            } catch (err: any) {
                console.error('Error fetching courses:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchCourses();
        }
    }, [user]);

    return { courses, loading, error };
};
