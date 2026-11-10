"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowDown, ArrowRight, Check, Code2, Copy, Download, ExternalLink, GraduationCap, Languages, MapPin, Maximize2,
  MessageCircle, Moon, Plus, Quote, Send, Sparkles, Sun, Volume2, VolumeX,
} from "lucide-react";
import CaseModal from "./CaseModal";
import { faq, testimonials, uiCopy } from "./content-extra";
import { applyTheme, attachSounds, blip, loadSound, loadTheme, saveSound, type Theme } from "./prefs";
import ContactForm from "./ContactForm";
import Terminal from "./Terminal";
import { STAGE_EVENT, type Stage } from "./ParticleField";
import { termCopy } from "./interactive";
import { CountUp, Magnetic, TiltCard, Typewriter } from "./ui";
import {
  copy, EMAIL, GITHUB, jobs, marquee, pdf, processSteps, projects, services, skills, stats, TELEGRAM, type Language, type Project,
} from "./content";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

const sections = ["home", "services", "work", "reviews", "process", "about", "playground", "faq", "contact"] as const;
type SectionId = (typeof sections)[number];
const navSections = ["services", "work", "process", "about", "playground", "contact"] as const;
const stageFor: Record<SectionId, Stage> = {
  home: "sphere", services: "knot", work: "code", reviews: "knot", process: "braces", about: "knot", playground: "braces", faq: "code", contact: "at",
};

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [active, setActive] = useState<SectionId>("home");
  const [copied, setCopied] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [openCase, setOpenCase] = useState<Project | null>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const [sound, setSound] = useState(false);
  const soundRef = useRef(false);
  const [showFab, setShowFab] = useState(false);
  const t = copy[lang];
  const u = uiCopy[lang];

  // restore visitor preferences (theme, sound) after hydration
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const th = loadTheme();
      setTheme(th);
      applyTheme(th);
      const so = loadSound();
      soundRef.current = so;
      setSound(so);
    });
    const detach = attachSounds(() => soundRef.current);
    return () => { cancelAnimationFrame(id); detach(); };
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };
  const toggleSound = () => {
    const next = !sound;
    soundRef.current = next;
    setSound(next);
    saveSound(next);
    if (next) blip("click");
  };

  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  // reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [lang]);

  // active section -> nav highlight + particle shape
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      const v = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!v) return;
      const id = v.target.id as SectionId;
      setActive(id);
      window.dispatchEvent(new CustomEvent(STAGE_EVENT, { detail: stageFor[id] }));
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // scroll progress + timeline fill
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      progressRef.current?.style.setProperty("--p", String(h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)));
      const contact = document.getElementById("contact");
      const inContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.7 : false;
      setShowFab(h.scrollTop > window.innerHeight * 0.85 && !inContact);
      const tl = timelineRef.current;
      if (tl) {
        const r = tl.getBoundingClientRect();
        tl.style.setProperty("--fill", String(Math.min(1, Math.max(0, (window.innerHeight * 0.6 - r.top) / r.height))));
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  // cursor glow
  useEffect(() => {
    const el = glowRef.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => { el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; el.style.opacity = "1"; };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { window.location.href = `mailto:${EMAIL}`; }
  };
  const go = (id: SectionId) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <ParticleField />
      <div className="cursorGlow" ref={glowRef} aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <div className="progress" ref={progressRef} aria-hidden="true" />

      <header className="topbar">
        <button className="logo" onClick={() => go("home")} aria-label={`${t.name.join(" ")} — top`}>
          <Image src="/img/avatar.webp" alt="" width={40} height={40} priority />
        </button>
        <nav aria-label="Sections">
          {navSections.map((id) => (
            <button key={id} className={active === id ? "on" : ""} onClick={() => go(id)} aria-current={active === id ? "location" : undefined}>
              {t.nav[id]}
            </button>
          ))}
        </nav>
        <div className="topRight">
          <button className="iconBtn" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? u.soundOff : u.soundOn} title={sound ? u.soundOff : u.soundOn}>
            {sound ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>
          <button className="iconBtn" onClick={toggleTheme} aria-label={theme === "dark" ? u.themeLight : u.themeDark} title={theme === "dark" ? u.themeLight : u.themeDark}>
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="topCta" onClick={() => go("contact")}>{t.start}</button>
          <div className="langs" role="group" aria-label="Language">
            {(["en", "ru", "el"] as Language[]).map((c) => (
              <button key={c} className={lang === c ? "on" : ""} onClick={() => setLang(c)} aria-pressed={lang === c}>{c.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero" id="home">
          <div className="wrap heroGrid">
            <div className="heroInner">
              <p className="pill"><i />{t.status}</p>
              <h1 className="heroName" aria-label={t.name.join(" ")}>
                {t.name.map((word, wi) => (
                  <span className="word" key={`${lang}-${wi}`} aria-hidden="true">
                    {[...word].map((ch, ci) => (
                      <span className="char" key={ci} style={{ "--d": `${(wi * 8 + ci) * 0.035}s` } as CSSProperties}>{ch}</span>
                    ))}
                  </span>
                ))}
              </h1>
              <p className="heroRole"><span className="slash">/</span> <Typewriter key={lang} words={t.roles} /></p>
              <p className="heroSummary">{t.summary}</p>
              <div className="heroCtas">
                <button className="btn primary" onClick={() => go("contact")}><Sparkles size={17} />{t.start}<ArrowRight size={17} /></button>
                <Magnetic className="btn ghost" href={pdf[lang].href} download={pdf[lang].file}><Download size={17} />{t.download}</Magnetic>
              </div>
              <div className="heroMeta">
                <a href={GITHUB} target="_blank" rel="noreferrer"><Code2 size={15} />github.com/ViolettaNcl</a>
                <a href={TELEGRAM} target="_blank" rel="noreferrer"><Send size={15} />@Violet111</a>
                <span><MapPin size={15} />{t.location}</span>
              </div>
            </div>

            <div className="avatarStage">
              <div className="avatarWrap" data-particle-anchor>
                <span className="avatarRing" aria-hidden="true" />
                <Image className="avatarImg" src="/img/avatar.webp" alt={t.name.join(" ")} width={900} height={900} priority sizes="(max-width: 900px) 60vw, 380px" />
                <span className="orbit o1" aria-hidden="true">C#</span>
                <span className="orbit o2" aria-hidden="true">Kotlin</span>
                <span className="orbit o3" aria-hidden="true">React</span>
                <span className="avatarBadge"><i />{t.status.split("·")[0].trim()}</span>
              </div>
            </div>
          </div>
          <button className="scrollHint" onClick={() => go("services")}><span>{t.scroll}</span><ArrowDown size={16} /></button>
        </section>

        {/* STATS */}
        <section className="wrap stats" aria-label="Highlights">
          {stats.map((s, i) => (
            <div className="stat" key={i} data-reveal style={{ "--i": i } as CSSProperties}>
              <strong><CountUp to={s.value} suffix={s.suffix} /></strong>
              <span>{s.label[lang]}</span>
            </div>
          ))}
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="track">
            {[...marquee, ...marquee].map((m, i) => <span key={i}>{m}<Sparkles size={14} /></span>)}
          </div>
        </div>

        {/* SERVICES */}
        <section className="wrap block" id="services">
          <div className="blockHead" data-reveal>
            <span className="kicker">01 — {t.servicesKicker}</span>
            <h2>{t.servicesTitle}</h2>
          </div>
          <div className="services">
            {services.map((s, i) => (
              <article className="service" key={s.key} data-reveal style={{ "--i": i } as CSSProperties}>
                <div className="serviceIcon">
                  <Image src={s.icon} alt="" width={420} height={420} sizes="160px" />
                </div>
                <h3>{s.title[lang]}</h3>
                <p>{s.text[lang]}</p>
                <div className="tags">{s.tags.map((tg) => <span key={tg}>{tg}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        {/* WORK */}
        <section className="wrap block" id="work">
          <div className="blockHead" data-reveal>
            <span className="kicker">02 — {t.workKicker}</span>
            <h2>{t.workTitle}</h2>
          </div>
          <div className="workGrid">
            {projects.map((p, i) => (
              <div className={`workWrap ${p.featured ? "featured" : ""}`} key={p.title} data-reveal style={{ "--i": i } as CSSProperties}>
                <TiltCard className="work" style={{ "--accent": p.accent } as CSSProperties}>
                  <button className="workMedia" onClick={() => setOpenCase(p)} aria-label={`${u.more}: ${p.title}`}>
                    <Image src={p.image} alt={`${p.title} — screenshot`} width={1600} height={900} sizes="(max-width: 980px) 100vw, 60vw" />
                    <span className="mediaHint"><Maximize2 size={15} />{u.more}</span>
                    {p.badge && <Image className="appBadge" src={p.badge} alt="" width={360} height={360} sizes="72px" />}
                  </button>
                  <div className="workBody">
                    <span className="projKicker">{p.kicker[lang]}</span>
                    <h3>{p.title}</h3>
                    <p>{p.summary[lang]}</p>
                    <strong className="proof"><Check size={15} />{p.proof[lang]}</strong>
                    <div className="tags">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
                    <div className="projLinks">
                      <button className="caseBtn" onClick={() => setOpenCase(p)}><Plus size={15} />{u.more}</button>
                      {p.live && <a href={p.live} target="_blank" rel="noreferrer"><ExternalLink size={15} />{p.liveLabel?.[lang] ?? t.live}</a>}
                      {p.repo && <a href={p.repo} target="_blank" rel="noreferrer"><Code2 size={15} />{t.code}</a>}
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </section>

        {/* REVIEWS */}
        <section className="wrap block" id="reviews">
          <div className="blockHead" data-reveal>
            <span className="kicker">{u.reviewsKicker}</span>
            <h2>{u.reviewsTitle}</h2>
          </div>
          <div className="reviews">
            {testimonials.map((r, i) => (
              <figure className="review" key={r.initials} data-reveal style={{ "--i": i, "--accent": r.accent } as CSSProperties}>
                <Quote className="reviewMark" size={34} aria-hidden="true" />
                <div className="stars" aria-label="5/5">★★★★★</div>
                <blockquote>{r.quote[lang]}</blockquote>
                <figcaption>
                  <span className="reviewAvatar" aria-hidden="true">{r.initials}</span>
                  <span><strong>{r.who[lang]}</strong><small>{r.project}</small></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="wrap block" id="process">
          <div className="blockHead" data-reveal>
            <span className="kicker">03 — {t.processKicker}</span>
            <h2>{t.processTitle}</h2>
          </div>
          <div className="processCard" data-reveal>
            <Image src="/img/process.webp" alt="" width={1800} height={773} sizes="(max-width: 1180px) 100vw, 1130px" className="processImg" />
            <ol className="steps">
              {processSteps.map((s, i) => (
                <li key={i} style={{ "--i": i } as CSSProperties}>
                  <span className="stepNum">0{i + 1}</span>
                  <strong>{s.title[lang]}</strong>
                  <p>{s.text[lang]}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ABOUT + FOR RECRUITERS */}
        <section className="wrap block" id="about">
          <div className="aboutGrid">
            <div className="aboutMedia" data-reveal>
              <Image src="/img/avatar-laptop.webp" alt="" width={1600} height={900} sizes="(max-width: 980px) 100vw, 560px" />
            </div>
            <div className="aboutText" data-reveal style={{ "--i": 1 } as CSSProperties}>
              <span className="kicker">04 — {t.aboutKicker}</span>
              <h2>{t.aboutTitle}</h2>
              <p>{t.aboutText}</p>
              <div className="heroCtas">
                <Magnetic className="btn primary" href={pdf[lang].href} download={pdf[lang].file}><Download size={17} />{t.download}</Magnetic>
                <button className="btn ghost" onClick={() => go("contact")}>{t.hire}<ArrowRight size={16} /></button>
              </div>
            </div>
          </div>

          <h3 className="subHead" data-reveal>{t.expTitle}</h3>
          <div className="timeline" ref={timelineRef}>
            <div className="tlLine" aria-hidden="true"><i /></div>
            {jobs.map((job, i) => (
              <article className={`job ${job.current ? "current" : ""}`} key={job.role} data-reveal style={{ "--i": i } as CSSProperties}>
                <span className="dot" aria-hidden="true" />
                <div className="jobCard">
                  <div className="jobTop">
                    <div>
                      <h3>{job.role}</h3>
                      <p className="org">{job.org[lang]}</p>
                    </div>
                    <span className="dates">{job.current && <b>{t.now}</b>}{job.dates[lang]}</span>
                  </div>
                  <ul>{job.bullets[lang].map((b) => <li key={b}>{b}</li>)}</ul>
                  {job.tags.length > 0 && <div className="tags">{job.tags.map((tg) => <span key={tg}>{tg}</span>)}</div>}
                </div>
              </article>
            ))}
          </div>

          <h3 className="subHead" data-reveal>{t.skillsTitle}</h3>
          <div className="bento">
            {skills.slice(0, 4).map((g, i) => (
              <div className={`bentoCard ${g.wide ? "wide" : ""}`} key={g.key} data-reveal style={{ "--i": i } as CSSProperties}>
                <h3>{g.label[lang]}</h3>
                <div className="chips">{g.items.map((s) => <span key={s}>{s}</span>)}</div>
              </div>
            ))}
            <div className="bentoCard tall" data-reveal style={{ "--i": 4 } as CSSProperties}>
              <h3><Languages size={17} />{t.langTitle}</h3>
              <div className="langBars">
                {t.langs.map(([name, level, pct]) => (
                  <div key={name}>
                    <p><span>{name}</span><b>{level}</b></p>
                    <div className="bar"><i style={{ "--w": `${pct}%` } as CSSProperties} /></div>
                  </div>
                ))}
              </div>
            </div>
            {skills.slice(4).map((g, i) => (
              <div className={`bentoCard ${g.wide ? "wide" : ""}`} key={g.key} data-reveal style={{ "--i": i + 5 } as CSSProperties}>
                <h3>{g.label[lang]}</h3>
                <div className="chips">{g.items.map((s) => <span key={s}>{s}</span>)}</div>
              </div>
            ))}
            <div className="bentoCard edu full" data-reveal style={{ "--i": 7 } as CSSProperties}>
              <h3><GraduationCap size={17} />{t.eduTitle}</h3>
              <strong>{t.degree}</strong>
              <p>{t.school}</p>
              <small>{t.degreeText}</small>
            </div>
          </div>
        </section>

        {/* PLAYGROUND */}
        <section className="wrap block" id="playground">
          <div className="blockHead" data-reveal>
            <span className="kicker">05 — {termCopy[lang].kicker}</span>
            <h2>{termCopy[lang].title}</h2>
          </div>
          <div data-reveal><Terminal key={lang} lang={lang} onHire={() => go("contact")} /></div>
        </section>

        {/* FAQ */}
        <section className="wrap block" id="faq">
          <div className="faqGrid">
            <div className="blockHead" data-reveal>
              <span className="kicker">{u.faqKicker}</span>
              <h2>{u.faqTitle}</h2>
              <button className="btn primary" onClick={() => go("contact")}><MessageCircle size={17} />{u.write}</button>
            </div>
            <div className="faqList">
              {faq.map((f, i) => (
                <details className="faqItem" key={i} data-reveal style={{ "--i": i } as CSSProperties}>
                  <summary><span>{f.q[lang]}</span><Plus size={18} aria-hidden="true" /></summary>
                  <p>{f.a[lang]}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="wrap contact" id="contact">
          <div className="contactGrid">
            <div className="contactIntro" data-reveal>
              <span className="kicker">06 — {t.contactKicker}</span>
              <h2>{t.contactTitle}</h2>
              <p>{t.contactText}</p>
              <div className="quickLinks">
                <button className="qLink" onClick={copyEmail}>
                  {copied ? <Check size={17} /> : <Copy size={17} />}<span>{EMAIL}</span>
                </button>
                <a className="qLink" href={TELEGRAM} target="_blank" rel="noreferrer"><Send size={17} /><span>t.me/Violet111</span><ExternalLink size={15} /></a>
                <a className="qLink" href={GITHUB} target="_blank" rel="noreferrer"><Code2 size={17} /><span>github.com/ViolettaNcl</span><ExternalLink size={15} /></a>
                <a className="qLink" href={pdf[lang].href} download={pdf[lang].file}><Download size={17} /><span>{t.download} · PDF</span></a>
              </div>
            </div>
            <div data-reveal style={{ "--i": 1 } as CSSProperties}><ContactForm lang={lang} /></div>
          </div>
        </section>
      </main>

      <button className={`fab ${showFab ? "show" : ""}`} onClick={() => go("contact")} aria-hidden={!showFab} tabIndex={showFab ? 0 : -1}>
        <MessageCircle size={19} /><span>{u.write}</span>
      </button>

      {openCase && (
        <CaseModal project={openCase} lang={lang} onClose={() => setOpenCase(null)} liveLabel={t.live} codeLabel={t.code} />
      )}

      <footer className="wrap footer">
        <span>© 2026 · {t.footer}</span>
      </footer>
    </>
  );
}
