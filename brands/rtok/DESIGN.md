# rtok brandbook (Bitset B · Hex Diff)

Only what is specific to rtok. Everything else (type, space, motion, interaction, components,
icons) is the [base layer](../../base/DESIGN.md). Tokens: [`tokens.json`](tokens.json) (extends
`base/tokens.json`), built to `dist/brands/rtok/tokens.css`. The legacy flat build
`dist/tokens.css` (`--rtok-*`) carries the same values.

One brand across every rtok surface: the web admin, the rtok docs site and the rtok page on the
Pyrlyn landing. Origin: the v3-B brand pack (`sources/rtok-brand-v3-B-tokens/`), updated to the
values on rtok main and the web admin.

## Idea

rtok cuts the context an AI agent has to carry and measures every cut. The mark is a **bitset
budget**: a 4×4 grid of token bits. Full cyan cells are kept context, dim cyan cells are
thinned, coral cells are measured cuts (Δ). The wordmark is tracked `RTOK` plus `Δtok`.


## Colour

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


## Depth

- Elevation `e1`–`e3` pairs a 1px inner top highlight (`shine`) with soft drop shadows.
- Glass alpha 82% (dark) / 86% (light).

## Logo

- Use `logo/rtok-mark.svg` (32×32 navy tile) for the mark and `logo/rtok-favicon.svg` for favicons
  (dots 1.7 instead of 1.6 so they survive 16px). `logo/rtok-wordmark.svg` is the lockup; it has
  its own navy background.
- The mark always sits on its dark tile, in both themes. Never place the bare dots on white.
- Don't recolor, rotate, symmetrize, or reorder the bits: the coral cut pattern is the story.
- PNG exports: `logo/png/` (512/1024 app icon, 180/360 apple-touch, 32/64 favicon, 2× wordmark).


## Icons

- `icons/feature/`: "Signal / scope" feature icons for marketing pages, with `@2x` PNGs; coral
  appears only where the drawing already marks a Δ. UI icons are in `base/icons/ui/`.
