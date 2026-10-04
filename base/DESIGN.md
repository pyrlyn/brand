# Pyrlyn base design guidelines

The shared layer every Pyrlyn brand builds on: type, shape, space, depth, motion, interaction and
icons. Values live in [`tokens.json`](tokens.json) (built to `dist/base/tokens.css` as `--pyr-*`);
the shared components are in [`components/`](components/). Brand-specific colour and logo rules
are in each brandbook: [rtok](../brands/rtok/DESIGN.md), [ketch](../brands/ketch/DESIGN.md),
[cox](../brands/cox/DESIGN.md). The Pyrlyn company logo: [../DESIGN.md](../DESIGN.md#pyrlyn-logo).

The values come from the rtok system (the most complete one; see `brands/rtok/sources/`).

## Semantic colour roles

The base defines no colours, only the roles a brand must fill. Each brand sets them as `--pyr-*`
in `dist/brands/<brand>/tokens.css`, so the base components work with any brand.

- Core (every theme of every brand): `bg`, `surface`, `surface-2`, `border`, `fg`, `fg-muted`,
  `fg-subtle`, `accent`, `accent-muted` (accent wash), `mark-tile`.
- Optional, with fallbacks: `surface-3` → `surface-2`, `border-strong` → `border`, `accent-fg` →
  `accent`, `on-accent` → `bg`, `focus` → `accent`, `selection` → `accent-muted`, `delta`/`delta-fg`
  → `accent`, `danger`/`success`/`warn` (+ `-fg`) → `fg`, `shine` → white, `glass-alpha` → 1,
  `shadow-e1`…`e3` → none. A brand that uses a status state (danger, warn …) should define it.
- Opaque roles also get `--pyr-<role>-rgb` (`r g b`) for alpha mixes: `rgb(var(--pyr-accent-rgb) / .15)`.
- Every brand also gets `--pyr-ring` (2px `bg` gap + 2px `focus` stroke).

## Type

- IBM Plex Mono (`fonts/`, OFL) for UI, headings and numbers. Weights 400 / 600 / 700.
- Dense scale: body 13/20 (`text-sm`), controls 12/16 (`text-xs`), meta 11/16 (`text-2xs`),
  titles 20/28, display 28.
- Numbers use `font-variant-numeric: tabular-nums`.
- Uppercase only for kickers and table heads, tracked 0.08em / 0.06em.


## Shape, space, depth

- 4/8pt spacing (`space-1` 4px … `space-8` 64px).
- Radius: 6px (`md`) for controls and chrome, 10px (`lg`) for cards and panels, full for pills.
- Hairline borders (`border`) before shadows. Elevation `e1`–`e3` pairs a 1px inner top highlight
  (`shine`) with soft drop shadows.
- Glass panels are mostly opaque (`glass-alpha`, per brand) so text contrast never depends on what
  is behind them; turn blur off under `prefers-reduced-transparency`.


## Motion

- `fast` 120ms for hover color/border, `base` 180ms for selection backgrounds, knobs and larger
  state changes. `standard` easing for UI; `emphasized` for entrances.
- Honor `prefers-reduced-motion: reduce`: `dist/base/tokens.css` collapses every duration to 0.01ms
  and `dist/base/components.css` stops animations. Motion never carries information alone.


## Interaction

- One focus ring for everything: 2px `bg` gap + 2px `focus` stroke, keyboard (`:focus-visible`) only.
- Hit targets are at least 44×44px below 768px wide.
- States use ARIA: `aria-pressed` (chips), `aria-current="page"` (nav), `aria-selected` (rows),
  `aria-invalid` (fields), `aria-checked` (switches). Disabled = 40% opacity + `not-allowed`.
- `forced-colors: active` gets real borders on every control.


## Icons

- `icons/ui/`: 24×24, stroke 1.75, round caps, `currentColor`.
- Icons inherit text colour: `fg-muted` by default, `accent` (or `accent-fg` on light) when active.
- Brand-specific icon sets live in the brandbook (rtok: `brands/rtok/icons/feature/`).
