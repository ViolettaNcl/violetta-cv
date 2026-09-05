"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Download,
  ExternalLink,
  FileUser,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  PanelsTopLeft,
} from "lucide-react";

type Language = "en" | "ru" | "el";
type SectionId = "profile" | "projects" | "experience" | "skills";

const EMAIL = "violettanicolaou@gmail.com";

const projects = [
  {
    title: "DentalClinic",
    summary: {
      en: "Full-stack system for a real dental practice with multilingual booking, role-based dashboards and real-time updates.",
      ru: "Full-stack система для реальной стоматологии: многоязычная запись, ролевые кабинеты и обновления в реальном времени.",
      el: "Full-stack σύστημα για πραγματικό οδοντιατρείο με πολυγλωσσικά ραντεβού, πίνακες ανά ρόλο και ενημερώσεις σε πραγματικό χρόνο.",
    },
    proof: {
      en: "5 interface languages · JWT auth",
      ru: "5 языков интерфейса · JWT-авторизация",
      el: "5 γλώσσες διεπαφής · έλεγχος ταυτότητας JWT",
    },
    stack: ["C#", "ASP.NET Core 9", "EF Core", "SQL Server", "SignalR", "Docker"],
    live: "http://www.dental-clinic.somee.com/",
    repo: "https://github.com/ViolettaNcl/DentalClinic",
  },
  {
    title: "Smart Route Planner",
    summary: {
      en: "Route-planning PWA with MLP neural network, K-Means clustering and evaluation tools implemented from scratch.",
      ru: "PWA для маршрутов с нейросетью MLP, K-Means и инструментами оценки, реализованными с нуля.",
      el: "PWA σχεδιασμού διαδρομών με νευρωνικό δίκτυο MLP, ομαδοποίηση K-Means και εργαλεία αξιολόγησης υλοποιημένα από το μηδέν.",
    },
    proof: {
      en: "132 automated tests · CI pipeline",
      ru: "132 автотеста · CI-пайплайн",
      el: "132 αυτοματοποιημένες δοκιμές · ροή CI",
    },
    stack: ["PHP 8.1+", "JavaScript", "MLP", "K-Means", "OSRM", "PWA"],
    live: "https://smart-route-planner-wiwk.onrender.com",
    repo: "https://github.com/ViolettaNcl/smart-route-planner",
  },
  {
    title: "FleetManagement",
    summary: {
      en: "Role-based desktop application for managing vehicles, drivers and routes with a structured data layer.",
      ru: "Desktop-приложение с ролевым доступом для управления автомобилями, водителями и маршрутами.",
      el: "Εφαρμογή desktop με δικαιώματα ανά ρόλο για τη διαχείριση οχημάτων, οδηγών και διαδρομών, με δομημένο επίπεδο δεδομένων.",
    },
    proof: {
      en: "Layered architecture · MSTest",
      ru: "Слоистая архитектура · MSTest",
      el: "Πολυεπίπεδη αρχιτεκτονική · MSTest",
    },
    stack: ["C#", "WPF", "XAML", ".NET Framework", "EF6", "SQL Server"],
    live: null,
    repo: "https://github.com/ViolettaNcl/FleetManagement",
  },
];

const skillGroups = [
  { key: "backend", items: ["C#", ".NET", "ASP.NET Core", "Web API", "EF Core", "PHP"] },
  { key: "frontend", items: ["TypeScript", "React", "Next.js", "JavaScript", "HTML5", "CSS3"] },
  { key: "databases", items: ["SQL Server", "Entity Framework 6"] },
  { key: "tools", items: ["Git", "GitHub Actions", "Docker", "REST", "SignalR", "JWT"] },
  { key: "testing", items: ["MSTest", "Automated Testing", "MLP", "K-Means"] },
] as const;

const copy = {
  en: {
    role: "Junior Full-Stack .NET Developer",
    status: "Open to remote full-time roles",
    location: "Volgograd, Russia · UTC+3",
    summary: "Junior full-stack developer with an honours programming diploma and hands-on delivery of a real dental-practice client project. Strongest in C#, ASP.NET Core, SQL, TypeScript/React and tested application development.",
    nav: ["Profile", "Projects", "Experience", "Skills"],
    download: "Download ATS CV",
    highlights: ["Real client project", "132 automated tests", "3 fluent languages"],
    projects: "Selected projects",
    portfolio: "GitHub portfolio",
    live: "Live demo",
    source: "GitHub",
    desktop: "Desktop app",
    skills: "Technical skills",
    skillLabels: { backend: "Backend", frontend: "Frontend", databases: "Databases", tools: "Tools", testing: "Testing & ML" },
    experience: "Experience",
    development: "Full-Stack .NET Developer — DentalClinic",
    developmentDates: "2026",
    developmentOrg: "Independent client project · dental practice",
    developmentText: "Built and documented an ASP.NET Core/EF Core/SQL Server platform with JWT auth, role-based workflows, SignalR real-time updates, background jobs, multilingual UI and external AI integrations.",
    translator: "Independent Translator",
    translatorDates: "2019 — Present",
    translatorText: "Translation and multilingual communication across Russian, English and Greek.",
    reception: "Front Desk Receptionist",
    receptionOrg: "Crowne Plaza Limassol · Cyprus",
    receptionDates: "2020 — 2022",
    receptionText: "Guest service, reservations, cross-team coordination and three-language interpretation.",
    education: "Education",
    degree: "Programmer · Honours diploma",
    school: "Moscow International College of Digital Technologies “TOP Academy”",
    degreeText: "09.02.07 Information Systems and Programming · July 2026",
    languages: "Languages",
    languageRows: [["Russian", "Fluent"], ["English", "Fluent"], ["Greek", "Fluent"], ["French", "Beginner"]],
    strengths: "Working style",
    strengthItems: ["Fast learner", "Disciplined & dependable", "Clear communicator", "Always on time"],
    contact: "Contact",
    footer: "Available for junior / entry-level Full-Stack and .NET roles.",
    navLabel: "CV sections",
    languageLabel: "Language",
  },
  ru: {
    role: "Junior Full-Stack .NET разработчик",
    status: "Открыта к удалённой работе full-time",
    location: "Волгоград, Россия · UTC+3",
    summary: "Junior Full-Stack .NET разработчик с дипломом программиста с отличием и практическим клиентским проектом для стоматологии. Основной стек: C#, ASP.NET Core, SQL, TypeScript/React и разработка приложений с автотестами.",
    nav: ["Профиль", "Проекты", "Опыт", "Навыки"],
    download: "Скачать ATS-CV",
    highlights: ["Реальный клиентский проект", "132 автотеста", "3 языка свободно"],
    projects: "Избранные проекты",
    portfolio: "Портфолио GitHub",
    live: "Live Demo",
    source: "GitHub",
    desktop: "Desktop-приложение",
    skills: "Технические навыки",
    skillLabels: { backend: "Backend", frontend: "Frontend", databases: "Базы данных", tools: "Инструменты", testing: "Тестирование и ML" },
    experience: "Опыт работы",
    development: "Full-Stack .NET разработчик — DentalClinic",
    developmentDates: "2026",
    developmentOrg: "Самостоятельный клиентский проект · стоматологическая практика",
    developmentText: "Разработала и задокументировала платформу на ASP.NET Core/EF Core/SQL Server: JWT-авторизация, ролевые сценарии, SignalR, фоновые задачи, многоязычный интерфейс и интеграции с AI-сервисами.",
    translator: "Независимый переводчик",
    translatorDates: "2019 — сейчас",
    translatorText: "Перевод и многоязычная коммуникация на русском, английском и греческом.",
    reception: "Администратор стойки регистрации",
    receptionOrg: "Crowne Plaza Limassol · Кипр",
    receptionDates: "2020 — 2022",
    receptionText: "Работа с гостями и бронированиями, координация отделов и перевод на трёх языках.",
    education: "Образование",
    degree: "Программист · диплом с отличием",
    school: "Московский международный колледж цифровых технологий «Академия ТОП»",
    degreeText: "09.02.07 Информационные системы и программирование · июль 2026",
    languages: "Языки",
    languageRows: [["Русский", "Свободно"], ["Английский", "Свободно"], ["Греческий", "Свободно"], ["Французский", "Начальный"]],
    strengths: "Стиль работы",
    strengthItems: ["Быстро учусь", "Дисциплина и надёжность", "Понятная коммуникация", "Всегда вовремя"],
    contact: "Контакты",
    footer: "Открыта к позициям Junior / Entry-Level Full-Stack и .NET Developer.",
    navLabel: "Разделы CV",
    languageLabel: "Язык",
  },
  el: {
    role: "Junior Full-Stack .NET Developer",
    status: "Διαθέσιμη για απομακρυσμένη εργασία πλήρους απασχόλησης",
    location: "Βόλγκογκραντ, Ρωσία · UTC+3",
    summary: "Junior full-stack developer με πτυχίο προγραμματισμού με άριστα και πρακτική εμπειρία σε πραγματικό έργο πελάτη για οδοντιατρείο. Ισχυρότεροι τομείς: C#, ASP.NET Core, SQL, TypeScript/React και αυτοματοποιημένες δοκιμές.",
    nav: ["Προφίλ", "Έργα", "Εμπειρία", "Δεξιότητες"],
    download: "Λήψη ATS CV",
    highlights: ["Πραγματικό έργο πελάτη", "132 αυτοματοποιημένες δοκιμές", "3 γλώσσες με ευχέρεια"],
    projects: "Επιλεγμένα έργα",
    portfolio: "Portfolio στο GitHub",
    live: "Live demo",
    source: "GitHub",
    desktop: "Εφαρμογή desktop",
    skills: "Τεχνικές δεξιότητες",
    skillLabels: { backend: "Backend", frontend: "Frontend", databases: "Βάσεις δεδομένων", tools: "Εργαλεία", testing: "Δοκιμές & ML" },
    experience: "Επαγγελματική εμπειρία",
    development: "Full-Stack .NET Developer — DentalClinic",
    developmentDates: "2026",
    developmentOrg: "Ανεξάρτητο έργο πελάτη · οδοντιατρείο",
    developmentText: "Ανάπτυξη και τεκμηρίωση πλατφόρμας ASP.NET Core/EF Core/SQL Server με JWT, ρόλους χρηστών, SignalR, background jobs, πολύγλωσσο UI και εξωτερικές AI integrations.",
    translator: "Ανεξάρτητη μεταφράστρια",
    translatorDates: "2019 — σήμερα",
    translatorText: "Μετάφραση και πολυγλωσσική επικοινωνία στα ρωσικά, αγγλικά και ελληνικά.",
    reception: "Υπάλληλος υποδοχής",
    receptionOrg: "Crowne Plaza Limassol · Κύπρος",
    receptionDates: "2020 — 2022",
    receptionText: "Εξυπηρέτηση επισκεπτών, κρατήσεις, συντονισμός ομάδων και διερμηνεία σε τρεις γλώσσες.",
    education: "Εκπαίδευση",
    degree: "Προγραμματίστρια · Πτυχίο με άριστα",
    school: "Moscow International College of Digital Technologies «TOP Academy»",
    degreeText: "09.02.07 Πληροφοριακά Συστήματα και Προγραμματισμός · Ιούλιος 2026",
    languages: "Γλώσσες",
    languageRows: [["Ρωσικά", "Με ευχέρεια"], ["Αγγλικά", "Με ευχέρεια"], ["Ελληνικά", "Με ευχέρεια"], ["Γαλλικά", "Αρχάριο επίπεδο"]],
    strengths: "Τρόπος εργασίας",
    strengthItems: ["Μαθαίνω γρήγορα", "Πειθαρχία και αξιοπιστία", "Σαφής επικοινωνία", "Πάντα συνεπής"],
    contact: "Επικοινωνία",
    footer: "Διαθέσιμη για θέσεις Junior / Entry-Level Full-Stack και .NET Developer.",
    navLabel: "Ενότητες CV",
    languageLabel: "Γλώσσα",
  },
};

const sectionIds: SectionId[] = ["profile", "projects", "experience", "skills"];
const sectionIcons = [FileUser, PanelsTopLeft, BriefcaseBusiness, Code2];

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeSection, setActiveSection] = useState<SectionId>("profile");
  const clickLock = useRef(0);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < clickLock.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id as SectionId);
      },
      { rootMargin: "-16% 0px -56%", threshold: [0.08, 0.25, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navigateTo = (id: SectionId) => {
    clickLock.current = Date.now() + 900;
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const changeLanguage = (nextLanguage: Language) => setLanguage(nextLanguage);

  return (
    <main id="top">
      <div className="siteShell">
        <aside className="navRail" aria-label={t.navLabel}>
          <button className="monogram" onClick={() => navigateTo("profile")} aria-label="Виолетта Николау profile">VN</button>
          <div className="navList">
            {sectionIds.map((id, index) => {
              const Icon = sectionIcons[index];
              const active = activeSection === id;
              return (
                <button key={id} className={active ? "active" : ""} onClick={() => navigateTo(id)} aria-current={active ? "location" : undefined}>
                  <span className="navNumber">0{index + 1}</span>
                  <Icon aria-hidden="true" />
                  <span className="navText">{t.nav[index]}</span>
                </button>
              );
            })}
          </div>
          <div className="languageSwitch" aria-label={t.languageLabel}>
            {(["en", "ru", "el"] as Language[]).map((code) => (
              <button key={code} className={language === code ? "active" : ""} onClick={() => changeLanguage(code)} aria-pressed={language === code}>
                {code.toUpperCase()}
              </button>
            ))}
          </div>
        </aside>

        <div className="resume">
          <header className="resumeHeader navSection" id="profile">
            <div className="identity">
              <p className="overline">{t.role}</p>
              <h1>Виолетта Николау</h1>
              <p className="summary">{t.summary}</p>
            </div>
            <div className="contactBlock" aria-label={t.contact}>
              <span className="availability"><i />{t.status}</span>
              <a href={`mailto:${EMAIL}`}><Mail size={15} />{EMAIL}</a>
              <a href="https://github.com/ViolettaNcl" target="_blank" rel="noreferrer"><Code2 size={15} />github.com/ViolettaNcl</a>
              <span><MapPin size={15} />{t.location}</span>
              <a className="download" href="/Violetta_Nicolaou_CV.docx" download><Download size={15} />{t.download}</a>
            </div>
            <div className="highlights" aria-label="Candidate highlights">
              {t.highlights.map((item) => <span key={item}><Check size={14} />{item}</span>)}
            </div>
          </header>

          <div className="resumeGrid">
            <aside className="sidebar">
              <section className="cvSection navSection" id="skills">
                <h2><Code2 />{t.skills}</h2>
                <div className="skillGroups">
                  {skillGroups.map((group) => (
                    <div className="skillGroup" key={group.key}>
                      <h3>{t.skillLabels[group.key]}</h3>
                      <p>{group.items.join(" · ")}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="cvSection">
                <h2><Languages />{t.languages}</h2>
                <div className="languageList">
                  {t.languageRows.map(([name, level]) => <p key={name}><span>{name}</span><strong>{level}</strong></p>)}
                </div>
              </section>

              <section className="cvSection">
                <h2><Check />{t.strengths}</h2>
                <ul className="strengthList">
                  {t.strengthItems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>

              <section className="cvSection education">
                <h2><GraduationCap />{t.education}</h2>
                <strong>{t.degree}</strong>
                <p>{t.school}</p>
                <small>{t.degreeText}</small>
              </section>
            </aside>

            <div className="mainColumn">
              <section className="cvSection navSection" id="projects">
                <div className="sectionTitle">
                  <h2><Code2 />{t.projects}</h2>
                  <span>{t.portfolio}</span>
                </div>
                <div className="projectGrid">
                  {projects.map((project) => (
                    <article className="projectCard" key={project.title}>
                      <div className="projectTop">
                        <h3>{project.title}</h3>
                        <div className="projectActions">
                          {project.live ? <a href={project.live} target="_blank" rel="noreferrer" aria-label={`${project.title} ${t.live}`}><ExternalLink size={15} />{t.live}</a> : <span>{t.desktop}</span>}
                          <a href={project.repo} target="_blank" rel="noreferrer" aria-label={`${project.title} ${t.source}`}><Code2 size={15} />{t.source}</a>
                        </div>
                      </div>
                      <p>{project.summary[language]}</p>
                      <strong className="proof">{project.proof[language]}</strong>
                      <div className="tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="cvSection navSection" id="experience">
                <h2><BriefcaseBusiness />{t.experience}</h2>
                <div className="experienceList">
                  <article>
                    <div><h3>{t.development}</h3><span>{t.developmentDates}</span></div>
                    <strong>{t.developmentOrg}</strong>
                    <p>{t.developmentText}</p>
                  </article>
                  <article>
                    <div><h3>{t.translator}</h3><span>{t.translatorDates}</span></div>
                    <p>{t.translatorText}</p>
                  </article>
                  <article>
                    <div><h3>{t.reception}</h3><span>{t.receptionDates}</span></div>
                    <strong>{t.receptionOrg}</strong>
                    <p>{t.receptionText}</p>
                  </article>
                </div>
              </section>
            </div>
          </div>

          <footer>
            <span>{t.footer}</span>
            <div>
              <a href={`mailto:${EMAIL}`}>{t.contact}<Mail size={14} /></a>
              <a href="https://github.com/ViolettaNcl" target="_blank" rel="noreferrer">GitHub<ArrowUpRight size={14} /></a>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
