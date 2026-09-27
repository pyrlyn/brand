# Button

`<button class="rtok-btn">` · variants `--primary`, `--ghost`, `--danger`, `--icon`.

| Part | Token |
|---|---|
| height / padding | `size-control` 32px / `space-3` 12px (44px / 16px below 768px) |
| radius | `radius-md` 6px |
| text | `text-xs` 12/16, `weight-semibold` |
| gap (icon + label) | `space-2` 8px |

| State | Default | Primary | Ghost | Danger |
|---|---|---|---|---|
| default | bg `surface-2`, border `border`, text `fg` | bg `accent`, text `on-accent`, no border | transparent, text `fg-muted` | transparent, border `danger`/50%, text `danger-fg` |
| hover | bg `surface-3`, border `border-strong` | bg `accent` at 90% | bg `surface-2`, text `fg` | bg `danger`/10%, border `danger` |
| active | translateY(1px) | same | same | same |
| focus-visible | `--rtok-ring` | same | same | same |
| disabled | 40% opacity, no hover change | same | same | same |
| error | use `--danger` for destructive actions | | | |

Transitions: color/background/border `duration-fast` + `ease-standard`.
Source: web/src/input.css:62-67 (design/web-admin); v3 DESIGN.md `button-primary`.
One primary button per view. `--danger` is not in the web admin yet; it is composed from the
existing danger tokens.
