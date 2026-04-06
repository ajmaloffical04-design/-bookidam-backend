"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
  return (
    <section className="w-full bg-white dark:bg-eventry-dark py-24 md:py-32 px-6 lg:px-12 transition-all duration-500 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-[#00A372] font-black tracking-[0.4em] text-xs uppercase mb-8">Ready to Scale?</p>
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-eventry-dark dark:text-white uppercase leading-[0.9] mb-10">
              Plan your next <span className="text-primary-500 underline underline-offset-8 decoration-primary-500/20">Elite Event</span> with us<span className="text-primary-500">.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-300 font-medium leading-relaxed mb-12 max-w-lg">
              We&apos;ve moved away from rigid tiers. Every event is unique, and we provide bespoke service tailored to your specific vision, scale, and corporate requirements.
            </p>
            
            <div className="flex flex-wrap gap-8">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 shadow-sm border border-primary-500/10"><Sparkles size={24} /></div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-eventry-dark dark:text-white uppercase tracking-tight leading-none mb-1">Bespoke Experience</span>
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Custom Tailored</span>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-sm border border-blue-500/10"><Calendar size={24} /></div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-eventry-dark dark:text-white uppercase tracking-tight leading-none mb-1">Full Lifecycle</span>
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">End-to-End Planning</span>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Contact Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", damping: 20 }}
            className="relative p-10 md:p-16 rounded-[4rem] bg-[#0D1B1B] dark:bg-white/5 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden group"
          >
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary-500/20 rounded-full blur-[100px] group-hover:bg-primary-500/30 transition-all duration-700"></div>
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all duration-700"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
               <motion.div 
                 whileHover={{ scale: 1.1, rotate: 12 }}
                 className="w-24 h-24 rounded-3xl bg-primary-500 text-white flex items-center justify-center mb-10 shadow-2xl shadow-primary-500/30"
               >
                  <Mail size={36} />
               </motion.div>
               
               <h3 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter leading-none">Request a Custom Proposal</h3>
               <p className="text-gray-400 dark:text-gray-300 font-medium mb-12 text-sm md:text-base text-balance lg:px-6 leading-relaxed">
                  Join hundreds of top-tier organizers who trust BOOKIDAM for their most important summits. Get a personalized proposal within 24 hours.
               </p>
               
               <div className="w-full flex flex-col gap-4">
                  <Link 
                    href="/contact" 
                    className="group flex items-center justify-center gap-3 w-full py-6 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] transition-all shadow-xl shadow-primary-500/20 active:scale-98"
                  >
                    Connect with Sales <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                  <a 
                    href="tel:+919876543210" 
                    className="flex items-center justify-center gap-3 w-full py-6 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] transition-all"
                  >
                    <Phone size={18} /> Institutional Support
                  </a>
               </div>
               
               <p className="mt-10 text-[9px] font-black text-gray-500 uppercase tracking-[0.5em] opacity-60">Global Availability • Concierge Service</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background Decorative Blob */}
      <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none -mb-24 -mr-24"></div>
    </section>
  );
}
