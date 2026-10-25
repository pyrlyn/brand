// Generates the colour-scheme favicon, its PNG fallbacks, the blinking mark (SVG/GIF/APNG) and static mark PNGs.
// Run from logo/pyrlyn: node _build/gen-mark-assets.mjs  (needs `sharp` resolvable and `ffmpeg` on PATH).
import { createRequire } from "node:module";
const sharp = createRequire(process.env.SHARP_FROM ?? import.meta.url)("sharp"); // SHARP_FROM=/path/to/node_modules/x.js if not installed here
import { writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const INK = "#0C0E11", PAPER = "#F4F2ED";
// Cursor = landing accent (themes/landing/tokens.css): --accent (dark) / --accent-light (light).
const ACC_DARK = "#4C8DFF", ACC_LIGHT = "#2F6BDB";
// Regular geometry (README "Geometry") and a heavier one for 16-64 px: chevron 7 units, cursor 10x5, mark fills more of the box.
const REG = { chev: "M4 6H10L20 16L10 26H4L14 16Z", cur: "M18 22h10v4h-10z" };
const BOLD = { chev: "M3 5H10L21 16L10 27H3L14 16Z", cur: "M19 22h10v5h-10z" };

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><style>.v{fill:${INK}}.c{fill:${ACC_LIGHT}}@media (prefers-color-scheme:dark){.v{fill:${PAPER}}.c{fill:${ACC_DARK}}}</style><path class="v" d="${BOLD.chev}"/><path class="c" d="${BOLD.cur}"/></svg>\n`;
const flat = (g, fg, acc, bg, size = 32) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${size}" height="${size}">${bg ? `<rect width="32" height="32" fill="${bg}"/>` : ""}<path fill="${fg}" d="${g.chev}"/>${acc ? `<path fill="${acc}" d="${g.cur}"/>` : ""}</svg>`;
const blink = (fg, acc) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><style>.c{animation:b 1.06s steps(1,end) infinite}@keyframes b{0%,50%{opacity:1}50.01%,100%{opacity:0}}@media (prefers-reduced-motion:reduce){.c{animation:none}}</style><path fill="${fg}" d="${REG.chev}"/><path class="c" fill="${acc}" d="${REG.cur}"/></svg>\n`;
const png = (svg, size, out) => sharp(Buffer.from(svg), { density: 72 * size / 32 * 4 }).resize(size, size).png({ compressionLevel: 9 }).toFile(out);

writeFileSync("pyrlyn-favicon.svg", favicon);
// PNG fallbacks can't follow the colour scheme: light-UI version (ink chevron, light accent), transparent.
for (const s of [16, 32, 64]) await png(flat(BOLD, INK, ACC_LIGHT, null), s, `pyrlyn-favicon-${s}.png`);
await png(flat(REG, PAPER, ACC_DARK, INK), 180, "pyrlyn-apple-touch-icon.png"); // iOS needs opaque

const themes = { "on-dark": [PAPER, ACC_DARK, INK], "on-light": [INK, ACC_LIGHT, PAPER] };
for (const [name, [fg, acc, bg]] of Object.entries(themes)) {
  writeFileSync(`pyrlyn-mark-blink-${name}.svg`, blink(fg, acc));
  for (const s of [32, 64, 128, 256, 512]) await png(flat(s <= 64 ? BOLD : REG, fg, acc, bg), s, `pyrlyn-mark-${name}-${s}.png`);
  const t = mkdtempSync(join(tmpdir(), "pm-"));
  await png(flat(REG, fg, acc, bg), 512, join(t, "f0.png"));
  await png(flat(REG, fg, null, bg), 512, join(t, "f1.png"));
  writeFileSync(join(t, "list.txt"), "file 'f0.png'\nduration 0.53\nfile 'f1.png'\nduration 0.53\nfile 'f1.png'\n");
  const ff = (...a) => execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-i", join(t, "list.txt"), ...a]);
  ff("-vf", "split[a][b];[a]palettegen=max_colors=8[p];[b][p]paletteuse", "-loop", "0", `pyrlyn-mark-blink-${name}.gif`);
  ff("-plays", "0", "-f", "apng", `pyrlyn-mark-blink-${name}.png`);
  rmSync(t, { recursive: true });
}
