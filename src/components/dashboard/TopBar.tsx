import React from 'react';
import { Search, Bell, Mail, ChevronDown, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface TopBarProps {
    onToggleSidebar: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onToggleSidebar }) => {
    const { user } = useAuth();

    return (
        <div className="sticky top-0 z-30 bg-[#F3F4FF]/80 dark:bg-slate-900/80 backdrop-blur-md h-20 flex items-center justify-between px-4 md:px-8 py-4 transition-all duration-300">
            {/* Title & Mobile Toggle */}
            <div className="flex items-center gap-4">
                <button 
                    onClick={onToggleSidebar}
                    className="md:hidden p-2 bg-white dark:bg-slate-800 rounded-xl text-slate-600 dark:text-white shadow-sm hover:text-[#4D44B5] transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white font-heading truncate">
                    Dashboard
                </h2>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">
                {/* Search */}
                <div className="hidden md:flex items-center bg-white dark:bg-slate-800 rounded-full px-4 py-2.5 shadow-sm w-80">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search here..." 
                        className="bg-transparent border-none outline-none text-sm ml-3 w-full text-slate-600 dark:text-slate-200"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 shadow-sm hover:text-[#4D44B5] transition-colors relative">
                        <Mail className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <button className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 shadow-sm hover:text-[#4D44B5] transition-colors relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border border-white"></span>
                    </button>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                     <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-700 dark:text-white leading-tight">
                            {user?.full_name}
                        </p>
                        <p className="text-xs text-slate-400">Student</p>
                    </div>
                    <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden">
                        {/* Avatar Placeholder */}
                        <div className="w-full h-full bg-[#4D44B5] flex items-center justify-center text-white font-bold">
                            {user?.surname?.substring(0,2).toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
