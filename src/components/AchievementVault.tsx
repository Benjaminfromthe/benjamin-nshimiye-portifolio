import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Award, X } from "lucide-react";
import ciscoCert from "@/assets/cisco-cert.png";
import a2svAdmission from "@/assets/a2sv-admission.png";

const achievements = [
  {
    titleKey: "achievement_cisco",
    image: ciscoCert,
    desc: "Cisco Networking Academy — Networking Basics certification. Demonstrates proficiency in fundamental networking concepts, protocols, and infrastructure design through the globally recognized Cisco curriculum.",
  },
  {
    titleKey: "achievement_a2sv",
    image: a2svAdmission,
    desc: "Selected for the A2SV (Africa to Silicon Valley) In-Person Education Program at AUCA — G7 cohort. A competitive program training Africa's top engineering talent in advanced data structures, algorithms, and software development.",
  },
];

const AchievementVault = () => {
  const { t } = useLanguage();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h3 className="font-heading text-xl neon-text text-center tracking-widest mb-8">
          <Award className="inline w-5 h-5 mr-2 mb-0.5" />
          {t("achievement_vault")}
        </h3>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {achievements.map((a, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="glass rounded-xl overflow-hidden group hover:neon-border transition-all duration-500 cursor-pointer text-left"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={a.image}
                  alt={t(a.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <p className="font-heading text-sm neon-text tracking-wider">{t(a.titleKey)}</p>
                <p className="font-mono text-[10px] text-muted-foreground mt-1 line-clamp-2">{a.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setLightbox(null)} />
          <div className="relative z-10 max-w-4xl w-full glass-strong rounded-2xl overflow-hidden animate-scale-in">
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full glass hover:bg-destructive/20 transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
            <img
              src={achievements[lightbox].image}
              alt={t(achievements[lightbox].titleKey)}
              className="w-full max-h-[70vh] object-contain bg-black/20"
            />
            <div className="p-6">
              <h4 className="font-heading text-lg neon-text tracking-wider mb-2">
                {t(achievements[lightbox].titleKey)}
              </h4>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {achievements[lightbox].desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AchievementVault;
