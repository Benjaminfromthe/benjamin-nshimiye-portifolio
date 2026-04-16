import React, { createContext, useContext, useState } from "react";

export type Lang = "en" | "rw" | "fr" | "sw" | "zh" | "es" | "pt" | "de" | "ar" | "hi" | "ja" | "ko";

export const LANGUAGES: { code: Lang; name: string; welcome: string }[] = [
  { code: "en", name: "English", welcome: "Welcome" },
  { code: "rw", name: "Kinyarwanda", welcome: "Murakaza neza" },
  { code: "fr", name: "Français", welcome: "Bienvenue" },
  { code: "sw", name: "Kiswahili", welcome: "Karibu" },
  { code: "zh", name: "中文", welcome: "欢迎" },
  { code: "es", name: "Español", welcome: "Bienvenido" },
  { code: "pt", name: "Português", welcome: "Bem-vindo" },
  { code: "de", name: "Deutsch", welcome: "Willkommen" },
  { code: "ar", name: "العربية", welcome: "مرحباً" },
  { code: "hi", name: "हिन्दी", welcome: "स्वागत है" },
  { code: "ja", name: "日本語", welcome: "ようこそ" },
  { code: "ko", name: "한국어", welcome: "환영합니다" },
];

const translations: Record<string, Record<string, string>> = {
  systemSyncing: { en: "System Syncing", rw: "Sisitemu Iri Guhuza", fr: "Synchronisation Système", sw: "Mfumo Unasawazisha", zh: "系统同步中", es: "Sincronizando Sistema", pt: "Sincronizando Sistema", de: "System Synchronisierung", ar: "مزامنة النظام", hi: "सिस्टम सिंक हो रहा है", ja: "システム同期中", ko: "시스템 동기화 중" },
  hero_title: { en: "Benjamin Nshimiye", rw: "Benjamin Nshimiye", fr: "Benjamin Nshimiye", sw: "Benjamin Nshimiye", zh: "Benjamin Nshimiye", es: "Benjamin Nshimiye", pt: "Benjamin Nshimiye", de: "Benjamin Nshimiye", ar: "بنجامين نشيمية", hi: "बेंजामिन न्शिमिये", ja: "ベンジャミン・ンシミエ", ko: "벤자민 은시미예" },
  hero_subtitle: { en: "Full-Stack Engineer & Digital Architect", rw: "Umuhanga mu Ikoranabuhanga", fr: "Ingénieur Full-Stack & Architecte Numérique", sw: "Mhandisi wa Full-Stack", zh: "全栈工程师和数字架构师", es: "Ingeniero Full-Stack", pt: "Engenheiro Full-Stack", de: "Full-Stack-Ingenieur", ar: "مهندس فول ستاك", hi: "फुल-स्टैक इंजीनियर", ja: "フルスタックエンジニア", ko: "풀스택 엔지니어" },
  credentials: { en: "Secure Archive", rw: "Ububiko Bwizewe", fr: "Archive Sécurisée", sw: "Kumbukumbu Salama", zh: "安全档案", es: "Archivo Seguro", pt: "Arquivo Seguro", de: "Sicheres Archiv", ar: "أرشيف آمن", hi: "सुरक्षित अभिलेख", ja: "セキュアアーカイブ", ko: "보안 아카이브" },
  projects: { en: "Engineering Showcase", rw: "Ibyagezweho", fr: "Vitrine d'Ingénierie", sw: "Maonyesho ya Uhandisi", zh: "工程展示", es: "Exhibición de Ingeniería", pt: "Mostra de Engenharia", de: "Engineering Showcase", ar: "عرض الهندسة", hi: "इंजीनियरिंग शोकेस", ja: "エンジニアリングショーケース", ko: "엔지니어링 쇼케이스" },
  skills: { en: "Power Matrix", rw: "Ingufu z'Ubumenyi", fr: "Matrice de Puissance", sw: "Matrix ya Nguvu", zh: "能力矩阵", es: "Matriz de Poder", pt: "Matriz de Poder", de: "Power-Matrix", ar: "مصفوفة القوة", hi: "पावर मैट्रिक्स", ja: "パワーマトリックス", ko: "파워 매트릭스" },
  download_cv: { en: "Download CV", rw: "Kuramo CV", fr: "Télécharger CV", sw: "Pakua CV", zh: "下载简历", es: "Descargar CV", pt: "Baixar CV", de: "Lebenslauf herunterladen", ar: "تحميل السيرة الذاتية", hi: "CV डाउनलोड करें", ja: "CVをダウンロード", ko: "CV 다운로드" },
  download_diploma: { en: "Download Diploma", rw: "Kuramo Impamyabumenyi", fr: "Télécharger Diplôme", sw: "Pakua Diploma", zh: "下载文凭", es: "Descargar Diploma", pt: "Baixar Diploma", de: "Diplom herunterladen", ar: "تحميل الدبلوم", hi: "डिप्लोमा डाउनलोड करें", ja: "卒業証書をダウンロード", ko: "졸업장 다운로드" },
  totalSyncs: { en: "Total System Syncs", rw: "Guhuza Sisitemu Yose", fr: "Syncs Système Total", sw: "Usawazishaji Jumla", zh: "系统同步总数", es: "Sincronizaciones Totales", pt: "Sincronizações Totais", de: "Gesamte Synchronisierungen", ar: "إجمالي المزامنات", hi: "कुल सिस्टम सिंक", ja: "合計同期数", ko: "총 시스템 동기화" },
  nav_home: { en: "Home", rw: "Ahabanza", fr: "Accueil", sw: "Nyumbani", zh: "首页", es: "Inicio", pt: "Início", de: "Startseite", ar: "الرئيسية", hi: "होम", ja: "ホーム", ko: "홈" },
  nav_about: { en: "About", rw: "Ibyerekeye", fr: "À propos", sw: "Kuhusu", zh: "关于", es: "Acerca de", pt: "Sobre", de: "Über", ar: "حول", hi: "के बारे में", ja: "About", ko: "소개" },
  nav_projects: { en: "Projects", rw: "Imishinga", fr: "Projets", sw: "Miradi", zh: "项目", es: "Proyectos", pt: "Projetos", de: "Projekte", ar: "مشاريع", hi: "प्रोजेक्ट्स", ja: "プロジェクト", ko: "프로젝트" },
  nav_credentials: { en: "Credentials", rw: "Impamyabumenyi", fr: "Diplômes", sw: "Vyeti", zh: "资质", es: "Credenciales", pt: "Credenciais", de: "Zeugnisse", ar: "أوراق اعتماد", hi: "प्रमाण पत्र", ja: "資格", ko: "자격증" },
  nav_contact: { en: "Contact", rw: "Twandikire", fr: "Contact", sw: "Wasiliana", zh: "联系", es: "Contacto", pt: "Contato", de: "Kontakt", ar: "اتصل", hi: "संपर्क", ja: "連絡先", ko: "연락처" },
  about_title: { en: "About Me", rw: "Ibyanjye", fr: "À propos de moi", sw: "Kunihusu", zh: "关于我", es: "Sobre mí", pt: "Sobre mim", de: "Über mich", ar: "عني", hi: "मेरे बारे में", ja: "私について", ko: "나에 대해" },
  about_bio: { en: "I'm Benjamin Nshimiye, a 22-year-old Full-Stack Engineer from Nyarugenge, Rwanda. I'm the 5th of 6 siblings in my family. When I'm not coding, you'll find me playing football, solving puzzles, or sharing laughs with friends.", rw: "Nitwa Benjamin Nshimiye, mfite imyaka 22, ndi Umuhanga mu Ikoranabuhanga ukomoka Nyarugenge, Rwanda. Ndi uwa 5 muri abana 6. Iyo ntarimo gukora kuri mudasobwa, umbona nkina umupira, nshakisha ibisakuzo, cyangwa nseka n'inshuti.", fr: "Je suis Benjamin Nshimiye, ingénieur Full-Stack de 22 ans originaire de Nyarugenge, Rwanda. Je suis le 5ème de 6 enfants. Quand je ne code pas, vous me trouverez en train de jouer au football, résoudre des puzzles ou rire avec des amis.", sw: "Mimi ni Benjamin Nshimiye, Mhandisi wa Full-Stack mwenye umri wa miaka 22 kutoka Nyarugenge, Rwanda.", zh: "我是Benjamin Nshimiye，22岁，来自卢旺达Nyarugenge的全栈工程师。", es: "Soy Benjamin Nshimiye, ingeniero Full-Stack de 22 años de Nyarugenge, Rwanda.", pt: "Sou Benjamin Nshimiye, engenheiro Full-Stack de 22 anos de Nyarugenge, Ruanda.", de: "Ich bin Benjamin Nshimiye, 22 Jahre alt, Full-Stack-Ingenieur aus Nyarugenge, Ruanda.", ar: "أنا بنجامين نشيمية، مهندس فول ستاك عمري 22 سنة من نيارو جينجي، رواندا.", hi: "मैं बेंजामिन न्शिमिये हूं, 22 साल का फुल-स्टैक इंजीनियर, न्यारुजेंगे, रवांडा से।", ja: "私はBenjamin Nshimiye、ルワンダのNyarugenge出身の22歳のフルスタックエンジニアです。", ko: "저는 벤자민 은시미예, 르완다 냐루겐게 출신 22세 풀스택 엔지니어입니다." },
  select_language: { en: "Select Your Language", rw: "Hitamo Ururimi", fr: "Choisissez votre langue", sw: "Chagua Lugha Yako", zh: "选择您的语言", es: "Selecciona tu idioma", pt: "Selecione seu idioma", de: "Wähle deine Sprache", ar: "اختر لغتك", hi: "अपनी भाषा चुनें", ja: "言語を選択", ko: "언어를 선택하세요" },
};

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}>({ lang: "en", setLang: () => {}, t: (k) => k });

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>("en");
  const t = (key: string) => translations[key]?.[lang] || translations[key]?.["en"] || key;
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};
