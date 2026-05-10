"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [loading]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background Decorative Blobs */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600 blur-[120px] rounded-full animate-pulse" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-8"
            >
              fan<span className="text-accent">.</span>
            </motion.div>

            <div className="w-64 h-[2px] bg-white/5 rounded-full relative overflow-hidden mb-4">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${counter}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-bold tracking-[0.4em] text-neutral-500 uppercase flex items-center gap-4"
            >
              <span>Crafting digital magic</span>
              <span className="w-8 h-px bg-neutral-800" />
              <span className="text-accent">{counter}%</span>
            </motion.div>
          </div>

          {/* Reveal Curtain Detail */}
          <motion.div 
            initial={{ height: "0%" }}
            exit={{ height: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 w-full bg-accent z-20 pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
