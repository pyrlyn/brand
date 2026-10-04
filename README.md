# Pyrlyn brand

Brand system for [github.com/pyrlyn](https://github.com/pyrlyn), as the npm package `@pyrlyn/brand`
(installed from git). One shared **base layer** (the common design brandbook) and three **local
brandbooks** that only hold what is specific to each product:

- `base/`: shared tokens (type scale, spacing, radii, sizes, breakpoints, motion, opacity, glass
  blur, and the list of semantic colour roles), IBM Plex Mono, UI icons and the plain-CSS
  components (`.pyr-*`).
- `brands/rtok`, `brands/ketch`, `brands/cox`: logos (SVG + PNG), colour tokens filling the base
  roles plus the brand's own extras, and a short DESIGN.md with only the deltas. Each brand's
  `tokens.json` extends `base/tokens.json` and its CSS starts with `@import` of the base.
- `logo/pyrlyn/`: the Pyrlyn company logo, see [Pyrlyn logo](#pyrlyn-logo). `logo/listepo/`: the
  legacy listepo tools mark.
- `themes/landing/`: the landing web theme used by
  [pyrlyn.github.io/landing](https://pyrlyn.github.io/landing/), see [Landing web theme](#landing-web-theme).

Everything in `dist/` is generated or copied by `node build.mjs` (Node ≥ 18, no dependencies) and
is committed, so a git install needs no build step. CI (`.github/workflows/ci.yml`) runs
`node build.mjs --check`.

## Structure

```text
base/
  tokens.json            shared tokens + semantic roles (DTCG)      -> dist/base/tokens.css (--pyr-*)
  DESIGN.md              shared guidelines
  components/            components.css (.pyr-*) + specs          -> dist/base/components.css
  fonts/                 IBM Plex Mono woff2 + OFL                  -> dist/base/fonts.css
  icons/ui/              9 UI icons (currentColor)
brands/
  rtok/   tokens.json DESIGN.md logo/(+png/) icons/feature/ examples/ screenshots/ sources/
  ketch/  tokens.json DESIGN.md logo/(+png/)
  cox/    tokens.json DESIGN.md logo/(+png/)                         -> dist/brands/<brand>/tokens.css, logo/
logo/
  pyrlyn/                Pyrlyn company logo (+ _build/ generator)  -> dist/logo/pyrlyn/
  listepo/               legacy listepo tools mark                   -> dist/logo/listepo/
themes/landing/          landing web theme (tokens, components)      -> dist/landing/
bin/pyrlyn-brand-copy.mjs  copies logo sets into a static folder
build.mjs                generates dist/, --check for CI
dist/                    generated; also the legacy rtok flat build (tokens.css, fonts.css,
                         components.css, tailwind-v4.css, tokens.resolved.json)
```

## Import paths

| Path (`@pyrlyn/brand/…`) | File |
|---|---|
| `base/tokens.css`, `base/fonts.css`, `base/components.css` | `dist/base/*` |
| `base/tokens.json`, `base/fonts/*`, `base/icons/*` | sources |
| `brands/<rtok\|ketch\|cox>/tokens.css` | `dist/brands/<brand>/tokens.css` (imports `base/tokens.css`) |
| `brands/<brand>/tokens.json`, `brands/<brand>/tokens.resolved.json` | DTCG source / resolved values |
| `brands/<brand>/logo/<file>` | SVGs and PNGs side by side (`dist/brands/<brand>/logo/`) |
| `brands/rtok/icons/feature/*` | rtok feature icons |
| `logo/pyrlyn/<file>`, `logo/listepo/<file>` | company logo, legacy listepo mark |
| `landing/tokens.css`, `landing/components.css` | landing web theme |

A brand page loads the brand tokens, the base fonts and, if wanted, the base components:

```css
@import "@pyrlyn/brand/brands/ketch/tokens.css";   /* base tokens + ketch roles (--pyr-*) + --ketch-* */
@import "@pyrlyn/brand/base/fonts.css";
@import "@pyrlyn/brand/base/components.css";       /* .pyr-btn, .pyr-chip, … in ketch colours */
```

**Legacy paths (v0.2.0), kept as aliases**: `tokens.css`, `fonts.css`, `components.css`,
`tailwind-v4.css`, `tokens.resolved.json` (the rtok flat build with `--rtok-*` variables and `.rtok-*`
classes, same values as before), `tokens.json` (→ `brands/rtok/tokens.json`), `logo/rtok/*` (→
`brands/rtok/logo/*`), `fonts/*` (→ `base/fonts/*`), `icons/ui/*`, `icons/feature/*`, and every path
the landing imports (`tokens.css`, `landing/*.css`, `logo/pyrlyn/*`, the `pyrlyn-brand-copy` sets
`pyrlyn` and `listepo`). The rtok sections below use the legacy flat build.

## rtok token values

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
| `accent-muted` | `#5CE1FF26` | `#5CE1FF26` |
| `on-accent` | `#06101A` | `#06101A` |
| `delta` / `danger` (fill) | `#FF6B4A` | `#FF6B4A` |
| `delta-fg` / `danger-fg` | `#FF6B4A` | `#B8361C` |
| `success` / `success-fg` | `#3DDC97` / `#3DDC97` | `#3DDC97` / `#0B7A50` |
| `warn` / `warn-fg` | `#F5C451` / `#F5C451` | `#F5C451` / `#8A5A00` |
| `focus` | `#5CE1FF` | `#006F8C` |
| `mark-tile` | `#06101A` | `#0B1A24` |

Every `*-fg` and `fg*` token is ≥ 4.5:1 on `bg`, `surface` and `surface-2` in its theme.

The scales below are the base layer (`--pyr-*` in `dist/base/tokens.css`); the legacy rtok build
repeats them as `--rtok-*`.

| Scale | Values |
|---|---|
| Space `--rtok-space-{0..8}` | 0 · 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 px |
| Radius `--rtok-radius-*` | sm 4 · md 6 · lg 10 · xl 14 · full 9999 px |
| Text `--rtok-text-*` / `--rtok-leading-*` | 2xs 11/16 · xs 12/16 · sm 13/20 · base 14/24 · lg 16/24 · xl 20/28 · 2xl 24/32 · 3xl 28/32 (px) |
| Weight | 400 · 600 · 700 |
| Size | control 32 · control-sm 28 · row 36 · touch 44 px |
| Breakpoints (min-width) | xs 360 · sm 640 · md 768 · lg 1024 · xl 1440 · 2xl 1920 px |
| Elevation | `--rtok-shadow-e1/e2/e3` (inner `shine` line + drop shadows), `--rtok-ring` focus |
| Motion | fast 120ms · base 180ms; standard `cubic-bezier(0.4,0,0.2,1)`, emphasized `cubic-bezier(0.22,1,0.36,1)`; all durations → 0.01ms under reduced motion |

## Using the rtok build

The paths below assume the repo is available as `brand/` (git submodule or copy) or installed as
the npm package `@pyrlyn/brand`. The package is `private` and not published; install it from git.

### Get the files

```sh
# git submodule (pin a commit, update with `git submodule update --remote`)
git submodule add <brand-repo-url> brand

# npm / pnpm / yarn from git (package name @pyrlyn/brand), pinned to a tag
npm install github:pyrlyn/brand#v0.3.0
# or, locally:  npm install ../brand
```

### Plain HTML

```html
<link rel="preload" href="/brand/base/fonts/IBMPlexMono-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/brand/dist/fonts.css">
<link rel="stylesheet" href="/brand/dist/tokens.css">
<link rel="stylesheet" href="/brand/dist/components.css"> <!-- optional -->

<html data-theme="dark">  <!-- or "light"; omit to follow prefers-color-scheme -->
<body class="rtok-root">
  <button class="rtok-btn rtok-btn--primary">Install</button>
  <p style="color: var(--rtok-fg-muted)">…</p>
</body>
```

`dist/fonts.css` resolves fonts at `../base/fonts/`, so serve `dist/` and `base/fonts/` side by side (as in
this repo). Use the variables anywhere: `color: var(--rtok-accent-fg)`,
`background: rgb(var(--rtok-accent-rgb) / 0.15)`, `box-shadow: var(--rtok-shadow-e2)`.

### Tailwind CSS v4

The only Tailwind target is `dist/tailwind-v4.css`: a v4 `@theme inline` block plus a `dark`
custom variant, and it imports `dist/tokens.css` (the plain CSS variables it maps to). There is no
`tailwind.config.js` and no v3 preset.

```css
/* your entry CSS */
@import "tailwindcss";
@import "@pyrlyn/brand/fonts.css";
@import "@pyrlyn/brand/tailwind-v4.css"; /* also imports tokens.css */
@import "@pyrlyn/brand/components.css";  /* optional plain-CSS components */
```

Utilities: `bg-bg bg-surface bg-surface-2 text-fg text-fg-muted border-border bg-accent
text-accent-on text-accent-fg bg-accent/15 text-delta-fg rounded-md shadow-e2
focus-visible:shadow-ring font-mono text-sm duration-fast ease-emphasized h-control h-touch`,
breakpoints `xs: … 2xl:`. `dark:` matches `[data-theme="dark"]` or `.dark`; the colors already
switch by themselves, so you rarely need it.

Font URLs: bundlers (Vite, including `@tailwindcss/vite`) rewrite `../base/fonts/…` in `fonts.css` and
emit the woff2 files. The standalone CLI (`@tailwindcss/cli`) leaves the URL as written, so put
`base/fonts/` next to the directory the output CSS lands in (output `…/css/app.css` → fonts at
`…/base/fonts/`).

### Astro

Tailwind v4 through its Vite plugin:

```sh
npm install tailwindcss @tailwindcss/vite
npm install github:pyrlyn/brand#v0.3.0   # or ../brand
```

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({ vite: { plugins: [tailwindcss()] } });
```

```css
/* src/styles/global.css */
@import "tailwindcss";
@import "@pyrlyn/brand/fonts.css";
@import "@pyrlyn/brand/tailwind-v4.css";
```

```astro
---
// src/layouts/Base.astro
import "../styles/global.css";
import fontUrl from "@pyrlyn/brand/base/fonts/IBMPlexMono-Regular.woff2?url";
---
<html lang="en" data-theme="dark">
  <head><link rel="preload" href={fontUrl} as="font" type="font/woff2" crossorigin /></head>
  <body class="bg-bg text-fg font-mono text-sm"><slot /></body>
</html>
```

### Hugo

Tailwind v4 through the standalone CLI (`npm install tailwindcss @tailwindcss/cli`), with the
repo as a submodule at `brand/`:

```css
/* assets/css/app.css */
@import "tailwindcss";
@import "../../brand/dist/fonts.css";
@import "../../brand/dist/tailwind-v4.css";
@source "../../layouts";
@source "../../content";
```

```toml
# hugo.toml: serve the fonts at /base/fonts/ so ../base/fonts/ in the CSS resolves from /css/app.css
[[module.mounts]]
source = "static"
target = "static"
[[module.mounts]]
source = "brand/base/fonts"
target = "static/base/fonts"
```

```sh
npx @tailwindcss/cli -i assets/css/app.css -o static/css/app.css --minify          # build
npx @tailwindcss/cli -i assets/css/app.css -o static/css/app.css --watch & hugo server  # dev
```

```go-html-template
<link rel="preload" href="{{ "base/fonts/IBMPlexMono-Regular.woff2" | relURL }}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{{ "css/app.css" | relURL }}">
```

A Hugo theme with its own CSS (e.g. Hextra) can skip Tailwind and load `brand/dist/tokens.css`
through Hugo Pipes (`resources.Get`) to use the `--rtok-*` variables directly.

### Rebuild

```sh
node build.mjs          # regenerate dist/ after editing base/ or brands/*/ tokens
node build.mjs --check  # CI: fails if dist/ is stale
```

## Logo usage

- Mark: `brands/rtok/logo/rtok-mark.svg` (32×32, navy tile, bitset dots). Favicon: `brands/rtok/logo/rtok-favicon.svg`
  (`<link rel="icon" href="rtok-favicon.svg" type="image/svg+xml">`), PNG fallbacks in `brands/rtok/logo/png/`.
  Package paths: `@pyrlyn/brand/logo/rtok/<file>` (SVGs and PNGs side by side).
- Lockup: `brands/rtok/logo/rtok-wordmark.svg` (`RTOK` + `Δtok` + `bitset`, on its own navy background; text
  is set in IBM Plex Mono, so outline it before using it where the font may be missing).
- The mark always keeps its dark tile, in light and dark UIs. Don't recolor, rotate, crop, or
  rearrange the dots; coral cells are the measured cuts. Minimum size 16px.
- Full rules: [DESIGN.md](DESIGN.md#logo).

## Pyrlyn logo

The parent brand of [github.com/pyrlyn](https://github.com/pyrlyn). Concept "Prompt": the shell
prompt `>_` as a chevron and an amber cursor bar. Product logos stay primary; the Pyrlyn logo is for
"by Pyrlyn" credits and org-level use. Files live in `logo/pyrlyn/` (details in
[`logo/pyrlyn/README.md`](logo/pyrlyn/README.md)) and are exported as
`@pyrlyn/brand/logo/pyrlyn/<file>`:

| File | Use |
|---|---|
| `pyrlyn-mark-on-light.svg` / `-1000.png`, `pyrlyn-mark-on-dark.svg` / `-1000.png` | Mark for light / dark backgrounds |
| `pyrlyn-mark-mono.svg` | Mark in `currentColor` |
| `pyrlyn-lockup-on-light.svg` / `-2000.png`, `pyrlyn-lockup-on-dark.svg` / `-2000.png` | Mark + `pyrlyn` wordmark |
| `pyrlyn-lockup-mono.svg` | Lockup in `currentColor` |
| `pyrlyn-favicon.svg`, `pyrlyn-favicon-32.png`, `pyrlyn-favicon-64.png` | Favicons (the SVG follows `prefers-color-scheme`) |
| `pyrlyn-apple-touch-icon.png` | 180×180 apple-touch icon |
| `pyrlyn-github-avatar-1000.png` | GitHub org avatar |

- Colours: ink `#0C0E11`, paper `#F4F2ED`, amber `#F2B33D` on dark and `#B97C06` on light. The amber
  cursor is the only accent.
- Wordmark: JetBrains Mono 600, outlined to paths (no font needed). Lockup viewBox ratio 109:26.
- Rules: [DESIGN.md](DESIGN.md#pyrlyn-logo).

## Landing web theme

`themes/landing/` is the visual identity of the landing (pyrlyn.github.io/landing). It is not the
rtok token set: the names are the landing's own (`--accent`, `--accent-2`, `--accent-light`, `--bg`,
`--fg`, `--muted`, `--surface*`, `--glass-*`, `--hairline*`, `--blur-*`, `--shadow-*`, `--focus`,
`--font-sans`, `--font-mono`, `--fs-*`, `--s-1`…`--s-10`, `--r-*`, `--container`, `--ease`). The
home accent is `#4C8DFF`; product pages override `--accent` / `--accent-2` / `--accent-light` / `--bg`
on `<html>`.

- `@pyrlyn/brand/landing/tokens.css`: the `:root` tokens.
- `@pyrlyn/brand/landing/components.css`: `.glass` (+ `--thin`, `--thick`), `.shine`, `.btn`
  (+ `--lg`, `--block`, `--primary`, `--glass`, `aria-disabled`), `.eyebrow`, `.pill`, `.badge`
  (+ `--accent`, `--line`, `--version`), `.brand` / `.brand__mark`, `.pyrlyn-by` (+ `--nav`,
  `--hero`, `--footer`).

Import order matters: tokens first, then the page reset/background, then the components, then page
layout CSS. Fonts are the consumer's: the theme names Inter (the landing self-hosts it through
`@fontsource-variable/inter`) and a system monospace stack.

## Reuse in another site

```sh
npm install github:pyrlyn/brand#v0.3.0
```

```css
@import "@pyrlyn/brand/tokens.css";              /* rtok --rtok-* variables */
@import "@pyrlyn/brand/landing/tokens.css";      /* landing/Pyrlyn web theme */
@import "@pyrlyn/brand/landing/components.css";
```

```astro
---
// inline SVG (Vite): the markup ends up in the HTML, so it can take currentColor / CSS variables
import lockup from "@pyrlyn/brand/logo/pyrlyn/pyrlyn-lockup-on-dark.svg?raw";
// or a hashed asset URL
import lockupUrl from "@pyrlyn/brand/logo/pyrlyn/pyrlyn-lockup-on-dark.svg?url";
---
<Fragment set:html={lockup} />
```

Files that need a stable public URL (favicons, `<img src>` referenced from outside) can be copied into
a static folder with the bundled helper; run it from the site's own `predev` / `prebuild` scripts (no
postinstall hook) and git-ignore the output:

```jsonc
// package.json
"scripts": {
  "brand": "pyrlyn-brand-copy public pyrlyn",   // -> public/pyrlyn/pyrlyn-*.svg|png
  "predev": "npm run brand",
  "prebuild": "npm run brand"
}
```

`pyrlyn-brand-copy <dest> [set ...] [--favicon <set>/<file>]`: sets are `pyrlyn`, `rtok`,
`listepo` (default: all); `--favicon` also writes `<dest>/favicon.svg`.

To update: tag a new version here (`git tag vX.Y.Z && git push origin vX.Y.Z`), then in the site run
`npm install github:pyrlyn/brand#vX.Y.Z` (updates `package.json` and the lockfile) and commit both.

## Conflicts

rtok surfaces compared (read-only): web admin `web/` on branch `design/web-admin` (draft PR #447,
not live), rtok docs site `site/` (deployed to listepo.github.io/rtok), the rtok page on the
listepo project site (listepo/landing `main`, deployed), the TUI `src/tui/theme.rs`, and the v3-B
brand pack. Rule: prefer what is live in production; where a live value is not actually rendered,
or fails WCAG AA, take the AA-passing value and say so. Paths are relative to each repo;
`landing:` = listepo/landing at `b4a06f1`, `web/` = rtok `design/web-admin` at `1e144253`,
others = rtok `origin/main` at `559a7a11`.

| Token | Values per surface (file:line) | Canonical | Reason |
|---|---|---|---|
| `accent-fg` (cyan as text on light) | web `web/src/input.css:18` `#006F8C` · landing `src/lib/site.ts:56` + rtok `docs/site.md:15` accentLight `#0B7FA0` · landing `src/styles/tokens.css:488` `#00708C` | `#006F8C` | The landing's `--accent-light` is set (`global.css:18`, `Base.astro:21`) but no rule reads it and the site is dark-only, so `#0B7FA0` is not rendered; it is also 4.32:1 on light `bg` (fails AA). `tokens.css` is not imported anywhere (dead). `#006F8C` is 5.38:1. |
| `fg-muted` light | web `input.css:17` `#4F6679` · v3 `TOKENS.md` `#5A7388` | `#4F6679` | `#5A7388` is 4.24:1 on `surface-2` (fails AA); `#4F6679` ≥ 5.1:1 everywhere. |
| `fg-subtle` dark | web `input.css:29` `#7F9AAE` · v3 `DESIGN.md` `#5A7388` | `#7F9AAE` | `#5A7388` is 3.87:1 on dark `bg`. |
| `success` light | web `input.css:20` fill `#3DDC97` + text `#0B7A50` · v3 `TOKENS.md` `#0F8F5F` (one color for fill and text) | fill `#3DDC97`, `success-fg` `#0B7A50` | `#0F8F5F` as text is 3.85:1 on light `bg`; split fill/text like accent and delta. |
| `delta-fg` / `danger-fg` light | web `input.css:19` `#B8361C` · landing `tokens.css:488` `#B93A1D` (dead) · v3 `TOKENS.md` `#FF6B4A` text, `#E85A3C` for mark cuts on light | fill `#FF6B4A`, text `#B8361C` | Coral text on light is 2.64:1. The mark keeps `#FF6B4A` on its navy tile. |
| `accent-muted` (selected bg) | web `input.css:69,82` `accent/15` (pressed chip, current nav), `input.css:94` `accent/10` (selected row) · v3 `DESIGN.md` `#5CE1FF33`, `TOKENS.md` `#5CE1FF29` light | `#5CE1FF26` (15%) both themes; selected table rows `accent` at 10% | The web admin is the only surface that implements selection; the v3 values are mock-ups. |
| `on-accent` | web `input.css:18`, v3: `#06101A` · landing `global.css:26` `#050810` (site shell default, the rtok theme does not override it) · landing `tokens.css:484` `#041018` (dead) | `#06101A` | Brand navy; the landing difference is invisible (both ≈ black) and comes from the listepo shell. |
| `focus` ring | web `tailwind.config.js:49` 2px `canvas` + 2px cyan (both themes) · landing `global.css:58` 3px + 5px accent · site: Hextra default | 2px `bg` + 2px `focus`; `focus` = cyan dark / `#006F8C` light | Cyan ring on light is 1.44:1 (WCAG 1.4.11 needs 3:1). |
| Heading size | web `index.html:64` page title `text-base` 14px bold, `app.js:327` panel title `text-xs` 12px/600 · v3 `DESIGN.md` heading 14px/600 | 14px/600 (`text-base`) | Web page title and the v3 pack agree on 14px. |
| Caption weight | web `tailwind.config.js:33` 11px, regular · v3 `DESIGN.md` caption 11px/500 | 11px/400 | The web admin ships only 400/600/700 woff2 files. |
| Radius | web `tailwind.config.js:43` 4/6/10/14 · site `custom.css:25` 12px hero, `:41` 8px icon tile, `:117` 8px, `:131` 10px · landing `global.css:73` 6/10/14/20/28 (listepo shell) | 4/6/10/14/full | Only rtok-specific scale; site values are one-off marketing frames (map 12→`xl`/`lg`, 8→`md`/`lg` on adoption); landing radii belong to the listepo shell, not rtok. |
| Breakpoint names | site `custom.css:11-14`: `--rtok-bp-sm` 640, `-md` 1024, `-lg` 1440, `-xl` 1920 · web `tailwind.config.js:54`: xs 360, sm 640, md 768, lg 1024, xl 1440, 2xl 1920 | Tailwind names and values | Same pixel steps; Tailwind adds 360/768. Mapping: site `bp-sm`=`sm`, `bp-md`=`lg`, `bp-lg`=`xl`, `bp-xl`=`2xl`. |
| Easing | web: Tailwind default `cubic-bezier(0.4,0,0.2,1)` · landing `global.css:76` `cubic-bezier(.22,1,.36,1)` (live on the rtok page) | both, as `standard` and `emphasized` | Different jobs: UI state vs entrances. |
| Elevation | web `tailwind.config.js:46-48` e1–e3 · site `custom.css:27` `0 24px 48px rgba(0,0,0,.45)` hero, `:118` mobile · landing `global.css` `--shadow-1..3` (listepo shell) | web e1–e3 | Only rtok-specific scale; the hero shadow is close to `e3`. |
| Font | web `web/assets/fonts/*.woff2`, wordmark SVG, v3 pack: IBM Plex Mono · docs site: Hextra default fonts (no override in `custom.css`) · landing `global.css:61-62` Inter + system mono (rtok page included) | IBM Plex Mono | The brand pack and the product UI use it; the two sites never loaded it. |
| Hextra primary | site `custom.css:3-5` `hsl(190 100% 68%)` ≈ `#5CE4FF` | `#5CE1FF` = `hsl(191 100% 68%)` | 1° hue drift; set `--primary-hue: 191deg` when adopting. |
| Mark on light | site `static/logo.svg` and web `assets/logo.svg`: identical, navy `#06101A` tile · v3 `webui-mock/themes/logo-light.svg`: ink `#0B1A24` tile, coral `#E85A3C`, dim 0.4 (not used anywhere) · v3 `TOKENS.md` `mark-tile` light `#0B1A24` | one mark, `brands/rtok/logo/rtok-mark.svg`, both themes; `mark-tile` token keeps `#0B1A24` light | The live SVG is identical on every surface; the light variant stayed a mock. |
| Wordmark | site `static/logo-wordmark.svg` = `logo-wordmark-dark.svg` (byte-identical) · PNG `logo-wordmark-2x.png` = `logo-wordmark-dark-2x.png` | one `brands/rtok/logo/rtok-wordmark.svg` | Duplicates, not variants. |
| Border naming | web `line`/`line-strong` · v3 `hairline`/`hairline-strong` · site `#1A3348` literals | `border`/`border-strong` | Values agree; names unified. |
| Surface ladder | v3 `surface-1`, `surface-2` · web adds `surface-3`, `warn`, `shine`, glass alpha | web ladder | No conflict; the v3 pack lacks these. |
| TUI palette | `src/tui/theme.rs:10-18` ANSI Cyan / DarkGray / Green / Yellow / Red | unchanged | Terminal palette colors, not hex; they map to accent / fg-subtle / success / warn / danger. |

No other divergent values: the dark palette (`#06101A`, `#0A1622`, `#0F1E2E`, `#1A3348`,
`#2A4A66`, `#E8F7FF`, `#8AA8BC`), cyan, coral, spacing, durations (120/180ms) and the 9 UI icons
are identical across the web admin, docs site, landing and the v3 pack wherever they appear.

## Adopting in each surface

Nothing was rewired in this change. The rtok repo still carries its own runtime copies; these are
the steps to switch each surface to this repo.

**Web admin** (`rtok/web/` on `design/web-admin`, currently Tailwind v3 standalone CLI)
1. Move the web admin to Tailwind v4: delete `web/tailwind.config.js` (its colors, type scale,
   radii, shadows, screens and durations all come from `dist/tailwind-v4.css`) and build with
   `@tailwindcss/cli` instead of the v3 CLI.
2. `web/src/input.css`: replace `@tailwind base/components/utilities` with `@import "tailwindcss";`
   and `@import "<brand>/dist/tailwind-v4.css";`, add `@source "../index.html"; @source "../app.js";`,
   replace the `@font-face` lines 7-9 with `@import "<brand>/dist/fonts.css";` (keep fonts at
   `web/assets/fonts/` or next to the output) and delete the `:root` / `.dark` variable blocks
   (lines 13-35); set `data-theme="dark"` (or keep `.dark`, which `tokens.css` also honors) on `<html>`.
3. Rename utilities: `canvas`/`navy` → `bg`, `line` → `border`, `ink` → `fg`, `text-accent-on` stays,
   `delta`/`success`/`warn` stay; `rounded-*`, `shadow-e*`, `shadow-ring`, `duration-fast` stay;
   `duration-base` becomes the token's 180ms (same as today). Either keep the `@layer components`
   classes (in v4 write them as `@utility` or plain CSS) or use `dist/components.css`.
4. `web/assets/fonts/*.woff2` and `web/assets/icons|logo.svg` are identical to `base/fonts/`,
   `base/icons/ui/`, `brands/rtok/logo/rtok-mark.svg`.
5. Rebuild `web/tailwind.css` with
   `npx @tailwindcss/cli -i src/input.css -o tailwind.css --minify` (update `web/README.md`) and
   re-shoot `web/screenshots/`.

**rtok docs site** (`rtok/site/`, Hugo + Hextra)
1. Add this repo as a submodule and load `brand/dist/tokens.css` through Hugo Pipes from
   `layouts/_partials/custom/head-end.html` (Hextra ships its own CSS, so no Tailwind build is needed;
   use the Tailwind v4 CLI setup above only for new Tailwind-based pages).
2. `site/assets/css/custom.css`: delete the `--rtok-canvas/accent/delta/ink` block (lines 6-9) and
   use `var(--rtok-bg)`, `var(--rtok-accent)`, `var(--rtok-delta)`, `var(--rtok-fg)`; replace the
   literals `#1A3348` (lines 26, 43), `#0A1622` (42), `#5CE1FF` (47, 78, 81) and
   `var(--rtok-canvas, #06101A)` (187) with `--rtok-border`, `--rtok-surface`, `--rtok-accent`,
   `--rtok-bg`; hero shadow (27) → `var(--rtok-shadow-e3)`; set `--primary-hue: 191deg`.
3. Keep `--rtok-bp-*` names or switch to the Tailwind names (values are the same).
4. Optional: load `dist/fonts.css` and set Plex Mono for headings.
5. `site/static/{logo,logo-dark,favicon,logo-wordmark*}.svg`, `site/static/icons/*` and
   `site/data/icons.yaml` must stay in `site/` (Hugo serves them); refresh them from `brands/rtok/logo/` and
   `brands/rtok/icons/feature/`. `just site` must pass (`--panicOnWarning`).

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

`brands/rtok/sources/` holds verbatim copies (sha256-verified at import) of everything the tokens came from:

- `sources/rtok/<path>`: files from `listepo/rtok` `origin/main` at `559a7a11`: docs-site CSS, icons.yaml and `site/static` brand assets;
  `docs/assets/landing-retina/*` (the 19 retina PNG exports, which moved here from rtok);
  `docs/site.md`; `src/tui/theme.rs`.
- `sources/rtok-branch-design-web-admin/web/`: `tailwind.config.js`, `src/input.css`, `assets/`
  and `screenshots/` from branch `design/web-admin` at `1e144253` (draft PR #447, not on main).
- `sources/rtok-brand-v3-B-tokens/`: the v3-B brand pack (`DESIGN.md`, `BRIEF.md`,
  `webui-mock/themes/TOKENS.md`, alternative marks and icon sets, previews).
  19 files byte-identical to files already here were left out; see `DUPLICATES.md` there.

These are provenance snapshots, not presets. Only `base/tokens.json`, `brands/rtok/tokens.json` and `dist/` are
authoritative.

## License

Fonts: IBM Plex Mono, SIL Open Font License 1.1 (`base/fonts/OFL.txt`). The rtok name, mark and other
brand assets have no license grant yet; ask the owner before using them outside listepo projects.
