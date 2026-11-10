"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { pdf, type Language } from "./content";
import { termCopy, type TermLine } from "./interactive";
import { PULSE_EVENT } from "./ParticleField";

export default function Terminal({ lang, onHire }: { lang: Language; onHire: () => void }) {
  const t = termCopy[lang];
  const [lines, setLines] = useState<TermLine[]>(() => t.welcome.map((text) => ({ kind: "out", text })));
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIndex, setHIndex] = useState(-1);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const print = (out: TermLine[]) => setLines((prev) => [...prev, ...out].slice(-80));

  const run = (raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setHistory((h) => [cmd, ...h].slice(0, 30));
    setHIndex(-1);
    const input: TermLine = { kind: "in", text: cmd };
    const c = cmd.toLowerCase();
    const out = (texts: string[], kind: TermLine["kind"] = "out") => texts.map((text) => ({ kind, text }));

    if (c === "clear" || c === "cls") { setLines([]); return; }
    if (c === "help" || c === "?") return print([input, ...out(t.help)]);
    if (c === "whoami") return print([input, ...out(t.whoami)]);
    if (c === "skills" || c === "stack") return print([input, ...out(t.skills)]);
    if (c === "projects" || c === "ls") return print([input, ...out(t.projects)]);
    if (c === "experience" || c === "exp") return print([input, ...out(t.experience)]);
    if (c === "coffee") return print([input, ...out(t.coffee, "accent")]);
    if (c === "cv" || c === "resume") {
      const a = document.createElement("a");
      a.href = pdf[lang].href; a.download = pdf[lang].file; a.click();
      return print([input, { kind: "accent", text: t.cv }]);
    }
    if (c === "hire" || c === "contact") {
      print([input, ...out(t.hire, "accent")]);
      setTimeout(onHire, 500);
      return;
    }
    if (c.startsWith("sudo")) {
      print([input, ...out(t.sudo, "accent")]);
      window.dispatchEvent(new CustomEvent(PULSE_EVENT, { detail: "heart" }));
      return;
    }
    print([input, { kind: "err", text: t.unknown(cmd.split(" ")[0]) }]);
  };

  const submit = (e: FormEvent) => { e.preventDefault(); run(value); setValue(""); };

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <div className="termBar">
        <span className="dots"><i /><i /><i /></span>
        <span className="termTitle">violetta@cv: ~</span>
        <span className="termLive"><i />live</span>
      </div>
      <div className="termBody" ref={bodyRef} aria-live="polite">
        {lines.map((l, i) => (
          <p key={i} className={`tl ${l.kind}`}>
            {l.kind === "in" && <span className="prompt">❯ </span>}
            {l.text}
          </p>
        ))}
        <form onSubmit={submit} className="termInput">
          <span className="prompt">❯</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp" && history.length) { e.preventDefault(); const n = Math.min(hIndex + 1, history.length - 1); setHIndex(n); setValue(history[n]); }
              if (e.key === "ArrowDown") { e.preventDefault(); const n = hIndex - 1; setHIndex(Math.max(n, -1)); setValue(n >= 0 ? history[n] : ""); }
            }}
            aria-label={t.hint}
            placeholder={t.hint}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
        </form>
      </div>
      <div className="termChips">
        {t.chips.map((c) => <button key={c} type="button" onClick={(e) => { e.stopPropagation(); run(c); }}>{c}</button>)}
      </div>
    </div>
  );
}
