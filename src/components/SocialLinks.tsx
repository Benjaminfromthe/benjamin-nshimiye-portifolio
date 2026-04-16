import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const socials = [
  { icon: <Linkedin className="w-4 h-4" />, href: "https://www.linkedin.com/in/benjamin-nshimiye-b403983a5/", label: "LinkedIn" },
  { icon: <Github className="w-4 h-4" />, href: "https://github.com/Benjaminfromthe", label: "GitHub" },
  { icon: <Twitter className="w-4 h-4" />, href: "https://x.com/BNshimiye61872", label: "X" },
  { icon: <Mail className="w-4 h-4" />, href: "mailto:benjaminnshimiye633@gmail.com", label: "Email" },
];

const SocialLinks = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    {socials.map((s) => (
      <a
        key={s.label}
        href={s.href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg glass hover:neon-border transition-all duration-300 group"
        aria-label={s.label}
      >
        <span className="text-muted-foreground group-hover:text-primary transition-colors">
          {s.icon}
        </span>
      </a>
    ))}
  </div>
);

export default SocialLinks;
