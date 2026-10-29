"use client";

import { useEffect, useRef } from "react";

/* ------------------------------------------------------------------------ *
 * Starfall: a small vertical space shooter.
 *
 * Classic shmup loop: the ship auto-fires, waves of three enemy types come
 * down faster as the level rises, kills chain into a combo multiplier, and
 * drops give triple shot, a shield or an extra life. Everything is drawn on
 * one canvas and every sound is synthesised with Web Audio, so the game
 * ships no assets.
 * ------------------------------------------------------------------------ */

type Phase = "title" | "play" | "paused" | "over";
type EnemyKind = "drifter" | "weaver" | "gunner";
type PowerKind = "triple" | "shield" | "life";

type Bullet = { x: number; y: number; vx: number; vy: number; enemy: boolean };
type Enemy = {
  kind: EnemyKind;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hp: number;
  t: number;
  baseX: number;
  fireIn: number;
};
type Power = { x: number; y: number; kind: PowerKind; t: number };
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
  size: number;
};
type Star = { x: number; y: number; speed: number; size: number };

const COLORS = {
  ship: "#ffffff",
  accent: "#22C55E",
  drifter: "#F04438",
  weaver: "#FDB022",
  gunner: "#9E77ED",
  enemyShot: "#F97066",
  text: "#ffffff",
  dim: "rgba(255,255,255,0.55)",
};

const ENEMY = {
  drifter: { r: 13, hp: 1, points: 100 },
  weaver: { r: 14, hp: 2, points: 150 },
  gunner: { r: 17, hp: 4, points: 300 },
} as const;

const BEST_KEY = "starfall-best";
const BASS = [55, 55, 65.41, 49, 55, 55, 73.42, 65.41]; // A1 A1 C2 G1 … loop

/* ------------------------------ Audio ---------------------------------- */

class Synth {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  muted = false;

  /** Must be called from a user gesture (browsers block autoplaying audio). */
  wake() {
    if (!this.ctx) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.5;
      this.master.connect(this.ctx.destination);
      const len = this.ctx.sampleRate * 0.5;
      this.noise = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const data = this.noise.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.master && this.ctx)
      this.master.gain.setTargetAtTime(this.muted ? 0 : 0.5, this.ctx.currentTime, 0.02);
  }

  private tone(
    type: OscillatorType,
    from: number,
    to: number,
    dur: number,
    vol: number,
    delay = 0,
  ) {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(from, t);
    osc.frequency.exponentialRampToValueAtTime(Math.max(to, 1), t + dur);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(this.master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  laser() {
    this.tone("square", 1100, 260, 0.09, 0.035);
  }

  enemyShot() {
    this.tone("sawtooth", 320, 140, 0.12, 0.03);
  }

  boom(big = false) {
    if (!this.ctx || !this.master || !this.noise) return;
    const t = this.ctx.currentTime;
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(big ? 1600 : 2400, t);
    filter.frequency.exponentialRampToValueAtTime(120, t + (big ? 0.6 : 0.3));
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(big ? 0.5 : 0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + (big ? 0.6 : 0.3));
    src.connect(filter).connect(gain).connect(this.master);
    src.start(t);
    src.stop(t + 0.6);
    if (big) this.tone("sine", 120, 40, 0.5, 0.25);
  }

  hurt() {
    this.tone("sawtooth", 440, 55, 0.35, 0.12);
  }

  power() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      this.tone("triangle", f, f, 0.08, 0.08, i * 0.06),
    );
  }

  start() {
    [392, 523.25, 659.25].forEach((f, i) =>
      this.tone("square", f, f, 0.09, 0.05, i * 0.08),
    );
  }

  over() {
    [392, 329.63, 261.63, 196].forEach((f, i) =>
      this.tone("triangle", f, f * 0.98, 0.22, 0.1, i * 0.18),
    );
  }

  bass(freq: number) {
    this.tone("triangle", freq, freq, 0.22, 0.09);
  }

  close() {
    void this.ctx?.close();
    this.ctx = null;
  }
}

/* ------------------------------ Game ----------------------------------- */

export default function SpaceShooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const font =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-sans")
        .trim() || "monospace";

    const synth = new Synth();
    let best = 0;
    try {
      best = Number(localStorage.getItem(BEST_KEY)) || 0;
    } catch {}

    let W = 0;
    let H = 0;
    const stars: Star[] = [];

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars.length = 0;
      const count = Math.round((W * H) / 5000);
      for (let i = 0; i < count; i++) {
        const layer = Math.random();
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          speed: 20 + layer * layer * 160,
          size: layer > 0.85 ? 1.6 : layer > 0.5 ? 1.1 : 0.7,
        });
      }
      player.y = Math.min(player.y || H - 70, H - 40);
      player.x = Math.min(Math.max(player.x || W / 2, 20), W - 20);
    }

    /* ----- state ----- */
    let phase: Phase = "title";
    const player = {
      x: 0,
      y: 0,
      speed: 380,
      cooldown: 0,
      invuln: 0,
      triple: 0,
      shield: false,
      lives: 3,
    };
    let bullets: Bullet[] = [];
    let enemies: Enemy[] = [];
    let powers: Power[] = [];
    let particles: Particle[] = [];
    let score = 0;
    let combo = 1;
    let comboTimer = 0;
    let level = 1;
    let elapsed = 0;
    let spawnIn = 1;
    let shake = 0;
    let beat = 0;
    let beatIndex = 0;
    let newBest = false;

    const keys = new Set<string>();
    let pointer: { x: number; y: number } | null = null;

    function reset() {
      player.x = W / 2;
      player.y = H - 70;
      player.cooldown = 0;
      player.invuln = 1.5;
      player.triple = 0;
      player.shield = false;
      player.lives = 3;
      bullets = [];
      enemies = [];
      powers = [];
      particles = [];
      score = 0;
      combo = 1;
      comboTimer = 0;
      level = 1;
      elapsed = 0;
      spawnIn = 0.8;
      newBest = false;
    }

    function startGame() {
      synth.wake();
      reset();
      phase = "play";
      synth.start();
    }

    /* ----- helpers ----- */
    function burst(x: number, y: number, color: string, n: number, speed = 160) {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = speed * (0.3 + Math.random());
        const life = 0.35 + Math.random() * 0.45;
        particles.push({
          x,
          y,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          life,
          max: life,
          color,
          size: 1 + Math.random() * 2.2,
        });
      }
    }

    function spawnEnemy() {
      const roll = Math.random();
      const kind: EnemyKind =
        level >= 3 && roll < Math.min(0.12 + level * 0.025, 0.3)
          ? "gunner"
          : level >= 2 && roll < 0.55
            ? "weaver"
            : "drifter";
      const spec = ENEMY[kind];
      const x = 30 + Math.random() * (W - 60);
      const speedUp = 1 + (level - 1) * 0.12;
      enemies.push({
        kind,
        x,
        baseX: x,
        y: -spec.r * 2,
        vx: kind === "drifter" ? (Math.random() - 0.5) * 60 : 0,
        vy: (kind === "gunner" ? 55 : kind === "weaver" ? 95 : 120) * speedUp,
        r: spec.r,
        hp: spec.hp,
        t: Math.random() * Math.PI * 2,
        fireIn: 1 + Math.random() * 1.5,
      });
    }

    function damagePlayer() {
      if (player.invuln > 0) return;
      if (player.shield) {
        player.shield = false;
        player.invuln = 1;
        burst(player.x, player.y, COLORS.accent, 18);
        synth.hurt();
        return;
      }
      player.lives -= 1;
      player.invuln = 2;
      player.triple = 0;
      combo = 1;
      shake = reduceMotion ? 0 : 12;
      burst(player.x, player.y, COLORS.ship, 26, 220);
      synth.boom(true);
      if (player.lives <= 0) {
        phase = "over";
        if (score > best) {
          best = score;
          newBest = true;
          try {
            localStorage.setItem(BEST_KEY, String(best));
          } catch {}
        }
        synth.over();
      } else {
        synth.hurt();
      }
    }

    /* ----- update ----- */
    function update(dt: number) {
      for (const s of stars) {
        s.y += s.speed * dt * (phase === "play" ? 1 : 0.35);
        if (s.y > H) {
          s.y = -2;
          s.x = Math.random() * W;
        }
      }
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life -= dt;
      }
      particles = particles.filter((p) => p.life > 0);
      shake = Math.max(0, shake - dt * 40);

      if (phase !== "play") return;

      elapsed += dt;
      level = 1 + Math.floor(elapsed / 20);

      // Bassline: a beat every 0.42s, quickening slightly with the level.
      beat -= dt;
      if (beat <= 0) {
        synth.bass(BASS[beatIndex % BASS.length]);
        beatIndex++;
        beat = Math.max(0.3, 0.42 - level * 0.01);
      }

      // Movement: keyboard, else follow the pointer/finger.
      let dx = 0;
      let dy = 0;
      if (keys.has("ArrowLeft") || keys.has("a")) dx -= 1;
      if (keys.has("ArrowRight") || keys.has("d")) dx += 1;
      if (keys.has("ArrowUp") || keys.has("w")) dy -= 1;
      if (keys.has("ArrowDown") || keys.has("s")) dy += 1;
      if (dx || dy) {
        const len = Math.hypot(dx, dy);
        player.x += (dx / len) * player.speed * dt;
        player.y += (dy / len) * player.speed * dt;
      } else if (pointer) {
        const follow = 1 - Math.exp(-14 * dt);
        player.x += (pointer.x - player.x) * follow;
        player.y += (pointer.y - 40 - player.y) * follow;
      }
      player.x = Math.min(Math.max(player.x, 16), W - 16);
      player.y = Math.min(Math.max(player.y, H * 0.45), H - 24);
      player.invuln = Math.max(0, player.invuln - dt);
      player.triple = Math.max(0, player.triple - dt);

      // Auto-fire.
      player.cooldown -= dt;
      if (player.cooldown <= 0) {
        player.cooldown = 0.18;
        bullets.push({ x: player.x, y: player.y - 16, vx: 0, vy: -560, enemy: false });
        if (player.triple > 0) {
          bullets.push({ x: player.x - 8, y: player.y - 10, vx: -110, vy: -540, enemy: false });
          bullets.push({ x: player.x + 8, y: player.y - 10, vx: 110, vy: -540, enemy: false });
        }
        synth.laser();
      }

      // Spawning.
      spawnIn -= dt;
      if (spawnIn <= 0) {
        spawnEnemy();
        if (level >= 4 && Math.random() < 0.3) spawnEnemy();
        spawnIn = Math.max(0.28, 1.1 - level * 0.09) * (0.7 + Math.random() * 0.6);
      }

      for (const b of bullets) {
        b.x += b.vx * dt;
        b.y += b.vy * dt;
      }
      bullets = bullets.filter((b) => b.y > -20 && b.y < H + 20 && b.x > -20 && b.x < W + 20);

      for (const e of enemies) {
        e.t += dt;
        e.y += e.vy * dt;
        if (e.kind === "weaver") e.x = e.baseX + Math.sin(e.t * 2.6) * 70;
        else e.x += e.vx * dt;
        if (e.x < e.r || e.x > W - e.r) e.vx *= -1;
        if (e.kind === "gunner" && e.y > 0) {
          e.fireIn -= dt;
          if (e.fireIn <= 0) {
            e.fireIn = Math.max(0.8, 2 - level * 0.1);
            const a = Math.atan2(player.y - e.y, player.x - e.x);
            bullets.push({ x: e.x, y: e.y + e.r, vx: Math.cos(a) * 200, vy: Math.sin(a) * 200, enemy: true });
            synth.enemyShot();
          }
        }
      }

      // Collisions: player shots vs enemies.
      for (const b of bullets) {
        if (b.enemy) continue;
        for (const e of enemies) {
          if (e.hp <= 0) continue;
          if (Math.hypot(b.x - e.x, b.y - e.y) < e.r + 3) {
            e.hp -= 1;
            burst(b.x, b.y, COLORS[e.kind], 3, 80);
            b.y = -999; // spent; filtered out below
            if (e.hp <= 0) {
              const spec = ENEMY[e.kind];
              score += spec.points * combo;
              combo = Math.min(combo + 1, 8);
              comboTimer = 1.6;
              burst(e.x, e.y, COLORS[e.kind], e.kind === "gunner" ? 30 : 16);
              synth.boom(e.kind === "gunner");
              shake = reduceMotion ? 0 : Math.max(shake, e.kind === "gunner" ? 6 : 2);
              const dropChance = e.kind === "gunner" ? 0.5 : 0.07;
              if (Math.random() < dropChance) {
                const r = Math.random();
                powers.push({
                  x: e.x,
                  y: e.y,
                  t: 0,
                  kind: r < 0.12 ? "life" : r < 0.55 ? "triple" : "shield",
                });
              }
            }
            break;
          }
        }
      }
      enemies = enemies.filter((e) => e.hp > 0 && e.y < H + 40);
      bullets = bullets.filter((b) => b.y > -900);

      comboTimer -= dt;
      if (comboTimer <= 0) combo = 1;

      // Enemy contact / enemy shots vs player.
      for (const e of enemies) {
        if (Math.hypot(e.x - player.x, e.y - player.y) < e.r + 12) {
          e.hp = 0;
          burst(e.x, e.y, COLORS[e.kind], 16);
          damagePlayer();
        }
      }
      enemies = enemies.filter((e) => e.hp > 0);
      for (const b of bullets) {
        if (b.enemy && Math.hypot(b.x - player.x, b.y - player.y) < 12) {
          b.y = -999;
          damagePlayer();
        }
      }
      bullets = bullets.filter((b) => b.y > -900);

      // Power-ups.
      for (const p of powers) {
        p.t += dt;
        p.y += 90 * dt;
        if (Math.hypot(p.x - player.x, p.y - player.y) < 22) {
          p.y = H + 100;
          if (p.kind === "triple") player.triple = 9;
          if (p.kind === "shield") player.shield = true;
          if (p.kind === "life") player.lives = Math.min(player.lives + 1, 5);
          burst(player.x, player.y, COLORS.accent, 14, 120);
          synth.power();
        }
      }
      powers = powers.filter((p) => p.y < H + 30);
    }

    /* ----- draw ----- */
    function ship(x: number, y: number, scale = 1, alpha = 1) {
      ctx!.save();
      ctx!.translate(x, y);
      ctx!.scale(scale, scale);
      ctx!.globalAlpha = alpha;
      // Engine flame.
      ctx!.fillStyle = COLORS.accent;
      const flame = 8 + Math.random() * 6;
      ctx!.beginPath();
      ctx!.moveTo(-4, 10);
      ctx!.lineTo(0, 10 + flame);
      ctx!.lineTo(4, 10);
      ctx!.fill();
      // Hull.
      ctx!.fillStyle = COLORS.ship;
      ctx!.beginPath();
      ctx!.moveTo(0, -16);
      ctx!.lineTo(12, 10);
      ctx!.lineTo(4, 6);
      ctx!.lineTo(0, 10);
      ctx!.lineTo(-4, 6);
      ctx!.lineTo(-12, 10);
      ctx!.closePath();
      ctx!.fill();
      ctx!.restore();
    }

    function enemyShape(e: Enemy) {
      ctx!.save();
      ctx!.translate(e.x, e.y);
      ctx!.fillStyle = COLORS[e.kind];
      ctx!.beginPath();
      if (e.kind === "drifter") {
        ctx!.rotate(e.t * 2);
        ctx!.moveTo(0, -e.r);
        ctx!.lineTo(e.r, 0);
        ctx!.lineTo(0, e.r);
        ctx!.lineTo(-e.r, 0);
      } else if (e.kind === "weaver") {
        ctx!.moveTo(0, e.r);
        ctx!.lineTo(e.r, -e.r * 0.7);
        ctx!.lineTo(0, -e.r * 0.2);
        ctx!.lineTo(-e.r, -e.r * 0.7);
      } else {
        for (let i = 0; i < 6; i++) {
          const a = (Math.PI / 3) * i + Math.PI / 6;
          ctx!.lineTo(Math.cos(a) * e.r, Math.sin(a) * e.r);
        }
      }
      ctx!.closePath();
      ctx!.fill();
      if (e.kind === "gunner") {
        ctx!.fillStyle = "#000";
        ctx!.beginPath();
        ctx!.arc(0, 2, e.r * 0.35, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.restore();
    }

    function text(
      str: string,
      x: number,
      y: number,
      size: number,
      color = COLORS.text,
      align: CanvasTextAlign = "center",
    ) {
      ctx!.fillStyle = color;
      ctx!.font = `${size}px ${font}`;
      ctx!.textAlign = align;
      ctx!.textBaseline = "middle";
      ctx!.fillText(str, x, y);
    }

    function draw(now: number) {
      ctx!.save();
      ctx!.fillStyle = "#000";
      ctx!.fillRect(0, 0, W, H);
      if (shake > 0) ctx!.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);

      for (const s of stars) {
        ctx!.fillStyle = `rgba(255,255,255,${0.25 + s.size * 0.35})`;
        ctx!.fillRect(s.x, s.y, s.size, s.size * (phase === "play" ? 2.2 : 1));
      }

      for (const p of powers) {
        const pulse = 1 + Math.sin(p.t * 6) * 0.12;
        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.scale(pulse, pulse);
        ctx!.strokeStyle = COLORS.accent;
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.arc(0, 0, 10, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.restore();
        text(p.kind === "triple" ? "3" : p.kind === "shield" ? "S" : "+", p.x, p.y + 1, 11, COLORS.accent);
      }

      for (const e of enemies) enemyShape(e);

      for (const b of bullets) {
        ctx!.fillStyle = b.enemy ? COLORS.enemyShot : COLORS.accent;
        if (b.enemy) {
          ctx!.beginPath();
          ctx!.arc(b.x, b.y, 3.5, 0, Math.PI * 2);
          ctx!.fill();
        } else {
          ctx!.fillRect(b.x - 1.5, b.y - 7, 3, 12);
        }
      }

      for (const p of particles) {
        ctx!.globalAlpha = Math.max(0, p.life / p.max);
        ctx!.fillStyle = p.color;
        ctx!.fillRect(p.x, p.y, p.size, p.size);
      }
      ctx!.globalAlpha = 1;

      if (phase === "play" || phase === "paused") {
        const blink = player.invuln > 0 && Math.floor(now / 90) % 2 === 0;
        ship(player.x, player.y, 1, blink ? 0.25 : 1);
        if (player.shield) {
          ctx!.strokeStyle = "rgba(34,197,94,0.8)";
          ctx!.lineWidth = 1.5;
          ctx!.beginPath();
          ctx!.arc(player.x, player.y, 22, 0, Math.PI * 2);
          ctx!.stroke();
        }
      }
      ctx!.restore();

      // HUD.
      if (phase !== "title") {
        text(`SCORE ${String(score).padStart(6, "0")}`, 16, 22, 13, COLORS.text, "left");
        text(`BEST ${String(Math.max(best, score)).padStart(6, "0")}`, 16, 42, 11, COLORS.dim, "left");
        text(`LV ${level}`, W / 2, 22, 13);
        if (combo > 1) text(`x${combo}`, W / 2, 42, 11, COLORS.accent);
        for (let i = 0; i < player.lives; i++) ship(W - 20 - i * 22, 24, 0.55);
        if (player.triple > 0) text(`TRIPLE ${Math.ceil(player.triple)}s`, W - 16, 48, 11, COLORS.accent, "right");
      }

      if (phase === "title") {
        text("STARFALL", W / 2, H / 2 - 70, Math.min(56, W / 8));
        text("A tiny space shooter", W / 2, H / 2 - 22, 13, COLORS.dim);
        ship(W / 2, H / 2 + 30, 1.6);
        text("PRESS SPACE OR TAP TO START", W / 2, H / 2 + 100, 13, COLORS.accent);
        text("Move ← → ↑ ↓ / WASD or drag · Auto-fire · P pause · M sound", W / 2, H - 30, 11, COLORS.dim);
      }
      if (phase === "paused") {
        ctx!.fillStyle = "rgba(0,0,0,0.55)";
        ctx!.fillRect(0, 0, W, H);
        text("PAUSED", W / 2, H / 2 - 10, 32);
        text("Press P or tap to resume", W / 2, H / 2 + 26, 12, COLORS.dim);
      }
      if (phase === "over") {
        ctx!.fillStyle = "rgba(0,0,0,0.6)";
        ctx!.fillRect(0, 0, W, H);
        text("GAME OVER", W / 2, H / 2 - 50, Math.min(44, W / 9));
        text(`SCORE ${score}`, W / 2, H / 2, 15);
        text(newBest ? "NEW BEST!" : `BEST ${best}`, W / 2, H / 2 + 26, 12, newBest ? COLORS.accent : COLORS.dim);
        text("PRESS SPACE OR TAP TO PLAY AGAIN", W / 2, H / 2 + 72, 13, COLORS.accent);
      }
      if (synth.muted) text("SOUND OFF", W - 16, H - 18, 10, COLORS.dim, "right");
    }

    /* ----- input ----- */
    function primary() {
      if (phase === "title" || phase === "over") startGame();
      else if (phase === "paused") phase = "play";
    }

    function onKeyDown(e: KeyboardEvent) {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(e.key)) e.preventDefault();
      if (k === " " || k === "Enter") primary();
      else if (k === "p" && (phase === "play" || phase === "paused"))
        phase = phase === "play" ? "paused" : "play";
      else if (k === "m") {
        synth.wake();
        synth.toggleMute();
      } else keys.add(k);
    }
    function onKeyUp(e: KeyboardEvent) {
      keys.delete(e.key.length === 1 ? e.key.toLowerCase() : e.key);
    }
    function toLocal(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onPointerDown(e: PointerEvent) {
      canvas!.setPointerCapture(e.pointerId);
      if (phase !== "play") primary();
      pointer = toLocal(e);
    }
    function onPointerMove(e: PointerEvent) {
      // Mouse steers on hover; touch only while a finger is down.
      if (e.pointerType === "mouse" || pointer) pointer = toLocal(e);
    }
    function onPointerUp(e: PointerEvent) {
      if (e.pointerType !== "mouse") pointer = null;
    }
    function onVisibility() {
      if (document.hidden && phase === "play") phase = "paused";
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    let raf = 0;
    let last = performance.now();
    function frame(now: number) {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      update(dt);
      draw(now);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    canvas.focus();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      document.removeEventListener("visibilitychange", onVisibility);
      synth.close();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      tabIndex={0}
      aria-label="Starfall game. Press Space or tap to start; move with the arrow keys or by dragging."
      className="absolute inset-0 h-full w-full touch-none outline-hidden select-none"
    />
  );
}
