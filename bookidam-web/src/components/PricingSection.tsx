"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function PricingSection() {
  const tiers = [
    {
      name: "STANDARD",
      price: "$149",
      features: ["Standard Entry", "Access to Main Stage", "Free Soft Drinks", "Event Souvenir"],
      highlight: false
    },
    {
      name: "VIP ACCESS",
      price: "$399",
      features: ["Front Row Seating", "Backstage Pass", "Gourmet Lunch", "Priority Parking", "Networking Lounge"],
      highlight: true
    },
    {
      name: "PREMIUM",
      price: "$249",
      features: ["Reserved Seating", "Speaker Meet & Greet", "Workshop Access", "Digital Materials"],
      highlight: false
    }
  ];

  return (
    <section className="w-full bg-white py-24 md:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#00A372] font-bold tracking-[0.2em] text-sm uppercase mb-4">Choose your style</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-eventry-dark uppercase">Pricing Plans</h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-gray-500 font-medium max-w-sm"
          >
            We offer flexible pricing options to suit your needs, whether you're a solo attendee or a large corporate team.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-[3rem] border flex flex-col transition-all duration-500 ${
                tier.highlight 
                  ? "bg-eventry-dark text-white border-eventry-dark shadow-2xl scale-105" 
                  : "bg-transparent text-eventry-dark border-gray-100 hover:border-gray-200"
              }`}
            >
              <p className={`font-black text-xs tracking-[0.3em] uppercase mb-8 ${tier.highlight ? "text-[#00A372]" : "text-gray-400"}`}>
                {tier.name}
              </p>
              
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-5xl md:text-6xl font-black tracking-tighter">{tier.price}</span>
                <span className={`text-sm font-bold uppercase tracking-widest ${tier.highlight ? "text-gray-400" : "text-gray-400"}`}>/ TICKET</span>
              </div>

              <div className="space-y-4 mb-12">
                {tier.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="p-1 rounded-full bg-[#00A372]/10">
                      <Check size={14} className="text-[#00A372]" />
                    </div>
                    <span className={`text-sm font-bold tracking-wide ${tier.highlight ? "text-gray-200" : "text-gray-600"}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                className={`mt-auto w-full py-5 rounded-2xl font-black text-xs tracking-widest uppercase transition-all duration-300 ${
                  tier.highlight 
                    ? "bg-[#00A372] text-white hover:bg-[#00825e] shadow-xl shadow-primary-500/20" 
                    : "bg-eventry-dark text-white hover:bg-black"
                }`}
              >
                Choose plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
