# Navigation

`<nav class="pyr-nav">` with `<a class="pyr-nav-item" aria-current="page">`.

| Part | Token |
|---|---|
| item | height `size-row` 36px, padding x 10px, gap `space-3`, radius `radius-md`, `text-xs` |
| icon | 16px, `currentColor` |

| State | Style |
|---|---|
| default | text `fg-muted` |
| hover | bg `surface-2`, text `fg` |
| current (`aria-current="page"`) | bg `accent-muted`, text + icon `accent-fg` |
| focus-visible | `--pyr-ring` |

Background changes animate over `duration-base` (180ms), color over `duration-fast` (120ms).
Source: web/src/input.css:81-82.
