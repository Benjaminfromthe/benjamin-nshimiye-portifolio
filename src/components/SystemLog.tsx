import { useEffect, useRef, useState } from "react";

const initialLogs = [
  "> Welcome_User.exe loaded...",
  "> Initializing BEN.SYS v2.0...",
  "> Neural_Network.connect() → OK",
  "> Loading credentials archive...",
  "> Skills matrix calibrated.",
  "> Portfolio render: COMPLETE",
];

const SystemLog = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < initialLogs.length) {
        setLogs((prev) => [...prev, initialLogs[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="fixed bottom-4 right-4 z-30 w-72 hidden lg:block">
      <div className="glass-strong rounded-lg overflow-hidden">
        <div className="px-3 py-1.5 border-b border-border flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="font-mono text-[10px] text-muted-foreground uppercase">System Log</span>
        </div>
        <div ref={containerRef} className="h-32 overflow-y-auto p-3 space-y-1">
          {logs.map((log, i) => (
            <p key={i} className="font-mono text-[10px] text-neon-green/80" style={{ animation: "typewriter 0.3s ease-out" }}>
              {log}
            </p>
          ))}
          <span className="font-mono text-[10px] text-primary animate-pulse">▊</span>
        </div>
      </div>
    </div>
  );
};

export default SystemLog;
