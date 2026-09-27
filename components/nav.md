# Navigation

`<nav class="rtok-nav">` with `<a class="rtok-nav-item" aria-current="page">`.

| Part | Token |
|---|---|
| sidebar width | `size-sidebar` 200px; icon rail `size-sidebar-rail` 56px |
| item | height `size-row` 36px, padding x 10px, gap `space-3`, radius `radius-md`, `text-xs` |
| icon | 16px, `currentColor` |

| State | Style |
|---|---|
| default | text `fg-muted` |
| hover | bg `surface-2`, text `fg` |
| current (`aria-current="page"`) | bg `accent-muted`, text + icon `accent-fg` |
| focus-visible | `--rtok-ring` |

Background changes animate over `duration-base` (150ms, Slint), color over `duration-fast`.
Source: web/src/input.css:81-82; kit.slint:150-196 (NavItem); theme.slint:41-42.
