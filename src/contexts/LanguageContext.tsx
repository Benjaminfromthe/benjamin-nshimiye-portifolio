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
  skills: { en: "Programming Languages", rw: "Indimi za Porogaramu", fr: "Langages de Programmation", sw: "Lugha za Programu", zh: "编程语言", es: "Lenguajes de Programación", pt: "Linguagens de Programação", de: "Programmiersprachen", ar: "لغات البرمجة", hi: "प्रोग्रामिंग भाषाएँ", ja: "プログラミング言語", ko: "프로그래밍 언어" },
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
  memories_title: { en: "Memories", rw: "Ibyibukwa", fr: "Mémoires", sw: "Kumbukumbu", zh: "记忆", es: "Memorias", pt: "Memórias", de: "Erinnerungen", ar: "ذكريات", hi: "यादें", ja: "思い出", ko: "추억" },
  feedback_title: { en: "Leave Feedback", rw: "Tanga Igitekerezo", fr: "Laisser un Avis", sw: "Acha Maoni", zh: "留下反馈", es: "Dejar Comentarios", pt: "Deixar Feedback", de: "Feedback hinterlassen", ar: "اترك ملاحظات", hi: "फीडबैक दें", ja: "フィードバックを残す", ko: "피드백 남기기" },
  feedback_desc: { en: "Thank you for reviewing my CV! I'd love to hear your thoughts.", rw: "Murakoze gusoma CV yanjye!", fr: "Merci d'avoir consulté mon CV !", sw: "Asante kwa kukagua CV yangu!", zh: "感谢您查看我的简历！", es: "¡Gracias por revisar mi CV!", pt: "Obrigado por revisar meu CV!", de: "Danke für die Durchsicht!", ar: "شكراً لمراجعة سيرتي!", hi: "CV देखने के लिए धन्यवाद!", ja: "CVをご覧いただき感謝！", ko: "CV를 검토해 주셔서 감사합니다!" },
  feedback_name: { en: "Your Name", rw: "Izina Ryawe", fr: "Votre Nom", sw: "Jina Lako", zh: "您的姓名", es: "Tu Nombre", pt: "Seu Nome", de: "Ihr Name", ar: "اسمك", hi: "आपका नाम", ja: "お名前", ko: "이름" },
  feedback_email: { en: "Your Email", rw: "Imeyili Yawe", fr: "Votre Email", sw: "Barua Pepe Yako", zh: "您的邮箱", es: "Tu Email", pt: "Seu Email", de: "Ihre E-Mail", ar: "بريدك", hi: "आपका ईमेल", ja: "メール", ko: "이메일" },
  feedback_message: { en: "Your Message", rw: "Ubutumwa Bwawe", fr: "Votre Message", sw: "Ujumbe Wako", zh: "您的留言", es: "Tu Mensaje", pt: "Sua Mensagem", de: "Ihre Nachricht", ar: "رسالتك", hi: "आपका संदेश", ja: "メッセージ", ko: "메시지" },
  feedback_submit: { en: "Send Feedback", rw: "Ohereza", fr: "Envoyer", sw: "Tuma", zh: "发送", es: "Enviar", pt: "Enviar", de: "Senden", ar: "إرسال", hi: "भेजें", ja: "送信", ko: "보내기" },
  feedback_sent: { en: "Feedback Sent!", rw: "Byoherejwe!", fr: "Envoyé !", sw: "Imetumwa!", zh: "已发送！", es: "¡Enviado!", pt: "Enviado!", de: "Gesendet!", ar: "تم!", hi: "भेजा गया!", ja: "送信完了！", ko: "전송됨!" },
  hero_narrative: { en: "Passionate about solving local problems in Rwanda using global tech standards. Building bridges between African innovation and world-class engineering.", rw: "Nshishikajwe no gukemura ibibazo by'aho mu Rwanda nkoresheje ikoranabuhanga ry'isi yose.", fr: "Passionné par la résolution de problèmes locaux au Rwanda avec des standards technologiques mondiaux.", sw: "Shauku ya kutatua matatizo ya ndani nchini Rwanda kwa kutumia viwango vya teknolojia vya kimataifa.", zh: "热衷于用全球技术标准解决卢旺达本地问题。", es: "Apasionado por resolver problemas locales en Ruanda con estándares tecnológicos globales.", pt: "Apaixonado por resolver problemas locais em Ruanda usando padrões tecnológicos globais.", de: "Leidenschaftlich lokale Probleme in Ruanda mit globalen Techstandards lösen.", ar: "شغوف بحل المشكلات المحلية في رواندا باستخدام معايير التكنولوجيا العالمية.", hi: "वैश्विक तकनीकी मानकों का उपयोग करके रवांडा की स्थानीय समस्याओं को हल करने के लिए उत्साहित।", ja: "グローバルな技術基準を用いてルワンダの地域課題を解決することに情熱を注いでいます。", ko: "글로벌 기술 표준을 사용하여 르완다의 지역 문제를 해결하는 데 열정적입니다." },
  contact_send: { en: "Send Transmission", rw: "Ohereza", fr: "Envoyer", sw: "Tuma Ujumbe", zh: "发送传输", es: "Enviar Transmisión", pt: "Enviar Transmissão", de: "Übertragung senden", ar: "إرسال", hi: "ट्रांसमिशन भेजें", ja: "送信する", ko: "전송 보내기" },
  contact_sent: { en: "Transmission Sent!", rw: "Byoherejwe!", fr: "Transmission Envoyée !", sw: "Ujumbe Umetumwa!", zh: "传输已发送！", es: "¡Transmisión Enviada!", pt: "Transmissão Enviada!", de: "Übertragung gesendet!", ar: "تم الإرسال!", hi: "ट्रांसमिशन भेजा गया!", ja: "送信完了！", ko: "전송 완료!" },
  achievement_vault: { en: "Achievement Vault", rw: "Ububiko bw'Ibigezweho", fr: "Coffre des Réalisations", sw: "Hazina ya Mafanikio", zh: "成就宝库", es: "Bóveda de Logros", pt: "Cofre de Conquistas", de: "Errungenschaften-Tresor", ar: "خزينة الإنجازات", hi: "उपलब्धि तिजोरी", ja: "アチーブメント保管庫", ko: "업적 보관소" },
  achievement_cisco: { en: "Cisco Networking Basics", rw: "Ibanze bya Cisco", fr: "Bases du Réseau Cisco", sw: "Misingi ya Mtandao wa Cisco", zh: "Cisco网络基础", es: "Fundamentos de Redes Cisco", pt: "Fundamentos de Rede Cisco", de: "Cisco Netzwerk-Grundlagen", ar: "أساسيات شبكات سيسكو", hi: "Cisco नेटवर्किंग बेसिक्स", ja: "Ciscoネットワーキング基礎", ko: "Cisco 네트워킹 기초" },
  achievement_a2sv: { en: "A2SV Program Selection", rw: "Ihitamo rya A2SV", fr: "Sélection Programme A2SV", sw: "Uteuzi wa Programu A2SV", zh: "A2SV项目入选", es: "Selección Programa A2SV", pt: "Seleção Programa A2SV", de: "A2SV Programm-Auswahl", ar: "اختيار برنامج A2SV", hi: "A2SV प्रोग्राम चयन", ja: "A2SVプログラム選出", ko: "A2SV 프로그램 선발" },
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
