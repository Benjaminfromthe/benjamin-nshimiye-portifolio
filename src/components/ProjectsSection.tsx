import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ShoppingCart, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import VanillaTilt from "vanilla-tilt";
import simbaLogo from "@/assets/simba.jpeg.asset.json";

const projects = [
  {
    name: "Simba Supermarket",
    slug: "simba-supermarket",
    icon: <ShoppingCart className="w-6 h-6" />,
    category: "E-Commerce",
    desc: "A modern online supermarket platform delivering a seamless shopping experience. Customers can browse products, manage carts, and place orders with fast, intuitive navigation and a clean, mobile-first interface.",
    tech: ["React", "TypeScript", "Tailwind", "Vercel"],
    color: "primary",
    url: "https://simba-supermarket-nine.vercel.app/",
    image: simbaLogo.url,
    alt: "Simba Supermarket logo",
  },
];

const ProjectsSection = () => {
  const { t } = useLanguage();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const nodes = cardsRef.current.filter((n): n is HTMLDivElement => !!n);
    nodes.forEach((n) =>
      VanillaTilt.init(n, {
        max: 8,
        speed: 600,
        glare: true,
        "max-glare": 0.25,
        scale: 1.02,
      }),
    );
    return () => {
      nodes.forEach((n) => {
        const inst = (n as unknown as { vanillaTilt?: { destroy: () => void } }).vanillaTilt;
        inst?.destroy();
      });
    };
  }, []);

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl neon-text text-center tracking-widest mb-12">
          {t("projects")}
        </h2>

        <div className="grid grid-cols-1 gap-8 max-w-xl mx-auto auto-rows-fr">
          {projects.map((p, i) => (
            <div
              key={p.name}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ transformStyle: "preserve-3d" }}
              className="glass rounded-xl overflow-hidden group hover:neon-border transition-all duration-500 relative flex flex-col h-full"
            >
              <div className="aspect-[16/9] overflow-hidden border-b border-border/50 bg-background flex items-center justify-center p-6">
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${p.color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                  {p.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg neon-text tracking-wider">{p.name}</h3>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase">{p.category}</span>
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass hover:bg-primary/20 transition-all group/link"
                  title="Live System Preview"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover/link:text-primary transition-colors" />
                </a>
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mt-auto mb-4">
                {p.tech.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider border border-primary/30 bg-primary/5 text-primary/90 hover:bg-primary/10 transition-colors">
                    {t}
                  </span>
                ))}
              </div>
              <Link
                to={`/projects/${p.slug}`}
                data-cursor="hover"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-primary hover:gap-3 transition-all"
              >
                Deep dive <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
