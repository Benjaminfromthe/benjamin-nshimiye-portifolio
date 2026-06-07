import { useEffect, useState, FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageSquare, Send, Users, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Entry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const Guestbook = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [visitors, setVisitors] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Increment visitor count once per session
    const incOnce = async () => {
      if (sessionStorage.getItem("visitor-counted") === "true") {
        const { data } = await supabase.from("visitor_stats").select("count").eq("id", 1).maybeSingle();
        if (mounted && data) setVisitors(Number(data.count));
        return;
      }
      const { data, error } = await supabase.rpc("increment_visitor_count");
      if (!error && mounted) {
        sessionStorage.setItem("visitor-counted", "true");
        setVisitors(Number(data));
      }
    };

    const loadEntries = async () => {
      const { data } = await supabase
        .from("guestbook_entries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(30);
      if (mounted) {
        setEntries((data as Entry[]) || []);
        setLoading(false);
      }
    };

    incOnce();
    loadEntries();

    const channel = supabase
      .channel("guestbook-live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook_entries" },
        (payload) => {
          setEntries((prev) => [payload.new as Entry, ...prev].slice(0, 30));
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const m = message.trim();
    if (!n || !m) return;
    setSending(true);
    const { error } = await supabase.from("guestbook_entries").insert({ name: n, message: m });
    setSending(false);
    if (error) {
      toast({ title: "Could not sign", description: error.message, variant: "destructive" });
      return;
    }
    setMessage("");
    toast({ title: "Signed!", description: "Thanks for stopping by." });
  };

  return (
    <section id="guestbook" className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
          <h2 className="font-heading text-2xl md:text-3xl neon-text tracking-widest">GUESTBOOK</h2>
          <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              {visitors === null ? "…" : visitors.toLocaleString()} visitors
            </span>
          </div>
        </div>
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-8">
          Leave a trace — public message wall
        </p>

        <form onSubmit={submit} className="glass rounded-xl p-5 mb-8 space-y-3">
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            required
            className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:border-primary transition-colors"
          />
          <textarea
            placeholder="Say something nice (max 280 chars)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={280}
            required
            rows={3}
            className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
          />
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              {message.length}/280
            </span>
            <button
              type="submit"
              disabled={sending || !name.trim() || !message.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-heading text-xs tracking-wider hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {sending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              SIGN
            </button>
          </div>
        </form>

        <div className="space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-12 glass rounded-xl">
              <MessageSquare className="w-6 h-6 text-primary/50 mx-auto mb-2" />
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                Be the first to sign
              </p>
            </div>
          ) : (
            entries.map((e) => (
              <div key={e.id} className="glass rounded-xl p-4 hover:neon-border transition-all animate-fade-in">
                <div className="flex items-center justify-between mb-2 gap-3">
                  <span className="font-heading text-sm neon-text tracking-wider truncate">{e.name}</span>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider shrink-0">
                    {new Date(e.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="font-body text-sm text-foreground/90 leading-relaxed break-words">{e.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Guestbook;
