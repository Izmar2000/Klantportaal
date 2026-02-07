
import React, { useState } from 'react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, isDarkMode, toggleTheme }) => {
  const [email, setEmail] = useState('admin@nexus.io');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    if (email.includes('admin')) onLogin(UserRole.ADMIN);
    else onLogin(UserRole.CLIENT);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0d0d12] p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 mb-6">
            <span className="text-2xl font-bold">N</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Nexus CRM</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Welcome back. Please sign in to your dashboard.</p>
        </div>

        <div className="bg-white dark:bg-[#12121a] p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="admin@nexus.io"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-500 dark:text-gray-400">Remember me</label>
              </div>
              <a href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-4">
             <button 
               onClick={() => onLogin(UserRole.ADMIN)} 
               className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-indigo-500 transition-colors"
             >
              Quick Admin Login
             </button>
             <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
             <button 
               onClick={() => onLogin(UserRole.CLIENT)} 
               className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-indigo-500 transition-colors"
             >
              Quick Client Login
             </button>
          </div>
        </div>
        
        <div className="text-center">
          <button 
            onClick={toggleTheme}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
          >
            Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
