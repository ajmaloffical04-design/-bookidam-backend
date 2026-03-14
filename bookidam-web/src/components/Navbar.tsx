"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Search, User, LogOut } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("bookidam_auth");
    setIsLoggedIn(!!auth);
    
    // Listen for auth changes
    const handleAuthChange = () => {
      const auth = localStorage.getItem("bookidam_auth");
      setIsLoggedIn(!!auth);
    };
    window.addEventListener('storage', handleAuthChange);
    return () => window.removeEventListener('storage', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bookidam_auth");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-nav transition-all border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <Calendar className="text-white" size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            BOOKIDAM
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition">Events</Link>
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition">Venues</Link>
          <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition">About</Link>
          <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition">Contact</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition text-gray-600">
            <Search size={20} />
          </button>
          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
          <Link href="/book" className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-full hover:bg-primary-700 transition shadow-sm hover:shadow-md">
            Plan Your Event
          </Link>
          
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 hover:bg-red-50 hover:text-red-600 transition text-gray-700 group"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          ) : (
            <Link 
              href="/login"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 hover:bg-gray-50 transition text-gray-700"
              title="Login"
            >
              <User size={18} />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
