import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const BenAI = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getResponse = (userMsg: string): string => {
    const lower = userMsg.toLowerCase();

    const responses: Record<string, Record<string, string>> = {
      greeting: {
        en: "Hey there! 👋 I'm Ben-AI, Benjamin's digital assistant. Ask me anything about his projects, skills, socials, or background!",
        fr: "Salut ! 👋 Je suis Ben-AI, l'assistant numérique de Benjamin. Posez-moi des questions sur ses projets, compétences, réseaux sociaux ou parcours !",
        rw: "Muraho ! 👋 Ndi Ben-AI, umufasha wa Benjamin. Mbaza ikibazo icyo ari cyo cyose !",
        sw: "Habari! 👋 Mimi ni Ben-AI, msaidizi wa Benjamin. Niulize chochote!",
      },
      projects: {
        en: "Benjamin has built two major projects:\n\n🚗 **Vuu** - A smart transport platform connecting Rwandan motorcyclists with passengers. Features real-time tracking and digital ticketing (React, Node.js, PostgreSQL).\n\n🌍 **GlobalBride** - An international trade & tourism ecosystem built for the Hult Prize, connecting African manufacturers to global markets (Python, Django, React, AWS).",
        fr: "Benjamin a créé deux projets majeurs :\n\n🚗 **Vuu** - Plateforme de transport intelligent connectant les motocyclistes rwandais.\n\n🌍 **GlobalBride** - Écosystème de commerce international pour le Hult Prize.",
        rw: "Benjamin yakoze imishinga ibiri mikuru:\n\n🚗 **Vuu** - Sisitemu yo gutwara abantu.\n\n🌍 **GlobalBride** - Urubuga rw'ubucuruzi mpuzamahanga.",
      },
      skills: {
        en: "Benjamin's top skills: Python (90%), SQL (85%), Node.js (82%), React (80%), TypeScript (78%), and Cisco Networking (75%). He's a true full-stack engineer! 💪",
        fr: "Compétences de Benjamin : Python (90%), SQL (85%), Node.js (82%), React (80%), TypeScript (78%), Cisco (75%). Un vrai ingénieur full-stack ! 💪",
        rw: "Ubumenyi bwa Benjamin: Python (90%), SQL (85%), Node.js (82%), React (80%), TypeScript (78%), Cisco (75%). Ni umuhanga nyawe! 💪",
      },
      about: {
        en: "Benjamin Nshimiye is a 22-year-old Full-Stack Engineer from Nyarugenge, Rwanda. He's the 5th of 6 kids. He loves football ⚽, puzzles 🧩, and making people laugh 😂. Currently single (1.68m, 57kg) and focused on building amazing tech!",
        fr: "Benjamin Nshimiye, 22 ans, ingénieur Full-Stack de Nyarugenge, Rwanda. 5ème de 6 enfants. Il aime le football ⚽, les puzzles 🧩 et faire rire les gens 😂.",
        rw: "Benjamin Nshimiye afite imyaka 22, ni Umuhanga mu Ikoranabuhanga ukomoka Nyarugenge. Ni uwa 5 muri 6. Akunda umupira ⚽, ibisakuzo 🧩 n'inseko 😂.",
      },
      socials: {
        en: "You can connect with Benjamin on:\n\n💼 LinkedIn: linkedin.com/in/benjamin-nshimiye-b403983a5\n🐙 GitHub: github.com/Benjaminfromthe\n🐦 X/Twitter: x.com/BNshimiye61872\n📧 Email: benjaminnshimiye633@gmail.com\n\nAll links are in the navigation bar and footer!",
        fr: "Retrouvez Benjamin sur :\n\n💼 LinkedIn\n🐙 GitHub\n🐦 X/Twitter\n📧 Email: benjaminnshimiye633@gmail.com\n\nTous les liens sont dans la barre de navigation et le pied de page !",
        rw: "Shakira Benjamin kuri:\n\n💼 LinkedIn\n🐙 GitHub\n🐦 X/Twitter\n📧 Email: benjaminnshimiye633@gmail.com",
      },
      memories: {
        en: "The System Memories gallery showcases Benjamin's journey — key moments, achievements, and snapshots from his life and career. Check out the gallery section on the page! 📸",
        fr: "La galerie Mémoires Système présente le parcours de Benjamin — moments clés, réalisations et instantanés de sa vie. Découvrez la section galerie ! 📸",
        rw: "Amafoto y'Ububiko bwerekana urugendo rwa Benjamin — ibihe by'ingenzi n'ibyo yagezeho. Reba igice cy'amafoto! 📸",
      },
      contact: {
        en: "You can download Benjamin's CV and diploma from the Credentials section. For direct contact, scroll to the Contact section or email benjaminnshimiye633@gmail.com!",
        fr: "Vous pouvez télécharger le CV et le diplôme dans la section Diplômes. Pour le contacter: benjaminnshimiye633@gmail.com !",
        rw: "Ushobora gukuramo CV na Diploma mu gice cy'impamyabumenyi. Email: benjaminnshimiye633@gmail.com!",
      },
      default: {
        en: "That's a great question! I know everything about Benjamin — projects (Vuu & GlobalBride), skills, socials, memories, and personal life. What would you like to know? 🤖",
        fr: "Bonne question ! Je connais tout sur Benjamin. Que voulez-vous savoir ? 🤖",
        rw: "Ni ikibazo cyiza! Nzi byose kuri Benjamin. Ushaka kumenya iki? 🤖",
      },
    };

    const langKey = lang in (responses.greeting || {}) ? lang : "en";

    if (/^(hi|hello|hey|bonjour|salut|muraho|habari|hola|oi|hallo)/i.test(lower)) {
      return responses.greeting[langKey] || responses.greeting.en;
    }
    if (/project|vuu|globalbride|imishinga|projet|miradi|hult/i.test(lower)) {
      return responses.projects[langKey] || responses.projects.en;
    }
    if (/skill|ubumenyi|compétence|python|react|node/i.test(lower)) {
      return responses.skills[langKey] || responses.skills.en;
    }
    if (/about|who|benjamin|age|family|hobby|ibyanjye|propos|kuhusu/i.test(lower)) {
      return responses.about[langKey] || responses.about.en;
    }
    if (/social|linkedin|github|twitter|x\.com|connect|follow/i.test(lower)) {
      return responses.socials[langKey] || responses.socials.en;
    }
    if (/memor|gallery|photo|picture|amafoto/i.test(lower)) {
      return responses.memories[langKey] || responses.memories.en;
    }
    if (/contact|cv|diploma|download|resume|twandikire|email/i.test(lower)) {
      return responses.contact[langKey] || responses.contact.en;
    }
    return responses.default[langKey] || responses.default.en;
  };

  const sendMessage = () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    setTimeout(() => {
      const response = getResponse(userMsg);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setLoading(false);
    }, 600 + Math.random() * 800);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="ben-ai-bubble fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg animate-neon-pulse hover:scale-110 transition-transform"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 glass-strong rounded-2xl overflow-hidden animate-scale-in flex flex-col" style={{ height: "28rem" }}>
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="font-heading text-sm neon-text tracking-wider">Ben-AI</span>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-muted transition-colors">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <p className="font-heading text-sm neon-text mb-2">Ben-AI</p>
                <p className="font-mono text-xs text-muted-foreground">
                  {lang === "fr" ? "Posez-moi des questions sur Benjamin !" : lang === "rw" ? "Mbaza ibyerekeye Benjamin !" : "Ask me anything about Benjamin!"}
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-xl px-3 py-2 text-xs font-mono whitespace-pre-wrap ${
                  msg.role === "user" ? "bg-primary/20 text-foreground" : "glass text-foreground"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="glass rounded-xl px-3 py-2 text-xs font-mono text-muted-foreground animate-pulse">
                  typing...
                </div>
              </div>
            )}
          </div>

          <div className="px-3 py-2 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={lang === "fr" ? "Tapez un message..." : lang === "rw" ? "Andika ubutumwa..." : "Type a message..."}
              className="flex-1 bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="p-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BenAI;
