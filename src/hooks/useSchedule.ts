import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface ScheduleItem {
    id: string;
    day_of_week: string;
    start_time: string;
    end_time: string;
    subject: string;
    room?: string;
    classe: string;
}

export const useSchedule = () => {
    const { user } = useAuth();
    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setLoading(true);
                let query = supabase.from('schedule').select('*');

                // RBAC: Class-Based Filtering
                if (user?.role === 'student' && user.classe) {
                    query = query.eq('classe', user.classe);
                }
                // Ensure ordering
                query = query.order('day_of_week').order('start_time');

                const { data, error } = await query;

                if (error) throw error;
                setSchedule(data || []);
            } catch (err: any) {
                console.error('Error fetching schedule:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchSchedule();
        }
    }, [user]);

    return { schedule, loading, error };
};
