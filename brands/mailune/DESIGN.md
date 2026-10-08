# Mailune brandbook

Only what is specific to Mailune. Everything else is the [base layer](../../base/DESIGN.md).
Tokens: [`tokens.json`](tokens.json) (extends `base/tokens.json`), built to
`dist/brands/mailune/tokens.css`. The palette is the macOS shell: paper canvas, ink, seal blue.

## Idea

A sealed envelope on warm paper. Flat, quiet, no gradient.

## Colour

- Light is the default theme; dark is first-class.
- Accent: seal blue `#335C8C` on light, `#8FB4D9` on dark (hover `accent-bright`).
- Mark tile is always ink `#1F1F1C` so the paper envelope stays legible on both canvases.
- Paper `#F5F2ED` is the envelope and the light page ground.
- Role extras kept as `--mailune-*`: `accent-bright`, `stage`.
- Mailune defines no status colours (danger, warn, success); the base fallbacks apply.

## Type

The base ships IBM Plex Mono. The wordmark is live text in that stack.

## Logo

| File (`logo/`) | Use |
|---|---|
| `mailune-mark.svg` | Mark 64×64: ink tile, paper envelope, blue seal |
| `mailune-wordmark.svg` | Mark + `mailune` in mono 600 |
| `mailune-favicon.svg` | Simplified 32×32 mark |
| `mailune-favicon-legacy.svg` | Envelope outline only |
| `png/mailune-favicon-{32x32,64x64}.png`, `png/mailune-apple-touch-icon-180.png`, `png/mailune-icon-logo-{512,1024}.png` | Rendered from the mark |

No wordmark PNG: the wordmark is live text, so a raster depends on the installed font.
