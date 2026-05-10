"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ChevronLeft, ChevronRight, X, Calendar, Clock, User, FileText, Cpu } from "lucide-react";
import { client } from "../lib/sanity";
import { urlFor } from "../lib/sanity.image";

interface Project {
  title: string;
  description: string;
  category: string[];
  client: string;
  image: any;
  year: string;
  duration: string;
  role: string;
  overview: string;
  challenge: string;
  solution: string;
  technologies: string[];
  docLink: string;
}

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  const projectsPerPage = 3;

  useEffect(() => {
    setMounted(true);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const query = `*[_type == "project"] | order(order asc, _createdAt desc)`;
      const data = await client.fetch(query);
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);


  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  return (
    <section id="work" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">
              Made with design <span className="text-accent italic">& curiosity</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Made with questions, shaped by design—this is my showcase of ideas turned real. 
              Explore a curated portfolio of carefully crafted digital experiences and creative solutions.
            </p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-white/5 mx-12 mb-6" />
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col justify-center items-center min-h-[400px] text-center">
            <p className="text-xl text-muted-foreground">No projects found in Sanity CMS.</p>
            <p className="text-sm text-muted-foreground mt-2">Go to /studio to add your first project!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
            <AnimatePresence mode="popLayout">
              {currentProjects.map((project, i) => (
                <motion.div 
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: i * 0.05,
                    ease: [0.23, 1, 0.32, 1] as const 
                  }}
                  onClick={() => setSelectedProject(project)}
                  style={{ 
                    willChange: "transform, opacity",
                    backfaceVisibility: "hidden",
                    transformStyle: "preserve-3d"
                  }}
                  className="backdrop-blur-lg border border-glass-border rounded-[20px] bg-background/80 group overflow-hidden cursor-pointer flex flex-col h-full"
                >
                <div className="aspect-[4/3] bg-neutral-900 relative overflow-hidden">
                  <img 
                    src={urlFor(project.image).url()} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                    <div className="bg-white text-black px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      View Details
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs font-bold text-accent px-2 py-1 bg-accent/10 rounded-md">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.category?.map(cat => (
                      <span key={cat} className="text-[10px] px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-muted-foreground uppercase tracking-widest font-bold">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          </div>
        )}

        {/* Pagination */}
        {mounted && totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-4 rounded-full glass border-white/5 disabled:opacity-20 transition-all hover:bg-accent hover:text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4 font-black tracking-widest text-sm">
              <span className="text-accent">{String(currentPage).padStart(2, '0')}</span>
              <span className="opacity-20">/</span>
              <span className="text-muted-foreground">{String(totalPages).padStart(2, '0')}</span>
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-4 rounded-full glass border-white/5 disabled:opacity-20 transition-all hover:bg-accent hover:text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            style={{ isolation: "isolate" }}
          >
            <div 
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setSelectedProject(null)}
            />
            
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ 
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              style={{ 
                willChange: "transform, opacity", 
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
              }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl rounded-[32px] flex flex-col bg-background"
            >
              {/* Glass border layer */}
              <div className="absolute inset-0 border border-foreground/5 rounded-[32px] z-0 pointer-events-none" />
              
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2.5 bg-background/80 backdrop-blur-md rounded-full hover:bg-accent hover:text-white transition-all shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Hero Image — full-width at top */}
              <div className="relative h-56 md:h-72 w-full shrink-0 overflow-hidden">
                <img 
                  src={urlFor(selectedProject.image).url()} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
                {/* Category pills over image */}
                <div className="absolute bottom-4 left-6 flex flex-wrap gap-2">
                  {selectedProject.category?.map((cat: string) => (
                    <span key={cat} className="text-[10px] px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white font-bold uppercase tracking-widest">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="p-6 md:p-10 space-y-8">
                  
                  {/* Title + Meta */}
                  <div className="space-y-5">
                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight text-foreground">
                      {selectedProject.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.year && (
                        <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/5 text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5 text-accent" />
                          <span>{selectedProject.year}</span>
                        </div>
                      )}
                      {selectedProject.duration && (
                        <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/5 text-muted-foreground">
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          <span>{selectedProject.duration}</span>
                        </div>
                      )}
                      {selectedProject.client && (
                        <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent">
                          <User className="w-3.5 h-3.5" />
                          <span>{selectedProject.client}</span>
                        </div>
                      )}
                      {selectedProject.role && (
                        <div className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-foreground/5 border border-foreground/5 text-muted-foreground">
                          <Cpu className="w-3.5 h-3.5 text-accent" />
                          <span>{selectedProject.role}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-foreground/5" />

                  {/* Overview */}
                  {selectedProject.overview && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-accent flex items-center gap-2">
                        <span className="w-6 h-px bg-accent" /> Overview
                      </h4>
                      <p className="text-muted-foreground leading-relaxed text-[15px]">
                        {selectedProject.overview}
                      </p>
                    </div>
                  )}

                  {/* Challenge & Solution */}
                  {(selectedProject.challenge || selectedProject.solution) && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {selectedProject.challenge && (
                        <div className="space-y-3 p-5 rounded-2xl bg-foreground/[0.03] border border-foreground/5">
                          <h4 className="text-xs font-black uppercase tracking-[0.15em] text-foreground">Challenge</h4>
                          <p className="text-muted-foreground leading-relaxed text-[13px]">
                            {selectedProject.challenge}
                          </p>
                        </div>
                      )}
                      {selectedProject.solution && (
                        <div className="space-y-3 p-5 rounded-2xl bg-accent/5 border border-accent/10">
                          <h4 className="text-xs font-black uppercase tracking-[0.15em] text-accent">Solution</h4>
                          <p className="text-muted-foreground leading-relaxed text-[13px]">
                            {selectedProject.solution}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Technologies */}
                  {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-accent" /> Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech: string) => (
                          <span 
                            key={tech}
                            className="px-3 py-1.5 bg-foreground/5 border border-foreground/5 rounded-lg text-xs font-bold text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  {selectedProject.docLink && (
                    <div className="pt-2 pb-2">
                      <a 
                        href={selectedProject.docLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full px-8 py-4 bg-foreground text-background rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-accent hover:text-white active:scale-95 transition-all shadow-lg group"
                      >
                        <FileText className="w-5 h-5" />
                        View Full Case Study
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
