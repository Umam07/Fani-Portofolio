"use client";

import { motion } from "motion/react";
import { ArrowRight, MousePointer2, Sparkles } from "lucide-react";

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.3
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.23, 1, 0.32, 1] as const,
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-accent/10 blur-[140px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-accent/10 blur-[140px] rounded-full" 
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, var(--foreground) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div className="flex flex-col items-start gap-8">
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tight"
            >
              <span className="text-muted-foreground text-2xl md:text-4xl font-medium block mb-2">Greetings! I’m</span>
              <span className="text-foreground">Muhammad <br /> Fani Abdillah</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <span className="text-accent text-xl md:text-2xl font-bold tracking-wide uppercase">Product (UI/UX) Designer</span>
              <div className="w-20 h-1 bg-accent/30 rounded-full" />
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed font-medium"
            >
              Dedicated to pushing the boundaries of <span className="text-foreground">avant-garde design</span>, 
              I am a UI/UX Designer with over 3 years of experience spanning Finance, SaaS, Telco, and Consumer Goods. 
              I leverage my <span className="text-foreground italic">sociology background</span> to deliver empathetic, 
              user-centric solutions that matter.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-5 mt-4">
              <a 
                href="#work"
                className="px-8 py-4 bg-foreground text-background rounded-2xl font-black flex items-center gap-3 hover:bg-accent hover:text-white transition-all duration-300 shadow-2xl shadow-foreground/5 group cursor-pointer"
              >
                Explore Projects
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

          {/* Hero Visual Element */}
          <motion.div 
            variants={itemVariants}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 glass-card p-10 border-white/10 overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <MousePointer2 className="w-6 h-6 text-accent animate-bounce" />
              </div>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-accent" />
                  </div>
                  <div className="space-y-2">
                    <div className="w-32 h-3 bg-white/10 rounded-full" />
                    <div className="w-20 h-2 bg-white/5 rounded-full" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:bg-accent/5 transition-colors duration-500" />
                  ))}
                </div>
                
                <div className="h-32 rounded-2xl bg-linear-to-br from-accent/20 to-transparent border border-accent/10 flex items-end p-4">
                  <div className="w-full space-y-2">
                    <div className="w-1/2 h-2 bg-accent/40 rounded-full" />
                    <div className="w-3/4 h-2 bg-accent/20 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Floating accents */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 blur-3xl rounded-full" />
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 border border-white/5 rounded-full animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 border border-white/5 rounded-full animate-[spin_20s_linear_infinite]" />
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
};

