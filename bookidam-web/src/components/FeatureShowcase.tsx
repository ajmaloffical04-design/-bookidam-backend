"use client";

import { motion } from "framer-motion";
import { Ticket, Users, Sparkles, ArrowRight, UserCheck, Smartphone, MousePointer2 } from "lucide-react";

export default function FeatureShowcase() {
  return (
    <section className="w-full bg-eventry-light dark:bg-eventry-dark py-24 md:py-32 px-6 lg:px-12 overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#00A372] font-black tracking-[0.4em] text-xs uppercase mb-6"
          >
            THE EVENT OPERATING SYSTEM
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-eventry-dark dark:text-white uppercase leading-none"
          >
            All-in-one platform<span className="text-primary-500">.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-[300px] md:auto-rows-[350px]">
          {/* Top Left: Actions Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-4 rounded-[2.5rem] bg-[#1a1a1a] p-8 flex flex-col justify-center gap-4 relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl py-4 px-6 hover:bg-white/10 transition-all cursor-pointer group/pill">
              <span className="text-white/80 group-hover/pill:text-white text-sm font-bold tracking-wide">Personal Ticket Page</span>
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-lg group-hover/pill:scale-110 transition-transform"><ArrowRight size={14} /></div>
            </div>
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl py-4 px-6 hover:bg-white/10 transition-all cursor-pointer group/pill">
              <div className="w-8 h-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-white shadow-lg group-hover/pill:scale-110 transition-transform rotate-180"><ArrowRight size={14} /></div>
              <span className="text-white/80 group-hover/pill:text-white text-sm font-bold tracking-wide">Networking Games</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-center hover:bg-white/10 transition-all cursor-pointer group/pill">
              <span className="text-white/80 group-hover/pill:text-white text-sm font-bold tracking-wide uppercase tracking-[0.1em]">Community Building</span>
            </div>
          </motion.div>

          {/* Top Middle: Main Illustration Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-5 rounded-[2.5rem] bg-white dark:bg-white/5 p-10 flex flex-col items-center justify-center relative overflow-hidden shadow-xl border border-white/40 dark:border-white/5 group"
          >
            <div className="absolute inset-0 bg-glow-primary opacity-20 pointer-events-none"></div>
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-6">
                <div className="relative w-48 h-48 md:w-56 md:h-56">
                   <div className="absolute inset-0 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=EventHost&backgroundColor=b6e3f4" alt="Host" className="w-full h-full object-contain relative z-10" />
                   <div className="absolute -top-4 -right-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 z-20 hover:-translate-y-1 transition-transform">
                      <Ticket className="text-primary-500" size={24} />
                   </div>
                   <div className="absolute -bottom-2 -left-2 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-white/5 z-20 hover:scale-110 transition-transform">
                      <Users className="text-blue-500" size={20} />
                   </div>
                </div>
            </div>
          </motion.div>

          {/* Top Right: Small OS Text Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3 rounded-[2.5rem] bg-[#1a1a1a] p-10 flex flex-col justify-center relative overflow-hidden text-left group shadow-2xl"
          >
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-all"></div>
            <p className="text-base font-medium text-gray-400 leading-relaxed mb-0 relative z-10">
               <span className="text-primary-400 font-black tracking-tight">The all-in-one event OS</span> that makes ticketing seamless, check-ins instant, and your guests go, <span className="italic text-white font-black underline decoration-primary-500/40">"Whoa, that was smooth."</span>
            </p>
            <div className="mt-8 flex flex-col gap-1.5 opacity-20 group-hover:opacity-40 transition-all duration-700">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className={`h-2 rounded-full bg-white transition-all`} style={{ width: `${100 - (i * 15)}%`, opacity: 1 - (i * 0.2) }}></div>
               ))}
            </div>
          </motion.div>

          {/* Bottom Left: Brand Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-3 rounded-[2.5rem] bg-primary-500 p-8 flex items-center justify-center relative shadow-2xl group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative transform group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out">
               <Sparkles className="text-white w-24 h-24 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
            </div>
            <div className="absolute bottom-6 inset-x-0 text-center text-white/40 text-[10px] uppercase font-black tracking-[0.4em]">Liquid Design</div>
          </motion.div>

          {/* Bottom Middle: Check-in Illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-6 rounded-[2.5rem] bg-white dark:bg-white/5 border border-white/40 dark:border-white/5 shadow-xl overflow-hidden relative group"
          >
            <div className="absolute top-10 left-10 z-10 flex items-center gap-3">
               <span className="px-4 py-2 rounded-full bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">Check-in App</span>
               <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 overflow-hidden shadow-sm">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
               </div>
            </div>
            <div className="w-full h-full p-8 md:p-12 flex items-center justify-center bg-blue-50/30 dark:bg-transparent">
               <div className="relative w-full h-full max-w-sm rounded-[2rem] bg-white dark:bg-gray-900 p-8 flex flex-col items-center justify-end overflow-hidden border border-blue-100 dark:border-white/10 shadow-2xl">
                   <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none"></div>
                   <UserCheck className="w-32 h-32 text-blue-500 mb-6 drop-shadow-xl" />
                   <div className="w-full space-y-3 relative z-10">
                      <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-xl border border-blue-100 dark:border-blue-900/30">
                         <div className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                            <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest leading-none">Scanned</span>
                         </div>
                         <span className="text-[10px] font-bold text-gray-400">12:45 PM</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ x: "-100%" }}
                           whileInView={{ x: "0%" }}
                           viewport={{ once: false }}
                           transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                           className="h-full bg-blue-500 w-1/2" 
                         />
                      </div>
                   </div>
               </div>
            </div>
          </motion.div>

          {/* Bottom Right: Device Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3 rounded-[2.5rem] bg-primary-500/5 dark:bg-primary-500/10 p-10 flex flex-col items-center justify-center relative overflow-hidden group border border-primary-500/20 shadow-inner"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary-500/20 rounded-full blur-[80px] group-hover:blur-[100px] transition-all"></div>
            <div className="relative z-10 p-6 bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-2xl group-hover:-translate-y-3 transition-transform duration-500">
               <Smartphone className="w-16 h-16 text-primary-500" />
            </div>
            <p className="mt-8 text-[10px] font-black text-eventry-dark dark:text-white uppercase tracking-[0.3em] text-center relative z-10">Mobile Engagement</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
