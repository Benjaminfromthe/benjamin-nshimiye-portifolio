import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send, CheckCircle } from "lucide-react";

const ContactSection = () => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.open(`mailto:benjaminnshimiye633@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 3000);
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl neon-text text-center tracking-widest mb-8">
          {t("nav_contact")}
        </h2>

        <div className="max-w-md mx-auto glass rounded-2xl p-6">
          {sent ? (
            <div className="text-center py-12 animate-scale-in">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3 animate-neon-pulse" />
              <p className="font-heading text-sm neon-text">{t("contact_sent")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("feedback_name")}
                maxLength={100}
                className="w-full px-4 py-3 rounded-xl glass font-mono text-sm text-foreground placeholder:text-muted-foreground outline-none focus:neon-border transition-all"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("feedback_email")}
                maxLength={255}
                className="w-full px-4 py-3 rounded-xl glass font-mono text-sm text-foreground placeholder:text-muted-foreground outline-none focus:neon-border transition-all"
              />
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("feedback_message")}
                maxLength={1000}
                rows={4}
                className="w-full px-4 py-3 rounded-xl glass font-mono text-sm text-foreground placeholder:text-muted-foreground outline-none focus:neon-border transition-all resize-none"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary/20 text-primary font-heading text-sm uppercase tracking-widest hover:bg-primary/30 hover:neon-border transition-all duration-300"
              >
                <Send className="w-4 h-4" />
                {t("contact_send")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
