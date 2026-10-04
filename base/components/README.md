# Component specs

Plain-CSS implementations live in `components.css` (built into `dist/components.css`, classes
`.pyr-*`). Each spec lists the tokens and states; the web admin (Tailwind, `web/src/input.css` on
`design/web-admin`) is the reference implementation the values were taken from.

| Spec | Class | Web admin |
|---|---|---|
| [button.md](button.md) | `.pyr-btn` | `.btn` input.css:62-67 |
| [chip.md](chip.md) | `.pyr-chip` | `.chip` input.css:68-70 |
| [input.md](input.md) | `.pyr-field` | `.field` input.css:71-73 |
| [card.md](card.md) | `.pyr-card`, `.pyr-glass` | `.glass` input.css:45-56 |
| [table.md](table.md) | `.pyr-table` | `.tbl` input.css:90-94 |
| [nav.md](nav.md) | `.pyr-nav-item` | `.nav-item` input.css:81-82 |
| [pill.md](pill.md) | `.pyr-pill--*` | `.pill-*` input.css:74-80 |
| [switch.md](switch.md) | `.pyr-switch` | `.switch` input.css:83-88 |
| [motion.md](motion.md) | — | tailwind.config.js:56, input.css:115 |

All interactive components share: focus = `--pyr-ring` on `:focus-visible`; disabled =
`opacity: var(--pyr-opacity-disabled)` + `cursor: not-allowed`; height grows to
`--pyr-size-touch` (44px) below 768px.
