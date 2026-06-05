import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, ShoppingCart, Layers, Target, Zap, CheckCircle2 } from "lucide-react";
import simbaLogo from "@/assets/simba.jpeg.asset.json";

type ProjectDetail = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  url: string;
  image: string;
  alt: string;
  tech: string[];
  overview: string;
  problem: string;
  approach: string[];
  challenges: { title: string; body: string }[];
  outcomes: string[];
  architecture: string[];
};

const projects: Record<string, ProjectDetail> = {
  "simba-supermarket": {
    slug: "simba-supermarket",
    name: "Simba Supermarket",
    category: "E-Commerce",
    tagline: "A modern, mobile-first online supermarket.",
    url: "https://simba-supermarket-nine.vercel.app/",
    image: simbaLogo.url,
    alt: "Simba Supermarket logo",
    tech: ["React", "TypeScript", "Tailwind", "Vite", "Vercel"],
    overview:
      "Simba Supermarket is a clean, fast online grocery storefront. Customers can browse categories, manage their cart, and check out — all on a mobile-first interface designed for speed and clarity.",
    problem:
      "Most local supermarket sites feel heavy and confusing on mobile. The goal was a storefront that loads instantly, feels native on a phone, and never gets in the way of the customer.",
    approach: [
      "Mobile-first layout with a glanceable product grid",
      "Lightweight cart state for instant navigation",
      "Lazy-loaded imagery so the first scroll never stalls",
      "Strict design tokens via Tailwind for visual consistency",
    ],
    challenges: [
      {
        title: "Performance on low-end devices",
        body: "Optimized images, deferred non-critical scripts and kept the bundle lean so the storefront stays fast on entry-level phones.",
      },
      {
        title: "Cart UX",
        body: "Designed the cart to feel instant — adds, removes and quantity changes update without full page reloads.",
      },
    ],
    outcomes: [
      "Fast initial load on mobile networks",
      "Clean, distraction-free shopping flow",
      "Reusable component system ready to extend",
    ],
    architecture: [
      "React + TypeScript for safe, scalable UI",
      "Tailwind CSS for tokenized, consistent styling",
      "Vite for instant dev feedback and optimized builds",
      "Deployed on Vercel for global edge delivery",
    ],
  },
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = slug ? projects[slug] : null;
  if (!project) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          to="/#projects"
          data-cursor="hover"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to projects
        </Link>

        <div className="glass rounded-2xl overflow-hidden mb-8">
          <div className="aspect-[16/9] bg-background flex items-center justify-center p-8 border-b border-border/50">
            <img src={project.image} alt={project.alt} className="h-full w-auto object-contain" />
          </div>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {project.category}
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl neon-text tracking-wider mb-3">
              {project.name}
            </h1>
            <p className="font-body text-base text-muted-foreground mb-6">{project.tagline}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider border border-primary/30 bg-primary/5 text-primary/90"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass hover:neon-border transition-all font-mono text-xs uppercase tracking-wider text-primary"
            >
              <ExternalLink className="w-4 h-4" /> Visit live site
            </a>
          </div>
        </div>

        <Section icon={<Target className="w-4 h-4" />} title="The Problem">
          <p>{project.problem}</p>
        </Section>

        <Section icon={<Layers className="w-4 h-4" />} title="Overview">
          <p>{project.overview}</p>
        </Section>

        <Section icon={<Zap className="w-4 h-4" />} title="Approach">
          <ul className="space-y-2">
            {project.approach.map((a) => (
              <li key={a} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={<Layers className="w-4 h-4" />} title="Architecture">
          <ul className="space-y-2">
            {project.architecture.map((a) => (
              <li key={a} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section icon={<Zap className="w-4 h-4" />} title="Challenges">
          <div className="grid gap-4">
            {project.challenges.map((c) => (
              <div key={c.title} className="p-4 rounded-lg border border-border/50 bg-card/30">
                <h4 className="font-heading text-sm neon-text tracking-wider mb-2">{c.title}</h4>
                <p className="text-sm text-muted-foreground">{c.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section icon={<CheckCircle2 className="w-4 h-4" />} title="Outcomes">
          <ul className="space-y-2">
            {project.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div className="glass rounded-xl p-6 md:p-8 mb-6">
    <div className="flex items-center gap-2 mb-4">
      <div className="p-1.5 rounded-md bg-primary/10 text-primary">{icon}</div>
      <h2 className="font-heading text-lg neon-text tracking-wider">{title}</h2>
    </div>
    <div className="font-body text-sm md:text-base text-foreground/90 leading-relaxed">{children}</div>
  </div>
);

export default ProjectDetail;
