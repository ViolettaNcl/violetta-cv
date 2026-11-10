import type { Language } from "./content";

type L = Record<Language, string>;

/* ---------- testimonials ---------- */

export const testimonials: { quote: L; who: L; project: string; initials: string; accent: string }[] = [
  {
    initials: "DC",
    accent: "#7c5cff",
    project: "DentalClinic",
    quote: {
      en: "Violetta built us a proper booking system. Patients book online, we see everything in the admin panel, and the AI assistant answers the usual questions at night. She explained every step and stayed with us after launch.",
      ru: "Виолетта сделала нам удобную систему записи. Пациенты записываются онлайн, мы видим всё в админке, а AI-консультант ночью отвечает на типовые вопросы. Она объясняла каждый шаг и осталась на связи после запуска.",
      el: "Η Βιολέττα μας έφτιαξε ένα σωστό σύστημα κρατήσεων. Οι ασθενείς κλείνουν online, βλέπουμε τα πάντα στο admin και ο AI βοηθός απαντά τη νύχτα. Εξηγούσε κάθε βήμα και έμεινε μαζί μας μετά το launch.",
    },
    who: { en: "Owner · dental practice", ru: "Владелец · стоматологическая клиника", el: "Ιδιοκτήτης · οδοντιατρείο" },
  },
  {
    initials: "BL",
    accent: "#ff5cc8",
    project: "Bloom",
    quote: {
      en: "We needed our own private app for the children in our programme — something calm and kind they can use between lessons. Violetta built Bloom in English, Arabic and French, with voice, a visual day planner and access by activation code only for our students. The children love it, and it even helps them pick up new languages.",
      ru: "Нам нужно было собственное закрытое приложение для детей из нашей программы — спокойное и доброе, чтобы заниматься между уроками. Виолетта сделала Bloom на английском, арабском и французском, с озвучкой, визуальным расписанием и доступом по коду активации только для наших учеников. Детям очень нравится, а ещё оно помогает им осваивать новые языки.",
      el: "Χρειαζόμασταν μια δική μας ιδιωτική εφαρμογή για τα παιδιά του προγράμματός μας — ήρεμη και φιλική για εξάσκηση ανάμεσα στα μαθήματα. Η Βιολέττα έφτιαξε το Bloom σε αγγλικά, αραβικά και γαλλικά, με φωνή, οπτικό πρόγραμμα και πρόσβαση με κωδικό μόνο για τους μαθητές μας. Τα παιδιά το λατρεύουν και τα βοηθά να μαθαίνουν νέες γλώσσες.",
    },
    who: { en: "Founder · children’s development academy", ru: "Основатель · детская академия развития", el: "Ιδρύτρια · ακαδημία παιδικής ανάπτυξης" },
  },
  {
    initials: "WP",
    accent: "#2fd9ff",
    project: "Web project · NDA",
    quote: {
      en: "Clear estimate, a demo link from the first week and no surprises at the end. Violetta asks the right questions before writing code, and that saved us a lot of rework.",
      ru: "Понятная оценка, ссылка на демо с первой недели и никаких сюрпризов в конце. Виолетта задаёт правильные вопросы до того, как писать код, — это сэкономило нам много переделок.",
      el: "Ξεκάθαρη εκτίμηση, demo από την πρώτη εβδομάδα και καμία έκπληξη στο τέλος. Η Βιολέττα κάνει τις σωστές ερωτήσεις πριν γράψει κώδικα.",
    },
    who: { en: "Private client · web project under NDA", ru: "Частный клиент · веб-проект под NDA", el: "Ιδιώτης πελάτης · web έργο υπό NDA" },
  },
];

/* ---------- FAQ ---------- */

export const faq: { q: L; a: L }[] = [
  {
    q: { en: "How do we start?", ru: "С чего начать?", el: "Πώς ξεκινάμε;" },
    a: {
      en: "Send a short message through the form or Telegram: what you need, for whom and by when. I'll reply within a day and suggest a quick call.",
      ru: "Напишите коротко через форму или в Telegram: что нужно, для кого и к какому сроку. Отвечу в течение дня и предложу короткий созвон.",
      el: "Στείλτε ένα σύντομο μήνυμα από τη φόρμα ή στο Telegram: τι χρειάζεστε, για ποιον και πότε. Απαντώ μέσα σε μία μέρα.",
    },
  },
  {
    q: { en: "How much does it cost?", ru: "Сколько стоит?", el: "Πόσο κοστίζει;" },
    a: {
      en: "Every project is different, so I estimate it personally after the brief — you get a clear price and plan before any work starts.",
      ru: "Все проекты разные, поэтому стоимость обсуждаем лично после брифа — вы получаете понятную цену и план до начала работы.",
      el: "Κάθε έργο είναι διαφορετικό, οπότε το κόστος το συζητάμε προσωπικά μετά το brief — με σαφή τιμή και πλάνο πριν ξεκινήσουμε.",
    },
  },
  {
    q: { en: "How long will it take?", ru: "Сколько займёт по времени?", el: "Πόσο χρόνο θα πάρει;" },
    a: {
      en: "It depends on the scope: a landing page is much faster than a platform with an admin panel. You'll get a timeline with milestones together with the estimate.",
      ru: "Зависит от объёма: лендинг делается гораздо быстрее, чем платформа с админкой. Сроки с этапами вы получите вместе с оценкой.",
      el: "Εξαρτάται από το εύρος: ένα landing page είναι πολύ πιο γρήγορο από μια πλατφόρμα με admin. Θα πάρετε χρονοδιάγραμμα μαζί με την εκτίμηση.",
    },
  },
  {
    q: { en: "What do you need from me?", ru: "Что нужно от меня?", el: "Τι χρειάζεστε από μένα;" },
    a: {
      en: "Your goal, a few examples you like, and content (texts, photos, logo) if you have it. If not — I'll help you put it together.",
      ru: "Цель, пара примеров, которые вам нравятся, и материалы (тексты, фото, логотип), если они есть. Если нет — помогу собрать.",
      el: "Τον στόχο σας, μερικά παραδείγματα που σας αρέσουν και υλικό (κείμενα, φωτογραφίες, λογότυπο) αν υπάρχει.",
    },
  },
  {
    q: { en: "Do you support the project after launch?", ru: "Поддерживаете после запуска?", el: "Υποστηρίζετε μετά το launch;" },
    a: {
      en: "Yes. I fix issues, monitor logs and add new features — the same way I support my current clients.",
      ru: "Да. Исправляю ошибки, слежу за логами и добавляю новые функции — так же, как поддерживаю текущих клиентов.",
      el: "Ναι. Διορθώνω προβλήματα, παρακολουθώ logs και προσθέτω νέα features.",
    },
  },
  {
    q: { en: "Can you improve an existing project?", ru: "Можно доработать уже существующий проект?", el: "Μπορείτε να βελτιώσετε υπάρχον έργο;" },
    a: {
      en: "Yes — I'll review the code first, tell you honestly what state it's in and what is worth fixing first.",
      ru: "Да — сначала посмотрю код, честно расскажу, в каком он состоянии и что стоит исправить в первую очередь.",
      el: "Ναι — πρώτα εξετάζω τον κώδικα και σας λέω ειλικρινά τι αξίζει να διορθωθεί πρώτο.",
    },
  },
  {
    q: { en: "Do you work with clients from other countries?", ru: "Работаете с клиентами из других стран?", el: "Δουλεύετε με πελάτες από άλλες χώρες;" },
    a: {
      en: "Yes, remotely. I work in English, Russian and Greek, and I'm based in UTC+3.",
      ru: "Да, удалённо. Общаюсь на русском, английском и греческом, мой часовой пояс — UTC+3.",
      el: "Ναι, απομακρυσμένα. Μιλάω αγγλικά, ρωσικά και ελληνικά, ζώνη ώρας UTC+3.",
    },
  },
];

/* ---------- case studies ---------- */

export type CaseShot = { src: string; w: number; h: number; caption: L; phone?: boolean; tall?: boolean };
export type CaseStudy = { task: L; solution: L[]; result: L; shots: CaseShot[] };

const cap = (en: string, ru: string, el: string): L => ({ en, ru, el });

export const cases: Record<string, CaseStudy> = {
  DentalClinic: {
    task: cap(
      "The clinic needed a modern website, online booking, personal accounts for patients and one place to manage everything.",
      "Клинике нужны были современный сайт, онлайн-запись, личные кабинеты пациентов и одно место для управления всем.",
      "Η κλινική χρειαζόταν σύγχρονο site, online ραντεβού, λογαριασμούς ασθενών και ένα σημείο διαχείρισης.",
    ),
    solution: [
      cap("Public website in 5 languages with services, doctors and online booking.", "Публичный сайт на 5 языках: услуги, врачи и онлайн-запись.", "Δημόσιο site σε 5 γλώσσες με υπηρεσίες, γιατρούς και online ραντεβού."),
      cap("Admin panel: new requests, confirmed visits, doctor calendar, phone bookings, analytics and reviews.", "Админка: новые заявки, подтверждённые записи, календарь врача, запись по телефону, аналитика и отзывы.", "Admin: νέα αιτήματα, επιβεβαιωμένα ραντεβού, ημερολόγιο γιατρού, analytics και κριτικές."),
      cap("Patient portal with visit history; JWT + roles, SignalR live updates, background jobs.", "Кабинет пациента с историей посещений; JWT и роли, обновления через SignalR, фоновые задачи.", "Portal ασθενή με ιστορικό· JWT & ρόλοι, SignalR live updates, background jobs."),
      cap("Booking bot and an AI consultant (Google Gemini, ElevenLabs voice).", "Бот для записи и AI-консультант (Google Gemini, голос ElevenLabs).", "Bot κρατήσεων και AI σύμβουλος (Google Gemini, φωνή ElevenLabs)."),
    ],
    result: cap(
      "Bookings come in online and through the bot and land in one admin panel. The platform runs in Docker with CI, tests and documentation, and I support it after launch.",
      "Заявки приходят онлайн и через бота и попадают в одну админку. Платформа работает в Docker с CI, тестами и документацией, я сопровождаю её после запуска.",
      "Τα ραντεβού έρχονται online και μέσω bot σε ένα admin. Η πλατφόρμα τρέχει σε Docker με CI, tests και τεκμηρίωση.",
    ),
    shots: [
      { src: "/img/cases/dental-1.webp", w: 1400, h: 875, caption: cap("Home page", "Главная страница", "Αρχική σελίδα") },
      { src: "/img/cases/dental-2.webp", w: 1398, h: 868, caption: cap("Admin · new requests", "Админка · новые заявки", "Admin · νέα αιτήματα") },
      { src: "/img/cases/dental-4.webp", w: 1379, h: 868, caption: cap("Admin · analytics", "Админка · аналитика", "Admin · analytics") },
      { src: "/img/cases/dental-3.webp", w: 1400, h: 620, caption: cap("Patient portal", "Кабинет пациента", "Portal ασθενή") },
      { src: "/img/cases/dental-5.webp", w: 1005, h: 980, caption: cap("Services", "Услуги", "Υπηρεσίες") },
      { src: "/img/cases/dental-6.webp", w: 581, h: 833, caption: cap("Booking chat bot", "Чат-бот для записи", "Chat bot κρατήσεων") },
    ],
  },
  Bloom: {
    task: cap(
      "A children’s development and psychology academy needed its own private app: a calm, friendly space where enrolled children keep practising between individual lessons — in English, Arabic (right-to-left) and French, with voice and without internet.",
      "Детской академии развития и психологии нужно было собственное закрытое приложение: спокойное и доброе пространство, где ученики продолжают заниматься между индивидуальными уроками, — на английском, арабском (справа налево) и французском, с озвучкой и без интернета.",
      "Μια ακαδημία παιδικής ανάπτυξης και ψυχολογίας χρειαζόταν δική της ιδιωτική εφαρμογή: ένα ήρεμο περιβάλλον όπου τα παιδιά συνεχίζουν την εξάσκηση ανάμεσα στα ατομικά μαθήματα — σε αγγλικά, αραβικά (RTL) και γαλλικά, με φωνή και χωρίς internet.",
    ),
    solution: [
      cap("Native Android app in Kotlin; private access by activation code for the academy’s students only.", "Нативное Android-приложение на Kotlin; закрытый доступ по коду активации только для учеников академии.", "Native Android σε Kotlin· ιδιωτική πρόσβαση με κωδικό ενεργοποίησης μόνο για τους μαθητές της ακαδημίας."),
      cap("Three languages — English, Arabic and French — chosen on first launch; the app also helps children learn new words in other languages.", "Три языка — английский, арабский и французский — выбор при первом запуске; приложение также помогает детям учить слова на других языках.", "Τρεις γλώσσες — αγγλικά, αραβικά, γαλλικά — με επιλογή στην πρώτη εκκίνηση· βοηθά τα παιδιά να μαθαίνουν λέξεις και σε άλλες γλώσσες."),
      cap("24 magic worlds on a learning path, with puzzles that grow with the child and gentle praise instead of pressure.", "24 волшебных мира на пути обучения: головоломки растут вместе с ребёнком, мягкая похвала вместо давления.", "24 μαγικοί κόσμοι σε διαδρομή μάθησης, με γρίφους που μεγαλώνουν με το παιδί και ήπιο έπαινο."),
      cap("“My day, step by step” visual schedule and a “Say it with pictures” board with Text-to-Speech.", "Визуальное расписание «Мой день по шагам» и экран «Скажи картинками» с озвучкой Text-to-Speech.", "Οπτικό πρόγραμμα «Η μέρα μου» και πίνακας «Πες το με εικόνες» με Text-to-Speech."),
      cap("Full RTL layout for Arabic, offline-first, no ads; automated device tests.", "Полноценный RTL для арабского, работа офлайн, без рекламы; автотесты на устройстве.", "Πλήρες RTL για αραβικά, offline-first, χωρίς διαφημίσεις· αυτόματα tests σε συσκευή."),
    ],
    result: cap(
      "Bloom is used by the academy’s students with personal activation codes and is now in beta testing with families.",
      "Bloom пользуются ученики академии по личным кодам активации; сейчас приложение на бета-тестировании у семей.",
      "Το Bloom χρησιμοποιείται από τους μαθητές της ακαδημίας με προσωπικούς κωδικούς και είναι σε beta με οικογένειες.",
    ),
    shots: [
      { src: "/img/cases/bloom-1.webp", w: 481, h: 1100, phone: true, caption: cap("Language picker", "Выбор языка", "Επιλογή γλώσσας") },
      { src: "/img/cases/bloom-2.webp", w: 480, h: 1100, phone: true, caption: cap("Activation", "Активация", "Ενεργοποίηση") },
      { src: "/img/cases/bloom-3.webp", w: 675, h: 1200, tall: true, caption: cap("24 magic worlds", "24 волшебных мира", "24 μαγικοί κόσμοι") },
      { src: "/img/cases/bloom-4.webp", w: 675, h: 1200, tall: true, caption: cap("Puzzles that grow with the child", "Головоломки растут с ребёнком", "Γρίφοι που μεγαλώνουν") },
      { src: "/img/cases/bloom-5.webp", w: 675, h: 1200, tall: true, caption: cap("Gentle praise", "Мягкая похвала", "Ήπιος έπαινος") },
      { src: "/img/cases/bloom-6.webp", w: 675, h: 1200, tall: true, caption: cap("My day, step by step", "Мой день по шагам", "Η μέρα μου") },
      { src: "/img/cases/bloom-7.webp", w: 675, h: 1200, tall: true, caption: cap("Say it with pictures", "Скажи картинками", "Πες το με εικόνες") },
      { src: "/img/cases/bloom-8.webp", w: 675, h: 1200, tall: true, caption: cap("Safe and private", "Безопасно и приватно", "Ασφαλές και ιδιωτικό") },
    ],
  },
  "Smart Route Planner": {
    task: cap(
      "Plan a trip with several stops in the best order, on real roads, and explain the recommendation — without paid map APIs.",
      "Спланировать поездку с несколькими остановками в лучшем порядке по реальным дорогам и объяснить рекомендацию — без платных картографических API.",
      "Σχεδιασμός ταξιδιού με πολλές στάσεις στη βέλτιστη σειρά, σε πραγματικούς δρόμους, χωρίς πληρωμένα map APIs.",
    ),
    solution: [
      cap("Route optimisation with Nearest Neighbor + 2-opt and real-road routing via OSRM.", "Оптимизация порядка точек (Nearest Neighbor + 2-opt) и маршруты по реальным дорогам через OSRM.", "Βελτιστοποίηση με Nearest Neighbor + 2-opt και πραγματικοί δρόμοι μέσω OSRM."),
      cap("2D / 3D map without API keys, weather and points of interest.", "Карта 2D / 3D без API-ключей, погода и интересные места.", "Χάρτης 2D / 3D χωρίς API keys, καιρός και σημεία ενδιαφέροντος."),
      cap("MLP neural network and K-Means written from scratch, with evaluation metrics.", "MLP-нейросеть и K-Means написаны с нуля, с метриками качества.", "Νευρωνικό MLP και K-Means από το μηδέν, με μετρικές."),
    ],
    result: cap(
      "An installable PWA with 132 automated tests, a CI matrix and production smoke tests.",
      "Устанавливаемое PWA со 132 автотестами, CI matrix и smoke-тестами в продакшене.",
      "Εγκαταστάσιμο PWA με 132 αυτόματα tests, CI matrix και production smoke tests.",
    ),
    shots: [
      { src: "/img/cases/route-1.webp", w: 1400, h: 695, caption: cap("Planner with the map", "Планировщик с картой", "Planner με χάρτη") },
      { src: "/img/cases/route-2.webp", w: 1400, h: 875, caption: cap("Demo route: Berlin → Prague", "Демо-маршрут: Берлин → Прага", "Demo: Βερολίνο → Πράγα") },
      { src: "/img/cases/route-3.webp", w: 1000, h: 280, caption: cap("Route pipeline", "Конвейер построения маршрута", "Pipeline διαδρομής") },
    ],
  },
  FleetManagement: {
    task: cap(
      "A desktop tool for a transport company to manage vehicles, drivers and routes, with different rights for admins, drivers and regular users.",
      "Desktop-инструмент для транспортной компании: учёт машин, водителей и рейсов с разными правами для админа, водителя и пользователя.",
      "Desktop εργαλείο για εταιρεία μεταφορών: οχήματα, οδηγοί και διαδρομές με διαφορετικά δικαιώματα.",
    ),
    solution: [
      cap("WPF/XAML app on .NET with SQL Server and Entity Framework 6.", "Приложение на WPF/XAML (.NET) с SQL Server и Entity Framework 6.", "Εφαρμογή WPF/XAML σε .NET με SQL Server και EF6."),
      cap("Role-based screens, filtering, mileage and maintenance tracking.", "Экраны по ролям, фильтрация, учёт пробега и обслуживания.", "Οθόνες ανά ρόλο, φίλτρα, χιλιόμετρα και συντήρηση."),
      cap("Full documentation: specification, class, use-case, sequence and state diagrams.", "Полная документация: ТЗ, диаграммы классов, вариантов использования, последовательностей и состояний.", "Πλήρης τεκμηρίωση: προδιαγραφές και διαγράμματα UML."),
    ],
    result: cap(
      "A layered, tested desktop application (MSTest) with a database script and developer docs.",
      "Слоистое desktop-приложение с тестами (MSTest), скриптом БД и документацией разработчика.",
      "Πολυεπίπεδη desktop εφαρμογή με tests (MSTest), script βάσης και τεκμηρίωση.",
    ),
    shots: [
      { src: "/img/cases/fleet-1.webp", w: 1234, h: 1046, caption: cap("Class diagram", "Диаграмма классов", "Διάγραμμα κλάσεων") },
      { src: "/img/cases/fleet-2.webp", w: 658, h: 1171, caption: cap("Use cases", "Варианты использования", "Περιπτώσεις χρήσης") },
    ],
  },
};

export const uiCopy: Record<Language, {
  reviewsKicker: string; reviewsTitle: string; faqKicker: string; faqTitle: string;
  more: string; task: string; solution: string; result: string; close: string; gallery: string;
  write: string; themeLight: string; themeDark: string; soundOn: string; soundOff: string;
}> = {
  en: { reviewsKicker: "What clients say", reviewsTitle: "Kind words", faqKicker: "Before you write", faqTitle: "FAQ", more: "Case study", task: "The task", solution: "What I built", result: "Result", close: "Close", gallery: "Screenshots", write: "Write to me", themeLight: "Light theme", themeDark: "Dark theme", soundOn: "Sound on", soundOff: "Sound off" },
  ru: { reviewsKicker: "Что говорят клиенты", reviewsTitle: "Отзывы", faqKicker: "Перед тем как написать", faqTitle: "Частые вопросы", more: "Подробнее о кейсе", task: "Задача", solution: "Что я сделала", result: "Результат", close: "Закрыть", gallery: "Скриншоты", write: "Написать", themeLight: "Светлая тема", themeDark: "Тёмная тема", soundOn: "Звук вкл.", soundOff: "Звук выкл." },
  el: { reviewsKicker: "Τι λένε οι πελάτες", reviewsTitle: "Κριτικές", faqKicker: "Πριν γράψετε", faqTitle: "Συχνές ερωτήσεις", more: "Λεπτομέρειες", task: "Το ζητούμενο", solution: "Τι έφτιαξα", result: "Αποτέλεσμα", close: "Κλείσιμο", gallery: "Στιγμιότυπα", write: "Γράψτε μου", themeLight: "Φωτεινό θέμα", themeDark: "Σκούρο θέμα", soundOn: "Ήχος on", soundOff: "Ήχος off" },
};
