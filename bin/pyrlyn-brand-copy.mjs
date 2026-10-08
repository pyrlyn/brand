#!/usr/bin/env node
// Copy logo files from this package into a static folder (e.g. Astro/Vite `public/`), for files that need a
// stable public URL (favicons, <img src>, og:image). Run it from a consumer's own build script; there is no
// postinstall hook.
//
//   pyrlyn-brand-copy <dest> [set ...] [--favicon <set>/<file>]
//
//   <dest>     target folder; each set lands in <dest>/<set>/ (created if missing)
//   set        logo sets: pyrlyn, listepo (dist/logo/<set>/) and the brands rtok, ketch, cox
//              (dist/brands/<brand>/logo/); default: all
//   --favicon  also copy dist/logo/<set>/<file> to <dest>/favicon.svg (or .png, by the source extension)
//
// Example (package.json): "prebuild": "pyrlyn-brand-copy public pyrlyn --favicon listepo/listepo-favicon.svg"
import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ranAsScript } from "../scripts/cli.mjs";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const dirsIn = (d) => (existsSync(d) ? readdirSync(d).filter((x) => statSync(join(d, x)).isDirectory()) : []);
// set name -> folder with its files
const SETS = Object.fromEntries([
  ...dirsIn(join(dist, "logo")).map((s) => [s, join(dist, "logo", s)]),
  ...dirsIn(join(dist, "brands")).filter((b) => existsSync(join(dist, "brands", b, "logo"))).map((b) => [b, join(dist, "brands", b, "logo")]),
]);

// The usage check used to live in the script body, which exits the process. Tests call this instead.
export function parseCopyArgs(argv) {
  const args = [...argv];
  const fi = args.indexOf("--favicon");
  const favicon = fi >= 0 ? args.splice(fi, 2)[1] : null;
  const [dest, ...wanted] = args;
  if (!dest || (fi >= 0 && !favicon)) return null;
  return { dest, wanted, favicon };
}

// Empty `wanted` means every set that dist/ currently ships.
export function selectSets(wanted, known) {
  return wanted.length ? wanted : known;
}

export function unknownSetMessage(set, known) {
  if (known.includes(set)) return null;
  return `unknown logo set "${set}" (have: ${known.join(", ")})`;
}

// `<set>/<file>` as the CLI splits it. The file part is still joined onto the set directory by the caller.
export function faviconParts(favicon) {
  const [set, ...rest] = favicon.split("/");
  return { set, file: rest.join("/") };
}

if (ranAsScript(import.meta.url)) {
  const parsed = parseCopyArgs(process.argv.slice(2));
  if (!parsed) {
    console.error("usage: pyrlyn-brand-copy <dest> [set ...] [--favicon <set>/<file>]");
    process.exit(2);
  }
  const { dest, wanted, favicon } = parsed;
  const all = Object.keys(SETS);
  const sets = selectSets(wanted, all);
  let n = 0;
  for (const set of sets) {
    const message = unknownSetMessage(set, all);
    if (message) { console.error(message); process.exit(1); }
    const to = resolve(dest, set);
    mkdirSync(to, { recursive: true });
    for (const f of readdirSync(SETS[set])) { copyFileSync(join(SETS[set], f), join(to, f)); n++; }
  }
  if (favicon) {
    const { set: fset, file } = faviconParts(favicon);
    const src = SETS[fset] ? join(SETS[fset], file) : "";
    if (!src || !existsSync(src)) { console.error(`no such logo file: ${favicon}`); process.exit(1); }
    mkdirSync(resolve(dest), { recursive: true });
    copyFileSync(src, resolve(dest, `favicon${extname(src)}`));
    n++;
  }
  console.log(`pyrlyn-brand-copy: ${n} files -> ${dest}`);
}
