"use client";

import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, ExternalLink } from "lucide-react";
import { FaMediumM, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";

export const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "muhammadfaniabdillah@gmail.com",
      href: "mailto:muhammadfaniabdillah@gmail.com",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "085882359540",
      href: "tel:+6285882359540",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Jakarta, Indonesia",
      href: "https://www.google.com/maps/search/Jakarta+Indonesia",
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn className="w-6 h-6" />,
      url: "https://www.linkedin.com/in/muhammadfaniabdillah",
      color: "hover:text-[#0077B5]",
    },
    {
      name: "Medium",
      icon: <FaMediumM className="w-6 h-6" />,
      url: "https://medium.com/@muhammadfaniabdillah",
      color: "hover:text-foreground",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="w-6 h-6" />,
      url: "https://wa.me/6285882359540",
      color: "hover:text-[#25D366]",
    },
  ];

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Left Column: Heading & Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">
              Let's craft your <br />
              <span className="text-accent italic">next big idea.</span>
            </h2>
            <p className="text-muted-foreground text-xl mb-12 leading-relaxed max-w-lg">
              Whether you have a specific project in mind or just want to chat 
              about design and tech, I'm all ears.
            </p>

            <div className="space-y-8">
              {contactInfo.map((info, i) => (
                <a
                  key={i}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 group"
                >
                  <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
                      {info.label}
                    </p>
                    <p className="text-lg font-semibold group-hover:text-accent transition-colors">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Connection & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between"
          >
            <div className="glass-card p-10 md:p-12 space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Send className="w-32 h-32" />
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Stay Connected</h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-5 glass rounded-2xl transition-all duration-300 active:scale-95 flex items-center gap-3 group ${social.color}`}
                    >
                      {social.icon}
                      <span className="font-bold text-sm">{social.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-10 border-t border-white/5">
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Ready to start a conversation? My inbox is always open 
                  for creative collaborations.
                </p>
                <a
                  href="mailto:muhammadfaniabdillah@gmail.com"
                  className="w-full py-5 bg-foreground text-background rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-all duration-500 shadow-2xl shadow-foreground/5"
                >
                  <Mail className="w-5 h-5" />
                  Drop me a message
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
