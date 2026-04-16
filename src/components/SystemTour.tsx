import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { X, MessageCircle, Shield, Cpu, ChevronRight } from "lucide-react";

interface TourStep {
  target: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const SystemTour = ({ onClose }: { onClose: () => void }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const steps: TourStep[] = [
    {
      target: ".ben-ai-bubble",
      title: "Ben-AI Assistant",
      desc: "Your digital twin! Click the chat bubble to ask about Benjamin's projects, skills, and background in any language.",
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      target: "#archive",
      title: "Verified Credentials",
      desc: "Download Benjamin's CV and academic diplomas from the Secure Archive section.",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      target: "#projects",
      title: "Project Grid",
      desc: "Explore Vuu (smart transport) and GlobalBride (international trade) — Benjamin's flagship projects.",
      icon: <Cpu className="w-5 h-5" />,
    },
  ];

  useEffect(() => {
    const el = document.querySelector(steps[step].target);
    if (el) {
      const rect = el.getBoundingClientRect();
      setPos({
        top: Math.min(rect.top + window.scrollY + rect.height / 2, window.innerHeight - 200),
        left: Math.min(rect.left + rect.width / 2, window.innerWidth - 320),
      });
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [step]);

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onClose();
  };

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} />

      {/* Tour card */}
      <div
        className="absolute z-10 w-80 glass-strong rounded-2xl p-5 animate-scale-in"
        style={{
          top: `${Math.max(100, Math.min(pos.top - 80, window.innerHeight - 250))}px`,
          left: `${Math.max(16, Math.min(pos.left - 160, window.innerWidth - 340))}px`,
        }}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">{steps[step].icon}</div>
          <div>
            <p className="font-heading text-sm neon-text tracking-wider">{steps[step].title}</p>
            <p className="font-mono text-[10px] text-muted-foreground">
              Step {step + 1}/{steps.length}
            </p>
          </div>
        </div>

        <p className="font-body text-xs text-muted-foreground leading-relaxed mb-4">{steps[step].desc}</p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${i === step ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/20 text-primary font-mono text-xs hover:bg-primary/30 transition-colors"
          >
            {step < steps.length - 1 ? "Next" : "Got it!"}
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemTour;
