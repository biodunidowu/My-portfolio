"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------------ *
 * Footer type toy, after Deji Ajetomobi's "Factor X": type a word, then
 * stretch it with the pointer (or your voice). The word is rendered once to
 * an offscreen canvas and redrawn in 2px vertical strips, each scaled by a
 * distortion profile around the pointer.
 * ------------------------------------------------------------------------ */

type Mode = "bar" | "wave" | "arc";

const MAX_CHARS = 14;
const PLACEHOLDER = "TYPE SOMETHING";
const STRIP = 2;

export default function TypeToy({ className }: { className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [mode, setMode] = useState<Mode>("bar");
  const [mic, setMic] = useState<"off" | "on" | "denied">("off");

  // Live values the render loop reads without re-subscribing.
  const live = useRef({ text: "", mode: "bar" as Mode, micLevel: 0, micOn: false });

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const offscreen = document.createElement("canvas");
    const off = offscreen.getContext("2d")!;
    const root = getComputedStyle(document.documentElement);
    const family = root.getPropertyValue("--font-anton").trim() || "Impact, sans-serif";

    let W = 0;
    let H = 0;
    let dpr = 1;
    let lastKey = "";
    let raf = 0;
    let pointer: { x: number; y: number } | null = null;
    let amp = 0; // smoothed distortion strength, 0..1
    let focusX = 0; // smoothed pointer x
    let t = 0;
    let lastTime = performance.now();
    let running = false;

    const colorOf = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    /** Lay out the word(s) on the offscreen canvas at the largest fitting size. */
    function renderText() {
      const value = live.current.text || PLACEHOLDER;
      const color = colorOf(live.current.text ? "--fg" : "--line-subtle");
      const key = `${value}|${W}|${H}|${color}|${dpr}`;
      if (key === lastKey) return;
      lastKey = key;

      offscreen.width = Math.round(W * dpr);
      offscreen.height = Math.round(H * dpr);
      off.setTransform(dpr, 0, 0, dpr, 0, 0);
      off.clearRect(0, 0, W, H);

      const maxSize = W < 640 ? 96 : 131.5;
      const pad = W < 640 ? 16 : 40;
      const words = value.split(" ");
      let size = maxSize;
      let lines: string[] = [value];
      const fits = (s: number, ls: string[]) => {
        off.font = `${s}px ${family}`;
        return ls.every((l) => off.measureText(l).width <= W - pad * 2) && ls.length * s * 0.79 <= H * 0.62;
      };
      // Prefer one line; break on spaces if it would otherwise shrink a lot.
      while (size > 24 && !fits(size, lines)) {
        if (lines.length === 1 && words.length > 1 && size < maxSize * 0.8) {
          lines = [words.slice(0, Math.ceil(words.length / 2)).join(" "), words.slice(Math.ceil(words.length / 2)).join(" ")];
          size = maxSize;
          continue;
        }
        size -= 2;
      }

      off.font = `${size}px ${family}`;
      off.fillStyle = color;
      off.textAlign = "center";
      off.textBaseline = "middle";
      const lineHeight = size * 0.79;
      const top = H / 2 - ((lines.length - 1) * lineHeight) / 2;
      lines.forEach((line, i) => off.fillText(line, W / 2, top + i * lineHeight));
    }

    /** Stretch factor for the strip at x (1 = untouched). */
    function stretch(x: number) {
      const m = live.current.mode;
      const reach = Math.max(W * 0.18, 120);
      const d = (x - focusX) / reach;
      if (m === "bar") return 1 + amp * 0.9 * Math.exp(-d * d * 2.2);
      if (m === "arc") return 1 + amp * 0.75 * Math.max(0, 1 - d * d * 0.35);
      return 1 + amp * 0.45 * (0.5 + 0.5 * Math.sin(x * 0.035 - t * 4)) * Math.exp(-d * d * 0.4);
    }

    function draw() {
      renderText();
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);
      const cy = H / 2;
      for (let x = 0; x < W; x += STRIP) {
        const s = stretch(x + STRIP / 2);
        ctx!.drawImage(offscreen, x * dpr, 0, STRIP * dpr, H * dpr, x, cy - cy * s, STRIP, H * s);
      }
    }

    function tick(now: number) {
      const dt = Math.min((now - lastTime) / 1000, 1 / 30);
      lastTime = now;
      t += dt;

      let target = 0;
      if (live.current.micOn) target = Math.min(1, live.current.micLevel * 6);
      else if (pointer) target = 0.35 + 0.65 * Math.min(1, Math.max(0, pointer.y / H));
      // Springy approach: quick to react, slower to settle back.
      const rate = target > amp ? 9 : 4;
      amp += (target - amp) * (1 - Math.exp(-rate * dt));
      const fx = pointer ? pointer.x : focusX;
      focusX += (fx - focusX) * (1 - Math.exp(-12 * dt));

      draw();
      const active = pointer || live.current.micOn || amp > 0.002;
      if (active) raf = requestAnimationFrame(tick);
      else running = false;
    }

    function wake() {
      if (running) return;
      running = true;
      lastTime = performance.now();
      raf = requestAnimationFrame(tick);
    }

    function resize() {
      const rect = box!.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      if (!focusX) focusX = W / 2;
      lastKey = "";
      draw();
    }

    const onMove = (e: PointerEvent) => {
      const rect = box!.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      wake();
    };
    const onLeave = () => {
      pointer = null;
      wake();
    };

    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerdown", onMove);
    box.addEventListener("pointerleave", onLeave);
    box.addEventListener("pointercancel", onLeave);
    const observer = new ResizeObserver(resize);
    observer.observe(box);
    // Repaint when the theme flips so the text takes the new colour.
    const themeObserver = new MutationObserver(() => {
      lastKey = "";
      draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    void document.fonts.load(`100px ${family}`).then(() => {
      lastKey = "";
      resize();
    });

    // Expose a redraw hook for text/mode changes from React state.
    (box as HTMLDivElement & { __redraw?: () => void }).__redraw = () => {
      lastKey = "";
      wake();
      draw();
    };

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      themeObserver.disconnect();
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerdown", onMove);
      box.removeEventListener("pointerleave", onLeave);
      box.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  // Sync React state into the loop's live values, then redraw.
  useEffect(() => {
    live.current.text = text;
    live.current.mode = mode;
    live.current.micOn = mic === "on";
    (boxRef.current as (HTMLDivElement & { __redraw?: () => void }) | null)?.__redraw?.();
  }, [text, mode, mic]);

  // Microphone level (Sound mode). Audio is analysed locally, never recorded.
  useEffect(() => {
    if (mic !== "on") return;
    const values = live.current;
    let stream: MediaStream | null = null;
    let audio: AudioContext | null = null;
    let raf = 0;
    let cancelled = false;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((track) => track.stop());
          return;
        }
        stream = s;
        audio = new AudioContext();
        const analyser = audio.createAnalyser();
        analyser.fftSize = 512;
        audio.createMediaStreamSource(s).connect(analyser);
        const data = new Float32Array(analyser.fftSize);
        const read = () => {
          analyser.getFloatTimeDomainData(data);
          let sum = 0;
          for (const v of data) sum += v * v;
          values.micLevel = Math.sqrt(sum / data.length);
          (boxRef.current as (HTMLDivElement & { __redraw?: () => void }) | null)?.__redraw?.();
          raf = requestAnimationFrame(read);
        };
        read();
      })
      .catch(() => setMic("denied"));

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      stream?.getTracks().forEach((track) => track.stop());
      void audio?.close();
      values.micLevel = 0;
    };
  }, [mic]);

  const chip = (active: boolean) =>
    cn(
      "cursor-pointer px-1.5 py-0.5 transition-colors",
      active ? "text-fg" : "text-fg-muted hover:text-fg",
    );

  return (
    <div
      ref={boxRef}
      onClick={() => inputRef.current?.focus()}
      className={cn(
        "group relative cursor-text overflow-hidden bg-surface select-none",
        className,
      )}
    >
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

      <label className="sr-only" htmlFor="type-toy">
        Type something to stretch
      </label>
      <input
        ref={inputRef}
        id="type-toy"
        value={text}
        maxLength={MAX_CHARS}
        autoComplete="off"
        spellCheck={false}
        onChange={(e) => setText(e.target.value.toUpperCase())}
        className="absolute inset-0 h-full w-full cursor-text opacity-0"
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-3 bottom-3 left-3 flex items-center justify-between font-mono text-[11px] leading-4 tracking-[-0.44px] text-fg-muted uppercase opacity-60 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100"
      >
        <span>
          {text.length}/{MAX_CHARS}
        </span>
        <div className="flex items-center gap-1">
          {(["bar", "wave", "arc"] as Mode[]).map((m) => (
            <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)} className={chip(mode === m)}>
              {m}
            </button>
          ))}
          <span aria-hidden className="px-1">
            /
          </span>
          <button
            type="button"
            aria-pressed={mic === "on"}
            disabled={mic === "denied"}
            onClick={() => setMic((v) => (v === "on" ? "off" : "on"))}
            className={chip(mic === "on")}
            title="Use your microphone to stretch the text"
          >
            {mic === "denied" ? "mic blocked" : "mic"}
          </button>
        </div>
      </div>
    </div>
  );
}
