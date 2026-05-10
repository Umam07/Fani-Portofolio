"use client";

import { motion } from "motion/react";
import { ArrowRight, MapPin, Globe } from "lucide-react";


export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] as const },
    },
  };


  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-15%] left-[-10%] w-[55%] h-[55%] bg-accent/[0.07] blur-[160px] rounded-full"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], x: [0, -40, 0], y: [0, -25, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] bg-accent/[0.05] blur-[140px] rounded-full"
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-20 items-center"
        >

          {/* ── LEFT: Copy ── */}
          <div className="flex flex-col gap-8">

            {/* Greetings Label */}
            <motion.div variants={itemVariants}>
              <span className="text-xs font-bold text-accent uppercase tracking-[0.3em]">Greetings!</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-5xl md:text-[5.5rem] font-normal leading-[1.05] tracking-tighter">
              <span className="block text-xl md:text-2xl font-semibold text-muted-foreground mb-3 tracking-normal">
                I'm
              </span>
              <span className="text-foreground">Muhammad</span>
              <br />
              <span className="relative inline-block text-foreground">
                Fani Abdillah
                {/* animated underline */}
                <motion.span
                  className="absolute -bottom-2 left-0 h-[4px] bg-accent/40 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                />
              </span>
            </motion.h1>

            {/* Role */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="w-10 h-px bg-accent/50" />
              <span className="text-accent text-lg md:text-xl font-bold tracking-widest uppercase">Product (UI/UX) Designer/UI Engineer</span>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="max-w-xl flex flex-col gap-6">
              <p className="text-lg md:text-xl font-medium text-foreground italic leading-tight">
                Aspire to push the limits of avant-garde design.
              </p>
              
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                <span className="text-foreground font-semibold">Product Designer (3,5 years)</span> across insurance, finance, SaaS, telco, and consumer sectors — solving real problems through scalable, behavior-driven design with measurable impact.
              </p>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Design beyond interfaces. Turning design into a growth catalyst through deep behavioral thinking and a critical sociology lens, transforming complexity into clear, actionable product experiences.
              </p>

              <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed border-l-2 border-accent/20 pl-4 py-1 italic">
                In my spare time, I swing the charts across markets (stocks-crypto), binge-watching geopolitics, memes (also sh*tpost), and cultural dynamics.
              </p>
            </motion.div>


            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
              <a
                href="#work"
                className="px-8 py-4 bg-foreground text-background rounded-2xl font-black flex items-center gap-3 hover:bg-accent hover:text-white transition-all duration-300 shadow-2xl shadow-foreground/10 group cursor-pointer"
              >
                See My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 glass border-foreground/5 rounded-2xl font-bold hover:bg-foreground/5 transition-all active:scale-95 text-foreground cursor-pointer"
              >
                Get in touch
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT: Profile Card (Bento Style) ── */}
          <motion.div 
            variants={itemVariants} 
            className="hidden lg:flex flex-col justify-center items-center"
          >
            <div className="relative w-full max-w-[440px] grid grid-cols-2 gap-4 p-2">
              
              {/* Location Card (Spans 2 columns) */}
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="col-span-2 relative overflow-hidden group p-8 rounded-[2.5rem] border border-foreground/5 bg-gradient-to-br from-foreground/[0.03] to-transparent backdrop-blur-sm transition-colors hover:bg-foreground/[0.05] shadow-2xl shadow-foreground/5"
              >
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shadow-inner border border-accent/20">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1.5">Based in</p>
                      <h3 className="text-2xl font-black text-foreground tracking-tight">Jakarta, Indonesia</h3>
                    </div>
                  </div>

                </div>
                
                {/* Decorative background icon */}
                <Globe className="absolute -bottom-8 -right-8 w-40 h-40 text-foreground/[0.03] group-hover:text-accent/[0.08] group-hover:rotate-12 transition-all duration-700 -z-0" strokeWidth={0.5} />
              </motion.div>

              {/* Experience Card */}
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                className="col-span-2 relative overflow-hidden group p-8 rounded-[2.5rem] border border-foreground/5 bg-gradient-to-br from-foreground/[0.03] to-transparent backdrop-blur-sm transition-colors hover:bg-foreground/[0.05] shadow-2xl shadow-foreground/5"
              >
                <div className="relative z-10 flex items-center gap-8">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] mb-1.5">Experience</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-black text-foreground tracking-tighter">3,5</span>
                      <span className="text-2xl font-black text-accent">+</span>
                      <span className="ml-2 text-xl font-bold text-foreground/50 tracking-tight">Years in Design</span>
                    </div>
                  </div>
                </div>
                {/* Subtle background glow */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-500" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};