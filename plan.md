# brand (@pyrlyn/brand)

<https://github.com/pyrlyn/brand>

Zero-dependency design-token package: `build.mjs` compiles the shared `base/` token layer plus `brands/{rtok,ketch,cox}` brandbooks into `dist/` CSS/JSON, ships fonts/logos/icons, and provides the `pyrlyn-brand-copy` CLI; integrity pinned by a CI-verified `SHA256SUMS`.

| # | Status | Priority | Complexity | Readiness | Agent |
| --- | --- | --- | --- | --- | --- |
| T1 | todo | P1 | 2 | 0% | |
| T2 | todo | P2 | 1 | 0% | |
| T3 | todo | P2 | 2 | 0% | |
| T4 | todo | P3 | 1 | 0% | |
| T5 | todo | P3 | 2 | 0% | |
| T6 | todo | P3 | 2 | 0% | |
| T7 | todo | P3 | 1 | 0% | |

### T1. Harden the pyrlyn-brand-copy CLI

`bin/pyrlyn-brand-copy.mjs:71-72`: `--favicon pyrlyn/../../../../etc/passwd` traverses out of the logo set and copies any readable file into `<dest>/favicon.<ext>` (relative traversal works; absolute paths are blocked). Same file: `--favicon pyrlyn/` (trailing slash) makes `copyFileSync` throw an uncaught `EISDIR`; and when `dist/` is missing the tool copies 0 files and still exits 0. Done means: `..`/empty segments are rejected (or the resolved source is required to stay under the set directory), the favicon source must be a regular file, and a zero-file copy exits non-zero with a clear message.

### T2. Stop shipping README.md into consumers' public folders

`build.mjs:362` copies all of `logo/pyrlyn/` including `README.md` into `dist/`, and the copy CLI blindly clones the set, so the documented `pyrlyn-brand-copy public pyrlyn` drops a stray `public/pyrlyn/README.md`. Done means: non-asset files are excluded from the logo copies (and the stray file removed from `dist/`).

### T3. Validate the optional `shine` role when a shadow references it

`shine` is an optional role in `base/tokens.json`, but `build.mjs:312` (and the legacy path at `build.mjs:69-70`) reads `theme.shine.$value` without checking presence whenever a brand's shadow colors reference `{theme.*.shine}` (rtok does). A brand that omits it gets an opaque `TypeError` instead of a build error. Done means: the build fails with a named error when a shadow references `shine` and the theme does not define it.

### T4. Add a SHA256SUMS generator script

Only CI verifies `SHA256SUMS` (`sha256sum -c`); nothing regenerates it and the README does not document the command, so every edit relies on a hand-run `find | shasum`. Done means: `scripts/sums.mjs` (deterministic walk excluding `.git` and `SHA256SUMS`) is wired to an npm script and documented in the README.

### T5. Derive the brand list once

`BRANDS` is hardcoded in `build.mjs:22`, `scripts/check-pack.mjs:20`, and per-brand entries in `package.json` (`files` + `exports`); adding a brand needs synchronized edits and nothing fails on divergence. Done means: build.mjs derives the list from `readdirSync("brands")` and check-pack cross-checks it against the `package.json` exports keys.

### T6. Deduplicate token emission and shadow rendering in build.mjs

`build.mjs:87-106` (`staticBlock`, `--rtok-*`) and `build.mjs:223-238` (`baseStatic`, `--pyr-*`) are line-for-line identical loops differing only in prefix and source; the shadow renderers at `build.mjs:65-72` and `build.mjs:311-315` duplicate the shine-reference regex and CSS assembly. Done means: one parameterized emit function `(source, prefix)` and one shadow renderer.

### T7. Handle non-string export targets in the exports check

`build.mjs:389-397` runs regex tests on each `pkg.exports` value; a conditional-exports object coerces to `"[object Object]"` and is falsely reported missing. Done means: non-string targets are skipped or serialized properly. (Related nit: `scripts/check-pack.mjs:40` needs Node ≥ 18.19 for unflagged `import.meta.resolve` while `package.json` declares `>=18`; harmless while CI pins Node 22 — align the engines field or note it.)
