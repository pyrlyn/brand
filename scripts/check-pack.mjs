#!/usr/bin/env node
// CI: every documented import path resolves through package.json "exports" (Node's own resolver, via
// a self-reference) to a file that `npm pack` (and so a git install) ships.
//   npm pack --dry-run --json > pack.json && node scripts/check-pack.mjs pack.json
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, relative } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const packed = new Set(JSON.parse(readFileSync(process.argv[2], "utf8"))[0].files.map((f) => f.path));
const paths = [
  // base layer: what the product brand packs (rtok, ketch, cox brand/) import
  "base/tokens.css", "base/fonts.css", "base/components.css", "base/tokens.json", "base/tokens.resolved.json",
  "base/fonts/IBMPlexMono-Regular.woff2", "base/icons/ui/calls.svg", "package.json",
  // used by the landing
  "landing/tokens.css", "landing/components.css",
  "logo/pyrlyn/pyrlyn-lockup-on-dark.svg", "logo/pyrlyn/pyrlyn-mark-on-dark.svg", "logo/listepo/listepo-favicon.svg",
  // legacy base aliases (v0.2.0 paths)
  "fonts.css", "fonts/IBMPlexMono-Regular.woff2", "icons/ui/calls.svg",
  "brands/mailune/tokens.css", "brands/mailune/tokens.json", "brands/mailune/tokens.resolved.json",
  "brands/mailune/logo/mailune-favicon.svg",
];
let bad = 0;
for (const p of paths) {
  let file;
  try { file = relative(root, fileURLToPath(import.meta.resolve(`@pyrlyn/brand/${p}`))); } catch (e) { console.error(`unresolved: ${p} (${e.code ?? e.message})`); bad++; continue; }
  if (!packed.has(file)) { console.error(`not packed: ${p} -> ${file}`); bad++; }
}
// rtok's brand/build.mjs reads the components source from the package for its flat --rtok-* build.
for (const f of ["base/components/components.css"]) if (!packed.has(f)) { console.error(`not packed: ${f}`); bad++; }
for (const b of Object.values(JSON.parse(readFileSync(`${root}/package.json`, "utf8")).bin ?? {})) if (!packed.has(b)) { console.error(`bin not packed: ${b}`); bad++; }
if (bad) process.exit(1);
console.log(`${paths.length} import paths resolve to packed files`);
