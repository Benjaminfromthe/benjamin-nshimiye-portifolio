import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import SocialLinks from "@/components/SocialLinks";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const { t } = useLanguage();
  const [count, setCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      // Only increment once per browser session
      const alreadyCounted = sessionStorage.getItem("visit-counted") === "true";

      if (!alreadyCounted) {
        const { data, error } = await supabase.rpc("increment_visits");
        if (!error && mounted && typeof data === "number") {
          setCount(data);
          sessionStorage.setItem("visit-counted", "true");
        }
      } else {
        const { data } = await supabase
          .from("site_stats")
          .select("visit_count")
          .eq("id", 1)
          .maybeSingle();
        if (mounted && data) setCount(Number(data.visit_count));
      }
    };

    init();

    const channel = supabase
      .channel("site-stats-live")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "site_stats" },
        (payload) => {
          const next = (payload.new as { visit_count?: number })?.visit_count;
          if (typeof next === "number") setCount(next);
        },
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
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
