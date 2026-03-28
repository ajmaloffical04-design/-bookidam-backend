"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AboutSection() {
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop"
  ];

  return (
    <section className="relative w-full bg-eventry-light dark:bg-eventry-dark py-32 md:py-48 px-6 lg:px-12 overflow-hidden transition-colors duration-500">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center px-6 py-2 rounded-full bg-white/40 dark:bg-primary-500/5 backdrop-blur-md text-primary-600 dark:text-primary-400 text-[10px] font-black tracking-[0.4em] uppercase border border-primary-500/20 mb-8 shadow-sm">
            Everything you need
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter text-eventry-dark dark:text-white max-w-5xl leading-[0.95] text-balance">
            Seamless management with a <span className="text-primary-500 italic">premium</span> touch.
          </h2>
        </motion.div>

        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12"
        >
          <div className="flex-1 glass-card-light dark:glass-card-dark p-10 md:p-14 border-white/20 dark:border-white/5 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-colors"></div>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-light relative z-10">
              Whether you are organizing high-end corporate summits, business functions, or exclusive tech gatherings, we provide the tools to make it <span className="text-eventry-dark dark:text-white font-bold">unforgettable</span>.
            </p>
          </div>

          {/* Attendees / Stats Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card-light dark:glass-card-dark p-10 border-white/20 dark:border-white/5 flex flex-col items-center justify-center text-center hover-lift">
              <h3 className="text-6xl font-black text-eventry-dark dark:text-white mb-2 tracking-tighter">80<span className="text-primary-500">+</span></h3>
              <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Successful Events</p>
            </div>
            
            <div className="glass-card-light dark:glass-card-dark p-10 border-white/20 dark:border-white/5 flex flex-col items-center justify-center text-center hover-lift">
               <div className="flex -space-x-4 mb-6">
                {avatars.map((url, i) => (
                  <img 
                    key={i} 
                    src={url} 
                    alt="Attendee" 
                    className="w-12 h-12 rounded-2xl border-4 border-white dark:border-gray-800 object-cover relative shadow-xl transform hover:-translate-y-2 transition-transform"
                    style={{ zIndex: avatars.length - i }}
                  />
                ))}
                <div 
                  className="w-12 h-12 rounded-2xl border-4 border-white dark:border-gray-800 bg-[#00A372] text-white flex items-center justify-center text-[10px] font-black relative z-0 shadow-xl"
                >
                  +2K
                </div>
              </div>
              <p className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Happy Clients</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
