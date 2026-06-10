import { useEffect, useState } from "react";
import { Music, Pause, Play } from "lucide-react";

// Static "now playing" widget — a curated coding playlist track.
// Simulates progress so the bar animates, like a Spotify embed.
const TRACK = {
  title: "Starboy",
  artist: "The Weeknd, Daft Punk",
  album: "Starboy",
  durationSec: 230,
  cover:
    "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
  url: "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB",
};

const fmt = (s: number) => {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

const NowPlaying = () => {
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(42);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setElapsed((e) => (e + 1) % TRACK.durationSec);
    }, 1000);
    return () => clearInterval(id);
  }, [playing]);

  const pct = (elapsed / TRACK.durationSec) * 100;

  return (
    <div className="glass rounded-xl p-3 flex items-center gap-3 w-full max-w-sm hover:neon-border transition-all">
      <a
        href={TRACK.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative shrink-0"
        title="Open in Spotify"
      >
        <img
          src={TRACK.cover}
          alt={`${TRACK.album} cover`}
          loading="lazy"
          className={`w-12 h-12 rounded-lg object-cover border border-primary/30 ${playing ? "animate-spin-slow" : ""}`}
          style={{ animationDuration: "8s" }}
        />
        <span className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-0.5">
          <Music className="w-2.5 h-2.5" />
        </span>
      </a>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-primary">
            {playing ? "Now Playing" : "Paused"}
          </span>
          <span className="relative flex h-1.5 w-1.5">
            {playing && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            )}
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
        </div>
        <p className="font-heading text-xs neon-text truncate">{TRACK.title}</p>
        <p className="font-mono text-[10px] text-muted-foreground truncate">
          {TRACK.artist}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="font-mono text-[9px] text-muted-foreground tabular-nums">
            {fmt(elapsed)}
          </span>
          <div className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-linear"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="font-mono text-[9px] text-muted-foreground tabular-nums">
            {fmt(TRACK.durationSec)}
          </span>
        </div>
      </div>
      <button
        onClick={() => setPlaying((p) => !p)}
        className="p-2 rounded-full glass hover:neon-border transition-all shrink-0"
        aria-label={playing ? "Pause" : "Play"}
      >
        {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};

export default NowPlaying;
