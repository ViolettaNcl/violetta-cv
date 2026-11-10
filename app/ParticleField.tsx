"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A single GPU point cloud that morphs between procedurally generated shapes.
 * The page tells it which shape to show via the "particles:stage" event.
 */

export type Stage = "sphere" | "knot" | "code" | "braces" | "at" | "heart";
export const STAGE_EVENT = "particles:stage";
export const PULSE_EVENT = "particles:pulse";

const vertex = /* glsl */ `
uniform float uTime; uniform float uSize; uniform vec2 uMouse; uniform float uPulse; uniform float uPixel;
attribute float aRand; attribute float aSize;
varying float vRand; varying float vGlow;
void main(){
  vec3 p = position;
  // organic drift
  float t = uTime * 0.6 + aRand * 40.0;
  p += 0.035 * vec3(sin(t), cos(t * 1.3), sin(t * 0.7));
  // pulse shockwave from centre
  float r = length(p);
  p += normalize(p + 1e-4) * uPulse * 0.9 * exp(-pow(r - uPulse * 3.0, 2.0) * 2.0);
  vec4 world = modelMatrix * vec4(p, 1.0);
  // mouse repulsion in world xy
  vec2 d = world.xy - uMouse;
  float m = exp(-dot(d, d) * 1.6);
  world.xy += normalize(d + 1e-4) * m * 0.55;
  vec4 mv = viewMatrix * world;
  gl_Position = projectionMatrix * mv;
  vGlow = m;
  vRand = aRand;
  gl_PointSize = uSize * aSize * uPixel * (1.0 + m * 1.5) / -mv.z;
}`;

const fragment = /* glsl */ `
uniform float uTime; uniform float uOpacity; uniform float uLight;
varying float vRand; varying float vGlow;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float core = smoothstep(0.5, 0.0, d);
  core = pow(core, 1.8);
  vec3 violet = vec3(0.52, 0.36, 1.0);
  vec3 cyan = vec3(0.2, 0.88, 1.0);
  vec3 pink = vec3(1.0, 0.4, 0.82);
  float k = fract(vRand * 3.7 + uTime * 0.03);
  vec3 col = k < 0.5 ? mix(violet, cyan, k * 2.0) : mix(cyan, pink, (k - 0.5) * 2.0);
  col = mix(col, vec3(1.0), vGlow * 0.6);
  float twinkle = 0.75 + 0.25 * sin(uTime * 3.0 + vRand * 60.0);
  if (uLight > 0.5) {
    // light theme: normal blending with deeper, ink-like colours
    gl_FragColor = vec4(col * 0.62, core * uOpacity * 0.85 * twinkle);
  } else {
    gl_FragColor = vec4(col * core * twinkle, core * uOpacity);
  }
}`;

function rand(seed: number) {
  // deterministic PRNG so shapes are identical between runs
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

function sphere(n: number, r = rand(1)): Float32Array {
  const out = new Float32Array(n * 3);
  const g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = g * i;
    const shell = i % 7 === 0 ? 0.55 + r() * 0.4 : 1.6; // some particles inside for depth
    out[i * 3] = Math.cos(th) * rad * shell * 1.0;
    out[i * 3 + 1] = y * shell;
    out[i * 3 + 2] = Math.sin(th) * rad * shell;
  }
  return out;
}

function knot(n: number, r = rand(2)): Float32Array {
  const out = new Float32Array(n * 3);
  const p = 2, q = 3;
  for (let i = 0; i < n; i++) {
    const u = r() * Math.PI * 2 * p;
    const cu = Math.cos(u), su = Math.sin(u), quOverP = (q / p) * u, cs = Math.cos(quOverP);
    const R = 1.05;
    const x = R * (2 + cs) * 0.5 * cu;
    const y = R * (2 + cs) * su * 0.5;
    const z = R * Math.sin(quOverP) * 0.5;
    const tube = 0.22 * Math.sqrt(r());
    const a = r() * Math.PI * 2;
    out[i * 3] = x + Math.cos(a) * tube;
    out[i * 3 + 1] = y + Math.sin(a) * tube;
    out[i * 3 + 2] = z + Math.cos(a + 1.3) * tube;
  }
  return out;
}

function heart(n: number, r = rand(3)): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = r() * Math.PI * 2;
    const fill = Math.sqrt(r());
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    out[i * 3] = (x / 17) * 1.7 * fill;
    out[i * 3 + 1] = (y / 17) * 1.7 * fill + 0.2;
    out[i * 3 + 2] = (r() - 0.5) * 0.5 * (1 - fill * 0.6);
  }
  return out;
}

function glyph(n: number, text: string, width: number, seed: number): Float32Array {
  const out = new Float32Array(n * 3);
  const c = document.createElement("canvas");
  c.width = 640; c.height = 320;
  const ctx = c.getContext("2d");
  if (!ctx) return sphere(n);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${text.length > 2 ? 210 : 260}px "Inter Tight", "Segoe UI", Arial, sans-serif`;
  ctx.fillText(text, c.width / 2, c.height / 2 + 10);
  const data = ctx.getImageData(0, 0, c.width, c.height).data;
  const pts: number[] = [];
  for (let y = 0; y < c.height; y += 2) for (let x = 0; x < c.width; x += 2) if (data[(y * c.width + x) * 4 + 3] > 128) pts.push(x, y);
  const r = rand(seed);
  if (!pts.length) return sphere(n);
  const scale = width / c.width;
  for (let i = 0; i < n; i++) {
    const k = Math.floor(r() * (pts.length / 2)) * 2;
    out[i * 3] = (pts[k] - c.width / 2 + (r() - 0.5) * 2) * scale;
    out[i * 3 + 1] = -(pts[k + 1] - c.height / 2 + (r() - 0.5) * 2) * scale;
    out[i * 3 + 2] = (r() - 0.5) * 0.45;
  }
  return out;
}

const stageLook: Record<Stage, { spin: number; opacity: number }> = {
  sphere: { spin: 1, opacity: 1 },
  knot: { spin: 1, opacity: 0.45 },
  code: { spin: 0.15, opacity: 0.5 },
  braces: { spin: 0.15, opacity: 0.5 },
  at: { spin: 0.15, opacity: 0.35 },
  heart: { spin: 0.1, opacity: 1 },
};

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 760;
    const N = small ? 6500 : 15000;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 8);
    const group = new THREE.Group();
    scene.add(group);

    let disposed = false;
    const targets: Partial<Record<Stage, Float32Array>> = {
      sphere: sphere(N),
      knot: knot(N),
      heart: heart(N),
    };
    const buildGlyphs = () => {
      if (disposed) return;
      targets.code = glyph(N, "</>", 4.6, 4);
      targets.braces = glyph(N, "{ }", 4.2, 5);
      targets.at = glyph(N, "@", 3.6, 6);
    };
    if (document.fonts?.ready) document.fonts.ready.then(buildGlyphs); else buildGlyphs();

    // start scattered in a wide cloud, then assemble into the sphere: entrance effect
    const r = rand(9);
    const cur = new Float32Array(N * 3);
    for (let i = 0; i < N * 3; i++) cur[i] = (r() - 0.5) * 22;
    const speed = new Float32Array(N);
    const aRand = new Float32Array(N);
    const aSize = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      speed[i] = 0.018 + r() * 0.05;
      aRand[i] = r();
      aSize[i] = r() < 0.04 ? 2.6 : 0.6 + r() * 0.9;
    }
    if (reduced) cur.set(targets.sphere!);

    const geo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(cur, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute("position", posAttr);
    geo.setAttribute("aRand", new THREE.BufferAttribute(aRand, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: small ? 30 : 34 },
        uPixel: { value: dpr },
        uMouse: { value: new THREE.Vector2(99, 99) },
        uPulse: { value: 0 },
        uOpacity: { value: 1 },
        uLight: { value: 0 },
      },
    });
    const points = new THREE.Points(geo, mat);
    group.add(points);

    // faint background starfield
    const sN = small ? 500 : 1200;
    const sPos = new Float32Array(sN * 3);
    for (let i = 0; i < sN; i++) {
      sPos[i * 3] = (r() - 0.5) * 40; sPos[i * 3 + 1] = (r() - 0.5) * 26; sPos[i * 3 + 2] = -6 - r() * 14;
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    const stars = new THREE.Points(sGeo, new THREE.PointsMaterial({ color: 0xb8b2ff, size: 0.045, transparent: true, opacity: 0.6, depthWrite: false }));
    scene.add(stars);

    let stage: Stage = "sphere";
    let override: Stage | null = null;
    let overrideTimer = 0;
    const onStage = (e: Event) => { stage = (e as CustomEvent<Stage>).detail; };
    const onPulse = (e: Event) => {
      mat.uniforms.uPulse.value = 1.2;
      const detail = (e as CustomEvent<Stage | undefined>).detail;
      if (detail) {
        override = detail;
        clearTimeout(overrideTimer);
        overrideTimer = window.setTimeout(() => { override = null; }, 5200);
      }
    };
    window.addEventListener(STAGE_EVENT, onStage);
    window.addEventListener(PULSE_EVENT, onPulse);

    const mouseNdc = { x: 9, y: 9, tx: 9, ty: 9 };
    const onMove = (e: PointerEvent) => {
      mouseNdc.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNdc.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onLeave = () => { mouseNdc.tx = 9; mouseNdc.ty = 9; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let halfW = 1, halfH = 1, wide = true;
    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      halfH = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
      halfW = halfH * camera.aspect;
      wide = w > 900;
    };
    window.addEventListener("resize", resize);
    resize();

    const ndcToWorld = new THREE.Vector3();
    const clock = new THREE.Clock();
    let raf = 0;
    let spin = 1;
    let opacity = 0;
    let rotY = 0;
    let anchor: HTMLElement | null = null;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;
      const light = document.documentElement.dataset.theme === "light";
      if ((mat.uniforms.uLight.value > 0.5) !== light) {
        mat.uniforms.uLight.value = light ? 1 : 0;
        mat.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
        mat.needsUpdate = true;
        (stars.material as THREE.PointsMaterial).color.set(light ? 0x6d5bd0 : 0xb8b2ff);
      }
      const t = clock.getElapsedTime();
      const active = override ?? stage;
      const target = targets[active] ?? targets.sphere!;
      const boost = override ? 2.2 : 1;
      for (let i = 0; i < N; i++) {
        const k = Math.min(speed[i] * boost, 0.2);
        const j = i * 3;
        cur[j] += (target[j] - cur[j]) * k;
        cur[j + 1] += (target[j + 1] - cur[j + 1]) * k;
        cur[j + 2] += (target[j + 2] - cur[j + 2]) * k;
      }
      posAttr.needsUpdate = true;

      const look = stageLook[active];
      spin += (look.spin - spin) * 0.04;
      opacity += (look.opacity - opacity) * 0.03;
      // on narrow screens text sits on top of the shapes, so keep them quieter outside the hero
      mat.uniforms.uOpacity.value = opacity * (wide || active === "sphere" || active === "heart" ? 1 : 0.5);
      mat.uniforms.uTime.value = t;
      mat.uniforms.uPulse.value *= 0.965;

      // layout: right side on desktop, top-centre on phones; centre for the "thank you" heart
      const centred = active === "heart";
      let tx = wide && !centred ? halfW * 0.5 : 0;
      let ty = wide || centred ? 0 : halfH * 0.42;
      let ts = wide ? Math.min(1.15, halfW / 5.2) : Math.min(0.7, halfW / 2.6);
      let follow = 0.05;
      // in the hero the sphere wraps the avatar like a halo, wherever the layout puts it
      if (active === "sphere") {
        anchor = anchor && anchor.isConnected ? anchor : document.querySelector<HTMLElement>("[data-particle-anchor]");
        if (anchor) {
          const r = anchor.getBoundingClientRect();
          const vh = window.innerHeight, vw = window.innerWidth;
          tx = ((r.left + r.width / 2) / vw * 2 - 1) * halfW;
          ty = -((r.top + r.height / 2) / vh * 2 - 1) * halfH;
          ts = ((r.width / 2) * 1.55 / (vh / 2)) * halfH / 1.6;
          follow = 0.14;
        }
      }
      group.position.x += (tx - group.position.x) * follow;
      group.position.y += (ty - group.position.y) * follow;
      const s = group.scale.x + (ts - group.scale.x) * 0.05;
      group.scale.setScalar(s);

      mouseNdc.x += (mouseNdc.tx - mouseNdc.x) * 0.12;
      mouseNdc.y += (mouseNdc.ty - mouseNdc.y) * 0.12;
      ndcToWorld.set(mouseNdc.x * halfW, mouseNdc.y * halfH, 0);
      mat.uniforms.uMouse.value.set(ndcToWorld.x, ndcToWorld.y);

      // continuous spin for 3D shapes, gentle sway (and face the camera) for glyphs
      rotY += 0.0035 * spin;
      const sway = Math.sin(t * 0.5) * 0.18;
      const wanted = spin > 0.5 ? rotY : Math.round(rotY / (Math.PI * 2)) * Math.PI * 2 + sway;
      group.rotation.y += (wanted - group.rotation.y) * 0.04;
      group.rotation.x = (mouseNdc.y > 5 ? 0 : -mouseNdc.y * 0.15) + Math.sin(t * 0.3) * 0.05;
      stars.rotation.y = t * 0.004;
      stars.position.x = (mouseNdc.x > 5 ? 0 : mouseNdc.x) * -0.3;
      renderer.render(scene, camera);
    };

    if (reduced) {
      mat.uniforms.uOpacity.value = 1;
      group.position.x = wide ? halfW * 0.5 : 0;
      renderer.render(scene, camera);
    } else {
      tick();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(overrideTimer);
      window.removeEventListener(STAGE_EVENT, onStage);
      window.removeEventListener(PULSE_EVENT, onPulse);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
      geo.dispose(); sGeo.dispose(); mat.dispose(); (stars.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="particles" aria-hidden="true" />;
}
