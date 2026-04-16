import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SocialLinks from "@/components/SocialLinks";

const Footer = () => {
  const { t } = useLanguage();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem("syncCount") || "0");
    const next = stored + 1;
    localStorage.setItem("syncCount", String(next));
    let current = 0;
    const interval = setInterval(() => {
      current += Math.ceil(next / 30);
      if (current >= next) {
        setCount(next);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <div className="glass rounded-xl inline-flex items-center gap-4 px-8 py-4 mb-6">
          <span className="font-mono text-xs text-muted-foreground uppercase">{t("totalSyncs")}</span>
          <span className="font-heading text-2xl neon-text">{count.toLocaleString()}</span>
        </div>
        <div className="flex justify-center mb-4">
          <SocialLinks />
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Benjamin Nshimiye • Built with 💜
        </p>
      </div>
    </footer>
  );
};

export default Footer;
