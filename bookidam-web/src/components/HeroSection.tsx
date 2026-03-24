"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Ticket } from "lucide-react";

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const services = [
    "CORPORATE SUMMITS",
    "PROFESSIONAL SEMINARS",
    "NETWORKING EVENTS",
    "BRAND EVENTS",
    "BUSINESS GATHERINGS",
    "COMMUNITY",
    "STRATEGY SESSIONS",
    "PRODUCT LAUNCHES",
    "INTIMATE CORPORATE GATHERINGS",
    "BRAND EVENTS"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [services.length]);

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
          {/* Animated Services */}
          <div className="flex flex-col text-left w-full lg:w-80 h-32 sm:h-28 overflow-hidden">
            <p className="text-xs font-semibold tracking-[0.2em] text-[#00A372] mb-3 uppercase">OUR SERVICES</p>
            <div className="relative h-16 flex items-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-2xl sm:text-3xl font-black absolute w-full leading-tight"
                >
                  {services[index]}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="text-sm font-bold opacity-60 mt-2 tracking-wide uppercase">Curated Event Experiences</p>
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
                Get your ticket<br /><span className="font-normal opacity-90 text-sm">now for 50% off</span>
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
