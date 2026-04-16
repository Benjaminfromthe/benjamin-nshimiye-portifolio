import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Download } from "lucide-react";

const docs = [
  {
    titleKey: "download_cv",
    rank: "S",
    desc: "Curriculum Vitae — Full professional profile",
    url: "https://drive.google.com/uc?export=download&id=1lQwpCtdCaGgNG3IPw58cfWzJG9ZYLsH7",
  },
  {
    titleKey: "download_diploma",
    rank: "S",
    desc: "S6 Diploma / S3 Slip — Academic credentials",
    url: "https://drive.google.com/uc?export=download&id=1XQdInVTrfFHsSmdbaMnBByCB_JqSS0N5",
  },
];

const CredentialsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="archive" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl neon-text text-center tracking-widest mb-12">
          <Shield className="inline w-6 h-6 mr-2 mb-1" />
          {t("credentials")}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {docs.map((doc) => (
            <a
              key={doc.titleKey}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass rounded-xl p-6 relative overflow-hidden hover:neon-border transition-all duration-500 cursor-pointer"
            >
              {/* Rank badge */}
              <div className="absolute top-3 right-3 w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center border border-accent/40">
                <span className="font-heading text-lg neon-text-magenta">{doc.rank}</span>
              </div>

              {/* Glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <p className="font-heading text-sm neon-text tracking-wider mb-1">{t(doc.titleKey)}</p>
                <p className="font-mono text-xs text-muted-foreground mb-4">{doc.desc}</p>
                <div className="flex items-center gap-2 text-primary">
                  <Download className="w-4 h-4" />
                  <span className="font-mono text-xs uppercase tracking-wider">Download</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;
