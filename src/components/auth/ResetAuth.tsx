import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader2 } from 'lucide-react';

export const ResetAuth: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performReset = async () => {
      try {
        // 1. Force Supabase sign out
        await supabase.auth.signOut();
      } catch (error) {
        console.error('Error during signOut:', error);
      } finally {
        // 2. Clear all local storage and session storage
        localStorage.clear();
        sessionStorage.clear();

        // 3. Brief delay to ensure UI updates before redirect (optional but good for UX)
        setTimeout(() => {
          navigate('/login', { replace: true });
          // Force reload to ensure clean state
          window.location.reload();
        }, 1500);
      }
    };

    performReset();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-100 dark:border-slate-700">
        <Loader2 className="w-12 h-12 text-primary dark:text-sky-400 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2 font-heading">
          Resetting Session...
        </h2>
        <p className="text-slate-500 dark:text-slate-400">
          Cleaning up authentication data and redirecting you to login.
        </p>
      </div>
    </div>
  );
};
