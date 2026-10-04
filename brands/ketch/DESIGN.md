# ketch brandbook

Only what is specific to ketch. Everything else is the [base layer](../../base/DESIGN.md).
Tokens: [`tokens.json`](tokens.json) (extends `base/tokens.json`), built to
`dist/brands/ketch/tokens.css`. Source: `pyrlyn/ketch` at `7bec33c`, `site/static/css/main.css` and
`site/DESIGN.md`.

## Idea

Catch releases from GitHub: a hook catching a release-tag chip. Nerd + flat + material + glass.

## Colour

- Light is the default theme (the ketch site's `:root`); dark is first-class.
- Accent: deep teal `#0F6F5C` on light, mint `#3DDCB0` on dark (hover `accent-bright`).
- Mark tile is always dark teal `#0A3D36` so the mint hook stays legible on both canvases.
- Coral `#FF6B5B` is only the release-tag chip (`--ketch-tag-coral`).
- Terminal chrome (`--ketch-term-*`) stays dark in both themes.
- No purple/violet "AI" gradients; don't put light ink on the mark tile.
- Role mapping from the site's names: `canvas`→`bg`, `surface-1`→`surface`, `hairline`→`border`,
  `ink`→`fg`, `ink-muted`→`fg-muted`, `ink-faint`→`fg-subtle`, `accent-soft`→`accent-muted`,
  `accent-on`→`on-accent`, `elev-1..3`→`shadow-e1..e3`. Kept as `--ketch-*`: `accent-bright`,
  `glass-fill`, `glass-border`, `focus-ring`, `tag-coral`, `stage`, `term-*`.
- ketch defines no status colours (danger, warn, success); the base fallbacks apply.

## Type

The ketch site sets the mono stack with JetBrains Mono first (`"JetBrains Mono", "IBM Plex Mono", …`)
and a system sans for body. The base ships IBM Plex Mono; the ketch site keeps its own font stack.

## Logo

| File (`logo/`) | Use |
|---|---|
| `ketch-mark.svg` | Mark 64×64: dark teal tile, mint hook, coral release chip |
| `ketch-wordmark.svg` | Mark + `ketch` in mono 600 (live text: needs JetBrains Mono or IBM Plex Mono) |
| `ketch-favicon.svg` | Simplified 32×32 mark |
| `ketch-favicon-legacy.svg` | Previous anchor-style favicon |
| `png/ketch-favicon-{32x32,64x64}.png`, `png/ketch-apple-touch-icon-180.png`, `png/ketch-icon-logo-{512,1024}.png` | Rendered from the SVGs |

No wordmark PNG: the wordmark is live text, so a raster depends on the installed font.
