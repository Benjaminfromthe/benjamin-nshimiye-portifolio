import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Terminal, X } from "lucide-react";

interface Line {
  type: "input" | "output" | "error";
  text: string;
}

interface TerminalModeProps {
  open: boolean;
  onClose: () => void;
}

const HELP = `Available commands:
  help          List all commands
  about         About Benjamin
  skills        Show tech stack
  projects      List projects
  contact       Contact info
  social        Social links
  goto <id>     Scroll to section (hero, projects, skills, github, contact)
  theme         Toggle theme
  clear         Clear terminal
  whoami        Identify visitor
  date          Current date/time
  exit          Close terminal`;

const RESPONSES: Record<string, string> = {
  about: "Benjamin Nshimiye — Developer, problem solver, builder. Type 'skills' or 'projects' for more.",
  skills: "JavaScript • TypeScript • React • Node.js • Python • C • Tailwind • Supabase",
  projects: "1. Simba Supermarket → https://simba-supermarket-nine.vercel.app/\n2. Portfolio (this site)\n3. More on GitHub: github.com/Benjaminfromthe",
  contact: "Email: available in the Contact section. Type 'goto contact'.",
  social: "GitHub: github.com/Benjaminfromthe\nLinkedIn: see Contact section",
  whoami: "guest@benjamin-portfolio:~$ — welcome, visitor.",
};

const TerminalMode = ({ open, onClose }: TerminalModeProps) => {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "Benjamin OS [v2.6.4] — type 'help' to begin." },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const execute = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    const next: Line[] = [...lines, { type: "input", text: cmd }];
    const [base, ...args] = cmd.toLowerCase().split(/\s+/);

    if (base === "clear") {
      setLines([]);
      return;
    }
    if (base === "exit") {
      onClose();
      return;
    }
    if (base === "help") {
      next.push({ type: "output", text: HELP });
    } else if (base === "date") {
      next.push({ type: "output", text: new Date().toString() });
    } else if (base === "theme") {
      document.documentElement.classList.toggle("shinkai");
      next.push({ type: "output", text: "// theme toggled" });
    } else if (base === "goto") {
      const id = args[0];
      const el = id && document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        next.push({ type: "output", text: `// navigating to #${id}` });
      } else {
        next.push({ type: "error", text: `goto: section '${id || ""}' not found` });
      }
    } else if (RESPONSES[base]) {
      next.push({ type: "output", text: RESPONSES[base] });
    } else {
      next.push({ type: "error", text: `command not found: ${base}. type 'help'.` });
    }
    setLines(next);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      execute(input);
      setInput("");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-3xl h-[70vh] glass-strong border border-primary rounded-xl shadow-[0_0_40px_hsl(var(--primary)/0.4)] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/50">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="font-mono text-xs text-muted-foreground">benjamin@portfolio: ~</span>
          </div>
          <button onClick={onClose} className="p-1 hover:text-primary text-muted-foreground" aria-label="Close terminal">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div
          className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {l.type === "input" && <span className="text-primary">$ {l.text}</span>}
              {l.type === "output" && <span className="text-foreground">{l.text}</span>}
              {l.type === "error" && <span className="text-destructive">{l.text}</span>}
            </div>
          ))}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-primary">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              className="flex-1 bg-transparent outline-none text-foreground caret-primary"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
};

export default TerminalMode;
