#!/usr/bin/env node
// Copy logo files from this package into a static folder (e.g. Astro/Vite `public/`), for files that need a
// stable public URL (favicons, <img src>, og:image). Run it from a consumer's own build script; there is no
// postinstall hook.
//
//   pyrlyn-brand-copy <dest> [set ...] [--favicon <set>/<file>]
//
//   <dest>     target folder; each set lands in <dest>/<set>/ (created if missing)
//   set        logo sets: pyrlyn, listepo (dist/logo/<set>/); default: all. Product logos (rtok, ketch,
//              cox) live in each product repo's brand/logo/
//   --favicon  also copy dist/logo/<set>/<file> to <dest>/favicon.svg (or .png, by the source extension)
//
// Example (package.json): "prebuild": "pyrlyn-brand-copy public pyrlyn --favicon listepo/listepo-favicon.svg"
import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const dirsIn = (d) => (existsSync(d) ? readdirSync(d).filter((x) => statSync(join(d, x)).isDirectory()) : []);
// set name -> folder with its files
const SETS = Object.fromEntries([
  ...dirsIn(join(dist, "logo")).map((s) => [s, join(dist, "logo", s)]),
]);
const args = process.argv.slice(2);
const fi = args.indexOf("--favicon");
const favicon = fi >= 0 ? args.splice(fi, 2)[1] : null;
const [dest, ...wanted] = args;
if (!dest || (fi >= 0 && !favicon)) {
  console.error("usage: pyrlyn-brand-copy <dest> [set ...] [--favicon <set>/<file>]");
  process.exit(2);
}
const all = Object.keys(SETS);
const sets = wanted.length ? wanted : all;
let n = 0;
for (const set of sets) {
  if (!all.includes(set)) { console.error(`unknown logo set "${set}" (have: ${all.join(", ")})`); process.exit(1); }
  const to = resolve(dest, set);
  mkdirSync(to, { recursive: true });
  for (const f of readdirSync(SETS[set])) { copyFileSync(join(SETS[set], f), join(to, f)); n++; }
}
if (favicon) {
  const [fset, ...rest] = favicon.split("/");
  const src = SETS[fset] ? join(SETS[fset], ...rest) : "";
  if (!src || !existsSync(src)) { console.error(`no such logo file: ${favicon}`); process.exit(1); }
  mkdirSync(resolve(dest), { recursive: true });
  copyFileSync(src, resolve(dest, `favicon${extname(src)}`));
  n++;
}
console.log(`pyrlyn-brand-copy: ${n} files -> ${dest}`);
