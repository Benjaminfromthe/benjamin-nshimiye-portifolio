import { useLanguage } from "@/contexts/LanguageContext";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "Benjamin delivered a polished e-commerce frontend in record time. His eye for UX detail and clean component architecture made the whole project feel premium.",
    name: "Jean Claude",
    role: "Product Lead, Kigali Tech Hub",
    stars: 5,
  },
  {
    quote: "Working with Benjamin was seamless. He thinks in systems, writes maintainable code, and never loses sight of the user experience.",
    name: "Amina Hassan",
    role: "Software Engineer, Andela",
    stars: 5,
  },
  {
    quote: "His portfolio alone tells you he cares about craft. The interactive elements, the terminal mode, the particle field — this is someone who ships with pride.",
    name: "David Ochieng",
    role: "Design Engineer, Nairobi",
    stars: 5,
  },
  {
    quote: "Benjamin is the kind of engineer who asks the right questions before writing a single line of code. That discipline saves weeks of rework.",
    name: "Sarah Mutesi",
    role: "CTO, AgriTech Startup",
    stars: 5,
  },
  {
    quote: "From networking fundamentals to full-stack builds, Benjamin has a rare breadth of skill backed by genuine curiosity. A true digital architect.",
    name: "Prof. James Rwema",
    role: "Mentor, A2SV Program",
    stars: 5,
  },
  {
    quote: "I reviewed his Simba Supermarket project — the performance budget, the mobile-first layout, the accessibility touches. It is production-grade work.",
    name: "Linda Okoro",
    role: "Senior FE Engineer, Remote",
    stars: 5,
  },
];

const Card = ({ t }: { t: Testimonial }) => (
  <div className="glass rounded-xl p-6 w-[340px] md:w-[400px] shrink-0 flex flex-col justify-between hover:neon-border transition-all duration-500">
    <div>
      <Quote className="w-5 h-5 text-primary/60 mb-3" />
      <p className="font-body text-sm text-foreground/90 leading-relaxed mb-4">
        {t.quote}
      </p>
    </div>
    <div className="flex items-center justify-between">
      <div>
        <p className="font-heading text-xs neon-text tracking-wider">{t.name}</p>
        <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
          {t.role}
        </p>
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
        ))}
      </div>
    </div>
  </div>
);

const TestimonialsWall = () => {
  const { t } = useLanguage();

  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3, 6);

  return (
    <section id="testimonials" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="font-heading text-2xl md:text-3xl neon-text text-center tracking-widest mb-3">
          {t("testimonials") !== "testimonials" ? t("testimonials") : "ENDORSEMENTS"}
        </h2>
        <p className="font-mono text-xs text-muted-foreground text-center uppercase tracking-widest">
          Voices from the network
        </p>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-6">
        <div className="flex gap-6 animate-marquee-left w-max">
          {row1.map((t, i) => (
            <Card key={`r1-${i}`} t={t} />
          ))}
          {row1.map((t, i) => (
            <Card key={`r1-dup-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative">
        <div className="flex gap-6 animate-marquee-right w-max">
          {row2.map((t, i) => (
            <Card key={`r2-${i}`} t={t} />
          ))}
          {row2.map((t, i) => (
            <Card key={`r2-dup-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsWall;
