"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Pin } from "lucide-react";
import { client } from "../lib/sanity";
import { urlFor } from "../lib/sanity.image";

interface Article {
  title: string;
  subtitle?: string;
  summary: string;
  image: any;
  url: string;
  publishedAt: string;
  isPinned: boolean;
  readingTime?: string;
  category?: string;
}

export const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      // Fetch articles, pinned ones first, then by date
      const query = `*[_type == "article"] | order(isPinned desc, publishedAt desc)`;
      const data = await client.fetch(query);
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="articles" className="py-32 px-6">
        <div className="max-w-7xl mx-auto flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) return null;



  return (
    <section id="articles" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">
              <span className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">Articles</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Writing in spare time about markets, design, gaming, and everything in between
            </p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-white/5 mx-12 mb-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
                ease: [0.23, 1, 0.32, 1] as const
              }}
              className="group"
            >
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full backdrop-blur-lg border border-glass-border rounded-[20px] bg-background/80 overflow-hidden transition-all duration-500 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 flex flex-col"
              >
                <div className="aspect-[4/3] bg-neutral-900 relative overflow-hidden">
                  <img
                    src={urlFor(article.image).url()}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  {article.isPinned && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-lg uppercase tracking-wider">
                        <Pin className="w-3 h-3 fill-current" />
                        Pinned
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <span className="text-accent">{article.category || 'Article'}</span>
                    <span className="w-1 h-1 rounded-full bg-foreground/20" />
                    <span>
                      {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    {article.readingTime && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-foreground/20" />
                        <span>{article.readingTime}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-accent transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  {article.subtitle && (
                    <p className="text-muted-foreground/70 mt-2 leading-relaxed line-clamp-1 text-sm">
                      {article.subtitle}
                    </p>
                  )}
                  <p className="text-muted-foreground mt-3 leading-relaxed line-clamp-2 text-sm">
                    {article.summary}
                  </p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
