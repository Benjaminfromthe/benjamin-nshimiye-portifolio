import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Github, Linkedin } from "lucide-react";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-2xl md:text-3xl neon-text tracking-widest mb-8">
          {t("nav_contact")}
        </h2>
        <div className="flex justify-center gap-4">
          {[
            { icon: <Mail className="w-5 h-5" />, label: "Email", href: "mailto:benjaminnshimiye@gmail.com" },
            { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "#" },
            { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "#" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="glass rounded-xl p-4 hover:neon-border transition-all duration-300 flex flex-col items-center gap-2 min-w-[80px]"
            >
              <span className="text-primary">{item.icon}</span>
              <span className="font-mono text-xs text-muted-foreground">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
