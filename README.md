# Pyrlyn brand

Brand system for [github.com/pyrlyn](https://github.com/pyrlyn), as the npm package `@pyrlyn/brand`
(installed from git). It holds the shared **base layer** that every product brand extends, the
**Pyrlyn company logo** and the **landing web theme**:

- `base/`: shared tokens (type scale, spacing, radii, sizes, breakpoints, motion, opacity, glass
  blur, and the list of semantic colour roles with their fallbacks), IBM Plex Mono, UI icons and the
  plain-CSS components (`.pyr-*`).
- `logo/pyrlyn/`: the Pyrlyn company logo, see [Pyrlyn logo](#pyrlyn-logo). `logo/listepo/`: the
  legacy listepo tools mark.
- `themes/landing/`: the landing web theme, see [Landing web theme](#landing-web-theme).

Everything in `dist/` is generated or copied by `node build.mjs` (Node ≥ 18, no dependencies) and
is committed, so a git install needs no build step. CI (`.github/workflows/ci.yml`) runs
`node build.mjs --check`, the checksum check and the import-path check.

## Product brand packs

The product brandbooks moved out of this repo in v0.4.0. Each product keeps its own pack in a
`brand/` folder, which is the source of truth for that brand and holds only the product's deltas:

| Product | Pack | Added in | Default theme |
|---|---|---|---|
| rtok | [pyrlyn/rtok `brand/`](https://github.com/pyrlyn/rtok/tree/main/brand) | pyrlyn/rtok#739 | dark |
| ketch | [pyrlyn/ketch `brand/`](https://github.com/pyrlyn/ketch/tree/main/brand) | pyrlyn/ketch#258 | light |
| cox | [pyrlyn/cox `brand/`](https://github.com/pyrlyn/cox/tree/main/brand) | pyrlyn/cox#137 | light |
| mailune | [`brands/mailune`](brands/mailune) in this repo | this tree | light |

A pack inherits the base from here:

- its `brand/package.json` pins this package, e.g. `"@pyrlyn/brand": "github:pyrlyn/brand#v0.4.0"`;
- its `tokens.json` sets `"$extends": "@pyrlyn/brand/base/tokens.json"` and fills the colour roles
  per theme, plus the product's own `--<brand>-*` tokens;
- its `build.mjs` writes `brand/dist/tokens.css`, which starts with
  `@import "@pyrlyn/brand/base/tokens.css";`; fonts, UI icons and components are imported from
  `@pyrlyn/brand/base/…`, never copied.

Change shared tokens, fonts, UI icons, components or the role list here first, tag a release, then
bump the pin in each product's `brand/`. Product colours, logos and product icons are changed in the
product repo.

## Structure

```text
base/
  tokens.json            shared tokens + semantic roles (DTCG)      -> dist/base/tokens.css (--pyr-*)
  DESIGN.md              shared guidelines
  components/            components.css (.pyr-*) + specs          -> dist/base/components.css
  fonts/                 IBM Plex Mono woff2 + OFL                  -> dist/base/fonts.css
  icons/ui/              9 UI icons (currentColor)
logo/
  pyrlyn/                Pyrlyn company logo (+ _build/ generator)  -> dist/logo/pyrlyn/
  listepo/               legacy listepo tools mark                   -> dist/logo/listepo/
themes/landing/          landing web theme (tokens, components)      -> dist/landing/
bin/pyrlyn-brand-copy.mjs  copies logo sets into a static folder
build.mjs                generates dist/, --check for CI
dist/                    generated (+ dist/fonts.css, the v0.2.0 fonts path)
```

## Import paths

| Path (`@pyrlyn/brand/…`) | File |
|---|---|
| `base/tokens.css`, `base/fonts.css`, `base/components.css` | `dist/base/*` |
| `base/tokens.json`, `base/tokens.resolved.json` | DTCG source / resolved values |
| `base/fonts/*`, `base/icons/*` | sources |
| `logo/pyrlyn/<file>`, `logo/listepo/<file>` | company logo, legacy listepo mark |
| `landing/tokens.css`, `landing/components.css` | landing web theme |
| `fonts.css`, `fonts/*`, `icons/ui/*` | v0.2.0 aliases of the base fonts and UI icons |

`base/tokens.css` has no colours: a page loads a product brand's `tokens.css` (which imports the base)
and then, if wanted, the base fonts and components:

```css
@import "<product>/brand/dist/tokens.css";    /* base tokens + the product's roles (--pyr-*) */
@import "@pyrlyn/brand/base/fonts.css";
@import "@pyrlyn/brand/base/components.css";  /* .pyr-btn, .pyr-chip, … in the product's colours */
```

The v0.3.0 `brands/*` paths and the legacy rtok flat build (`tokens.css`, `components.css`,
`tailwind-v4.css`, `tokens.json`, `tokens.resolved.json`, `logo/rtok/*`, `icons/feature/*`) are gone;
see [CHANGELOG.md](CHANGELOG.md) for where each one went.

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

`themes/landing/` is the visual identity of the landing. It is not a
product token set: the names are the landing's own (`--accent`, `--accent-2`, `--accent-light`, `--bg`,
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
npm install github:pyrlyn/brand#v0.4.0
```

```css
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

`pyrlyn-brand-copy <dest> [set ...] [--favicon <set>/<file>]`: sets are `pyrlyn` and `listepo`
(default: both); `--favicon` also writes `<dest>/favicon.svg`. Product logos (rtok, ketch, cox) are no
longer sets here; they live in each product's `brand/logo/`.

To update: tag a new version here (`git tag vX.Y.Z && git push origin vX.Y.Z`), then in the site run
`npm install github:pyrlyn/brand#vX.Y.Z` (updates `package.json` and the lockfile) and commit both.

## Rebuild

```sh
node build.mjs          # regenerate dist/ after editing base/, logo/ or themes/
node build.mjs --check  # CI: fails if dist/ is stale
```

After any change, regenerate the checksums:
`git ls-files -z | grep -zv '^SHA256SUMS$' | sort -z | xargs -0 shasum -a 256 > SHA256SUMS`.

## License

Fonts: IBM Plex Mono, SIL Open Font License 1.1 (`base/fonts/OFL.txt`). The other brand assets have
no license grant yet; ask the owner before using them outside Pyrlyn projects.
