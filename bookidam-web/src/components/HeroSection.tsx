"use client";

import { motion } from "framer-motion";
import { Ticket } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-end bg-eventry-dark text-white overflow-hidden pb-12 pt-32 px-6 lg:px-12">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Concert Crowd"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-eventry-dark via-eventry-dark/60 to-transparent"></div>
        {/* Subtle green/teal tint overlay */}
        <div className="absolute inset-0 bg-[#00A372] mix-blend-multiply opacity-20"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center lg:items-start text-center lg:text-left">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[4rem] sm:text-7xl lg:text-[10rem] font-black tracking-tighter leading-none mb-12 uppercase drop-shadow-xl"
        >
          BOOKIDAM
        </motion.h1>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 border-t border-white/20 pt-8"
        >
          {/* Details */}
          <div className="flex flex-col sm:flex-row gap-8 lg:gap-16 text-left w-full lg:w-auto">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-[#00A372] mb-1">LOCATION</p>
              <p className="text-base font-bold whitespace-nowrap">LOS ANGELES,<br/>CALIFORNIA</p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-[#00A372] mb-1">DATE</p>
              <p className="text-base font-bold uppercase whitespace-nowrap">MAY 12, 2026<br/>EMERALD EVENT ARENA</p>
            </div>
            <div className="flex items-end mb-1">
              <p className="text-lg md:text-xl font-bold uppercase whitespace-nowrap">GENERAL TICKET: $249</p>
            </div>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-6 w-full lg:w-auto">
            <p className="text-sm font-medium opacity-90 text-center lg:text-right leading-relaxed max-w-sm">
              We are a modern event experience platform bringing people together through conferences and creative festivals to spark innovation.
            </p>
            
            <button className="flex items-center overflow-hidden rounded-xl bg-[#e5f9f1] text-[#0D1B1B] font-bold group hover:-translate-y-1 transition-transform duration-300 shadow-xl shadow-primary-500/20">
              <span className="p-4 bg-white/60 group-hover:bg-white transition-colors">
                <Ticket className="text-primary-600" size={24} />
              </span>
              <span className="px-6 py-4 bg-[#00A372] text-white transition-colors group-hover:bg-[#00825e] leading-tight text-left">
                Get your ticket<br/><span className="font-normal opacity-90 text-sm">now for 50% off</span>
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
