#!/usr/bin/env node
/**
 * Cuts the site's open-licence (OFL) fonts down to what the site uses, and
 * splits each into two files:
 *
 *   core      ASCII + the punctuation most pages use. Preloaded.
 *   extended  Latin-1, Latin Extended-A and any other character the content
 *             uses. Sits behind a unicode-range, so it only downloads on a
 *             page that needs one of its characters.
 *
 * Run it by hand (it is not part of the build) and commit what it writes:
 *
 *   pnpm fonts
 *
 * Rerun it when:
 *   - content gains a character outside ASCII, Latin-1 and Latin Extended-A
 *     (it scans app/, components/ and lib/ for them, comments included);
 *   - text starts using an OpenType feature not kept below (e.g.
 *     `diagonal-fractions`, `small-caps`, `slashed-zero`): add it to the
 *     font's `features` first;
 *   - a font in fonts/source/ is updated.
 * Without a rerun, a new character renders in the fallback font, and a new
 * feature silently does nothing.
 *
 * It never adds a glyph the site didn't serve before (`served`), keeps every
 * weight (see the note on `axes`), drops hinting (Google already served
 * these unhinted) and checks each output: exact character set, unchanged
 * outlines, advances and metrics at every weight, a lossless WOFF2.
 *
 * Writes app/fonts/subset/*.woff2 and app/fonts/subset/index.ts (the
 * next/font declarations, with each file's real unicode-range).
 *
 * Only OFL fonts are subset: the other fonts' licences don't allow modified
 * copies (see FONTS below). Canterbury's licence allows converting it to a
 * web font format, so it is losslessly rewrapped as WOFF2.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const fontkit = require("fontkit");
const wawoff2 = require("wawoff2");

const ROOT = join(fileURLToPath(import.meta.url), "../..");
const SRC = join(ROOT, "fonts/source");
const OUT = join(ROOT, "app/fonts/subset");

/** Features the browser turns on by itself for Latin text. Dropping any of these would change rendering. */
const DEFAULT_FEATURES = ["ccmp", "locl", "mark", "mkmk", "rlig", "rvrn", "calt", "clig", "curs", "dist", "kern", "liga", "rclt"];

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const ASCII = range(0x20, 0x7e);
const LATIN_1 = range(0xa0, 0xff);
const LATIN_EXT_A = range(0x100, 0x17f);
/** Punctuation on most pages: nbsp, curly quotes, dashes, ellipsis, middot, bullet, ©. */
const CORE_PUNCTUATION = [..." ‘’“”–—…·•©"].map((c) => c.codePointAt(0));
/*
 * Core is ASCII + that punctuation only, so two things render differently
 * from Google's split for Latin text the site doesn't use today:
 *   - Google's Latin file also held Latin-1 and three combining marks
 *     (U+0304/0308/0329), so Chrome built Ē ē Ā ā Ī ī Ō ō Ū ū Ÿ from a base
 *     letter plus mark; now they use the font's own precomposed glyphs
 *     (advance differs by ~0.2px at 24px). Adding just the marks to core
 *     instead decomposes ä ë ï ö ü, which is worse.
 *   - A Latin-1 letter next to an ASCII one is now in another file, so no
 *     kerning between them.
 * Moving LATIN_1 into core restores both exactly, for +13.2 KB on the
 * preloaded Spline Sans core (+3.1 KB Anton).
 */

/** What next/font/google served for each Google subset: never add a glyph the site didn't have. */
const GOOGLE = {
  latin: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
  latinExt: "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF",
  vietnamese: "U+0102-0103,U+0110-0111,U+0128-0129,U+0168-0169,U+01A0-01A1,U+01AF-01B0,U+0300-0301,U+0303-0304,U+0308-0309,U+0323,U+0329,U+1EA0-1EF9,U+20AB",
};

const FONTS = [
  {
    // OFL, no Reserved Font Name. Site text, weights 400–700 (font-normal … font-bold).
    name: "SplineSans",
    source: "SplineSans[wght].ttf",
    served: [GOOGLE.latin, GOOGLE.latinExt],
    // Limiting wght to the 400–700 in use saves ~12.5 KB (core 7.4, ext 5.1),
    // but HarfBuzz re-rounds the variation deltas: outlines between 400 and 700
    // move by up to 1/2000 em. Off, so rendering stays identical.
    // axes: { wght: [400, 700] },
    // tabular-nums on the case-study stats.
    features: [...DEFAULT_FEATURES, "tnum"],
  },
  {
    // OFL, no Reserved Font Name. The footer type toy (canvas) and the 404 number.
    name: "Anton",
    source: "Anton-Regular.ttf",
    served: [GOOGLE.latin, GOOGLE.latinExt, GOOGLE.vietnamese],
    features: DEFAULT_FEATURES,
  },
  {
    // OFL, no Reserved Font Name. Defined for `font-script`; not on any page today.
    name: "MeowScript",
    source: "MeowScript-Regular.ttf",
    served: [GOOGLE.latin, GOOGLE.latinExt, GOOGLE.vietnamese],
    features: DEFAULT_FEATURES,
    preload: false,
  },
];

/** Code points in a CSS unicode-range string. */
const parseRange = (s) =>
  new Set(s.split(",").flatMap((part) => {
    const [a, b = a] = part.trim().replace(/^U\+/i, "").split("-").map((h) => parseInt(h, 16));
    return range(a, b);
  }));

// Not subset, by licence:
//   Big Noodle Titling — "You may not ... make derivative works from it" without permission.
//   Telma (ITF / Fontshare) and Calloveya (Khurasan) — licence terms not confirmed; left as shipped.
//   Canterbury (1001Fonts FFC) — "may not be modified", but "may be converted to other formats such as WOFF".
const CONVERT_ONLY = [{ source: "Canterbury.ttf", out: join(ROOT, "app/fonts/Canterbury.woff2") }];

// ---------------------------------------------------------------- harfbuzz

const wasm = readFileSync(require.resolve("harfbuzzjs/dist/harfbuzz-subset.wasm"));
const { instance } = await WebAssembly.instantiate(wasm, {});
const hb = instance.exports;
const heap = () => new Uint8Array(hb.memory.buffer);
const tag = (s) => [...s.padEnd(4, " ")].reduce((t, c) => (t << 8) | c.charCodeAt(0), 0) >>> 0;

const SETS = { NAME_ID: 4, LAYOUT_FEATURE_TAG: 6 };
const FLAG_NO_HINTING = 0x1;

/** Subset `font` to `codepoints`, keeping `features`, limiting axes, dropping hinting. Returns TTF bytes. */
function subset(font, codepoints, { features, axes = {} }) {
  const ptr = hb.malloc(font.length);
  heap().set(font, ptr);
  const blob = hb.hb_blob_create(ptr, font.length, 2 /* writable */, 0, 0);
  const face = hb.hb_face_create(blob, 0);
  hb.hb_blob_destroy(blob);

  const input = hb.hb_subset_input_create_or_fail();
  const unicodes = hb.hb_subset_input_unicode_set(input);
  for (const cp of codepoints) hb.hb_set_add(unicodes, cp);

  const feats = hb.hb_subset_input_set(input, SETS.LAYOUT_FEATURE_TAG);
  hb.hb_set_clear(feats);
  for (const f of features) hb.hb_set_add(feats, tag(f));

  // Keep the copyright, names, version, licence and licence URL.
  const names = hb.hb_subset_input_set(input, SETS.NAME_ID);
  hb.hb_set_clear(names);
  for (const id of [0, 1, 2, 3, 4, 5, 6, 13, 14, 16, 17]) hb.hb_set_add(names, id);

  hb.hb_subset_input_set_flags(input, hb.hb_subset_input_get_flags(input) | FLAG_NO_HINTING);

  for (const [axis, [min, max]] of Object.entries(axes)) {
    if (!hb.hb_subset_input_set_axis_range(input, face, tag(axis), min, max, NaN)) throw new Error(`axis ${axis} not limited`);
  }

  const result = hb.hb_subset_or_fail(face, input);
  hb.hb_subset_input_destroy(input);
  if (!result) throw new Error("subset failed");
  const outBlob = hb.hb_face_reference_blob(result);
  const lenPtr = hb.malloc(4);
  const dataPtr = hb.hb_blob_get_data(outBlob, lenPtr);
  const len = new Uint32Array(hb.memory.buffer, lenPtr, 1)[0];
  const bytes = heap().slice(dataPtr, dataPtr + len);
  hb.free(lenPtr);
  hb.hb_blob_destroy(outBlob);
  hb.hb_face_destroy(result);
  hb.hb_face_destroy(face);
  hb.free(ptr);
  if (!len) throw new Error("empty subset");
  return bytes;
}

// ---------------------------------------------------------------- helpers

/** Every non-ASCII character in the site's source (content, labels, canvas text). */
function contentCharacters() {
  const found = new Set();
  const walk = (dir) => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) walk(p);
      else if (/\.(tsx?|css|json|mdx?)$/.test(f)) for (const ch of readFileSync(p, "utf8")) if (ch.codePointAt(0) > 0x7e) found.add(ch.codePointAt(0));
    }
  };
  ["app", "components", "lib"].forEach((d) => walk(join(ROOT, d)));
  return found;
}

/** unicode-range for exactly the characters in a font's cmap. */
function unicodeRange(codepoints) {
  const cps = [...codepoints].sort((a, b) => a - b);
  const parts = [];
  for (let i = 0; i < cps.length; i++) {
    let j = i;
    while (j + 1 < cps.length && cps[j + 1] === cps[j] + 1) j++;
    const hex = (n) => n.toString(16).toUpperCase();
    parts.push(i === j ? `U+${hex(cps[i])}` : `U+${hex(cps[i])}-${hex(cps[j])}`);
    i = j;
  }
  return parts.join(", ");
}

/**
 * Characters a font really maps. fontkit lists U+FFFF for the end-of-table
 * marker of a format 4 cmap; it maps to .notdef, so it isn't a character.
 */
const mapped = (f) => new Set(f.characterSet.filter((cp) => f.glyphForCodePoint(cp).id !== 0));

const features = (f) => {
  const s = new Set();
  for (const t of ["GSUB", "GPOS"]) f[t]?.featureList?.forEach((r) => s.add(r.tag));
  return [...s].sort();
};

/** The checks font tools have earned: right characters, outlines and metrics untouched. */
function verify(label, out, source, wanted, cfg) {
  const a = fontkit.create(Buffer.from(source));
  const b = fontkit.create(Buffer.from(out));
  const got = mapped(b);
  const missing = [...wanted].filter((cp) => !got.has(cp));
  const extra = [...got].filter((cp) => !wanted.has(cp));
  if (missing.length || extra.length) throw new Error(`${label}: cmap differs (missing ${missing.map((c) => c.toString(16))}, extra ${extra.map((c) => c.toString(16))})`);
  for (const k of ["unitsPerEm"]) if (a[k] !== b[k]) throw new Error(`${label}: ${k} changed`);
  for (const k of ["ascent", "descent", "lineGap"]) if (a.hhea[k] !== b.hhea[k]) throw new Error(`${label}: hhea.${k} changed`);
  for (const k of ["typoAscender", "typoDescender", "typoLineGap", "winAscent", "winDescent"]) if (a["OS/2"][k] !== b["OS/2"][k]) throw new Error(`${label}: OS/2.${k} changed`);
  const name = b.getName("copyright") ?? "";
  if (/reserved font name/i.test(name)) throw new Error(`${label}: has a Reserved Font Name; rename it before shipping a subset`);
  const kept = features(b).filter((t) => !cfg.features.includes(t));
  if (kept.length) throw new Error(`${label}: unexpected features ${kept}`);
  const hinted = ["fpgm", "prep", "cvt ", "hdmx", "VDMX"].filter((t) => b.directory.tables[t]);
  if (hinted.length) throw new Error(`${label}: still hinted (${hinted})`);
  // Same outline and advance for every character, at every weight in use.
  const wght = cfg.axes?.wght ?? (a.variationAxes.wght && [a.variationAxes.wght.min, a.variationAxes.wght.max]);
  const weights = wght ? range(wght[0] / 25, wght[1] / 25).map((w) => w * 25) : [null];
  for (const w of weights) {
    const va = w ? a.getVariation({ wght: w }) : a;
    const vb = w ? b.getVariation({ wght: w }) : b;
    for (const cp of got) {
      const ga = va.getGlyph(a.glyphForCodePoint(cp).id);
      const gb = vb.getGlyph(b.glyphForCodePoint(cp).id);
      if (ga.advanceWidth !== gb.advanceWidth || ga.path.toSVG() !== gb.path.toSVG()) throw new Error(`${label}: U+${cp.toString(16)} differs at wght ${w}`);
    }
  }
  return { glyphs: b.numGlyphs, axes: Object.entries(b.variationAxes).map(([k, v]) => `${k} ${v.min}–${v.max}`).join(", ") || "—", features: features(b).join(" ") };
}

/** sfnt tables by tag. */
function tables(buf) {
  const out = {};
  for (let i = 0; i < buf.readUInt16BE(4); i++) {
    const o = 12 + i * 16;
    out[buf.toString("latin1", o, o + 4)] = buf.subarray(buf.readUInt32BE(o + 8), buf.readUInt32BE(o + 8) + buf.readUInt32BE(o + 12));
  }
  return out;
}

/**
 * A WOFF2 round trip rebuilds glyf/loca (records repadded) and updates head
 * (checksum, plus flag bit 11: "losslessly transformed"). Everything else,
 * and every glyph record including its hinting instructions, must match.
 */
function assertLossless(label, a, b) {
  const A = tables(a), B = tables(b);
  if (Object.keys(A).sort().join() !== Object.keys(B).sort().join()) throw new Error(`${label}: tables changed`);
  for (const t of Object.keys(A)) if (!["glyf", "loca", "head"].includes(t) && !A[t].equals(B[t])) throw new Error(`${label}: ${t} changed`);
  const head = (h) => { const c = Buffer.from(h); c.fill(0, 8, 12); c.writeUInt16BE(c.readUInt16BE(16) & ~0x800, 16); return c; };
  if (!head(A.head).equals(head(B.head))) throw new Error(`${label}: head changed`);
  const glyphs = (T) => {
    const long = T.head.readInt16BE(50) === 1;
    const at = (i) => (long ? T.loca.readUInt32BE(i * 4) : T.loca.readUInt16BE(i * 2) * 2);
    const trim = (g) => { let e = g.length; while (e && !g[e - 1]) e--; return g.subarray(0, e); };
    return Array.from({ length: T.maxp.readUInt16BE(4) }, (_, i) => trim(T.glyf.subarray(at(i), at(i + 1))));
  };
  const ga = glyphs(A), gb = glyphs(B);
  if (ga.some((g, i) => !g.equals(gb[i]))) throw new Error(`${label}: glyph data changed`);
}

// ---------------------------------------------------------------- run

mkdirSync(OUT, { recursive: true });
const content = contentCharacters();
const declarations = [];
const rows = [];

for (const cfg of FONTS) {
  const source = readFileSync(join(SRC, cfg.source));
  const cmap = mapped(fontkit.create(source));
  const served = new Set(cfg.served.flatMap((r) => [...parseRange(r)]));
  const has = (cps) => new Set([...cps].filter((cp) => cmap.has(cp) && served.has(cp)));
  const core = has([...ASCII, ...CORE_PUNCTUATION]);
  const extended = has([...LATIN_1, ...LATIN_EXT_A, ...content].filter((cp) => !core.has(cp)));

  for (const [part, cps] of [["core", core], ["ext", extended]]) {
    const ttf = subset(source, cps, cfg);
    const info = verify(`${cfg.name}-${part}`, ttf, source, cps, cfg);
    const woff2 = Buffer.from(await wawoff2.compress(ttf));
    // Round-trip: the WOFF2 must decode to the same font.
    const back = Buffer.from(await wawoff2.decompress(woff2));
    verify(`${cfg.name}-${part} (woff2)`, back, source, cps, cfg);
    const file = `${cfg.name}-${part}.woff2`;
    writeFileSync(join(OUT, file), woff2);
    rows.push({ file, bytes: woff2.length, chars: cps.size, ...info });
    // The face covers the weights the file can draw: the (limited) wght axis, or 400.
    const w = fontkit.create(Buffer.from(ttf)).variationAxes.wght;
    declarations.push({ cfg, part, file, range: unicodeRange(cps), weight: w ? `${w.min} ${w.max}` : "400" });
  }
}

for (const { source, out } of CONVERT_ONLY) {
  const ttf = readFileSync(join(SRC, source));
  const woff2 = Buffer.from(await wawoff2.compress(ttf));
  assertLossless(source, ttf, Buffer.from(await wawoff2.decompress(woff2)));
  writeFileSync(out, woff2);
  rows.push({ file: relative(ROOT, out), bytes: woff2.length, chars: "all", glyphs: fontkit.create(ttf).numGlyphs, axes: "—", features: "(unchanged)" });
}

// next/font needs literal options, so the declarations are generated too.
const camel = (s) => s[0].toLowerCase() + s.slice(1);
const ts = `// GENERATED by scripts/subset-fonts.mjs — do not edit; rerun \`pnpm fonts\`.
// Each font is a preloaded core file plus an extended file that only
// downloads for the characters in its unicode-range. The fallback faces and
// the family stacks that join them live in app/globals.css.
import localFont from "next/font/local";
${declarations
  .map(({ cfg, part, file, range: r, weight }) => `
export const ${camel(cfg.name)}${part === "core" ? "Core" : "Ext"} = localFont({
  src: "./${file}",
  weight: "${weight}",
  style: "normal",
  display: "swap",
  preload: ${part === "core" && cfg.preload !== false ? "true" : "false"},
  adjustFontFallback: false,
  variable: "--font-${camel(cfg.name)}-${part}",
  declarations: [{ prop: "unicode-range", value: "${r}" }],
});`)
  .join("\n")}
`;
writeFileSync(join(OUT, "index.ts"), ts);

console.table(rows);
