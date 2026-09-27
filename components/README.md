# Component specs

Plain-CSS implementations live in `components.css` (built into `dist/components.css`, classes
`.rtok-*`). Each spec lists the tokens and states; the web admin (Tailwind, `web/src/input.css` on
`design/web-admin`) and the Slint kit (`crates/rtok-webui/ui/kit.slint`) are the reference
implementations the values were taken from.

| Spec | Class | Web admin | Slint |
|---|---|---|---|
| [button.md](button.md) | `.rtok-btn` | `.btn` input.css:62-67 | — |
| [chip.md](chip.md) | `.rtok-chip` | `.chip` input.css:68-70 | — |
| [input.md](input.md) | `.rtok-field` | `.field` input.css:71-73 | — |
| [card.md](card.md) | `.rtok-card`, `.rtok-glass` | `.glass` input.css:45-56 | `Card`, `Panel` kit.slint:58-105 |
| [table.md](table.md) | `.rtok-table` | `.tbl` input.css:90-94 | `ListRow` kit.slint:197-221 |
| [nav.md](nav.md) | `.rtok-nav-item` | `.nav-item` input.css:81-82 | `NavItem` kit.slint:150-196 |
| [pill.md](pill.md) | `.rtok-pill--*` | `.pill-*` input.css:74-80 | — |
| [switch.md](switch.md) | `.rtok-switch` | `.switch` input.css:83-88 | — |
| [motion.md](motion.md) | — | tailwind.config.js:56, input.css:115 | kit.slint:168,207 |

All interactive components share: focus = `--rtok-ring` on `:focus-visible`; disabled =
`opacity: var(--rtok-opacity-disabled)` + `cursor: not-allowed`; height grows to
`--rtok-size-touch` (44px) below 768px.
