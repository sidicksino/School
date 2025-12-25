
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  surname: string;
  full_name: string;
  cycle: string;
  classe: string;
  role: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (surname: string, password: string) => Promise<{ data?: User, error?: string }>;
  register: (data: any) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Initialize session from Supabase
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (session) {
          // If we have a session, validate the user data
          const storedUser = localStorage.getItem('school_user');
          if (storedUser) {
            try {
              const parsedUser = JSON.parse(storedUser);
              if (parsedUser && parsedUser.id) {
                setUser(parsedUser);
              } else {
                // Session exists but local data is corrupt -> fetch profile or force login if critical
                console.warn('Session valid but local user data missing/corrupt');
                // Optional: fetch user profile from DB here if needed
              }
            } catch {
               // Ignore JSON parse errors
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Force cleanup if session check fails hard
        localStorage.removeItem('school_user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event);
      
      if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('school_user');
        localStorage.removeItem('sb-access-token'); // Clear Supabase internal token if present
        localStorage.removeItem('sb-refresh-token');
      } else if (event === 'SIGNED_IN' && session) {
         // We usually set user in login() but this catches external/auto logins
         // Ideally fetch fresh profile here if user is null
      } else if (event === 'TOKEN_REFRESHED') {
         // Session refreshed, all good
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (surname: string, password: string) => {
    try {
      // Call Supabase RPC 'login_student'
      const { data, error } = await supabase.rpc('login_student', {
        p_surname: surname,
        p_password: password
      });

      if (error) throw error;

      // RPC returns { success: true, student: { ... } } or { error: '...' }
      if (data.error) {
         throw new Error(data.error);
      }

      if (data.success && data.student) {
        setUser(data.student);
        // We still set this for synchronous availability, but onAuthStateChange is the source of truth
        localStorage.setItem('school_user', JSON.stringify(data.student));
        return { data: data.student };
      }
      
      return { error: 'Invalid response from server' };
    } catch (err: any) {
        console.error('Login error:', err);
        return { error: err.message || 'Login failed' };
    }
  };

  const register = async (formData: any) => {
    try {
        // Call Supabase RPC 'register_student'
        const { data, error } = await supabase.rpc('register_student', {
            p_surname: formData.surname,
            p_full_name: formData.fullname,
            p_cycle: formData.cycle,
            p_classe: formData.classe,
            p_phone: formData.phone,
            p_password: formData.password,
            p_terms: formData.terms
        });

        if (error) throw error;
        
        if (data.error) {
            throw new Error(data.error);
        }

        return { };
    } catch (err: any) {
        console.error('Registration error:', err);
        return { error: err.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('school_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
