# Card, panel, glass

`.pyr-card`: bg `surface`, 1px `border`, radius `radius-lg` 10px, padding `space-4`, shadow `e1`.
`.pyr-glass`: bg `surface` at `glass-alpha` (82% dark / 86% light), blur `glass-blur` 14px +
saturate 140%, 1px `border`, radius `radius-lg`, shadow `e2`. Opaque under
`prefers-reduced-transparency` and in forced colors.

Inside: `.pyr-kicker` label (2xs, uppercase, 0.08em, `fg-subtle`), `.pyr-metric` number
(18px/600, tabular), `.pyr-delta` for Δ values (`delta-fg`).

States: cards are not interactive. For a clickable card, make the whole card a link and give it
the button hover (`border-strong`) + `--pyr-ring` focus.
Source: web/src/input.css:45-56, tailwind.config.js:46-48.
