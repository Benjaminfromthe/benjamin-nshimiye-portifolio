import { useEffect, useState } from "react";
import { Palette, Check } from "lucide-react";

// HSL accent presets (matches design system: --primary uses HSL)
const PRESETS: { name: string; hsl: string; glow: string }[] = [
  { name: "Cyan",    hsl: "180 100% 50%", glow: "180 100% 60%" },
  { name: "Magenta", hsl: "300 100% 55%", glow: "300 100% 65%" },
  { name: "Lime",    hsl: "100 100% 50%", glow: "100 100% 60%" },
  { name: "Amber",   hsl: "38 100% 55%",  glow: "38 100% 65%" },
  { name: "Violet",  hsl: "265 90% 60%",  glow: "265 90% 70%" },
  { name: "Rose",    hsl: "350 100% 60%", glow: "350 100% 70%" },
];

const STORAGE_KEY = "accent-color";

const applyAccent = (hsl: string, glow: string) => {
  const root = document.documentElement;
  root.style.setProperty("--primary", hsl);
  root.style.setProperty("--primary-glow", glow);
  root.style.setProperty("--accent", hsl);
  root.style.setProperty("--ring", hsl);
};

const AccentColorPicker = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(() => {
    if (typeof window === "undefined") return PRESETS[0].name;
    return localStorage.getItem(STORAGE_KEY) || PRESETS[0].name;
  });

  useEffect(() => {
    const preset = PRESETS.find((p) => p.name === active) || PRESETS[0];
    applyAccent(preset.hsl, preset.glow);
  }, [active]);

  const pick = (name: string) => {
    setActive(name);
    localStorage.setItem(STORAGE_KEY, name);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded-lg glass hover:neon-border transition-all"
        aria-label="Pick accent color"
        title="Accent color"
      >
        <Palette className="w-4 h-4 text-foreground" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 glass-strong rounded-xl p-3 animate-fade-in z-50">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2 px-1">
            Accent
          </p>
          <div className="grid grid-cols-3 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => pick(p.name)}
                className="aspect-square rounded-lg border border-border hover:scale-105 transition-transform relative flex items-center justify-center"
                style={{
                  background: `hsl(${p.hsl})`,
                  boxShadow: `0 0 12px hsl(${p.glow} / 0.6)`,
                }}
                aria-label={p.name}
                title={p.name}
              >
                {active === p.name && <Check className="w-4 h-4 text-background" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccentColorPicker;
