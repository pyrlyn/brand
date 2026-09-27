# rtok brand

The rtok brand system (Bitset B · Hex Diff) as a portable package you can drop into any website
or app: design tokens, CSS variables with light/dark themes, Tailwind v3 and v4 presets, Slint
globals, plain-CSS components, IBM Plex Mono, the bitset logo, icons, guidelines and reference
screenshots.

`tokens/tokens.json` is the single source of truth. Everything in `dist/` is generated from it by
`node build.mjs` (Node ≥ 18, no dependencies).

## Contents

| Path | What |
|---|---|
| `tokens/tokens.json` | All tokens in W3C Design Tokens (DTCG) format, with the source file for every group |
| `dist/tokens.css` | CSS custom properties `--rtok-*`: dark (default) + light, `[data-theme]`, `.dark`/`.light`, `prefers-color-scheme`, `prefers-reduced-motion` |
| `dist/fonts.css` | `@font-face` for IBM Plex Mono 400/600/700 (woff2 + ttf fallback) |
| `dist/components.css` | Plain-CSS components `.rtok-btn`, `.rtok-chip`, `.rtok-field`, `.rtok-card`, `.rtok-glass`, `.rtok-table`, `.rtok-nav-item`, `.rtok-pill`, `.rtok-switch`, … |
| `dist/tailwind.preset.js` | Tailwind CSS v3 preset |
| `dist/tailwind-v4.css` | Tailwind CSS v4 `@theme` (imports `tokens.css`) |
| `dist/tokens.slint` | Slint `global Tokens` with a `dark` switch |
| `dist/tokens.resolved.json` | Flat resolved values (dark, light, scales) for scripts and other tools |
| `components/*.md` | Component specs: anatomy, tokens, default/hover/focus/disabled/error states |
| `DESIGN.md` | Guidelines: color, type, shape, motion, interaction, logo and icon rules |
| `fonts/` | IBM Plex Mono woff2 + ttf, `OFL.txt` (SIL Open Font License 1.1) |
| `logo/` | `rtok-mark.svg`, `rtok-favicon.svg`, `rtok-wordmark.svg`, PNG exports in `logo/png/` |
| `icons/ui/` | 9 UI icons (24×24, stroke 1.75, `currentColor`) used by the Slint UI and web admin |
| `icons/feature/` | 6 "Signal / scope" feature icons (SVG + `@2x` PNG) used on the docs site |
| `examples/index.html` | Demo page that loads only `dist/` and `fonts/` |
| `screenshots/admin-responsive/` | Web admin responsive screenshots (100 PNGs, 360–1920px, dark + light) |
| `sources/` | Verbatim snapshots of the files the tokens were taken from (see [Sources](#sources)) |
| `SHA256SUMS` | Checksums of every file (`shasum -a 256 -c SHA256SUMS`) |

## Token values

Brand constants: cyan `#5CE1FF` · coral `#FF6B4A` · navy `#06101A` · ink `#0B1A24` ·
green `#3DDC97` · amber `#F5C451`. Font: IBM Plex Mono.

| Semantic (`--rtok-*`) | Dark (default) | Light |
|---|---|---|
| `bg` | `#06101A` | `#F4F8FB` |
| `surface` | `#0A1622` | `#FFFFFF` |
| `surface-2` | `#0F1E2E` | `#E8EEF4` |
| `surface-3` | `#15283C` | `#DCE5EE` |
| `border` | `#1A3348` | `#C5D3E0` |
| `border-strong` | `#2A4A66` | `#9BB0C4` |
| `fg` | `#E8F7FF` | `#0B1A24` |
| `fg-muted` | `#8AA8BC` | `#4F6679` |
| `fg-subtle` | `#7F9AAE` | `#5A7388` |
| `accent` (fill) | `#5CE1FF` | `#5CE1FF` |
| `accent-fg` (text) | `#5CE1FF` | `#006F8C` |
| `accent-muted` | `#5CE1FF33` | `#5CE1FF29` |
| `on-accent` | `#06101A` | `#06101A` |
| `delta` / `danger` (fill) | `#FF6B4A` | `#FF6B4A` |
| `delta-fg` / `danger-fg` | `#FF6B4A` | `#B8361C` |
| `success` / `success-fg` | `#3DDC97` / `#3DDC97` | `#3DDC97` / `#0B7A50` |
| `warn` / `warn-fg` | `#F5C451` / `#F5C451` | `#F5C451` / `#8A5A00` |
| `focus` | `#5CE1FF` | `#006F8C` |
| `mark-tile` | `#06101A` | `#0B1A24` |

Every `*-fg` and `fg*` token is ≥ 4.5:1 on `bg`, `surface` and `surface-2` in its theme.

| Scale | Values |
|---|---|
| Space `--rtok-space-{0..8}` | 0 · 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 px |
| Radius `--rtok-radius-*` | sm 4 · md 6 · lg 10 · xl 14 · full 9999 px |
| Text `--rtok-text-*` / `--rtok-leading-*` | 2xs 11/16 · xs 12/16 · sm 13/20 · base 14/24 · lg 16/24 · xl 20/28 · 2xl 24/32 · 3xl 28/32 (px) |
| Weight | 400 · 600 · 700 |
| Size | control 32 · control-sm 28 · row 36 · touch 44 · sidebar 200 · sidebar-rail 56 px |
| Breakpoints (min-width) | xs 360 · sm 640 · md 768 · lg 1024 · xl 1440 · 2xl 1920 px |
| Elevation | `--rtok-shadow-e1/e2/e3` (inner `shine` line + drop shadows), `--rtok-ring` focus |
| Motion | fast 120ms · base 150ms · slow 180ms; standard `cubic-bezier(0.4,0,0.2,1)`, emphasized `cubic-bezier(0.22,1,0.36,1)`; all durations → 0.01ms under reduced motion |

## Import

The paths below assume the repo is available as `brand/` (git submodule or copy) or installed as
the npm package `@listepo/brand`. The package is `private` and not published; install it from git.

### Get the files

```sh
# git submodule (pin a commit, update with `git submodule update --remote`)
git submodule add <brand-repo-url> brand

# npm / pnpm / yarn from git (package name @listepo/brand)
npm install git+ssh://git@github.com/<owner>/brand.git
# or, locally:  npm install ../brand
```

### Plain HTML

```html
<link rel="preload" href="/brand/fonts/IBMPlexMono-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/brand/dist/fonts.css">
<link rel="stylesheet" href="/brand/dist/tokens.css">
<link rel="stylesheet" href="/brand/dist/components.css"> <!-- optional -->

<html data-theme="dark">  <!-- or "light"; omit to follow prefers-color-scheme -->
<body class="rtok-root">
  <button class="rtok-btn rtok-btn--primary">Install</button>
  <p style="color: var(--rtok-fg-muted)">…</p>
</body>
```

`dist/fonts.css` resolves fonts at `../fonts/`, so serve `dist/` and `fonts/` side by side (as in
this repo). Use the variables anywhere: `color: var(--rtok-accent-fg)`,
`background: rgb(var(--rtok-accent-rgb) / 0.15)`, `box-shadow: var(--rtok-shadow-e2)`.

### Tailwind CSS v3

```js
// tailwind.config.js
module.exports = {
  presets: [require("@listepo/brand/tailwind-preset")], // or require("./brand/dist/tailwind.preset.js")
  content: ["./src/**/*.{html,js,astro,vue,svelte,tsx}"],
};
```

```css
/* your entry CSS */
@import "@listepo/brand/fonts.css";
@import "@listepo/brand/tokens.css";
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Utilities: `bg-bg bg-surface bg-surface-2 text-fg text-fg-muted border-border bg-accent
text-accent-on text-accent-fg bg-accent/15 text-delta-fg rounded-md shadow-e2
focus-visible:shadow-ring font-mono text-sm duration-fast ease-emphasized w-sidebar`, screens
`xs: … 2xl:`. `dark:` matches `[data-theme="dark"]` or `.dark`; the colors already switch by
themselves, so you rarely need it.

### Tailwind CSS v4

```css
@import "tailwindcss";
@import "@listepo/brand/fonts.css";
@import "@listepo/brand/tailwind-v4.css"; /* also imports tokens.css */
```

Same utility names as v3 (`text-accent-on` is `--color-accent-on`), opacity modifiers work
(`bg-accent/15`), plus `w-sidebar`, `h-touch`, `shadow-ring`, `duration-fast|base|slow`.

### Astro

```astro
---
// src/layouts/Base.astro
import "@listepo/brand/fonts.css";
import "@listepo/brand/tokens.css";
import "@listepo/brand/components.css"; // optional
import fontUrl from "@listepo/brand/fonts/IBMPlexMono-Regular.woff2?url";
---
<html lang="en" data-theme="dark">
  <head><link rel="preload" href={fontUrl} as="font" type="font/woff2" crossorigin /></head>
  <body class="rtok-root"><slot /></body>
</html>
```

With Tailwind in Astro, use the v3 or v4 setup above in the Tailwind config / global CSS.

### Hugo

Mount the repo (submodule at `brand/`) in `hugo.toml`, then load the CSS through Hugo Pipes:

```toml
[[module.mounts]]
source = "brand/dist"
target = "assets/brand"
[[module.mounts]]
source = "brand/fonts"
target = "static/brand/fonts"
```

```go-html-template
{{ $css := slice (resources.Get "brand/tokens.css") (resources.Get "brand/components.css") | resources.Concat "css/brand.css" | minify | fingerprint }}
<link rel="stylesheet" href="{{ $css.RelPermalink }}">
<link rel="preload" href="{{ "brand/fonts/IBMPlexMono-Regular.woff2" | relURL }}" as="font" type="font/woff2" crossorigin>
```

`dist/fonts.css` expects fonts at `../fonts/`; with the mounts above, write your own
`@font-face` pointing at `/brand/fonts/…` or mount `brand/dist` to `static/brand/dist` and link
`/brand/dist/fonts.css` directly.

### Slint

```slint
// copy dist/tokens.slint next to your .slint files (or add brand/dist to the include paths)
import { Tokens } from "tokens.slint";

export component Example inherits Window {
    background: Tokens.bg;
    Rectangle {
        border-radius: Tokens.radius-lg;
        background: Tokens.surface;
        border-width: 1px;
        border-color: Tokens.border;
        animate background { duration: Tokens.duration-base; }
    }
    Text { text: "Δtok"; color: Tokens.delta-fg; font-family: Tokens.font-family; font-size: Tokens.text-sm; }
}
// Tokens.dark = false;  switches to light.
```

Embed the TTFs from `fonts/` with `import "fonts/IBMPlexMono-Regular.ttf";` (Slint needs ttf/otf).
Slint has no reduced-motion query; pass the OS setting in and use 0ms durations.

### Rebuild

```sh
node build.mjs          # regenerate dist/ after editing tokens/tokens.json
node build.mjs --check  # CI: fails if dist/ is stale
```

## Logo usage

- Mark: `logo/rtok-mark.svg` (32×32, navy tile, bitset dots). Favicon: `logo/rtok-favicon.svg`
  (`<link rel="icon" href="rtok-favicon.svg" type="image/svg+xml">`), PNG fallbacks in `logo/png/`.
- Lockup: `logo/rtok-wordmark.svg` (`RTOK` + `Δtok` + `bitset`, on its own navy background; text
  is set in IBM Plex Mono, so outline it before using it where the font may be missing).
- The mark always keeps its dark tile, in light and dark UIs. Don't recolor, rotate, crop, or
  rearrange the dots; coral cells are the measured cuts. Minimum size 16px.
- Full rules: [DESIGN.md](DESIGN.md#logo).

## Conflicts

rtok surfaces compared (read-only): Slint UI `crates/rtok-webui/ui/` (the `rtok dashboard` UI, on main), web
admin `web/` on branch `design/web-admin` (draft PR #447, not live), rtok docs site `site/`
(deployed to listepo.github.io/rtok), the rtok page on the listepo project site (listepo/landing
`main`, deployed), the TUI `src/tui/theme.rs`, and the v3-B brand pack. Rule: prefer what is live
in production; where a live value is not actually rendered, or fails WCAG AA, take the AA-passing
value and say so. Paths are relative to each repo; `landing:` = listepo/landing at `b4a06f1`,
`web/` = rtok `design/web-admin` at `1e144253`, others = rtok `origin/main` at `559a7a11`.

| Token | Values per surface (file:line) | Canonical | Reason |
|---|---|---|---|
| `accent-fg` (cyan as text on light) | web `web/src/input.css:18` `#006F8C` · landing `src/lib/site.ts:56` + rtok `docs/site.md:15` accentLight `#0B7FA0` · landing `src/styles/tokens.css:488` `#00708C` · Slint `kit.slint:49,183,189` uses `accent` `#5CE1FF` for selected text/icons in light | `#006F8C` | The landing's `--accent-light` is set (`global.css:18`, `Base.astro:21`) but no rule reads it and the site is dark-only, so `#0B7FA0` is not rendered; it is also 4.32:1 on light `bg` (fails AA). `tokens.css` is not imported anywhere (dead). Slint's cyan-on-light is 1.44:1. `#006F8C` is 5.38:1. |
| `fg-muted` light | Slint `theme.slint:16` `#5A7388` · web `input.css:17` `#4F6679` · v3 `TOKENS.md` `#5A7388` | `#4F6679` | `#5A7388` is 4.24:1 on `surface-2` (fails AA); `#4F6679` ≥ 5.1:1 everywhere. |
| `fg-subtle` dark | Slint `theme.slint:17` `#5A7388` · web `input.css:29` `#7F9AAE` · v3 `DESIGN.md` `#5A7388` | `#7F9AAE` | `#5A7388` is 3.87:1 on dark `bg`. |
| `fg-subtle` light | Slint `theme.slint:17` `#7A92A6` · web `input.css:17` `#5A7388` | `#5A7388` | `#7A92A6` is 3.03:1 on light `bg`. |
| `success` light | Slint `theme.slint:8` `#0F8F5F` (one color for fill and text) · web `input.css:20` fill `#3DDC97` + text `#0B7A50` | fill `#3DDC97`, `success-fg` `#0B7A50` | `#0F8F5F` as text is 3.85:1 on light `bg`; split fill/text like accent and delta. |
| `delta-fg` / `danger-fg` light | Slint `theme.slint:7` `#FF6B4A` in both themes · web `input.css:19` `#B8361C` · landing `tokens.css:488` `#B93A1D` (dead) · v3 `TOKENS.md` `#E85A3C` for mark cuts on light | fill `#FF6B4A`, text `#B8361C` | Coral text on light is 2.64:1. The mark keeps `#FF6B4A` on its navy tile. |
| `accent-muted` (selected bg) | Slint `theme.slint:18` `#5CE1FF33` / `#5CE1FF29` · web `input.css:69,82` `accent/15` (nav, chip), `input.css:94` `accent/10` (row) | `#5CE1FF33` / `#5CE1FF29` for nav and rows; chips keep `accent/15` + `accent/50` border | Slint is on main; the web admin is a draft. |
| `on-accent` | Slint `theme.slint:19`, web `input.css:18`, v3: `#06101A` · landing `global.css:26` `#050810` (site shell default, the rtok theme does not override it) · landing `tokens.css:484` `#041018` (dead) | `#06101A` | Brand navy; the landing difference is invisible (both ≈ black) and comes from the listepo shell. |
| `focus` ring | web `tailwind.config.js:49` 2px `canvas` + 2px cyan (both themes) · landing `global.css:58` 3px + 5px accent · Slint: none · site: Hextra default | 2px `bg` + 2px `focus`; `focus` = cyan dark / `#006F8C` light | Cyan ring on light is 1.44:1 (WCAG 1.4.11 needs 3:1). |
| Title size | Slint `theme.slint:32` 22px · web `tailwind.config.js:38` xl 20px · v3 `DESIGN.md` title 20px | 20px (`text-xl`) | Two of three agree; 22px sits between `xl` and `2xl`. |
| Heading size | Slint `kit.slint:27` 16px/600 · v3 `DESIGN.md` heading 14px/600 | 16px (`text-lg`) | Slint value on main. |
| Caption weight | Slint `kit.slint:35` 11px/400 · web `tailwind.config.js:33` 11px · v3 `DESIGN.md` caption 11px/500 | 11px/400 | No 500 weight ships in any surface's font files. |
| Radius | Slint `theme.slint:22-24` 4/6/10 · web `tailwind.config.js:43` 4/6/10/14 · site `custom.css:25` 12px hero, `:41` 8px icon tile, `:117` 8px, `:131` 10px · landing `global.css:73` 6/10/14/20/28 (listepo shell) | 4/6/10/14/full | Slint + web agree; site values are one-off marketing frames (map 12→`xl`/`lg`, 8→`md`/`lg` on adoption); landing radii belong to the listepo shell, not rtok. |
| Breakpoint names | Slint `theme.slint:36-39` and site `custom.css:11-14`: `bp-sm` 640, `bp-md` 1024, `bp-lg` 1440, `bp-xl` 1920 · web `tailwind.config.js:54`: xs 360, sm 640, md 768, lg 1024, xl 1440, 2xl 1920 | Tailwind names and values | Same pixel steps; Tailwind adds 360/768. Mapping: `bp-sm`=`sm`, `bp-md`=`lg`, `bp-lg`=`xl`, `bp-xl`=`2xl`. |
| Durations | Slint `kit.slint:168,207` 150ms · web `tailwind.config.js:56` fast 120 / base 180 · landing `global.css:76` easing only | fast 120 · base 150 · slow 180 | Keep Slint's 150ms (on main) as `base`; the web admin's 180ms becomes `slow`. |
| Easing | web: Tailwind default `cubic-bezier(0.4,0,0.2,1)` · landing `global.css:76` `cubic-bezier(.22,1,.36,1)` (live on the rtok page) · Slint: linear default | both, as `standard` and `emphasized` | Different jobs: UI state vs entrances. |
| Elevation | web `tailwind.config.js:46-48` e1–e3 · site `custom.css:27` `0 24px 48px rgba(0,0,0,.45)` hero, `:118` mobile · landing `global.css` `--shadow-1..3` (listepo shell) | web e1–e3 | Only rtok-specific scale; the hero shadow is close to `e3`. |
| Font | Slint `ui/fonts/*.ttf`, web `web/assets/fonts/*.woff2`, wordmark SVG: IBM Plex Mono · docs site: Hextra default fonts (no override in `custom.css`) · landing `global.css:61-62` Inter + system mono (rtok page included) | IBM Plex Mono | The brand pack and every product UI use it; the two sites never loaded it. |
| Hextra primary | site `custom.css:3-5` `hsl(190 100% 68%)` ≈ `#5CE4FF` | `#5CE1FF` = `hsl(191 100% 68%)` | 1° hue drift; set `--primary-hue: 191deg` when adopting. |
| Mark on light | site `static/logo.svg`, Slint `ui/assets/logo.svg`, web `assets/logo.svg`: identical, navy `#06101A` tile · v3 `webui-mock/themes/logo-light.svg`: ink `#0B1A24` tile, coral `#E85A3C`, dim 0.4 (not used anywhere) · Slint `theme.slint:20` `mark-tile` light `#0B1A24` | one mark, `logo/rtok-mark.svg`, both themes; `mark-tile` token keeps `#0B1A24` light | The SVG on main is identical on every surface; the light variant stayed a mock. |
| Wordmark | site `static/logo-wordmark.svg` = `logo-wordmark-dark.svg` (byte-identical) · PNG `logo-wordmark-2x.png` = `logo-wordmark-dark-2x.png` | one `logo/rtok-wordmark.svg` | Duplicates, not variants. |
| Border naming | Slint `hairline`/`hairline-strong` · web `line`/`line-strong` · site `#1A3348` literals | `border`/`border-strong` | Values agree; names unified. |
| Surface ladder | Slint `surface-1`, `surface-2` · web adds `surface-3`, `warn`, `shine`, glass alpha | web ladder | No conflict; Slint lacks these. |
| TUI palette | `src/tui/theme.rs:10-18` ANSI Cyan / DarkGray / Green / Yellow / Red | unchanged | Terminal palette colors, not hex; they map to accent / fg-subtle / success / warn / danger. |

No other divergent values: the dark palette (`#06101A`, `#0A1622`, `#0F1E2E`, `#1A3348`,
`#2A4A66`, `#E8F7FF`, `#8AA8BC`), cyan, coral, spacing 4–24px and the 9 UI icons are identical
across Slint, web admin, docs site and the v3 pack.

## Adopting in each surface

Nothing was rewired in this change. The rtok repo still carries its own runtime copies; these are
the steps to switch each surface to this repo.

**Slint UI** (`rtok/crates/rtok-webui/ui/`)
1. Copy `dist/tokens.slint` to `crates/rtok-webui/ui/tokens.slint` (or add `brand/dist` to the
   `slint-build` include paths).
2. In `theme.slint`, keep the `RtokTheme` API but bind each property to `Tokens`: `canvas: Tokens.bg`,
   `surface-1: Tokens.surface`, `surface-2: Tokens.surface-2`, `hairline: Tokens.border`,
   `hairline-strong: Tokens.border-strong`, `ink*: Tokens.fg*`, `accent-muted`, `on-accent`,
   `mark-tile`, `success: Tokens.success-fg`, radii/spacing/breakpoints (`bp-md` → `Tokens.bp-lg`,
   `bp-lg` → `Tokens.bp-xl`, `bp-xl` → `Tokens.bp-2xl`), `title-size: Tokens.text-xl`,
   `dark` ↔ `Tokens.dark`.
3. In `kit.slint:49,183,189` use `RtokTheme.accent-fg` (new) instead of `accent` for selected
   text and icon tint; replace `150ms` (`kit.slint:168,207`) with `Tokens.duration-base`.
4. `ui/fonts/*.ttf` and `ui/icons/*.svg` and `ui/assets/logo.svg` are byte-identical to
   `fonts/`, `icons/ui/` and `logo/rtok-mark.svg`; refresh them from here when the brand changes.
5. `cargo check -p rtok-webui` (and the webui screenshot tests, if any).

**Web admin** (`rtok/web/` on `design/web-admin`)
1. `web/tailwind.config.js`: `presets: [require("<brand>/dist/tailwind.preset.js")]`, drop the
   local `colors/fontSize/borderRadius/boxShadow/screens/transitionDuration`.
2. `web/src/input.css`: replace the `@font-face` lines 7-9 with `dist/fonts.css` and the `:root` /
   `.dark` variable blocks (lines 13-35) with `dist/tokens.css`; set `data-theme="dark"` (or keep
   `.dark`, which `tokens.css` also honors) on `<html>`.
3. Rename utilities: `canvas`/`navy` → `bg`, `line` → `border`, `ink` → `fg`, `text-accent-on` stays,
   `delta`/`success`/`warn` stay; `rounded-*`, `shadow-e*`, `shadow-ring`, `duration-fast` stay.
   Either keep the `@layer components` classes (they map 1:1) or use `dist/components.css`.
4. `web/assets/fonts/*.woff2` and `web/assets/icons|logo.svg` are identical to `fonts/`,
   `icons/ui/`, `logo/rtok-mark.svg`.
5. Rebuild `web/tailwind.css` (see `web/README.md`) and re-shoot `web/screenshots/`.

**rtok docs site** (`rtok/site/`, Hugo + Hextra)
1. Add this repo as a submodule/module and mount `dist` into `assets/brand` (see Hugo above);
   load `tokens.css` from `layouts/_partials/custom/head-end.html`.
2. `site/assets/css/custom.css`: delete the `--rtok-canvas/accent/delta/ink` block (lines 6-9) and
   use `var(--rtok-bg)`, `var(--rtok-accent)`, `var(--rtok-delta)`, `var(--rtok-fg)`; replace the
   literals `#1A3348` (lines 26, 43), `#0A1622` (42), `#5CE1FF` (47, 78, 81) and
   `var(--rtok-canvas, #06101A)` (187) with `--rtok-border`, `--rtok-surface`, `--rtok-accent`,
   `--rtok-bg`; hero shadow (27) → `var(--rtok-shadow-e3)`; set `--primary-hue: 191deg`.
3. Keep `--rtok-bp-*` names or switch to the Tailwind names (values are the same).
4. Optional: load `dist/fonts.css` and set Plex Mono for headings.
5. `site/static/{logo,logo-dark,favicon,logo-wordmark*}.svg`, `site/static/icons/*` and
   `site/data/icons.yaml` must stay in `site/` (Hugo serves them); refresh them from `logo/` and
   `icons/feature/`. `just site` must pass (`--panicOnWarning`).

**rtok page on the listepo project site** (listepo/landing; not touched in this change)
1. `docs/site.md:15` in rtok (synced to `content/projects/rtok.md` by `sync-docs.yml`): set
   `accentLight: "#006F8C"`. The landing's `src/lib/site.ts:56` fallback can get the same value.
2. If the landing adds a light theme or starts consuming `--accent-light`, use `accent-fg`.
3. Optionally add `onAccent` for the rtok theme (`#06101A`) and use Plex Mono in the rtok hero.
4. `src/styles/tokens.css` is not imported anywhere; its rtok values (`#00708C`, `#B93A1D`,
   `#041018`) are stale.
5. `public/images/rtok/*` are the landing's own renders; `public/favicon.svg` is the listepo logo,
   not rtok's.

**TUI** (`rtok/src/tui/theme.rs`): no change; ANSI colors already follow the roles.

## Sources

`sources/` holds verbatim copies (sha256-verified at import) of everything the tokens came from:

- `sources/rtok/<path>`: files from `listepo/rtok` `origin/main` at `559a7a11`: Slint theme,
  kit, logo, icons and fonts; docs-site CSS, icons.yaml and `site/static` brand assets;
  `docs/assets/landing-retina/*` (the 19 retina PNG exports, which moved here from rtok);
  `docs/site.md`; `src/tui/theme.rs`.
- `sources/rtok-branch-design-web-admin/web/`: `tailwind.config.js`, `src/input.css`, `assets/`
  and `screenshots/` from branch `design/web-admin` at `1e144253` (draft PR #447, not on main).
- `sources/rtok-brand-v3-B-tokens/`: the v3-B brand pack (`DESIGN.md`, `BRIEF.md`,
  `webui-mock/themes/TOKENS.md`, `SLINT-HANDOFF.md`, alternative marks and icon sets, previews).
  19 files byte-identical to files already here were left out; see `DUPLICATES.md` there.

These are provenance snapshots, not presets. Only `tokens/tokens.json` and `dist/` are
authoritative.

## License

Fonts: IBM Plex Mono, SIL Open Font License 1.1 (`fonts/OFL.txt`). The rtok name, mark and other
brand assets have no license grant yet; ask the owner before using them outside listepo projects.
