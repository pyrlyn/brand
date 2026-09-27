# Table / list rows

`<table class="rtok-table">`, numbers in `.rtok-num` (right-aligned, tabular).

| Part | Token |
|---|---|
| head | sticky, bg `surface`, height 32px, `text-2xs` semibold uppercase 0.06em, `fg-subtle`, bottom `border` |
| cell | height `size-row` 36px, padding x `space-3`, bottom `border` at 60% |
| body text | `text-xs` |

| State | Style |
|---|---|
| hover row | bg `surface-2` at 70%, `duration-fast` |
| selected (`aria-selected="true"`) | bg `accent-muted` |
| focus (row link) | `--rtok-ring` |
| empty / loading | `.rtok-skeleton` blocks (`surface-3`, pulse; static under reduced motion) |

Slint `ListRow`: 36px, radius-md, hover `surface-2`, selected `accent-muted`, `animate background 150ms`
(kit.slint:197-221). Source: web/src/input.css:90-95.
