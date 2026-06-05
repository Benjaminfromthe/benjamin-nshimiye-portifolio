import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Clock, ArrowRight, X } from "lucide-react";

type Post = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  content: string;
};

const posts: Post[] = [
  {
    slug: "building-simba",
    title: "Building Simba Supermarket: lessons from a mobile-first e-commerce build",
    date: "2026-05-18",
    readTime: "6 min",
    excerpt: "How I shaped a fast, mobile-first storefront with React, TypeScript and Tailwind — and what I learned about real-world UX along the way.",
    tags: ["React", "E-Commerce", "UX"],
    content: `Building Simba Supermarket taught me that performance is a feature.\n\nI started with a strict mobile-first layout, leaning on Tailwind for tight design tokens and a clean, glanceable product grid. Cart state lives in a lightweight store so navigation feels instant, and product imagery is lazy-loaded so the first scroll never stalls.\n\nThe biggest lesson: ship fewer things, polish them more. Search, cart, checkout — those three pillars deserved 80% of the attention.`,
  },
  {
    slug: "ai-as-a-co-pilot",
    title: "AI as a co-pilot, not autopilot",
    date: "2026-04-02",
    readTime: "4 min",
    excerpt: "Why I treat AI tools as a sharp pair-programmer instead of a replacement — and the workflow I use to stay in control of the code.",
    tags: ["AI", "Workflow"],
    content: `AI tooling is incredible, but it's a co-pilot, not the captain.\n\nMy loop: write the spec, let the AI scaffold, then read every line. Refactor for clarity, add tests, and only commit code I would have been proud to write by hand. The result is faster delivery without losing ownership.`,
  },
  {
    slug: "portfolio-as-a-product",
    title: "Treating your portfolio like a product",
    date: "2026-02-11",
    readTime: "5 min",
    excerpt: "Your portfolio is a product with users (recruiters, peers, future-you). Here is how I plan, iterate and measure it.",
    tags: ["Portfolio", "Design"],
    content: `If your portfolio is a product, then it has users — and users have jobs to do.\n\nFor recruiters: prove the work in 30 seconds. For peers: show how I think. For future-me: keep the bar visible. Every section is scored against those three jobs, and anything that doesn't earn its place gets cut.`,
  },
];

const BlogSection = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<Post | null>(null);

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl neon-text text-center tracking-widest mb-3">
          {t("blog") !== "blog" ? t("blog") : "DEV LOG"}
        </h2>
        <p className="font-mono text-xs text-muted-foreground text-center mb-12 uppercase tracking-widest">
          Notes from the build
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((p) => (
            <button
              key={p.slug}
              onClick={() => setActive(p)}
              data-cursor="hover"
              className="text-left glass rounded-xl p-6 hover:neon-border transition-all duration-500 group flex flex-col"
            >
              <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{p.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{p.readTime}</span>
              </div>
              <h3 className="font-heading text-base md:text-lg neon-text tracking-wider mb-3 leading-snug">
                {p.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {p.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider border border-primary/30 bg-primary/5 text-primary/90">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-primary group-hover:gap-3 transition-all">
                Read entry <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActive(null)}
        >
          <div
            className="glass-strong rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 relative animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 p-2 rounded-lg glass hover:neon-border transition-all"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-3">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{active.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{active.readTime}</span>
            </div>
            <h3 className="font-heading text-xl md:text-2xl neon-text tracking-wider mb-4 pr-10">
              {active.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {active.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider border border-primary/30 bg-primary/5 text-primary/90">
                  {tag}
                </span>
              ))}
            </div>
            <div className="font-body text-sm md:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
              {active.content}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
