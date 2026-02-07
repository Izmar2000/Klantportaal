
import React, { useState } from 'react';
import { UserRole } from '../types';

interface TopNavProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  userRole: UserRole;
  onLogout: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
}

const COLORS = [
  { name: 'Indigo', value: 'indigo' },
  { name: 'Emerald', value: 'emerald' },
  { name: 'Rose', value: 'rose' },
  { name: 'Amber', value: 'amber' },
  { name: 'Sky', value: 'sky' },
];

const TopNav: React.FC<TopNavProps> = ({ 
  isDarkMode, 
  toggleTheme, 
  userRole, 
  onLogout,
  primaryColor,
  setPrimaryColor 
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-white dark:bg-[#0d0d12]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden sm:block">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-white/10 rounded-lg leading-5 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search projects, clients..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Color Picker Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2"
            title="Theme Color"
          >
            <div className={`w-4 h-4 rounded-full bg-${primaryColor}-500 shadow-sm shadow-${primaryColor}-500/50`}></div>
          </button>
          
          {showColorPicker && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowColorPicker(false)}></div>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/5 rounded-xl shadow-2xl z-50 p-2 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">Primary Color</div>
                <div className="grid grid-cols-1 gap-1">
                  {COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => {
                        setPrimaryColor(color.value);
                        setShowColorPicker(false);
                      }}
                      className={`flex items-center gap-3 w-full px-3 py-2 text-sm rounded-lg transition-colors ${
                        primaryColor === color.value 
                          ? 'bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/2'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full bg-${color.value}-500`}></div>
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        
        <button className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors relative" title="Notifications">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0d0d12]"></span>
        </button>

        <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-1 md:mx-2"></div>

        <button 
          onClick={onLogout}
          className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-2"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default TopNav;