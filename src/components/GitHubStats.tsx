import { useEffect, useState } from "react";
import { Github, Star, GitFork, Users, BookOpen } from "lucide-react";

interface Stats {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  bio: string | null;
  html_url: string;
}

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

const USERNAME = "Benjaminfromthe";

const GitHubStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, repoRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`),
        ]);
        if (!userRes.ok || !repoRes.ok) throw new Error("Failed");
        const userData: Stats = await userRes.json();
        const repoData: Repo[] = await repoRes.json();
        const stars = repoData.reduce((acc, r) => acc + r.stargazers_count, 0);
        setStats(userData);
        setRepos(repoData.slice(0, 6));
        setTotalStars(stars);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="github" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl neon-text tracking-widest mb-2 flex items-center justify-center gap-3">
            <Github className="w-8 h-8" /> LIVE GITHUB STATS
          </h2>
          <p className="font-mono text-xs text-muted-foreground">// real-time data from github.com/{USERNAME}</p>
        </div>

        {loading && (
          <div className="text-center font-mono text-sm text-muted-foreground">Fetching telemetry...</div>
        )}

        {error && (
          <div className="text-center font-mono text-sm text-destructive">// Unable to reach GitHub API. Rate limit?</div>
        )}

        {stats && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard icon={<BookOpen className="w-5 h-5" />} label="Repos" value={stats.public_repos} />
              <StatCard icon={<Star className="w-5 h-5" />} label="Stars" value={totalStars} />
              <StatCard icon={<Users className="w-5 h-5" />} label="Followers" value={stats.followers} />
              <StatCard icon={<GitFork className="w-5 h-5" />} label="Following" value={stats.following} />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {repos.map((r) => (
                <a
                  key={r.id}
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-xl p-4 border border-border hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-mono text-sm text-primary group-hover:text-primary truncate">{r.name}</h3>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Star className="w-3 h-3" />{r.stargazers_count}</span>
                      <span className="flex items-center gap-1"><GitFork className="w-3 h-3" />{r.forks_count}</span>
                    </div>
                  </div>
                  <p className="font-body text-xs text-muted-foreground line-clamp-2 mb-2">
                    {r.description || "// no description"}
                  </p>
                  {r.language && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent">{r.language}</span>
                  )}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div className="glass rounded-xl p-4 border border-border text-center hover:border-primary transition-all">
    <div className="flex justify-center text-primary mb-2">{icon}</div>
    <div className="font-heading text-2xl neon-text">{value}</div>
    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
  </div>
);

export default GitHubStats;
