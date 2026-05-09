"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Sparkles, GraduationCap, Palette, Globe, Camera, TrendingUp } from "lucide-react";

export const About = () => {
  const interests = [
    { icon: <GraduationCap className="w-4 h-4" />, label: "Sociology" },
    { icon: <TrendingUp className="w-4 h-4" />, label: "Finance" },
    { icon: <Globe className="w-4 h-4" />, label: "Geopolitics" },
    { icon: <Camera className="w-4 h-4" />, label: "Photography" },
    { icon: <Palette className="w-4 h-4" />, label: "Motion Graphics" },
  ];

  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] z-10 border border-white/10 shadow-2xl">
              <Image
                src="https://res.cloudinary.com/dr57ribr5/image/upload/v1778256547/Foto_Profile_rubdc1.jpg"
                alt="Muhammad Fani Abdillah"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-8 left-8 right-8 p-6 glass border-white/10 rounded-2xl backdrop-blur-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-sm font-medium leading-relaxed italic">
                  "Good design should feel human."
                </p>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/20 blur-[80px] rounded-full animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-purple-600/10 blur-[100px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-accent/20 rounded-[40px] -rotate-3 scale-105 pointer-events-none group-hover:rotate-0 transition-transform duration-700" />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border-white/5 w-fit"
              >
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold tracking-widest text-accent uppercase">Me in a nutshell</span>
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                Design with <span className="text-accent">empathy</span>, <br />
                insight, and play.
              </h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-medium">
              <p>
                A <span className="text-foreground">UX/UI Designer</span>, passionate about blending ideas 
                like a good mashup—whether in design, research, or storytelling.
              </p>
              <p>
                Design isn’t just about visuals, but about understanding people, culture, and decisions—something 
                my <span className="text-accent font-bold italic">sociology background</span> helps me turn into 
                user-centered solutions that actually work.
              </p>
              <p>
                I love building scalable systems and intuitive interfaces that make every interaction effortless. 
                Beyond design, I explore finance, culture, and geopolitics, while fueling creativity through 
                photography and motion graphics.
              </p>
              <p className="text-foreground font-semibold">
                At heart, I design with empathy, insight, and a playful touch—because good design should feel human.
              </p>
            </div>

            <div className="pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Interests & Fuel</p>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest) => (
                  <div 
                    key={interest.label}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl glass border-white/5 hover:border-accent/40 transition-colors group cursor-default"
                  >
                    <span className="text-muted-foreground group-hover:text-accent transition-colors">
                      {interest.icon}
                    </span>
                    <span className="text-sm font-semibold group-hover:text-foreground transition-colors">
                      {interest.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
