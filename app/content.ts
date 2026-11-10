export type Language = "en" | "ru" | "el";
type L = Record<Language, string>;

export const EMAIL = "violettanicolaou@gmail.com";
export const GITHUB = "https://github.com/ViolettaNcl";
export const TELEGRAM = "https://t.me/Violet111";

export const pdf: Record<Language, { href: string; file: string }> = {
  en: { href: "/Violetta_Nicolaou_CV_EN_v3.pdf", file: "Violetta_Nicolaou_CV_EN.pdf" },
  ru: { href: "/Violetta_Nicolaou_CV_RU_v3.pdf", file: "Violetta_Nicolaou_CV_RU.pdf" },
  el: { href: "/Violetta_Nicolaou_CV_EN_v3.pdf", file: "Violetta_Nicolaou_CV_EN.pdf" },
};

export const stats: { value: number; suffix: string; label: L }[] = [
  { value: 20, suffix: "+", label: { en: "months of commercial work", ru: "месяцев коммерческих проектов", el: "μήνες εμπορικών έργων" } },
  { value: 6, suffix: "", label: { en: "kinds of products I build", ru: "видов продуктов, которые делаю", el: "είδη προϊόντων που φτιάχνω" } },
  { value: 132, suffix: "", label: { en: "automated tests in one project", ru: "автотеста в одном проекте", el: "αυτόματα tests σε ένα έργο" } },
  { value: 4, suffix: "", label: { en: "languages · 2 native", ru: "языка · 2 родных", el: "γλώσσες · 2 μητρικές" } },
];

export const marquee = [
  "Web apps", "C#", "ASP.NET Core", "Mobile apps", "Kotlin", "React", "Bots", "TypeScript", "Landing pages",
  "SQL Server", "APIs", "SignalR", "Next.js", "Games", "Docker", "GitHub Actions", "Integrations", "PostgreSQL",
];

export type Service = { key: string; icon: string; title: L; text: L; tags: string[] };

export const services: Service[] = [
  {
    key: "web", icon: "/img/icon-web.webp",
    title: { en: "Web applications", ru: "Веб-приложения", el: "Web εφαρμογές" },
    text: {
      en: "Booking systems, CRMs, dashboards and client portals — with roles, real-time updates and an admin panel.",
      ru: "Системы записи, CRM, дашборды и личные кабинеты — с ролями, обновлениями в реальном времени и админкой.",
      el: "Συστήματα κρατήσεων, CRM, dashboards και portals πελατών — με ρόλους, real-time και admin panel.",
    },
    tags: ["ASP.NET Core", "React", "SQL"],
  },
  {
    key: "mobile", icon: "/img/icon-mobile.webp",
    title: { en: "Mobile apps", ru: "Мобильные приложения", el: "Mobile εφαρμογές" },
    text: {
      en: "Native Android apps that feel good to use: offline mode, voice, multilingual and RTL interfaces.",
      ru: "Нативные Android-приложения, которыми приятно пользоваться: офлайн-режим, озвучка, мультиязычность и RTL.",
      el: "Native Android εφαρμογές: offline λειτουργία, φωνή, πολύγλωσσες διεπαφές και RTL.",
    },
    tags: ["Kotlin", "Android", "TTS"],
  },
  {
    key: "api", icon: "/img/icon-api.webp",
    title: { en: "APIs & integrations", ru: "API и интеграции", el: "APIs & integrations" },
    text: {
      en: "Secure REST APIs, payment and messenger integrations, AI services and data exchange between your systems.",
      ru: "Надёжные REST API, интеграции с оплатой и мессенджерами, AI-сервисы и обмен данными между вашими системами.",
      el: "Ασφαλή REST APIs, ενσωματώσεις πληρωμών και messengers, AI υπηρεσίες και ανταλλαγή δεδομένων.",
    },
    tags: ["REST", "JWT", "Webhooks"],
  },
  {
    key: "bot", icon: "/img/icon-bot.webp",
    title: { en: "Bots & automation", ru: "Боты и автоматизация", el: "Bots & αυτοματισμοί" },
    text: {
      en: "Telegram bots and AI assistants that take bookings, answer customers and save your team hours every week.",
      ru: "Telegram-боты и AI-ассистенты: принимают заявки, отвечают клиентам и экономят команде часы каждую неделю.",
      el: "Telegram bots και AI βοηθοί που παίρνουν κρατήσεις, απαντούν σε πελάτες και εξοικονομούν χρόνο.",
    },
    tags: ["Telegram", "AI", "Automation"],
  },
  {
    key: "landing", icon: "/img/icon-landing.webp",
    title: { en: "Websites & landing pages", ru: "Сайты и лендинги", el: "Ιστότοποι & landing pages" },
    text: {
      en: "Fast, animated, multilingual sites that sell your product — and a contact form that actually brings leads.",
      ru: "Быстрые, анимированные, многоязычные сайты, которые продают продукт, — и форма, которая приносит заявки.",
      el: "Γρήγοροι, animated, πολύγλωσσοι ιστότοποι που πουλάνε — με φόρμα που φέρνει πελάτες.",
    },
    tags: ["Next.js", "SEO", "Animations"],
  },
  {
    key: "game", icon: "/img/icon-game.webp",
    title: { en: "Games & interactive", ru: "Игры и интерактив", el: "Παιχνίδια & interactive" },
    text: {
      en: "Browser mini-games, quizzes and 3D experiences for promos, learning and engagement.",
      ru: "Браузерные мини-игры, квизы и 3D-эффекты для промо, обучения и вовлечения.",
      el: "Mini-games στον browser, quizzes και 3D εμπειρίες για προώθηση και μάθηση.",
    },
    tags: ["Three.js", "WebGL", "Canvas"],
  },
];

export const processSteps: { title: L; text: L }[] = [
  { title: { en: "Brief", ru: "Бриф", el: "Brief" }, text: { en: "A short call: your goal, users, deadline and budget.", ru: "Короткий созвон: цель, пользователи, сроки и бюджет.", el: "Σύντομη κλήση: στόχος, χρήστες, προθεσμία, budget." } },
  { title: { en: "Prototype", ru: "Прототип", el: "Πρωτότυπο" }, text: { en: "Screens and a clear plan with an estimate before any code.", ru: "Экраны и понятный план с оценкой — до написания кода.", el: "Οθόνες και σαφές πλάνο με εκτίμηση πριν τον κώδικα." } },
  { title: { en: "Build", ru: "Разработка", el: "Ανάπτυξη" }, text: { en: "Short iterations, a live demo link and regular updates.", ru: "Короткие итерации, ссылка на живое демо и регулярные апдейты.", el: "Σύντομα iterations, live demo και τακτικά updates." } },
  { title: { en: "Launch", ru: "Запуск", el: "Launch" }, text: { en: "Deployment, domain, analytics and a hand-over guide.", ru: "Деплой, домен, аналитика и инструкция по работе.", el: "Deployment, domain, analytics και οδηγός χρήσης." } },
  { title: { en: "Support", ru: "Поддержка", el: "Υποστήριξη" }, text: { en: "Fixes, monitoring and new features after release.", ru: "Исправления, мониторинг и новые функции после релиза.", el: "Διορθώσεις, monitoring και νέα features μετά το release." } },
];

export type Job = {
  role: string;
  org: L;
  dates: L;
  current?: boolean;
  bullets: Record<Language, string[]>;
  tags: string[];
};

export const jobs: Job[] = [
  {
    role: "Full-Stack .NET Developer",
    org: { en: "Freelance · commercial projects", ru: "Фриланс · коммерческие проекты", el: "Freelance · εμπορικά έργα" },
    dates: { en: "Mar 2025 — Present", ru: "Март 2025 — н.в.", el: "Μάρ 2025 — Σήμερα" },
    current: true,
    bullets: {
      en: [
        "Commercial projects for private clients and small businesses: web platforms, mobile apps, integrations and bots.",
        "Full cycle on my side: requirements, estimates, architecture, development, deployment and post-launch support.",
        "ASP.NET Core, EF Core, SQL Server, REST API, JWT, SignalR, React/TypeScript, Kotlin; Docker, GitHub Actions CI and automated tests.",
      ],
      ru: [
        "Коммерческие проекты для частных клиентов и малого бизнеса: веб-платформы, мобильные приложения, интеграции и боты.",
        "Полный цикл: требования, оценка, архитектура, разработка, деплой и поддержка после запуска.",
        "ASP.NET Core, EF Core, SQL Server, REST API, JWT, SignalR, React/TypeScript, Kotlin; Docker, CI в GitHub Actions, автотесты.",
      ],
      el: [
        "Εμπορικά έργα για ιδιώτες και μικρές επιχειρήσεις: web πλατφόρμες, mobile εφαρμογές, integrations και bots.",
        "Πλήρης κύκλος: απαιτήσεις, εκτίμηση, αρχιτεκτονική, ανάπτυξη, deployment και υποστήριξη.",
        "ASP.NET Core, EF Core, SQL Server, REST API, JWT, SignalR, React/TypeScript, Kotlin· Docker, CI και αυτόματα tests.",
      ],
    },
    tags: ["C#", "ASP.NET Core", "SQL Server", "React", "Kotlin", "Docker"],
  },
  {
    role: "Technical Support / Integration Support Specialist",
    org: { en: "AppXite · B2B SaaS", ru: "AppXite · B2B SaaS", el: "AppXite · B2B SaaS" },
    dates: { en: "Dec 2025 — Oct 2026", ru: "Дек 2025 — Окт 2026", el: "Δεκ 2025 — Οκτ 2026" },
    bullets: {
      en: [
        "Supported B2B customers of a SaaS platform in English and Russian (Jira, Zendesk); diagnosed issues through logs and data.",
        "Verified REST APIs and integrations in Postman, wrote SQL to check and fix data, tested fixes before release.",
      ],
      ru: [
        "Поддержка B2B-клиентов SaaS-платформы на русском и английском (Jira, Zendesk); диагностика по логам и данным.",
        "Проверка REST API и интеграций в Postman, SQL для проверки и исправления данных, тестирование исправлений перед релизом.",
      ],
      el: [
        "Υποστήριξη B2B πελατών SaaS στα αγγλικά και ρωσικά (Jira, Zendesk)· διάγνωση μέσω logs και δεδομένων.",
        "Έλεγχος REST APIs στο Postman, SQL για έλεγχο και διόρθωση δεδομένων, δοκιμή διορθώσεων πριν το release.",
      ],
    },
    tags: ["REST API", "Postman", "SQL", "Jira"],
  },
  {
    role: "Front Desk Receptionist",
    org: { en: "Crowne Plaza Limassol · Cyprus", ru: "Crowne Plaza Limassol · Кипр", el: "Crowne Plaza Limassol · Κύπρος" },
    dates: { en: "2020 — 2022", ru: "2020 — 2022", el: "2020 — 2022" },
    bullets: {
      en: ["Guest service in English, Greek and Russian: reservations, issue resolution and cross-department coordination."],
      ru: ["Обслуживание гостей на английском, греческом и русском: бронирования, решение запросов, координация отделов."],
      el: ["Εξυπηρέτηση επισκεπτών σε αγγλικά, ελληνικά και ρωσικά: κρατήσεις, επίλυση αιτημάτων, συντονισμός."],
    },
    tags: [],
  },
  {
    role: "Independent Translator",
    org: { en: "Freelance", ru: "Фриланс", el: "Freelance" },
    dates: { en: "2019 — Present", ru: "2019 — н.в.", el: "2019 — Σήμερα" },
    bullets: {
      en: ["Translation and multilingual communication across Russian, Greek and English."],
      ru: ["Перевод и многоязычная коммуникация: русский, греческий, английский."],
      el: ["Μετάφραση και πολυγλωσσική επικοινωνία: ρωσικά, ελληνικά, αγγλικά."],
    },
    tags: [],
  },
];

export type Project = {
  title: string;
  image: string;
  kicker: L;
  summary: L;
  proof: L;
  stack: string[];
  live?: string;
  liveLabel?: L;
  repo?: string;
  accent: string;
  featured?: boolean;
  badge?: string;
};

export const projects: Project[] = [
  {
    title: "DentalClinic",
    image: "/img/work-dental.webp",
    featured: true,
    kicker: { en: "Commercial · Web platform", ru: "Коммерческий · веб-платформа", el: "Εμπορικό · Web πλατφόρμα" },
    summary: {
      en: "A full platform for a dental practice: public site, online booking, patient portal, CRM/admin panel, booking bot and an AI consultant in 5 languages.",
      ru: "Полноценная платформа для стоматологии: сайт, онлайн-запись, кабинет пациента, CRM/админка, бот для записи и AI-консультант на 5 языках.",
      el: "Ολοκληρωμένη πλατφόρμα για οδοντιατρείο: ιστότοπος, online ραντεβού, portal ασθενών, CRM/admin, bot και AI σύμβουλος σε 5 γλώσσες.",
    },
    proof: { en: "JWT + roles · SignalR real-time · AI", ru: "JWT и роли · SignalR · AI", el: "JWT & ρόλοι · SignalR · AI" },
    stack: ["ASP.NET Core 9", "EF Core 9", "SQL Server", "React", "Docker", "Gemini"],
    live: "https://dental-clinic-vn.vercel.app",
    repo: "https://github.com/ViolettaNcl/DentalClinic",
    accent: "#7c5cff",
  },
  {
    title: "Bloom",
    image: "/img/work-bloom.webp",
    badge: "/img/bloom-badge.webp",
    kicker: { en: "Commercial · private app for an academy", ru: "Коммерческий · закрытое приложение для академии", el: "Εμπορικό · ιδιωτική εφαρμογή ακαδημίας" },
    summary: {
      en: "A private Android app for a children’s development academy: 24 magic worlds, a visual day planner and “say it with pictures”, in English, Arabic and French — access by activation code.",
      ru: "Закрытое Android-приложение для детской академии развития: 24 волшебных мира, «Мой день» по шагам и «Скажи картинками» на английском, арабском и французском — доступ по коду активации.",
      el: "Ιδιωτική Android εφαρμογή για ακαδημία παιδικής ανάπτυξης: 24 μαγικοί κόσμοι, «Η μέρα μου» και «Πες το με εικόνες» σε αγγλικά, αραβικά και γαλλικά — πρόσβαση με κωδικό.",
    },
    proof: { en: "3 languages · RTL · voice · activation codes", ru: "3 языка · RTL · озвучка · коды активации", el: "3 γλώσσες · RTL · φωνή · κωδικοί" },
    stack: ["Kotlin", "Android", "Text-to-Speech", "RTL"],
    live: "https://violettancl.github.io/bloom-beta/",
    liveLabel: { en: "Try the beta", ru: "Попробовать бету", el: "Δοκιμάστε το beta" },
    accent: "#ff5cc8",
  },
  {
    title: "Smart Route Planner",
    image: "/img/work-route.webp",
    kicker: { en: "PWA · Machine learning", ru: "PWA · машинное обучение", el: "PWA · Machine learning" },
    summary: {
      en: "Route-planning PWA with 2-opt optimisation, OSRM routing, maps, weather, and an MLP neural network and K-Means built from scratch.",
      ru: "PWA для маршрутов: оптимизация 2-opt, маршрутизация OSRM, карта, погода, MLP-нейросеть и K-Means с нуля.",
      el: "PWA διαδρομών με 2-opt, OSRM routing, χάρτες, καιρό, νευρωνικό MLP και K-Means από το μηδέν.",
    },
    proof: { en: "132 automated tests · CI matrix", ru: "132 автотеста · CI matrix", el: "132 αυτόματα tests · CI matrix" },
    stack: ["PHP 8.1", "JavaScript", "PWA", "MLP", "K-Means", "Docker"],
    live: "https://smart-route-planner-vn.vercel.app",
    repo: "https://github.com/ViolettaNcl/smart-route-planner",
    accent: "#2fd9ff",
  },
  {
    title: "FleetManagement",
    image: "/img/work-fleet.webp",
    kicker: { en: "Desktop · .NET", ru: "Desktop · .NET", el: "Desktop · .NET" },
    summary: {
      en: "CarNinja — a role-based desktop app for managing a vehicle fleet, drivers and routes, with specs, UML and tests.",
      ru: "CarNinja — desktop-приложение с ролями для автопарка, водителей и маршрутов: ТЗ, UML, тесты.",
      el: "CarNinja — desktop εφαρμογή με ρόλους για στόλο οχημάτων, οδηγούς και διαδρομές, με UML και tests.",
    },
    proof: { en: "Layered architecture · MSTest", ru: "Слоистая архитектура · MSTest", el: "Πολυεπίπεδη αρχιτεκτονική · MSTest" },
    stack: ["C#", "WPF", "XAML", "EF6", "SQL Server"],
    repo: "https://github.com/ViolettaNcl/FleetManagement",
    accent: "#7dffb0",
  },
];

export const skills: { key: string; label: L; items: string[]; wide?: boolean }[] = [
  { key: "backend", label: { en: "Backend", ru: "Backend", el: "Backend" }, items: ["C#", ".NET", "ASP.NET Core", "Web API", "EF Core", "LINQ", "SignalR", "JWT", "OOP / SOLID"], wide: true },
  { key: "frontend", label: { en: "Frontend", ru: "Frontend", el: "Frontend" }, items: ["TypeScript", "JavaScript", "React", "Next.js", "HTML5", "CSS3", "WPF / XAML"] },
  { key: "mobile", label: { en: "Mobile", ru: "Mobile", el: "Mobile" }, items: ["Android", "Kotlin", "Text-to-Speech", "RTL"] },
  { key: "data", label: { en: "Data", ru: "Базы данных", el: "Δεδομένα" }, items: ["SQL Server", "PostgreSQL", "SQL", "Migrations", "Data modeling"] },
  { key: "devops", label: { en: "DevOps & QA", ru: "DevOps и QA", el: "DevOps & QA" }, items: ["Git", "GitHub Actions", "Docker", "CI/CD", "xUnit", "MSTest", "E2E", "Swagger", "Postman"], wide: true },
];

export const copy = {
  en: {
    name: ["Violetta", "Nicolaou"],
    roles: ["Full-Stack Developer", "Web apps · Mobile · Bots", "ASP.NET Core · React · Kotlin", "From idea to launch"],
    status: "Taking new projects · open to roles",
    location: "Volgograd · Cyprus · UTC+3",
    summary: "I design and build web apps, mobile apps, APIs and bots for businesses — from the first call to launch and support. Clean code, tests by default, and a product you're proud to show.",
    nav: { home: "Home", services: "Services", work: "Work", process: "Process", about: "About", playground: "Terminal", contact: "Contact" },
    start: "Start a project",
    download: "Download CV",
    hire: "Get in touch",
    scroll: "Scroll",
    servicesKicker: "What I can build for you",
    servicesTitle: "Services",
    workKicker: "Selected cases",
    workTitle: "Work",
    live: "Live demo",
    code: "Code",
    processKicker: "How we'll work",
    processTitle: "Simple, transparent process",
    aboutKicker: "About me · for recruiters",
    aboutTitle: "Hi, I'm Violetta",
    aboutText: "Full-Stack .NET developer with an honours programming diploma. I combine commercial project work with a technical-support background, so I care about how things work for real users — not just in the code. I speak Russian and Greek natively and English at C2.",
    expTitle: "Experience",
    skillsTitle: "Toolbox",
    eduTitle: "Education",
    degree: "Programmer · Honours diploma",
    school: "TOP Academy — Moscow International College of Digital Technologies",
    degreeText: "09.02.07 Information Systems & Programming · 2026",
    langTitle: "Languages",
    langs: [["Russian", "Native", 100], ["Greek", "Native", 100], ["English", "C2", 95], ["French", "A2", 35]] as [string, string, number][],
    contactKicker: "Let's build something",
    contactTitle: "Have a project or a role in mind?",
    contactText: "Tell me about it — I reply within a day. Remote, hybrid, Volgograd or Cyprus.",
    footer: "Designed & built by Violetta Nicolaou · Next.js · Three.js",
    now: "Now",
  },
  ru: {
    name: ["Виолетта", "Николау"],
    roles: ["Full-Stack разработчик", "Веб · мобильные · боты", "ASP.NET Core · React · Kotlin", "От идеи до запуска"],
    status: "Беру новые проекты · открыта к вакансиям",
    location: "Волгоград · Кипр · UTC+3",
    summary: "Разрабатываю веб-приложения, мобильные приложения, API и ботов для бизнеса — от первого созвона до запуска и поддержки. Чистый код, тесты по умолчанию и продукт, который не стыдно показать.",
    nav: { home: "Главная", services: "Услуги", work: "Работы", process: "Процесс", about: "Обо мне", playground: "Терминал", contact: "Контакты" },
    start: "Начать проект",
    download: "Скачать CV",
    hire: "Связаться",
    scroll: "Листайте",
    servicesKicker: "Что я могу сделать для вас",
    servicesTitle: "Услуги",
    workKicker: "Избранные кейсы",
    workTitle: "Работы",
    live: "Демо",
    code: "Код",
    processKicker: "Как мы будем работать",
    processTitle: "Простой и прозрачный процесс",
    aboutKicker: "Обо мне · для рекрутеров",
    aboutTitle: "Привет, я Виолетта",
    aboutText: "Full-Stack .NET разработчик с дипломом программиста с отличием. Совмещаю коммерческие проекты с опытом техподдержки, поэтому думаю о том, как продукт работает для реальных людей, а не только в коде. Русский и греческий — родные, английский — C2.",
    expTitle: "Опыт",
    skillsTitle: "Стек",
    eduTitle: "Образование",
    degree: "Программист · диплом с отличием",
    school: "Московский международный колледж цифровых технологий «Академия ТОП»",
    degreeText: "09.02.07 Информационные системы и программирование · 2026",
    langTitle: "Языки",
    langs: [["Русский", "Родной", 100], ["Греческий", "Родной", 100], ["Английский", "C2", 95], ["Французский", "A2", 35]] as [string, string, number][],
    contactKicker: "Давайте работать вместе",
    contactTitle: "Есть проект или вакансия?",
    contactText: "Расскажите — отвечу в течение дня. Удалённо, гибрид, Волгоград или Кипр.",
    footer: "Дизайн и разработка — Виолетта Николау · Next.js · Three.js",
    now: "Сейчас",
  },
  el: {
    name: ["Βιολέττα", "Νικολάου"],
    roles: ["Full-Stack Developer", "Web · Mobile · Bots", "ASP.NET Core · React · Kotlin", "Από την ιδέα στο launch"],
    status: "Δέχομαι νέα έργα · ανοιχτή σε θέσεις",
    location: "Βόλγκογκραντ · Κύπρος · UTC+3",
    summary: "Σχεδιάζω και αναπτύσσω web εφαρμογές, mobile εφαρμογές, APIs και bots για επιχειρήσεις — από την πρώτη κλήση μέχρι το launch και την υποστήριξη. Καθαρός κώδικας, tests πάντα.",
    nav: { home: "Αρχική", services: "Υπηρεσίες", work: "Έργα", process: "Διαδικασία", about: "Σχετικά", playground: "Terminal", contact: "Επαφή" },
    start: "Ξεκινήστε ένα έργο",
    download: "Λήψη CV",
    hire: "Επικοινωνία",
    scroll: "Κύλιση",
    servicesKicker: "Τι μπορώ να φτιάξω για εσάς",
    servicesTitle: "Υπηρεσίες",
    workKicker: "Επιλεγμένα έργα",
    workTitle: "Έργα",
    live: "Live demo",
    code: "Κώδικας",
    processKicker: "Πώς θα δουλέψουμε",
    processTitle: "Απλή, διαφανής διαδικασία",
    aboutKicker: "Σχετικά · για recruiters",
    aboutTitle: "Γεια, είμαι η Βιολέττα",
    aboutText: "Full-Stack .NET developer με πτυχίο προγραμματισμού με άριστα. Συνδυάζω εμπορικά έργα με εμπειρία τεχνικής υποστήριξης, οπότε με νοιάζει πώς δουλεύει το προϊόν για πραγματικούς χρήστες. Ρωσικά και ελληνικά μητρικές, αγγλικά C2.",
    expTitle: "Εμπειρία",
    skillsTitle: "Εργαλεία",
    eduTitle: "Εκπαίδευση",
    degree: "Προγραμματίστρια · Πτυχίο με άριστα",
    school: "TOP Academy — Moscow International College of Digital Technologies",
    degreeText: "09.02.07 Πληροφοριακά Συστήματα & Προγραμματισμός · 2026",
    langTitle: "Γλώσσες",
    langs: [["Ρωσικά", "Μητρική", 100], ["Ελληνικά", "Μητρική", 100], ["Αγγλικά", "C2", 95], ["Γαλλικά", "A2", 35]] as [string, string, number][],
    contactKicker: "Ας φτιάξουμε κάτι μαζί",
    contactTitle: "Έχετε ένα έργο ή μια θέση;",
    contactText: "Πείτε μου — απαντώ μέσα σε μία μέρα. Remote, hybrid, Βόλγκογκραντ ή Κύπρος.",
    footer: "Σχεδιασμός & ανάπτυξη: Βιολέττα Νικολάου · Next.js · Three.js",
    now: "Τώρα",
  },
};
