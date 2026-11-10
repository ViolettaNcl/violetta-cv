"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, Clock, RotateCcw, Send } from "lucide-react";
import { EMAIL, TELEGRAM, type Language } from "./content";
import { formCopy } from "./interactive";
import { PULSE_EVENT } from "./ParticleField";

function Chips({ options, value, onToggle, multi }: { options: string[]; value: string[]; onToggle: (v: string) => void; multi?: boolean }) {
  return (
    <div className="pickChips" role={multi ? "group" : "radiogroup"}>
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button key={o} type="button" className={on ? "on" : ""} onClick={() => onToggle(o)}
            role={multi ? undefined : "radio"} aria-checked={multi ? undefined : on} aria-pressed={multi ? on : undefined}>
            {on && <Check size={14} />}{o}
          </button>
        );
      })}
    </div>
  );
}

function LocalTime({ label }: { label: string }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Volgograd" }).format(new Date());
    const id = setInterval(() => setTime(fmt()), 15000);
    const first = setTimeout(() => setTime(fmt()), 0);
    return () => { clearInterval(id); clearTimeout(first); };
  }, []);
  return <span className="localTime"><Clock size={15} />{label}: <b suppressHydrationWarning>{time || "--:--"}</b> · UTC+3</span>;
}

export default function ContactForm({ lang }: { lang: Language }) {
  const t = formCopy[lang];
  const [mode, setMode] = useState(0);
  const [types, setTypes] = useState<number[]>([]);
  const [when, setWhen] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [viaMail, setViaMail] = useState(false);
  const [honey, setHoney] = useState("");

  const pickList = mode === 0 ? t.types : t.roles;
  const toggleType = (label: string) => {
    const i = pickList.indexOf(label);
    if (mode === 0) setTypes((v) => (v.includes(i) ? v.filter((x) => x !== i) : [...v, i]));
    else setTypes((v) => (v.includes(i) ? [] : [i]));
  };

  const body = () => {
    const lines = [
      `${t.name}: ${name}`,
      `${t.contact}: ${contact}`,
      `${mode === 0 ? t.typeLabel : t.roleLabel} ${types.map((i) => pickList[i]).join(", ") || "—"}`,
      `${t.whenLabel} ${when === null ? "—" : t.whens[when]}`,
      "",
      message,
    ];
    return lines.join("\n");
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) { setError(true); return; }
    setError(false);
    setSending(true);
    const subject = `${mode === 0 ? t.subjectProject : t.subjectHire} — ${name}`;
    let delivered = false;
    try {
      // FormSubmit (free): forwards the message straight to the inbox, no backend needed
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: subject,
          _template: "table",
          _captcha: "false",
          _honey: honey,
          name,
          contact,
          type: mode === 0 ? "project" : "hiring",
          details: types.map((i) => pickList[i]).join(", ") || "—",
          when: when === null ? "—" : t.whens[when],
          message: message || "—",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      delivered = res.ok && String(data.success) !== "false";
    } catch {
      delivered = false;
    }
    if (!delivered) {
      // fall back to the visitor's own email app
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body())}`;
    }
    setSending(false);
    setViaMail(!delivered);
    window.dispatchEvent(new CustomEvent(PULSE_EVENT, { detail: "heart" }));
    setSent(true);
  };

  const telegram = async () => {
    try { await navigator.clipboard.writeText(body()); } catch { /* clipboard blocked: still open Telegram */ }
    window.open(TELEGRAM, "_blank", "noreferrer");
  };

  if (sent) {
    return (
      <div className="formCard sent">
        <div className="sentIcon"><Check size={34} /></div>
        <h3>{viaMail ? t.sentTitle : t.deliveredTitle}</h3>
        <p>{viaMail ? t.sentText : t.deliveredText}</p>
        <button type="button" className="btn ghost" onClick={() => { setSent(false); setMessage(""); }}><RotateCcw size={16} />{t.again}</button>
      </div>
    );
  }

  return (
    <form className="formCard" onSubmit={submit} noValidate>
      <div className="modeSwitch" role="tablist">
        {t.modes.map((m, i) => (
          <button key={m} type="button" role="tab" aria-selected={mode === i} className={mode === i ? "on" : ""} onClick={() => { setMode(i); setTypes([]); }}>{m}</button>
        ))}
        <span className="modeThumb" style={{ transform: `translateX(${mode * 100}%)` }} aria-hidden="true" />
      </div>

      <label className="fLabel">{mode === 0 ? t.typeLabel : t.roleLabel}</label>
      <Chips options={pickList} value={types.map((i) => pickList[i])} onToggle={toggleType} multi={mode === 0} />

      <label className="fLabel">{t.whenLabel}</label>
      <Chips options={t.whens} value={when === null ? [] : [t.whens[when]]} onToggle={(v) => { const i = t.whens.indexOf(v); setWhen(when === i ? null : i); }} />

      <div className="fRow">
        <div className={`field ${error && !name.trim() ? "bad" : ""}`}>
          <input id="f-name" value={name} onChange={(e) => setName(e.target.value)} placeholder=" " autoComplete="name" />
          <label htmlFor="f-name">{t.name}</label>
        </div>
        <div className={`field ${error && !contact.trim() ? "bad" : ""}`}>
          <input id="f-contact" value={contact} onChange={(e) => setContact(e.target.value)} placeholder=" " autoComplete="email" />
          <label htmlFor="f-contact">{t.contact}</label>
        </div>
      </div>
      <div className="field area">
        <textarea id="f-msg" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={mode === 0 ? t.placeholderProject : t.placeholderHire} />
        <label htmlFor="f-msg">{t.message}</label>
      </div>
      {error && <p className="fError" role="alert">{t.required}</p>}

      <div className="fActions">
        <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={honey} onChange={(e) => setHoney(e.target.value)} name="_honey" />
        <button type="submit" className="btn primary big send" disabled={sending} aria-busy={sending}>
          <span>{sending ? t.sending : t.send}</span>{sending ? <span className="spinner" aria-hidden="true" /> : <ArrowRight size={18} />}
        </button>
        <button type="button" className="btn ghost" onClick={telegram}><Send size={16} />{t.telegram}</button>
      </div>
      <div className="fMeta">
        <LocalTime label={t.localTime} />
        <span className="replies"><i />{t.replies}</span>
      </div>
      <p className="fPrivacy">{t.privacy}</p>
    </form>
  );
}
