# rtok design guidelines (Bitset B · Hex Diff)

One brand across every rtok surface: the web admin, the rtok docs
site (listepo.github.io/rtok) and the rtok page on the listepo project site. Token values live
in `tokens/tokens.json`; this file is the "how to use them" part. Origin: the v3-B brand pack
(`sources/rtok-brand-v3-B-tokens/DESIGN.md`, `webui-mock/themes/TOKENS.md`), updated to the
values on rtok main and the web admin.

## Idea

rtok cuts the context an AI agent has to carry and measures every cut. The mark is a **bitset
budget**: a 4×4 grid of token bits. Full cyan cells are kept context, dim cyan cells are
thinned, coral cells are measured cuts (Δ). The wordmark is tracked `RTOK` plus `Δtok`.

## Color

- **Cyan `#5CE1FF`** is the one accent: primary buttons, active nav, focus, links on dark,
  the kept bits. On light backgrounds cyan is a *fill only*; text uses `accent-fg` (`#006F8C`).
- **Coral `#FF6B4A`** means Δ: a measured cut, a delta number, danger. Keep it scarce. On light,
  coral text uses `delta-fg` (`#B8361C`); prefer an outlined or tinted chip over a coral fill.
- **Navy `#06101A`** is the dark canvas and the mark tile. Text on cyan is always navy (`on-accent`).
- Green and amber are status colors only (ok / warn), never decoration.
- Dark is the default theme. Light is first-class: every `*-fg` token passes WCAG AA (≥ 4.5:1) on
  `bg`, `surface` and `surface-2` in both themes.
- Don't mix in other listepo product accents (cox green, ketch teal) or the listepo site blue on
  rtok surfaces. Don't use phosphor green (v3 option A) or warm orange (v2).

## Type

- IBM Plex Mono for everything: UI, headings, numbers, the wordmark. Weights 400 / 600 / 700.
- Dense scale: body 13/20 (`text-sm`), controls 12/16 (`text-xs`), meta 11/16 (`text-2xs`),
  titles 20/28, display 28.
- Numbers use `font-variant-numeric: tabular-nums`.
- Uppercase only for kickers and table heads, tracked 0.08em / 0.06em.

## Shape, space, depth

- 4/8pt spacing (`space-1` 4px … `space-8` 64px).
- Radius: 6px (`md`) for controls and chrome, 10px (`lg`) for cards and panels, full for pills.
- Hairline borders (`border`) before shadows. Elevation `e1`–`e3` pairs a 1px inner top highlight
  (`shine`) with soft drop shadows.
- Glass panels are mostly opaque (82% dark / 86% light) so text contrast never depends on what
  is behind them; turn blur off under `prefers-reduced-transparency`.

## Motion

- `fast` 120ms for hover color/border, `base` 180ms for selection backgrounds, knobs and larger
  state changes. `standard` easing for UI; `emphasized` for entrances.
- Honor `prefers-reduced-motion: reduce`: `dist/tokens.css` collapses every duration to 0.01ms
  and `dist/components.css` stops animations. Motion never carries information alone.

## Interaction

- One focus ring for everything: 2px `bg` gap + 2px `focus` stroke, keyboard (`:focus-visible`) only.
- Hit targets are at least 44×44px below 768px wide.
- States use ARIA: `aria-pressed` (chips), `aria-current="page"` (nav), `aria-selected` (rows),
  `aria-invalid` (fields), `aria-checked` (switches). Disabled = 40% opacity + `not-allowed`.
- `forced-colors: active` gets real borders on every control.

## Logo

- Use `logo/rtok-mark.svg` (32×32 navy tile) for the mark and `logo/rtok-favicon.svg` for favicons
  (dots 1.7 instead of 1.6 so they survive 16px). `logo/rtok-wordmark.svg` is the lockup; it has
  its own navy background.
- The mark always sits on its dark tile, in both themes. Never place the bare dots on white.
- Don't recolor, rotate, symmetrize, or reorder the bits: the coral cut pattern is the story.
- PNG exports: `logo/png/` (512/1024 app icon, 180/360 apple-touch, 32/64 favicon, 2× wordmark).

## Pyrlyn logo

The company mark ("Prompt", `>_`), in `logo/pyrlyn/`. Use it for "by Pyrlyn" credits and org-level
surfaces; product logos stay primary.

- Colours: ink `#0C0E11` (mark and wordmark on light), paper `#F4F2ED` (on dark); the cursor bar is
  amber `#F2B33D` on dark and `#B97C06` on light. Amber is the only accent: don't recolour the
  chevron, don't animate the cursor in the logo.
- Wordmark: JetBrains Mono 600, outlined to paths and hand-kerned; never retype it in a font.
- Lockup ratio 109:26 (viewBox `-2 4 109 26`, 2 grid units of clear space built in). Keep at least
  the cursor height (1/8 of the mark box) clear on every side.
- Minimum size: mark 16px, lockup 16px high. Switch `on-light` / `on-dark` with the theme, or inline
  the `mono` file and set `color`.

## Icons

- `icons/ui/`: 24×24, stroke 1.75, round caps, `currentColor` (web admin nav).
- `icons/feature/`: "Signal / scope" feature icons for marketing pages, with `@2x` PNGs; coral
  appears only where the drawing already marks a Δ.
- Icons inherit text color: `fg-muted` by default, `accent` (dark) / `accent-fg` (light) when active.
