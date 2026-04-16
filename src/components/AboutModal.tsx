import { useLanguage } from "@/contexts/LanguageContext";
import { X, User, MapPin, Heart, Ruler, Weight, Users } from "lucide-react";
import profileImg from "@/assets/benjamin-profile.png";

interface AboutModalProps {
  open: boolean;
  onClose: () => void;
}

const AboutModal = ({ open, onClose }: AboutModalProps) => {
  const { t } = useLanguage();

  if (!open) return null;

  const stats = [
    { icon: <User className="w-4 h-4" />, label: "AGE", value: "22" },
    { icon: <Ruler className="w-4 h-4" />, label: "HEIGHT", value: "1.68m" },
    { icon: <Weight className="w-4 h-4" />, label: "WEIGHT", value: "57kg" },
    { icon: <Heart className="w-4 h-4" />, label: "STATUS", value: "Single" },
    { icon: <MapPin className="w-4 h-4" />, label: "FROM", value: "Nyarugenge" },
    { icon: <Users className="w-4 h-4" />, label: "SIBLINGS", value: "5th of 6" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div
        className="relative z-10 glass-strong rounded-2xl max-w-lg w-full p-6 md:p-8 animate-scale-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg glass hover:neon-border transition-all"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary animate-neon-pulse mb-4">
            <img src={profileImg} alt="Benjamin" className="w-full h-full object-cover" />
          </div>
          <h2 className="font-heading text-xl neon-text tracking-widest mb-1">{t("about_title")}</h2>
        </div>

        <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 text-center">
          {t("about_bio")}
        </p>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-lg p-3 text-center">
              <div className="flex justify-center mb-1 text-primary">{s.icon}</div>
              <p className="font-mono text-[10px] text-muted-foreground uppercase">{s.label}</p>
              <p className="font-heading text-sm neon-text">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Hobbies */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["⚽ Football", "🧩 Puzzles", "😂 Laughter"].map((hobby) => (
            <span key={hobby} className="px-3 py-1.5 rounded-full glass text-xs font-mono text-foreground">
              {hobby}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
