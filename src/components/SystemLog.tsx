import { useEffect, useRef, useState } from "react";
import { useLanguage, LANGUAGES } from "@/contexts/LanguageContext";
import { Minus, Maximize2, X, Terminal } from "lucide-react";

const SystemLog = () => {
  const { lang } = useLanguage();
  const [logs, setLogs] = useState<string[]>([]);
  const [state, setState] = useState<"minimized" | "maximized" | "closed">("minimized");
  const containerRef = useRef<HTMLDivElement>(null);
  const logIndexRef = useRef(0);

  const langName = LANGUAGES.find((l) => l.code === lang)?.name ?? lang;

  const initialLogs = [
    "> Initializing Ben-AI Core...",
    `> Syncing Language: ${langName}...`,
    "> Loading Project_Vuu_Database...",
    `> Connection established at ${new Date().toLocaleTimeString()}.`,
    "> Neural_Network.connect() → OK",
    "> Loading credentials archive...",
    "> Skills matrix calibrated.",
    "> Portfolio render: COMPLETE",
  ];

  useEffect(() => {
    if (state === "closed") return;
    logIndexRef.current = 0;
    setLogs([]);

    const interval = setInterval(() => {
      if (logIndexRef.current < initialLogs.length) {
        const idx = logIndexRef.current;
        setLogs((prev) => [...prev, initialLogs[idx]]);
        logIndexRef.current++;
      } else {
        clearInterval(interval);
      }
    }, 700);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, state === "closed"]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  if (state === "closed") return null;

  // Minimized floating tab
  if (state === "minimized") {
    return (
      <button
        onClick={() => setState("maximized")}
        className="fixed bottom-4 left-4 z-30 hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-black/80 border border-green-500/30 backdrop-blur-md hover:border-green-500/60 transition-all duration-300 group"
      >
        <Terminal className="w-3.5 h-3.5 text-green-400 group-hover:animate-pulse" />
        <span className="font-mono text-[10px] text-green-400 uppercase tracking-wider">System Log</span>
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      </button>
    );
  }

  // Maximized terminal
  return (
    <div className="fixed bottom-4 left-4 z-30 w-80 hidden lg:block animate-scale-in">
      <div className="rounded-xl overflow-hidden border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
        {/* Title bar */}
        <div className="bg-black/95 backdrop-blur-md px-3 py-2 flex items-center justify-between border-b border-green-500/20">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-green-400" />
            <span className="font-mono text-[10px] text-green-400 uppercase tracking-wider">ben@system:~</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setState("minimized")}
              className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-yellow-500/20 transition-colors"
              aria-label="Minimize"
            >
              <Minus className="w-3 h-3 text-yellow-500" />
            </button>
            <button
              onClick={() => setState("maximized")}
              className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-green-500/20 transition-colors"
              aria-label="Maximize"
            >
              <Maximize2 className="w-3 h-3 text-green-500" />
            </button>
            <button
              onClick={() => setState("closed")}
              className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors"
              aria-label="Close"
            >
              <X className="w-3 h-3 text-red-500" />
            </button>
          </div>
        </div>

        {/* Terminal body */}
        <div
          ref={containerRef}
          className="bg-black/90 backdrop-blur-md h-40 overflow-y-auto p-3 space-y-1 scrollbar-thin scrollbar-thumb-green-500/20"
        >
          {logs.map((log, i) => (
            <p key={i} className="font-mono text-[11px] text-green-400/90 leading-relaxed animate-fade-in">
              {log}
            </p>
          ))}
          <span className="font-mono text-[11px] text-green-400 animate-pulse">▊</span>
        </div>
      </div>
    </div>
  );
};

export default SystemLog;
