import { useState } from "react";
import { Download, X, FileText } from "lucide-react";
import jsPDF from "jspdf";

interface CVBuilderProps {
  open: boolean;
  onClose: () => void;
}

interface Section {
  id: string;
  label: string;
  enabled: boolean;
}

const DEFAULT_SECTIONS: Section[] = [
  { id: "summary", label: "Professional Summary", enabled: true },
  { id: "skills", label: "Technical Skills", enabled: true },
  { id: "projects", label: "Featured Projects", enabled: true },
  { id: "credentials", label: "Credentials & Certifications", enabled: true },
  { id: "contact", label: "Contact Information", enabled: true },
];

const CVBuilder = ({ open, onClose }: CVBuilderProps) => {
  const [sections, setSections] = useState<Section[]>(DEFAULT_SECTIONS);
  const [generating, setGenerating] = useState(false);

  const toggle = (id: string) =>
    setSections((s) => s.map((sec) => (sec.id === id ? { ...sec, enabled: !sec.enabled } : sec)));

  const generate = async () => {
    setGenerating(true);
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const margin = 48;
    let y = margin;

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("Benjamin Nshimiye", margin, y);
    y += 22;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(110);
    doc.text("Full-Stack Engineer & Digital Architect — Nyarugenge, Rwanda", margin, y);
    y += 18;
    doc.setDrawColor(180);
    doc.line(margin, y, pageW - margin, y);
    y += 22;

    const heading = (text: string) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(20);
      doc.text(text.toUpperCase(), margin, y);
      y += 16;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10.5);
      doc.setTextColor(60);
    };

    const para = (text: string) => {
      const lines = doc.splitTextToSize(text, pageW - margin * 2);
      doc.text(lines, margin, y);
      y += lines.length * 13 + 10;
    };

    const bullets = (items: string[]) => {
      items.forEach((item) => {
        const lines = doc.splitTextToSize(`• ${item}`, pageW - margin * 2);
        doc.text(lines, margin, y);
        y += lines.length * 13 + 2;
      });
      y += 8;
    };

    const enabled = (id: string) => sections.find((s) => s.id === id)?.enabled;

    if (enabled("summary")) {
      heading("Professional Summary");
      para(
        "Passionate Full-Stack Engineer building modern web applications with a focus on user experience, performance, and clean architecture. Committed to solving local problems in Rwanda using global tech standards."
      );
    }
    if (enabled("skills")) {
      heading("Technical Skills");
      bullets([
        "Languages: JavaScript, TypeScript, Python, C",
        "Frontend: React, Tailwind CSS, Vite",
        "Backend: Node.js, Supabase, PostgreSQL",
        "Tools: Git, GitHub, Vercel, Figma",
      ]);
    }
    if (enabled("projects")) {
      heading("Featured Projects");
      bullets([
        "Simba Supermarket — Modern e-commerce platform (React, TypeScript, Tailwind).",
        "Personal Portfolio — Interactive cyber-themed portfolio with multilingual support.",
      ]);
    }
    if (enabled("credentials")) {
      heading("Credentials");
      bullets([
        "Cisco Networking Basics",
        "A2SV Program Selection",
      ]);
    }
    if (enabled("contact")) {
      heading("Contact");
      bullets([
        "GitHub: github.com/Benjaminfromthe",
        "Portfolio: benjamin-core-matrix.lovable.app",
      ]);
    }

    doc.save("Benjamin-Nshimiye-CV.pdf");
    setGenerating(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md glass-strong border border-primary rounded-xl shadow-[0_0_40px_hsl(var(--primary)/0.4)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="font-heading text-sm neon-text tracking-wider">CV BUILDER</span>
          </div>
          <button onClick={onClose} className="p-1 hover:text-primary text-muted-foreground" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5">
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider mb-4">
            Toggle sections to include
          </p>
          <div className="space-y-2 mb-6">
            {sections.map((s) => (
              <label
                key={s.id}
                className="flex items-center gap-3 p-3 rounded-lg glass hover:bg-primary/5 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={s.enabled}
                  onChange={() => toggle(s.id)}
                  className="accent-primary w-4 h-4"
                />
                <span className="font-body text-sm text-foreground">{s.label}</span>
              </label>
            ))}
          </div>
          <button
            onClick={generate}
            disabled={generating || !sections.some((s) => s.enabled)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-heading text-sm tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {generating ? "GENERATING..." : "DOWNLOAD PDF"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;
