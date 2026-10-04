# Motion

| Token | Value | Use | Source |
|---|---|---|---|
| `duration-fast` | 120ms | hover color / border | web/tailwind.config.js:56 |
| `duration-base` | 180ms | selection background, knobs, larger changes | web/tailwind.config.js:56 |
| `ease-standard` | cubic-bezier(0.4, 0, 0.2, 1) | UI transitions | Tailwind default used by the web admin |
| `ease-emphasized` | cubic-bezier(0.22, 1, 0.36, 1) | entrances, knobs | listepo/landing src/styles/global.css:76 |

Reduced motion (`prefers-reduced-motion: reduce`): `dist/tokens.css` sets every
`--pyr-duration-*` to 0.01ms, and `dist/components.css` stops animations inside `.pyr-root`
(same rule as web/src/input.css:115-117). Decorative motion (the web admin orb, the landing mesh)
must have a static fallback.
