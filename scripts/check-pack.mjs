#!/usr/bin/env node
// CI: every documented import path resolves through package.json "exports" (Node's own resolver, via
// a self-reference) to a file that `npm pack` (and so a git install) ships.
//   npm pack --dry-run --json > pack.json && node scripts/check-pack.mjs pack.json
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, relative } from "node:path";
import { ranAsScript } from "./cli.mjs";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
export const IMPORT_PATHS = [
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

// `resolveFile` is Node's package resolver in CI and a stand-in in tests.
export function packGaps(paths, packed, resolveFile) {
  const gaps = [];
  for (const p of paths) {
    let file;
    try { file = resolveFile(p); } catch (e) { gaps.push(`unresolved: ${p} (${e.code ?? e.message})`); continue; }
    if (!packed.has(file)) gaps.push(`not packed: ${p} -> ${file}`);
  }
  return gaps;
}

export function unpackedBinPaths(bin, packed) {
  return Object.values(bin ?? {}).filter((file) => !packed.has(file));
}

if (ranAsScript(import.meta.url)) {
  const packed = new Set(JSON.parse(readFileSync(process.argv[2], "utf8"))[0].files.map((f) => f.path));
  const gaps = packGaps(IMPORT_PATHS, packed, (p) => relative(root, fileURLToPath(import.meta.resolve(`@pyrlyn/brand/${p}`))));
  for (const line of gaps) console.error(line);
  let bad = gaps.length;
  for (const f of ["base/components/components.css"]) if (!packed.has(f)) { console.error(`not packed: ${f}`); bad++; }
  const bin = JSON.parse(readFileSync(`${root}/package.json`, "utf8")).bin ?? {};
  for (const file of unpackedBinPaths(bin, packed)) { console.error(`bin not packed: ${file}`); bad++; }
  if (bad) process.exit(1);
  console.log(`${IMPORT_PATHS.length} import paths resolve to packed files`);
}
