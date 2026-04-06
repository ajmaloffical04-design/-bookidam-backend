"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Ticket, Sparkles } from "lucide-react";
import Link from "next/link";

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

  const [sparkles, setSparkles] = useState<{ top: string; left: string; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate sparkle positions only on the client to avoid hydration mismatch
    const generatedSparkles = [...Array(6)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 5,
    }));
    setSparkles(generatedSparkles);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [services.length]);

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-end bg-eventry-dark text-white overflow-hidden pb-16 pt-48 lg:pt-32 px-4 sm:px-6 lg:px-12">
      {/* Background Image with Advanced Overlays */}
      <div className="absolute inset-0 z-0 scale-105">
        <img
          src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          alt="Concert Crowd"
          className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-eventry-dark via-eventry-dark/80 to-transparent"></div>
        <div className="absolute inset-0 bg-glow-primary opacity-60"></div>
        
        {/* Animated Background Sparkles */}
        {sparkles.map((sparkle, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.4, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: sparkle.duration,
              repeat: Infinity,
              delay: sparkle.delay,
            }}
            className="absolute w-1 h-1 bg-primary-400 rounded-full blur-[1px]"
            style={{
              top: sparkle.top,
              left: sparkle.left,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center lg:items-start text-center lg:text-left">
        <motion.div
           initial={{ y: 80, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="mt-8 md:mt-0"
        >
          <p className="text-[#00A372] font-black tracking-[0.4em] text-[10px] sm:text-xs mb-4 md:mb-6 uppercase text-glow">
            THE FUTURE OF EVENTS
          </p>
          <h1 className="text-4xl min-[400px]:text-5xl sm:text-[5rem] md:text-8xl lg:text-[11rem] xl:text-[13rem] font-black tracking-tighter leading-[0.85] mb-8 md:mb-12 uppercase drop-shadow-2xl whitespace-nowrap w-full overflow-hidden text-ellipsis">
            BOOKIDAM<span className="text-primary-500">.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 pt-12 border-t border-white/10"
        >
          {/* Animated Services with Glass Effect */}
          <div className="flex flex-col text-left w-full lg:w-96 p-8 glass-card-dark border-white/5 hover:border-white/20 transition-all group overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-[10px] font-black tracking-[0.3em] text-[#00A372] mb-6 uppercase relative z-10">WE ORGANIZING</p>
            <div className="relative h-20 flex items-center z-10">
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl sm:text-4xl font-black absolute w-full leading-none tracking-tight"
                >
                  {services[index]}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className="text-sm font-bold opacity-60 mt-8 tracking-widest uppercase relative z-10">Curated Event Experiences</p>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-6 lg:gap-8 w-full lg:w-auto">
            <p className="text-sm md:text-base lg:text-lg font-medium opacity-80 text-center lg:text-right leading-relaxed max-w-sm text-balance">
              We are a modern event experience platform bringing people together through conferences and creative festivals to spark innovation.
            </p>

            <Link href="/book" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
              <button className="relative flex items-stretch overflow-hidden rounded-2xl bg-white text-eventry-dark font-bold transition-all duration-300 shadow-2xl hover:scale-[1.02] active:scale-[0.98]">
                <span className="flex items-center justify-center p-4 sm:p-5 bg-primary-500 text-white group-hover:bg-primary-600 transition-colors">
                  <Ticket className="w-6 h-6 sm:w-7 sm:h-7" />
                </span>
                <span className="flex flex-col justify-center px-6 py-4 sm:px-8 sm:py-5 bg-white dark:bg-gray-900 dark:text-white transition-colors leading-tight text-left text-sm sm:text-base">
                  <span className="block">Get your ticket</span>
                  <span className="font-normal opacity-60 text-[10px] sm:text-xs italic tracking-tight block mt-0.5">now for 50% off</span>
                </span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
