"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "SARAH JENKINS",
      role: "EVENT DIRECTOR",
      quote: "The best platform I've ever used for our annual tech summit. The interface is stunning and the coordination tools are seamless.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
      name: "MARCUS CHENG",
      role: "CONCERT PROMOTER",
      quote: "Bookidam handled 50,000+ tickets for our summer festivals without a single glitch. Absolutely premium service.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
      name: "ELENA RODRIGUEZ",
      role: "WEDDING PLANNER",
      quote: "Total game changer for my high-end clients. The 'Liquid Glass' aesthetic really matches our premium brand identity.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    }
  ];

  return (
    <section className="w-full bg-eventry-light py-24 md:py-32 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#00A372] font-bold tracking-[0.2em] text-sm uppercase mb-4">Attendee Feedback</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-eventry-dark uppercase">What they say</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-black/5 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="fill-[#00A372] text-[#00A372]" />
                ))}
              </div>
              
              <Quote size={40} className="text-[#00A372]/20 mb-6 group-hover:scale-110 transition-transform" />
              
              <p className="text-xl md:text-2xl font-bold text-eventry-dark leading-snug mb-8">
                "{t.quote}"
              </p>

              <div className="mt-auto flex flex-col items-center">
                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover mb-4 border-2 border-[#00A372]/20" />
                <p className="font-black text-xs tracking-widest text-[#00A372] uppercase">{t.name}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
