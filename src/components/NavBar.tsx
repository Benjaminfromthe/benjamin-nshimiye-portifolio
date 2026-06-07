import { useLanguage, LANGUAGES, Lang } from "@/contexts/LanguageContext";
import { Sun, Moon, Menu, X, Globe, Terminal, FileText } from "lucide-react";
import { useState } from "react";
import profileImg from "@/assets/benjamin-profile.png";
import SocialLinks from "@/components/SocialLinks";
import AccentColorPicker from "@/components/AccentColorPicker";

interface NavBarProps {
  theme: "cyber" | "shinkai";
  onToggleTheme: () => void;
  onAboutClick: () => void;
  onTerminalClick: () => void;
  onCvClick: () => void;
}

const NavBar = ({ theme, onToggleTheme, onAboutClick, onTerminalClick, onCvClick }: NavBarProps) => {
  const { t, lang, setLang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const navItems = [
    { key: "home", action: () => scrollTo("hero") },
    { key: "about", action: () => { onAboutClick(); setMobileOpen(false); } },
    { key: "projects", action: () => scrollTo("projects") },
    { key: "credentials", action: () => scrollTo("archive") },
    { key: "contact", action: () => scrollTo("contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-strong">
      <div className="container mx-auto flex items-center justify-between h-14 px-3 gap-2">
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="w-10 h-10 min-w-10 rounded-full overflow-hidden border-2 border-primary/50 animate-neon-pulse"
            aria-label="Go to hero section"
          >
            <img src={profileImg} alt="Benjamin Nshimiye" className="w-full h-full object-cover" />
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-1">
          <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={item.action}
                className="nav-link-glow font-mono text-[11px] uppercase tracking-wider text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all px-3 py-1.5 rounded-full whitespace-nowrap"
              >
                {t(`nav_${item.key}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SocialLinks className="hidden lg:flex" />
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="p-2 rounded-lg glass hover:neon-border transition-all flex items-center gap-1"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4 text-foreground" />
              <span className="font-mono text-[10px] uppercase text-muted-foreground hidden sm:inline">{lang}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 glass-strong rounded-xl p-2 max-h-60 overflow-y-auto animate-fade-in z-50">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code as Lang); setLangOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg font-mono text-xs transition-colors ${
                      lang === l.code ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <AccentColorPicker />
          <button
            onClick={onCvClick}
            className="p-2 rounded-lg glass hover:neon-border transition-all"
            aria-label="Download CV"
            title="CV Builder"
          >
            <FileText className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={onTerminalClick}
            className="p-2 rounded-lg glass hover:neon-border transition-all"
            aria-label="Open terminal"
            title="Terminal mode"
          >
            <Terminal className="w-4 h-4 text-foreground" />
          </button>
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg glass hover:neon-border transition-all"
            aria-label="Toggle theme"
          >
            {theme === "cyber" ? <Sun className="w-4 h-4 text-foreground" /> : <Moon className="w-4 h-4 text-foreground" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg glass hover:neon-border transition-all"
          >
            {mobileOpen ? <X className="w-4 h-4 text-foreground" /> : <Menu className="w-4 h-4 text-foreground" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass-strong border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={item.action}
                className="font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors text-left py-2"
              >
                {t(`nav_${item.key}`)}
              </button>
            ))}
            <div className="pt-2 border-t border-border">
              <SocialLinks />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
