import { useLanguage } from "@/contexts/LanguageContext";
import { Cpu, Globe, ExternalLink } from "lucide-react";
import vuuMotoKigali from "@/assets/vuu-moto-kigali.jpg";
import globalBridgeImage from "@/assets/globalbridge-bridge.jpg";

const projects = [
  {
    name: "Vuu",
    icon: <Cpu className="w-6 h-6" />,
    category: "Transport",
    desc: "A smart transport management platform connecting Rwandan motorcyclists with passengers. Features real-time vehicle tracking, route optimization, digital ticketing, and seamless ride-hailing for urban mobility.",
    tech: ["React", "Node.js", "PostgreSQL", "Socket.IO"],
    color: "primary",
    url: "https://vuu-transport-8d7a3630.base44.app/",
    image: vuuMotoKigali,
    alt: "Motorcycle taxi rider in Kigali, Rwanda",
  },
  {
    name: "GlobalBride",
    icon: <Globe className="w-6 h-6" />,
    category: "Trade & Tourism",
    desc: "An international trade and tourism ecosystem built for the Hult Prize competition. Connects African manufacturers with global markets, streamlining import/export documentation, logistics, and cultural exchange.",
    tech: ["Python", "Django", "React", "AWS"],
    color: "accent",
    url: "https://cunning-global-trade-link.base44.app/",
    image: globalBridgeImage,
    alt: "Bridge representing global connection and trade",
  },
];

const ProjectsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl neon-text text-center tracking-widest mb-12">
          {t("projects")}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((p) => (
            <div key={p.name} className="glass rounded-xl overflow-hidden group hover:neon-border transition-all duration-500 relative">
              <div className="aspect-[16/9] overflow-hidden border-b border-border/50">
                <img
                  src={p.image}
                  alt={p.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
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
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="px-2 py-1 rounded text-[10px] font-mono uppercase bg-muted text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
