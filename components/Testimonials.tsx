"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Quote, Star, Building2, User2, CalendarDays } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { client } from "../lib/sanity";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  relationship: string;
  date: string;
  linkedinUrl: string;
}

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const query = `*[_type == "testimonial"] | order(date desc)`;
        const data = await client.fetch(query);
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) return null;
  // Duplicate to create infinite scroll effect
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-32 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6 tracking-tighter"
          >
            What people <span className="text-accent italic">say</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Feedback from colleagues and partners I've had the pleasure of working with.
          </motion.p>
        </div>
      </div>

      <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div 
          className="flex gap-6 md:gap-8 w-max px-4 md:px-8 hover:[animation-play-state:paused]"
          animate={{ x: ["0%", "-33.3333%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {duplicatedTestimonials.map((testimonial, i) => (
            <div
              key={`${testimonial.name}-${i}`}
              className="glass-card w-[320px] md:w-[450px] shrink-0 p-8 relative group hover:border-accent/30 transition-all duration-500 whitespace-normal flex flex-col h-full"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-accent/10 group-hover:text-accent/20 transition-colors" />
              
              <div className="flex items-center gap-4 mb-8">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random&color=fff&bold=true&size=128`}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-black/5 dark:ring-white/5 group-hover:ring-accent/30 transition-all"
                />
                <div>
                  <h3 className="font-bold text-lg leading-tight group-hover:text-accent transition-colors">
                    {testimonial.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span className="font-medium">{testimonial.role}</span>
                    <span className="opacity-30 hidden md:inline">•</span>
                    <span className="font-medium">{testimonial.company}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, idx) => (
                  <Star 
                    key={idx} 
                    className={`w-4 h-4 ${idx < (testimonial.rating || 5) ? "fill-accent text-accent" : "text-black/10 dark:text-white/10"}`} 
                  />
                ))}
              </div>

              <blockquote className="text-muted-foreground leading-relaxed mb-8 italic relative z-10 flex-1 line-clamp-6">
                "{testimonial.content}"
              </blockquote>

              <div className="pt-6 border-t border-black/5 dark:border-white/5 space-y-3 mt-auto">
                {testimonial.relationship && (
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                    <User2 className="w-3 h-3 text-accent" />
                    {testimonial.relationship}
                  </div>
                )}
                <div className="flex justify-between items-center">
                  {testimonial.date && (
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                      <CalendarDays className="w-3 h-3" />
                      {new Date(testimonial.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                  )}
                  {testimonial.linkedinUrl && (
                    <a 
                      href={testimonial.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-accent hover:text-white transition-all ml-auto"
                    >
                      <FaLinkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
