"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aria"
];

export default function Preloader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-eventry-light dark:bg-eventry-dark overflow-hidden transition-colors duration-500">
      {/* Orbital Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Ring 1 */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-primary-500/10 rounded-full"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-white">
            <img src={avatars[0]} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-2xl border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-white">
            <img src={avatars[1]} alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Ring 2 */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] border border-blue-500/5 rounded-full"
        >
           <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-white">
            <img src={avatars[2]} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-white">
            <img src={avatars[3]} alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        {/* Ring 3 */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute w-[700px] h-[700px] md:w-[950px] md:h-[950px] border border-primary-500/5 rounded-full"
        >
          <div className="absolute top-1/4 left-0 -translate-x-1/2 w-10 h-10 rounded-2xl border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-white">
            <img src={avatars[4]} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-16 h-16 rounded-[2rem] border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden bg-white">
            <img src={avatars[5]} alt="" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.2 }}
          className="relative mb-12"
        >
          <div className="absolute inset-0 bg-primary-500 rounded-[2.5rem] blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative w-32 h-32 md:w-40 md:h-40 bg-white dark:bg-gray-900 rounded-[2.8rem] flex items-center justify-center border-2 border-primary-500/20 shadow-2xl overflow-hidden">
             {/* Large "B" Logo */}
             <span className="text-7xl md:text-8xl font-black text-primary-500 tracking-tighter select-none">B</span>
             
             {/* Decorative shimmer */}
             <motion.div 
                animate={{ x: ['100%', '-100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent -skew-x-12"
             />
          </div>
        </motion.div>

        {/* Text Animations */}
        <div className="text-center space-y-4 max-w-sm px-6">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl md:text-4xl font-black text-eventry-dark dark:text-white uppercase tracking-tighter leading-none"
          >
            Plan Events <br />
            <span className="text-primary-500 italic">Without the Stress.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed"
          >
            Organize venues, guests, and budgets — all in one simple and powerful platform.
          </motion.p>
        </div>

        {/* Progress Bar */}
        <div className="mt-16 w-48 h-1 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
           <motion.div 
             initial={{ x: "-100%" }}
             animate={{ x: "0%" }}
             transition={{ duration: 3, ease: "easeInOut" }}
             className="h-full bg-primary-500 shadow-[0_0_10px_rgba(0,163,114,0.5)]"
           />
        </div>
      </div>

      {/* Decorative Blob */}
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none"></div>
    </div>
  );
}
