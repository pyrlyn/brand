# Table / list rows

`<table class="pyr-table">`, numbers in `.pyr-num` (right-aligned, tabular).

| Part | Token |
|---|---|
| head | sticky, bg `surface`, height 32px, `text-2xs` semibold uppercase 0.06em, `fg-subtle`, bottom `border` |
| cell | height `size-row` 36px, padding x `space-3`, bottom `border` at 60% |
| body text | `text-xs` |

| State | Style |
|---|---|
| hover row | bg `surface-2` at 70%, `duration-fast` |
| selected (`aria-selected="true"`) | bg `accent` at 10% |
| focus (row link) | `--pyr-ring` |
| empty / loading | `.pyr-skeleton` blocks (`surface-3`, pulse; static under reduced motion) |

Source: web/src/input.css:90-95.
