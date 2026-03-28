"use client";

import { useState, useEffect } from "react";
import Preloader from "./Preloader";
import { AnimatePresence, motion } from "framer-motion";

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after 3.8 seconds to allow animations to show
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="preloader"
            exit={{ 
              opacity: 0, 
              scale: 1.1,
              filter: "blur(20px)",
              transition: { duration: 0.8, ease: "easeInOut" } 
            }}
            className="fixed inset-0 z-[9999]"
          >
            <Preloader />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}
