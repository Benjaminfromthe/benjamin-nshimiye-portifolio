import { useState } from "react";
import { X, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

const FeedbackModal = ({ open, onClose }: FeedbackModalProps) => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Feedback from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.open(`mailto:benjaminnshimiye633@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName("");
      setEmail("");
      setMessage("");
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center">
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md mx-4 glass-strong rounded-2xl p-6 animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>

        <h3 className="font-heading text-lg neon-text tracking-wider mb-1">{t("feedback_title")}</h3>
        <p className="font-mono text-xs text-muted-foreground mb-5">{t("feedback_desc")}</p>

        {sent ? (
          <div className="text-center py-8">
            <p className="font-heading text-sm neon-text">✓ {t("feedback_sent")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("feedback_name")}
              maxLength={100}
              className="w-full px-3 py-2 rounded-lg glass font-mono text-xs text-foreground placeholder:text-muted-foreground outline-none focus:neon-border transition-all"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("feedback_email")}
              maxLength={255}
              className="w-full px-3 py-2 rounded-lg glass font-mono text-xs text-foreground placeholder:text-muted-foreground outline-none focus:neon-border transition-all"
            />
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("feedback_message")}
              maxLength={1000}
              rows={4}
              className="w-full px-3 py-2 rounded-lg glass font-mono text-xs text-foreground placeholder:text-muted-foreground outline-none focus:neon-border transition-all resize-none"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary/20 text-primary font-mono text-xs uppercase tracking-wider hover:bg-primary/30 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              {t("feedback_submit")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
