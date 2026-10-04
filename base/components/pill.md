# Status pill

`<span class="pyr-pill pyr-pill--ok|warn|fail|info">` (plain `.pyr-pill` = muted).

Height 20px, padding x `space-2`, radius full, `text-2xs` semibold, leading 6px dot in `currentColor`.

| Variant | Text | Border | Background |
|---|---|---|---|
| ok | `success-fg` | `success`/40% | `success`/10% |
| warn | `warn-fg` | `warn`/40% | `warn`/10% |
| fail | `danger-fg` | `danger`/40% | `danger`/10% |
| info | `accent-fg` | `accent`/40% | `accent`/10% |
| muted | `fg-muted` | `border` | `surface-2` |

Never rely on color alone: the label says the state. Source: web/src/input.css:74-80.
