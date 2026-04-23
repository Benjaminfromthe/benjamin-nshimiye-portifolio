import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "Python", level: 90, color: "primary" },
  { name: "SQL", level: 85, color: "primary" },
  { name: "React", level: 80, color: "accent" },
  { name: "JavaScript", level: 75, color: "secondary" },
  { name: "TypeScript", level: 78, color: "primary" },
  { name: "Node.js", level: 82, color: "accent" },
];

const SkillsSection = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl neon-text text-center tracking-widest mb-12">
          {t("skills")}
        </h2>

        <div ref={ref} className="max-w-2xl mx-auto space-y-5">
          {skills.map((s, i) => (
            <div key={s.name} className="glass rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <span className="font-heading text-xs tracking-wider text-foreground">{s.name}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: visible ? `${s.level}%` : "0%",
                    transitionDelay: `${i * 150}ms`,
                    background: s.color === "primary"
                      ? "hsl(var(--primary))"
                      : s.color === "accent"
                      ? "hsl(var(--accent))"
                      : "hsl(var(--secondary))",
                    boxShadow: visible
                      ? `0 0 10px hsl(var(--${s.color}) / 0.5), 0 0 20px hsl(var(--${s.color}) / 0.2)`
                      : "none",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
