'use client';
import Link from 'next/link';
import { LayoutDashboard, BarChart2, Bookmark, Sun, Moon } from 'lucide-react';
import { useUsers } from '../context/UserContext';

export default function Header() {
  const { theme, toggleTheme } = useUsers();

  return (
    <div className={`backdrop-blur-lg shadow-md ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="font-bold sm:text-2xl text-lg">HR Dashboard</h1>

        <nav className="space-x-6 flex items-center">
          <Link href="/" className="flex items-center gap-2 hover:text-yellow-500 transition duration-200">
            <LayoutDashboard size={20} />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          
          <Link href="/Analytics" className="flex items-center gap-2 hover:text-yellow-500 transition duration-200">
            <BarChart2 size={20} />
            <span className="hidden sm:inline">Analytics</span>
          </Link>
          
          <Link href="/Bookmarks" className="flex items-center gap-2 hover:text-yellow-500 transition duration-200">
            <Bookmark size={20} />
            <span className="hidden sm:inline">Bookmarks</span>
          </Link>

          <button 
            onClick={toggleTheme}
            className={`ml-4 p-2 rounded-full ${theme==='light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700'} transition duration-200`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>
    </div>
  );
}
