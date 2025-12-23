
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  surname: string;
  full_name: string;
  cycle: string;
  classe: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (surname: string, password: string) => Promise<{ error?: string }>;
  register: (data: any) => Promise<{ error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for session on mount
    const storedUser = localStorage.getItem('school_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('school_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (surname: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: surname, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.success && data.student) {
        setUser(data.student);
        localStorage.setItem('school_user', JSON.stringify(data.student));
        return { };
      }
      
      return { error: 'Invalid response from server' };
    } catch (err: any) {
        console.error('Login error:', err);
        return { error: err.message || 'Login failed' };
    }
  };

  const register = async (formData: any) => {
    try {
        const response = await fetch(`${API_URL}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
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
