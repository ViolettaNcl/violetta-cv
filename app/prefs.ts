"use client";

/** Theme + UI sound preferences. Stored per visitor in localStorage (best effort). */

export type Theme = "dark" | "light";

const read = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } };

export const loadTheme = (): Theme => (read("vn-theme") === "light" ? "light" : "dark");
export const loadSound = (): boolean => read("vn-sound") === "on";

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f4f1ff" : "#07060d");
  write("vn-theme", theme);
}

export const saveSound = (on: boolean) => write("vn-sound", on ? "on" : "off");

/* ---------- tiny synthesized UI sounds (no audio files) ---------- */

let ctx: AudioContext | null = null;
let last = 0;

function audio() {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function blip(kind: "hover" | "click") {
  const now = performance.now();
  if (kind === "hover" && now - last < 70) return;
  last = now;
  const a = audio();
  if (!a) return;
  const t = a.currentTime;
  const osc = a.createOscillator();
  const gain = a.createGain();
  osc.type = kind === "click" ? "triangle" : "sine";
  const f = kind === "click" ? 520 : 900 + Math.random() * 120;
  osc.frequency.setValueAtTime(f, t);
  osc.frequency.exponentialRampToValueAtTime(kind === "click" ? 880 : f * 0.75, t + 0.08);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(kind === "click" ? 0.06 : 0.025, t + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + (kind === "click" ? 0.16 : 0.09));
  osc.connect(gain).connect(a.destination);
  osc.start(t);
  osc.stop(t + 0.2);
}

const HOVER_TARGETS = ".btn, .service, .work, .qLink, .chips span, .pickChips button, .termChips button, .topbar nav button, .faqItem summary, .review";

/** Attach delegated listeners; returns a cleanup function. */
export function attachSounds(enabled: () => boolean) {
  let lastEl: Element | null = null;
  const over = (e: PointerEvent) => {
    if (!enabled() || e.pointerType !== "mouse") return;
    const el = (e.target as Element | null)?.closest(HOVER_TARGETS) ?? null;
    if (el && el !== lastEl) blip("hover");
    lastEl = el;
  };
  const down = (e: PointerEvent) => {
    if (!enabled()) return;
    if ((e.target as Element | null)?.closest("button, a")) blip("click");
  };
  document.addEventListener("pointerover", over, { passive: true });
  document.addEventListener("pointerdown", down, { passive: true });
  return () => {
    document.removeEventListener("pointerover", over);
    document.removeEventListener("pointerdown", down);
  };
}
