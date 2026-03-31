"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Supabase Auth listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <div 
        className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl rounded-full px-6 py-3 transition-all duration-500 border ${
          isScrolled 
            ? "bg-white/70 dark:bg-black/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] border-white/60 dark:border-white/10" 
            : "bg-white/40 dark:bg-black/20 backdrop-blur-lg shadow-lg border-white/20 dark:border-white/5"
        }`}
      >
        <Link href="/" className="flex items-center gap-1 group">
          <div className="relative h-7 w-32 md:h-8 md:w-36 transition-transform duration-300 group-hover:scale-105">
            <img 
              src={isScrolled ? "/logo-dark.png" : "/logo-white.png"} 
              alt="BOOKIDAM" 
              className="w-full h-full object-contain transition-opacity duration-500"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "HOME", href: "/" },
            { label: "ABOUT", href: "/about" },
            { label: "EVENTS", href: "/events" },
          ].map((link) => (
            <Link 
              key={link.label}
              href={link.href} 
              className={`text-xs font-bold tracking-wider hover:text-primary-500 transition-colors uppercase ${
                pathname === link.href ? "text-primary-500" : (isScrolled ? "text-eventry-dark dark:text-white/70" : "text-white/90")
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href={user ? "/profile" : "/login"}
            className={`text-xs font-bold tracking-wider hover:text-primary-500 transition-colors uppercase ${
              pathname === "/login" || pathname === "/profile" ? "text-primary-500" : (isScrolled ? "text-eventry-dark dark:text-white/70" : "text-white/90")
            }`}
          >
            {user ? "PROFILE" : "LOGIN"}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link 
            href="/book" 
            className="px-6 py-2.5 bg-primary-500 text-white text-sm font-bold tracking-wide rounded-full hover:bg-primary-600 hover:-translate-y-0.5 transition-all shadow-md hover:shadow-primary-500/30"
          >
            Book an event
          </Link>
          {user && (
            <button 
              onClick={async () => { await supabase.auth.signOut(); }}
              className={`hidden md:block text-xs font-bold tracking-wider transition-colors uppercase ${
                isScrolled ? "text-gray-500 hover:text-red-500" : "text-white/60 hover:text-red-400"
              }`}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
