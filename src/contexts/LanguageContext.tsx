import React, { createContext, useContext, useState } from "react";

type Lang = "en" | "rw" | "fr";

const translations: Record<string, Record<Lang, string>> = {
  systemSyncing: { en: "System Syncing", rw: "Sisitemu Iri Guhuza", fr: "Synchronisation Système" },
  hero_title: { en: "Benjamin Nshimiye", rw: "Benjamin Nshimiye", fr: "Benjamin Nshimiye" },
  hero_subtitle: { en: "Full-Stack Engineer & Digital Architect", rw: "Umuhanga mu Ikoranabuhanga", fr: "Ingénieur Full-Stack & Architecte Numérique" },
  hero_bio: { en: "22 years old • From Nyarugenge • 5th of 6 siblings • Loves football, puzzles & laughter", rw: "Imyaka 22 • Ukomoka Nyarugenge • Uwa 5 muri 6 • Akunda umupira, ibisakuzo n'inseko", fr: "22 ans • De Nyarugenge • 5ème de 6 enfants • Aime le football, les puzzles et le rire" },
  credentials: { en: "Secure Archive", rw: "Ububiko Bwizewe", fr: "Archive Sécurisée" },
  projects: { en: "Engineering Showcase", rw: "Ibyagezweho", fr: "Vitrine d'Ingénierie" },
  skills: { en: "Power Matrix", rw: "Ingufu z'Ubumenyi", fr: "Matrice de Puissance" },
  download_cv: { en: "Download CV", rw: "Kuramo CV", fr: "Télécharger CV" },
  download_diploma: { en: "Download Diploma", rw: "Kuramo Impamyabumenyi", fr: "Télécharger Diplôme" },
  totalSyncs: { en: "Total System Syncs", rw: "Guhuza Sisitemu Yose", fr: "Syncs Système Total" },
  nav_home: { en: "Home", rw: "Ahabanza", fr: "Accueil" },
  nav_archive: { en: "Archive", rw: "Ububiko", fr: "Archive" },
  nav_projects: { en: "Projects", rw: "Imishinga", fr: "Projets" },
  nav_skills: { en: "Skills", rw: "Ubumenyi", fr: "Compétences" },
};

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}>({ lang: "en", setLang: () => {}, t: (k) => k });

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: string) => translations[key]?.[lang] || key;
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};
