"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const handleToggle = useCallback(() => {
    if (isTransitioning) return;
    
    const newTheme = theme === "dark" ? "light" : "dark";
    const button = buttonRef.current;
    
    if (!button) {
      setTheme(newTheme);
      return;
    }

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const isDark = newTheme === "dark";
    const accentColor = isDark ? "45, 212, 191" : "15, 118, 110";

    // Container for all ripple layers
    const container = document.createElement("div");
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      pointer-events: none;
    `;

    // Layer 1: Subtle tinted wash
    const wash = document.createElement("div");
    wash.style.cssText = `
      position: absolute;
      inset: 0;
      background: ${isDark ? "rgba(10, 10, 10, 0.2)" : "rgba(255, 255, 255, 0.2)"};
      clip-path: circle(0px at ${x}px ${y}px);
      transition: clip-path 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease;
      will-change: clip-path, opacity;
    `;

    // Layer 2: Accent-colored ring that expands
    const ring = document.createElement("div");
    ring.style.cssText = `
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at ${x}px ${y}px, rgba(${accentColor}, 0.25) 0%, rgba(${accentColor}, 0.08) 40%, transparent 70%);
      clip-path: circle(0px at ${x}px ${y}px);
      transition: clip-path 0.9s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease;
      will-change: clip-path, opacity;
    `;


    container.appendChild(wash);
    container.appendChild(ring);
    document.body.appendChild(container);
    setIsTransitioning(true);

    // Switch theme immediately
    setTheme(newTheme);

    // Expand all layers with staggered timing
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wash.style.clipPath = `circle(${maxRadius}px at ${x}px ${y}px)`;
        ring.style.clipPath = `circle(${maxRadius * 1.1}px at ${x}px ${y}px)`;
      });
    });

    // Fade out the wash first
    setTimeout(() => {
      wash.style.opacity = "0";
    }, 500);

    // Fade out the accent ring
    setTimeout(() => {
      ring.style.opacity = "0";
    }, 600);

    // Clean up
    setTimeout(() => {
      container.remove();
      setIsTransitioning(false);
    }, 1100);
  }, [theme, setTheme, isTransitioning]);

  if (!mounted) return null;

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      className="relative p-2 rounded-xl glass border-white/5 hover:border-accent/40 transition-colors group overflow-hidden"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Moon className="w-5 h-5 text-accent" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <Sun className="w-5 h-5 text-accent" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </button>
  );
};
