"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  const logos = [
    "LOGOTYPE", "MAGNIFIER", "WAVES", "SPHERES", "LUMINA", "NEXUS", "KRYPTON", "VORTEX"
  ];

  return (
    <div className="w-full bg-eventry-dark text-white py-16 overflow-hidden border-t border-white/10">
      <div className="flex w-[200%]">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex whitespace-nowrap items-center w-full"
        >
          {/* Double the logos to make the loop seamless */}
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div 
              key={i} 
              className="px-12 text-2xl font-black tracking-widest text-[#00A372] opacity-80"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
