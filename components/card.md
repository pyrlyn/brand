# Card, panel, glass

`.rtok-card`: bg `surface`, 1px `border`, radius `radius-lg` 10px, padding `space-4`, shadow `e1`.
`.rtok-glass`: bg `surface` at `glass-alpha` (82% dark / 86% light), blur `glass-blur` 14px +
saturate 140%, 1px `border`, radius `radius-lg`, shadow `e2`. Opaque under
`prefers-reduced-transparency` and in forced colors.

Inside: `.rtok-kicker` label (2xs, uppercase, 0.08em, `fg-subtle`), `.rtok-metric` number
(18px/600, tabular), `.rtok-delta` for Δ values (`delta-fg`).

Slint: `Card` = radius-lg, `surface-1`, 1px `hairline` (kit.slint:58-68); `Panel` pads by
`space-1` so inner rows land on radius-md (kit.slint:69-80); `PanelTitle` is 36px high with
`space-2` side padding (kit.slint:81-95).

States: cards are not interactive. For a clickable card, make the whole card a link and give it
the button hover (`border-strong`) + `--rtok-ring` focus.
Source: web/src/input.css:45-56, tailwind.config.js:46-48, kit.slint:58-105.
