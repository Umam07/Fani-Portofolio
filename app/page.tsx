"use client";

import { motion } from "motion/react";
import { ExternalLink, Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans selection:bg-accent/30 selection:text-white">
      <LoadingScreen />
      <Navbar />
      <Hero />
      <Projects />
      <About />
      <Contact />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-glass-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-bold tracking-tighter text-xl">Muhammad Fani Abdillah</span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase">Product (UI/UX) Designer</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Muhammad Fani Abdillah. All rights reserved.</p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <a href="https://www.linkedin.com/in/muhammadfaniabdillah" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="https://medium.com/@muhammadfaniabdillah" className="hover:text-foreground transition-colors">Medium</a>
            <a href="https://wa.me/6285882359540" className="hover:text-foreground transition-colors">WhatsApp</a>
          </div>
        </div>
      </footer>


    </main>
  );
}
