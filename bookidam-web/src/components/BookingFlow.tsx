"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, CheckCircle2, Ticket, ArrowRight, MousePointer2 } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Explore Events",
    description: "Browse our curated collection of elite corporate summits and gatherings.",
    icon: <Search className="text-primary-500" size={24} />,
    color: "primary"
  },
  {
    id: 2,
    title: "Select & Customize",
    description: "Choose your preferred date, time slot, and exclusive ticket tier.",
    icon: <Calendar className="text-primary-500" size={24} />,
    color: "primary"
  },
  {
    id: 3,
    title: "Instant Confirmation",
    description: "Secure your place with our seamless concierge-style booking system.",
    icon: <CheckCircle2 className="text-primary-500" size={24} />,
    color: "primary"
  }
];

export default function BookingFlow() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-eventry-light dark:bg-eventry-dark py-32 px-6 lg:px-12 transition-colors duration-500 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#00A372] font-black tracking-[0.4em] text-xs md:text-sm uppercase mb-6"
          >
            THE BOOKING EXPERIENCE
          </motion.p>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-eventry-dark dark:text-white leading-[0.95] text-balance mb-8 uppercase"
          >
            How it works<span className="text-primary-500">.</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium"
          >
            Experience a seamless, high-end booking journey designed for professionals who value time and precision.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Steps List */}
          <div className="w-full lg:w-1/3 flex flex-col gap-8 order-2 lg:order-1">
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setActiveStep(idx)}
                className={`relative flex items-start gap-6 p-8 rounded-3xl cursor-pointer transition-all duration-500 border ${
                  activeStep === idx 
                    ? "glass-card-light dark:glass-card-dark border-primary-500/20 scale-105 shadow-2xl" 
                    : "border-transparent opacity-40 hover:opacity-100 hover:scale-[1.02]"
                }`}
              >
                <div className={`p-4 rounded-2xl ${activeStep === idx ? "bg-primary-500 text-white" : "bg-gray-100 dark:bg-white/5 text-gray-400"} transition-colors shadow-lg`}>
                   {step.icon}
                </div>
                <div>
                   <h3 className={`text-xl font-black uppercase tracking-tight mb-2 ${activeStep === idx ? "text-eventry-dark dark:text-white" : "text-gray-400"}`}>
                     {idx + 1}. {step.title}
                   </h3>
                   <p className="text-sm font-medium leading-relaxed text-gray-500 dark:text-gray-400">
                     {step.description}
                   </p>
                </div>
                {activeStep === idx && (
                  <motion.div 
                    layoutId="step-indicator"
                    className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary-500 rounded-full blur-sm"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Prototype Window */}
          <div className="w-full lg:w-2/3 order-1 lg:order-2">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[16/10] glass-card-light dark:glass-card-dark border-white/40 dark:border-white/5 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] p-1 group"
            >
              {/* Window Header */}
              <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 dark:border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-400/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/50"></div>
                <div className="ml-4 h-6 w-48 bg-gray-100 dark:bg-white/5 rounded-full flex items-center px-4">
                  <span className="text-[10px] text-gray-400 truncate tracking-tight">bookidam.com/events/global-tech-summit</span>
                </div>
              </div>

              {/* Dynamic Content */}
              <div className="relative h-full flex items-center justify-center p-8 bg-white/30 dark:bg-black/10 backdrop-blur-3xl overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeStep === 0 && (
                    <motion.div
                      key="step1"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="w-full h-full grid grid-cols-2 gap-4"
                    >
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="bg-white dark:bg-white/5 rounded-2xl p-4 shadow-sm border border-white/20">
                          <div className="w-full h-24 bg-gray-100 dark:bg-white/5 rounded-xl mb-4"></div>
                          <div className="h-4 w-3/4 bg-gray-100 dark:bg-white/5 rounded mb-2"></div>
                          <div className="h-4 w-1/2 bg-gray-100 dark:bg-white/5 rounded"></div>
                        </div>
                      ))}
                      <div className="col-span-2 bg-gray-50/50 dark:bg-white/5 rounded-2xl p-4 flex items-center justify-between border-t border-gray-100 dark:border-white/5">
                        <div className="flex gap-2">
                           <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center"><Search size={14} className="text-primary-500"/></div>
                           <div className="h-8 w-32 bg-gray-200 dark:bg-white/10 rounded-xl"></div>
                        </div>
                        <div className="w-24 h-10 bg-primary-500 rounded-xl shadow-lg"></div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 1 && (
                    <motion.div
                      key="step2"
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 1.05, opacity: 0 }}
                      className="w-full flex flex-col gap-6"
                    >
                      <div className="flex gap-6">
                        <div className="w-1/3 aspect-[4/5] bg-gray-100 dark:bg-white/5 rounded-2xl shadow-inner border border-white/20"></div>
                        <div className="flex-1 space-y-4 py-4">
                           <div className="h-8 w-3/4 bg-eventry-dark dark:bg-white rounded-xl"></div>
                           <div className="h-4 w-full bg-gray-100 dark:bg-white/10 rounded"></div>
                           <div className="h-4 w-5/6 bg-gray-100 dark:bg-white/10 rounded"></div>
                           <div className="flex gap-4 pt-4">
                              <div className="h-12 w-32 bg-primary-500/10 border-2 border-primary-500 rounded-xl"></div>
                              <div className="h-12 w-32 bg-gray-100 dark:bg-white/10 rounded-xl"></div>
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div
                      key="step3"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center py-10"
                    >
                      <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-primary-500/30">
                        <CheckCircle2 size={40} className="text-white" />
                      </div>
                      <h4 className="text-2xl font-black uppercase text-eventry-dark dark:text-white mb-2">Booking Success!</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Your ticket is now active in your dashboard.</p>
                      
                      <div className="w-full max-w-sm glass-card-light dark:glass-card-dark p-6 border-primary-500/20 text-left">
                        <div className="flex items-center gap-4 mb-4">
                           <div className="p-3 bg-primary-500/10 rounded-xl"><Ticket size={24} className="text-primary-500"/></div>
                           <div>
                              <p className="text-[10px] font-black uppercase text-gray-400">Order ID #42901</p>
                              <p className="font-bold text-eventry-dark dark:text-white">Global Tech Summit</p>
                           </div>
                        </div>
                        <div className="h-px w-full bg-gray-100 dark:bg-white/10 mb-4"></div>
                        <div className="flex justify-between items-center">
                           <p className="text-xs font-bold text-gray-500">1x VIP Entry</p>
                           <p className="text-lg font-black text-[#00A372]">$199.00</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animated Mouse Pointer */}
                <motion.div
                  animate={{
                    x: activeStep === 0 ? 100 : activeStep === 1 ? -100 : 0,
                    y: activeStep === 0 ? 50 : activeStep === 1 ? -50 : 0,
                    scale: [1, 0.9, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute z-20 pointer-events-none text-primary-600 drop-shadow-xl opacity-80"
                >
                  <MousePointer2 size={32} />
                </motion.div>
              </div>

              {/* Progress Indicator */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 dark:bg-white/5">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="h-full bg-primary-500 shadow-[0_0_10px_rgba(0,163,114,0.5)]"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div 
           initial={{ y: 30, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
           className="mt-20 flex flex-col items-center gap-6"
        >
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Ready to secure your spot?</p>
          <div className="flex items-center gap-4">
            <button className="px-8 py-5 bg-[#0D1B1B] dark:bg-white text-white dark:text-[#0D1B1B] rounded-2xl font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-3 group">
              Start Exploring <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
