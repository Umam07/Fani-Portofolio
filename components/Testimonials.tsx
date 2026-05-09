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
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-32 px-6 bg-neutral-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 relative group hover:border-accent/30 transition-all duration-500"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-accent/10 group-hover:text-accent/20 transition-colors" />
              
              <div className="flex items-center gap-4 mb-8">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random&color=fff&bold=true&size=128`}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/5 group-hover:ring-accent/30 transition-all"
                />
                <div>
                  <h3 className="font-bold text-lg leading-tight group-hover:text-accent transition-colors">
                    {testimonial.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span className="font-medium">{testimonial.role}</span>
                    <span className="opacity-20">•</span>
                    <span className="font-medium">{testimonial.company}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < (testimonial.rating || 5) ? "fill-accent text-accent" : "text-white/10"}`} 
                  />
                ))}
              </div>

              <blockquote className="text-muted-foreground leading-relaxed mb-8 italic relative z-10">
                "{testimonial.content}"
              </blockquote>

              <div className="pt-6 border-t border-white/5 space-y-3">
                {testimonial.relationship && (
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                    <User2 className="w-3 h-3 text-accent" />
                    {testimonial.relationship}
                  </div>
                )}
                <div className="flex justify-between items-center">
                  {testimonial.date && (
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                      <CalendarDays className="w-3 h-3" />
                      {new Date(testimonial.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </div>
                  )}
                  {testimonial.linkedinUrl && (
                    <a 
                      href={testimonial.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 rounded-lg hover:bg-accent hover:text-white transition-all"
                    >
                      <FaLinkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
