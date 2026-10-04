# cox brandbook

Only what is specific to cox. Everything else is the [base layer](../../base/DESIGN.md).
Tokens: [`tokens.json`](tokens.json) (extends `base/tokens.json`), built to
`dist/brands/cox/tokens.css`. Source: `pyrlyn/cox` at `03825e72`, `docs/brand/` (DESIGN.md,
tokens.css, logos) and `docs/assets/landing-v1/` (PNG icons).

## Idea

The coxswain that steers: a terminal TUI pane with a chartreuse cursor. Terminal chrome (TUI
frames, status lines, pane borders) over generic glass cards.

## Colour

- Light ("paper terminal") is the default; dark ("classic green-on-ink") is first-class.
- Accent: forest `#3D8B3A` on light, chartreuse `#A8E06C` on dark. Terminal text `#C8F08A`.
- Mark tile and code background: forest ink `#0F1A14`.
- Status colours are defined (`success`, `warn`, `danger`) plus `--cox-info`.
- Distinct from ketch: deeper forest + chartreuse, never bright teal/mint. No purple AI glow.
- Role mapping from the cox names: `bg-elevated`→`surface`, `accent-soft`→`accent-muted`,
  `warning`→`warn`, `shadow`→`shadow-e1`. cox's own `accent-muted` (solid `#6BBF4A`) is
  `--cox-accent-leaf`. Kept as `--cox-*`: `surface-1`, `border-hairline`, `accent-hover`,
  `chartreuse`, `info`, `code-bg`, `code-fg`, `glass-fill`, `glass-border`, `accent-glow`.
- cox defines no `on-accent`; the base fallback (`bg`) is used.

## Type and shape

cox uses IBM Plex Mono for UI (as the base) and IBM Plex Sans for docs body only; its own scale is
12/14/16/20/28/40 and radii 8/12. Those are cox site values and are not part of the shared base.

## Logo

| File (`logo/`) | Use |
|---|---|
| `cox-mark.svg` | Mark 64×64: forest tile, pane frame, chartreuse cursor |
| `cox-wordmark.svg` | Mark + `cox` in IBM Plex Mono 600 (live text) |
| `cox-favicon.svg` | Favicon |
| `png/cox-icon-logo-512-landing-v1.png`, `png/cox-icon-favicon-256.png` | PNGs from `docs/assets/landing-v1/` |
| `png/cox-favicon-{32x32,64x64}.png`, `png/cox-apple-touch-icon-180.png`, `png/cox-icon-logo-{512,1024}.png` | Rendered from the SVGs |

Don't revive the helm wheel: the mark is a terminal pane, not nautical.
