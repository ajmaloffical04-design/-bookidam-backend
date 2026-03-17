"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50&h=50&fit=crop"
  ];

  return (
    <section className="w-full bg-eventry-light py-24 md:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-[#00A372] font-bold tracking-[0.2em] text-sm md:text-base uppercase mb-6">
            Everything you need
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-eventry-dark max-w-5xl leading-tight">
            Seamless event management with a premium touch.
          </h2>
        </motion.div>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 pb-12"
        >
          <p className="text-lg text-gray-600 leading-relaxed md:text-left flex-1">
            Whether you are organizing a massive music festival, a professional corporate summit, or an intimate gathering, we provide the tools to make it unforgettable.
          </p>

          {/* Attendees / Stats */}
          <div className="flex flex-col items-center md:items-start flex-1 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-12 w-full md:w-auto">
            <h3 className="text-4xl font-bold text-eventry-dark mb-2">80+</h3>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Successful Events</p>
            
            {/* Avatars */}
            <div className="flex -space-x-3">
              {avatars.map((url, i) => (
                <img 
                  key={i} 
                  src={url} 
                  alt="Attendee" 
                  className="w-10 h-10 rounded-full border-2 border-eventry-light object-cover relative"
                  style={{ zIndex: avatars.length - i }}
                />
              ))}
              <div 
                className="w-10 h-10 rounded-full border-2 border-eventry-light bg-[#00A372] text-white flex items-center justify-center text-xs font-bold relative z-0"
              >
                +2k
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
