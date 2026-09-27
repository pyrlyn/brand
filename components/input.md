# Input (field)

`<input class="rtok-field">` + optional `<span class="rtok-help">` / `.rtok-help--error`.

| Part | Token |
|---|---|
| height / padding | `size-control` 32px / 10px (44px and `text-sm` below 768px) |
| radius | `radius-md` |
| background | `bg` at 60% |
| text / placeholder | `text-xs` `fg` / `fg-subtle` |

| State | Style |
|---|---|
| default | border `border` |
| hover | border `border-strong` |
| focus-visible | `--rtok-ring` |
| error (`aria-invalid="true"`) | border `danger`, text `danger-fg`; help text `danger-fg` |
| disabled | 40% opacity |

Always pair `aria-invalid` with a visible message (`aria-describedby`). Source: web/src/input.css:71-73.
