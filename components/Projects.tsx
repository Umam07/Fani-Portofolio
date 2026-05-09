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
      const query = `*[_type == "project"] | order(_createdAt desc)`;
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
                  className="glass-card group overflow-hidden cursor-pointer flex flex-col h-full"
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
              className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl rounded-[40px] flex flex-col md:flex-row bg-background/40"
            >
              {/* Glass Layer - Decoupled to prevent Firefox flickering during transform */}
              <div className="absolute inset-0 backdrop-blur-3xl z-0 pointer-events-none" />
              <div className="absolute inset-0 border border-white/10 rounded-[40px] z-0 pointer-events-none" />
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-20 p-3 bg-white/5 rounded-full hover:bg-accent hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-2/5 h-64 md:h-full relative z-10">
                <img 
                  src={urlFor(selectedProject.image).url()} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent md:bg-linear-to-r" />
              </div>

              <div className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar relative z-10">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter">{selectedProject.title}</h3>
                    <div className="flex flex-wrap gap-6 pt-2">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span className="text-sm font-bold">{selectedProject.year}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 text-accent" />
                        <span className="text-sm font-bold">{selectedProject.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="w-4 h-4 text-accent" />
                        <span className="text-sm font-bold">{selectedProject.client}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Cpu className="w-4 h-4 text-accent" />
                        <span className="text-sm font-bold">{selectedProject.role}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-8">
                    <div className="space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent">Overview</h4>
                      <p className="text-muted-foreground leading-relaxed">{selectedProject.overview}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent">Challenge</h4>
                        <p className="text-muted-foreground leading-relaxed">{selectedProject.challenge}</p>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent">Solution</h4>
                        <p className="text-muted-foreground leading-relaxed">{selectedProject.solution}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-accent" />
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-accent">Technologies</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-sm font-semibold text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 flex flex-col sm:flex-row gap-4">
                    <a 
                      href={selectedProject.docLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-accent text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl shadow-accent/20"
                    >
                      <FileText className="w-5 h-5" />
                      Project Document
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
