import { useLanguage } from "@/contexts/LanguageContext";
import { Sun, Moon } from "lucide-react";

interface NavBarProps {
  theme: "cyber" | "shinkai";
  onToggleTheme: () => void;
}

const NavBar = ({ theme, onToggleTheme }: NavBarProps) => {
  const { lang, setLang, t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-strong">
      <div className="container mx-auto flex items-center justify-between h-14 px-4">
        <span className="font-heading text-sm neon-text tracking-widest cursor-pointer" onClick={() => scrollTo("hero")}>
          BEN.SYS
        </span>

        <div className="hidden md:flex items-center gap-6">
          {["home", "archive", "projects", "skills"].map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s === "home" ? "hero" : s)}
              className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
            >
              {t(`nav_${s}`)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {(["en", "rw", "fr"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded text-xs font-mono uppercase transition-all ${
                  lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg glass hover:neon-border transition-all"
            aria-label="Toggle theme"
          >
            {theme === "cyber" ? <Sun className="w-4 h-4 text-foreground" /> : <Moon className="w-4 h-4 text-foreground" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
