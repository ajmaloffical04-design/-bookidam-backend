"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { ThemeToggle } from "@/components/ThemeToggle";

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
        className={`pointer-events-auto flex items-center justify-between w-full max-w-6xl rounded-full px-6 py-3 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-2xl border border-gray-100" 
            : "bg-white shadow-xl"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="text-2xl font-black tracking-tighter text-eventry-dark">
            BOOKIDAM
          </span>
          <span className="text-primary-500 text-2xl leading-none">®</span>
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
                pathname === link.href ? "text-primary-500" : "text-eventry-dark"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link 
            href={user ? "/profile" : "/login"}
            className={`text-xs font-bold tracking-wider hover:text-primary-500 transition-colors uppercase ${
              pathname === "/login" || pathname === "/profile" ? "text-primary-500" : "text-eventry-dark"
            }`}
          >
            {user ? "PROFILE" : "LOGIN"}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle />
          <Link 
            href="/book" 
            className="px-6 py-2.5 bg-primary-500 text-white text-sm font-bold tracking-wide rounded-full hover:bg-primary-600 hover:-translate-y-0.5 transition-all shadow-md hover:shadow-primary-500/30"
          >
            Book an event
          </Link>
          {user && (
            <button 
              onClick={async () => { await supabase.auth.signOut(); }}
              className="hidden md:block text-xs font-bold tracking-wider text-gray-500 hover:text-red-500 transition-colors uppercase"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
