"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Check, Code2, ExternalLink, X } from "lucide-react";
import type { Language, Project } from "./content";
import { cases, uiCopy } from "./content-extra";

export default function CaseModal({ project, lang, onClose, liveLabel, codeLabel }: {
  project: Project; lang: Language; onClose: () => void; liveLabel: string; codeLabel: string;
}) {
  const c = cases[project.title];
  const u = uiCopy[lang];
  const closeRef = useRef<HTMLButtonElement>(null);
  const [zoom, setZoom] = useState<number | null>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { if (zoom !== null) setZoom(null); else onClose(); }
      if (zoom !== null && c && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
        const n = c.shots.length;
        setZoom((z) => (z === null ? z : (z + (e.key === "ArrowRight" ? 1 : n - 1)) % n));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [onClose, zoom, c]);

  if (!c) return null;
  const shot = zoom !== null ? c.shots[zoom] : null;

  return (
    <div className="caseBackdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="caseModal" role="dialog" aria-modal="true" aria-labelledby="case-title" style={{ "--accent": project.accent } as React.CSSProperties}>
        <button ref={closeRef} className="caseClose" onClick={onClose} aria-label={u.close}><X size={20} /></button>

        <div className="caseHero">
          <Image src={project.image} alt="" width={1600} height={900} sizes="(max-width: 900px) 100vw, 1000px" />
        </div>

        <div className="caseBody">
          <span className="projKicker">{project.kicker[lang]}</span>
          <h2 id="case-title">
            {project.badge && <Image className="caseBadge" src={project.badge} alt="" width={360} height={360} sizes="64px" />}
            {project.title}
          </h2>

          <div className="caseCols">
            <section>
              <h3>{u.task}</h3>
              <p>{c.task[lang]}</p>
            </section>
            <section>
              <h3>{u.solution}</h3>
              <ul>{c.solution.map((s, i) => <li key={i}><Check size={15} />{s[lang]}</li>)}</ul>
            </section>
            <section>
              <h3>{u.result}</h3>
              <p>{c.result[lang]}</p>
              <div className="tags">{project.stack.map((s) => <span key={s}>{s}</span>)}</div>
              <div className="projLinks">
                {project.live && <a href={project.live} target="_blank" rel="noreferrer"><ExternalLink size={15} />{project.liveLabel?.[lang] ?? liveLabel}</a>}
                {project.repo && <a href={project.repo} target="_blank" rel="noreferrer"><Code2 size={15} />{codeLabel}</a>}
              </div>
            </section>
          </div>

          <h3 className="galleryTitle">{u.gallery}</h3>
          <div className="gallery">
            {c.shots.map((s, i) => (
              <button key={s.src} className={`shot ${s.phone ? "phone" : ""} ${s.tall ? "tall" : ""}`} onClick={() => setZoom(i)} style={{ "--i": i } as React.CSSProperties}>
                <Image src={s.src} alt={s.caption[lang]} width={s.w} height={s.h} sizes="420px" />
                <span>{s.caption[lang]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {shot && (
        <div className="lightbox" onMouseDown={() => setZoom(null)} role="dialog" aria-label={shot.caption[lang]}>
          <Image src={shot.src} alt={shot.caption[lang]} width={shot.w} height={shot.h} sizes="90vw" className={shot.phone ? "phone" : ""} />
          <p>{shot.caption[lang]} · {zoom! + 1}/{c.shots.length}</p>
        </div>
      )}
    </div>
  );
}
