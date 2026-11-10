import type { Language } from "./content";

export const formCopy: Record<Language, {
  modes: [string, string];
  typeLabel: string;
  types: string[];
  roleLabel: string;
  roles: string[];
  whenLabel: string;
  whens: string[];
  name: string;
  contact: string;
  message: string;
  placeholderProject: string;
  placeholderHire: string;
  send: string;
  telegram: string;
  sentTitle: string;
  deliveredTitle: string;
  deliveredText: string;
  sending: string;
  sentText: string;
  again: string;
  required: string;
  subjectProject: string;
  subjectHire: string;
  localTime: string;
  replies: string;
  privacy: string;
}> = {
  en: {
    modes: ["I have a project", "I'm hiring"],
    typeLabel: "What are we building?",
    types: ["Web app", "Mobile app", "API / Backend", "Website", "Bot / Automation", "Something else"],
    roleLabel: "Role type",
    roles: ["Full-time", "Part-time", "Contract", "Internship"],
    whenLabel: "When?",
    whens: ["ASAP", "1–3 months", "Flexible"],
    name: "Your name",
    contact: "Email or Telegram",
    message: "Tell me a bit more",
    placeholderProject: "A booking app for my clinic, an API for our CRM, an MVP for an idea…",
    placeholderHire: "Company, stack, team, link to the vacancy…",
    send: "Send message",
    telegram: "Write on Telegram",
    sentTitle: "Your email app is open",
    deliveredTitle: "Message sent!",
    deliveredText: "Thank you — it's already in my inbox. I'll reply within a day.",
    sending: "Sending…",
    sentText: "Hit send there and I'll reply within a day. Thank you!",
    again: "Write another one",
    required: "Please add your name and a way to reach you.",
    subjectProject: "New project",
    subjectHire: "Job opportunity",
    localTime: "My local time",
    replies: "Usually replies within a day",
    privacy: "Your message goes straight to my email via FormSubmit. Nothing is stored on this site.",
  },
  ru: {
    modes: ["У меня проект", "Я нанимаю"],
    typeLabel: "Что делаем?",
    types: ["Веб-приложение", "Мобильное приложение", "API / Backend", "Сайт", "Бот / автоматизация", "Другое"],
    roleLabel: "Формат работы",
    roles: ["Полная занятость", "Частичная", "Контракт", "Стажировка"],
    whenLabel: "Когда?",
    whens: ["Срочно", "1–3 месяца", "Без спешки"],
    name: "Ваше имя",
    contact: "Email или Telegram",
    message: "Расскажите подробнее",
    placeholderProject: "Онлайн-запись для клиники, API для CRM, MVP для идеи…",
    placeholderHire: "Компания, стек, команда, ссылка на вакансию…",
    send: "Отправить",
    telegram: "Написать в Telegram",
    sentTitle: "Почтовое приложение открыто",
    deliveredTitle: "Сообщение отправлено!",
    deliveredText: "Спасибо — оно уже у меня на почте. Отвечу в течение дня.",
    sending: "Отправляю…",
    sentText: "Нажмите «Отправить» в нём — отвечу в течение дня. Спасибо!",
    again: "Написать ещё",
    required: "Укажите имя и как с вами связаться.",
    subjectProject: "Новый проект",
    subjectHire: "Предложение о работе",
    localTime: "Моё местное время",
    replies: "Обычно отвечаю в течение дня",
    privacy: "Сообщение приходит мне на почту через сервис FormSubmit. Сайт ничего не сохраняет.",
  },
  el: {
    modes: ["Έχω ένα έργο", "Προσλαμβάνω"],
    typeLabel: "Τι φτιάχνουμε;",
    types: ["Web εφαρμογή", "Mobile εφαρμογή", "API / Backend", "Ιστότοπος", "Bot / Αυτοματισμός", "Κάτι άλλο"],
    roleLabel: "Τύπος θέσης",
    roles: ["Πλήρης", "Μερική", "Σύμβαση", "Πρακτική"],
    whenLabel: "Πότε;",
    whens: ["Άμεσα", "1–3 μήνες", "Ευέλικτα"],
    name: "Το όνομά σας",
    contact: "Email ή Telegram",
    message: "Πείτε μου λίγα περισσότερα",
    placeholderProject: "Σύστημα ραντεβού, API για CRM, MVP για μια ιδέα…",
    placeholderHire: "Εταιρεία, stack, ομάδα, σύνδεσμος αγγελίας…",
    send: "Αποστολή",
    telegram: "Μήνυμα στο Telegram",
    sentTitle: "Το email σας άνοιξε",
    deliveredTitle: "Το μήνυμα στάλθηκε!",
    deliveredText: "Ευχαριστώ — είναι ήδη στο email μου. Θα απαντήσω μέσα σε μία μέρα.",
    sending: "Αποστολή…",
    sentText: "Πατήστε αποστολή εκεί και θα απαντήσω μέσα σε μία μέρα. Ευχαριστώ!",
    again: "Νέο μήνυμα",
    required: "Προσθέστε όνομα και τρόπο επικοινωνίας.",
    subjectProject: "Νέο έργο",
    subjectHire: "Ευκαιρία εργασίας",
    localTime: "Τοπική ώρα",
    replies: "Απαντώ συνήθως μέσα σε μία μέρα",
    privacy: "Το μήνυμα έρχεται στο email μου μέσω FormSubmit. Ο ιστότοπος δεν αποθηκεύει τίποτα.",
  },
};

export type TermLine = { kind: "in" | "out" | "accent" | "err"; text: string };

export const termCopy: Record<Language, {
  title: string;
  kicker: string;
  hint: string;
  welcome: string[];
  help: string[];
  whoami: string[];
  skills: string[];
  projects: string[];
  experience: string[];
  hire: string[];
  cv: string;
  coffee: string[];
  sudo: string[];
  unknown: (c: string) => string;
  chips: string[];
}> = {
  en: {
    title: "Talk to my terminal",
    kicker: "Playground",
    hint: "Type a command or tap one below",
    welcome: ["violetta.dev — interactive CV v3.0", "Type `help` to see what I can do."],
    help: ["whoami      — who is Violetta", "skills      — tech stack", "projects    — selected work", "experience  — where I've worked", "hire        — let's talk", "cv          — download PDF", "clear       — clean the screen"],
    whoami: ["Violetta Nicolaou — Full-Stack .NET Developer.", "Web & mobile products end-to-end: ASP.NET Core, SQL Server, React, Kotlin.", "Speaks Russian & Greek (native), English (C2)."],
    skills: ["backend   C# · .NET · ASP.NET Core · EF Core · SignalR · JWT", "frontend  TypeScript · React · Next.js", "mobile    Android · Kotlin · TTS · RTL", "data      SQL Server · PostgreSQL", "devops    Docker · GitHub Actions · xUnit · MSTest"],
    projects: ["▸ DentalClinic         booking + CRM + AI for a dental practice", "▸ Bloom                Android learning app for kids (beta)", "▸ Smart Route Planner  PWA with ML built from scratch, 132 tests", "▸ FleetManagement      WPF desktop app, SQL Server"],
    experience: ["2025 → now   Full-Stack .NET Developer · Freelance", "2025 → 2026  Technical / Integration Support · AppXite", "2020 → 2022  Front Desk · Crowne Plaza Limassol"],
    hire: ["Great choice. Opening the contact form…"],
    cv: "Downloading CV…",
    coffee: ["☕ Brewing… done. Fuel for the next feature."],
    sudo: ["[sudo] permission granted.", "Hiring Violetta… ████████████ 100%", "Just send the form below to make it official ✨"],
    unknown: (c) => `command not found: ${c}. Try \`help\`.`,
    chips: ["help", "whoami", "projects", "skills", "sudo hire violetta"],
  },
  ru: {
    title: "Поговорите с моим терминалом",
    kicker: "Песочница",
    hint: "Введите команду или нажмите на кнопку",
    welcome: ["violetta.dev — интерактивное CV v3.0", "Введите `help`, чтобы увидеть команды."],
    help: ["whoami      — кто такая Виолетта", "skills      — стек", "projects    — проекты", "experience  — опыт работы", "hire        — давайте поговорим", "cv          — скачать PDF", "clear       — очистить экран"],
    whoami: ["Виолетта Николау — Full-Stack .NET разработчик.", "Веб и мобильные продукты под ключ: ASP.NET Core, SQL Server, React, Kotlin.", "Русский и греческий — родные, английский — C2."],
    skills: ["backend   C# · .NET · ASP.NET Core · EF Core · SignalR · JWT", "frontend  TypeScript · React · Next.js", "mobile    Android · Kotlin · TTS · RTL", "data      SQL Server · PostgreSQL", "devops    Docker · GitHub Actions · xUnit · MSTest"],
    projects: ["▸ DentalClinic         запись + CRM + AI для стоматологии", "▸ Bloom                Android-приложение для детей (бета)", "▸ Smart Route Planner  PWA с ML с нуля, 132 теста", "▸ FleetManagement      WPF desktop, SQL Server"],
    experience: ["2025 → н.в.  Full-Stack .NET Developer · фриланс", "2025 → 2026  Technical / Integration Support · AppXite", "2020 → 2022  Front Desk · Crowne Plaza Limassol"],
    hire: ["Отличный выбор. Открываю форму…"],
    cv: "Скачиваю CV…",
    coffee: ["☕ Варю… готово. Топливо для следующей фичи."],
    sudo: ["[sudo] доступ разрешён.", "Нанимаем Виолетту… ████████████ 100%", "Осталось отправить форму ниже ✨"],
    unknown: (c) => `команда не найдена: ${c}. Попробуйте \`help\`.`,
    chips: ["help", "whoami", "projects", "skills", "sudo hire violetta"],
  },
  el: {
    title: "Μιλήστε με το terminal μου",
    kicker: "Playground",
    hint: "Γράψτε μια εντολή ή πατήστε ένα κουμπί",
    welcome: ["violetta.dev — διαδραστικό CV v3.0", "Γράψτε `help` για τις εντολές."],
    help: ["whoami      — ποια είναι η Βιολέττα", "skills      — τεχνολογίες", "projects    — έργα", "experience  — εμπειρία", "hire        — ας μιλήσουμε", "cv          — λήψη PDF", "clear       — καθαρισμός"],
    whoami: ["Βιολέττα Νικολάου — Full-Stack .NET Developer.", "Web & mobile προϊόντα από άκρη σε άκρη: ASP.NET Core, SQL Server, React, Kotlin.", "Ρωσικά & ελληνικά (μητρικές), αγγλικά (C2)."],
    skills: ["backend   C# · .NET · ASP.NET Core · EF Core · SignalR · JWT", "frontend  TypeScript · React · Next.js", "mobile    Android · Kotlin · TTS · RTL", "data      SQL Server · PostgreSQL", "devops    Docker · GitHub Actions · xUnit · MSTest"],
    projects: ["▸ DentalClinic         ραντεβού + CRM + AI για οδοντιατρείο", "▸ Bloom                Android εφαρμογή για παιδιά (beta)", "▸ Smart Route Planner  PWA με ML από το μηδέν, 132 tests", "▸ FleetManagement      WPF desktop, SQL Server"],
    experience: ["2025 → τώρα  Full-Stack .NET Developer · Freelance", "2025 → 2026  Technical / Integration Support · AppXite", "2020 → 2022  Front Desk · Crowne Plaza Limassol"],
    hire: ["Τέλεια επιλογή. Ανοίγω τη φόρμα…"],
    cv: "Λήψη CV…",
    coffee: ["☕ Φτιάχνω… έτοιμο. Καύσιμο για το επόμενο feature."],
    sudo: ["[sudo] άδεια δόθηκε.", "Πρόσληψη Βιολέττας… ████████████ 100%", "Απλώς στείλτε τη φόρμα παρακάτω ✨"],
    unknown: (c) => `η εντολή δεν βρέθηκε: ${c}. Δοκιμάστε \`help\`.`,
    chips: ["help", "whoami", "projects", "skills", "sudo hire violetta"],
  },
};
