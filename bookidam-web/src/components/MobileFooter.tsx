"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Ticket, User } from 'lucide-react';

const MobileFooter = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'HOME', icon: Home, href: '/' },
    { name: 'EXPLORE', icon: Compass, href: '/events' },
    { name: 'TICKETS', icon: Ticket, href: '/book' },
    { name: 'PROFILE', icon: User, href: '/login' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 md:hidden">
      <div className="relative group overflow-hidden">
        {/* Glow effect at the top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#00A372]/50 to-transparent blur-[2px]" />
        
        {/* Main bar with glassmorphism */}
        <div className="bg-[#0D1B1B]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex justify-around items-center py-3 shadow-[0_-8px_40px_-15px_rgba(0,0,0,0.5)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-1.5 transition-all duration-300"
              >
                <div className={`transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>
                  <Icon
                    size={24}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={`transition-colors duration-300 ${
                      isActive ? 'text-[#00A372]' : 'text-white/40'
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] font-bold tracking-widest transition-colors duration-300 ${
                    isActive ? 'text-[#00A372]' : 'text-white/40'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileFooter;
