import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, Code2 } from "lucide-react";

const DEFAULT_CODE = `// Welcome to the live playground!
// Try editing the code and hit Run.

const greet = (name) => {
  return \`Hello, \${name}! Welcome to my portfolio.\`;
};

console.log(greet("visitor"));

// A small demo: Fibonacci
const fib = (n) => n < 2 ? n : fib(n - 1) + fib(n - 2);
for (let i = 0; i < 8; i++) {
  console.log(\`fib(\${i}) = \${fib(i)}\`);
}
`;

const CodePlayground = () => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState<string[]>([]);

  const run = () => {
    const logs: string[] = [];
    const sandboxConsole = {
      log: (...args: unknown[]) =>
        logs.push(args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ")),
      error: (...args: unknown[]) => logs.push("✗ " + args.join(" ")),
      warn: (...args: unknown[]) => logs.push("! " + args.join(" ")),
    };
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function("console", code);
      fn(sandboxConsole);
      setOutput(logs.length ? logs : ["(no output)"]);
    } catch (e) {
      setOutput([`✗ ${(e as Error).message}`]);
    }
  };

  const reset = () => {
    setCode(DEFAULT_CODE);
    setOutput([]);
  };

  return (
    <section id="playground" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl neon-text text-center tracking-widest mb-3">
          LIVE PLAYGROUND
        </h2>
        <p className="font-mono text-xs text-muted-foreground text-center mb-12 uppercase tracking-widest">
          Run JavaScript right in the browser
        </p>

        <div className="max-w-5xl mx-auto glass rounded-xl overflow-hidden neon-border">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-background/40">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                sandbox.js
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={reset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md glass hover:neon-border transition-all font-mono text-[10px] uppercase tracking-wider"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
              <button
                onClick={run}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-mono text-[10px] uppercase tracking-wider"
              >
                <Play className="w-3 h-3" /> Run
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-[320px] border-b md:border-b-0 md:border-r border-border/50">
              <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(v) => setCode(v ?? "")}
                options={{
                  fontSize: 13,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  padding: { top: 12 },
                  fontFamily: "JetBrains Mono, ui-monospace, monospace",
                }}
              />
            </div>
            <div className="h-[320px] overflow-y-auto p-4 bg-background/60 font-mono text-xs">
              <div className="text-muted-foreground uppercase tracking-widest text-[9px] mb-2">
                Output
              </div>
              {output.length === 0 ? (
                <div className="text-muted-foreground/60 italic">
                  Press Run to execute…
                </div>
              ) : (
                <pre className="whitespace-pre-wrap text-foreground/90 leading-relaxed">
                  {output.join("\n")}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodePlayground;
