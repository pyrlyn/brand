# Chip (filter toggle)

`<button class="pyr-chip" aria-pressed="true|false">`

| Part | Token |
|---|---|
| height / padding | `size-control-sm` 28px / 10px (44px min-size below 768px) |
| radius | `radius-md` |
| text | `text-2xs` 11/16, semibold, `fg-muted` |

| State | Style |
|---|---|
| default | transparent, border `border`, text `fg-muted` |
| hover | text `fg`, border `border-strong` |
| pressed (`aria-pressed="true"`) | bg `accent`/15%, text `accent-fg`, border `accent`/50% |
| focus-visible | `--pyr-ring` |
| disabled | 40% opacity |

Source: web/src/input.css:68-70.
