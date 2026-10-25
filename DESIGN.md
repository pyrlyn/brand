# Pyrlyn design guidelines

- [Base layer](base/DESIGN.md): type, space, radii, motion, interaction, semantic colour roles,
  components, icons. Shared by every brand.
- Brandbooks (only their deltas) live with each product: [rtok](https://github.com/pyrlyn/rtok/blob/main/brand/DESIGN.md),
  [ketch](https://github.com/pyrlyn/ketch/blob/main/brand/DESIGN.md), [cox](https://github.com/pyrlyn/cox/blob/main/brand/DESIGN.md)
  (`brand/` in each product repo). [Mailune](brands/mailune/DESIGN.md) is built in this repo.
- Landing web theme: [`themes/landing/`](themes/landing/) (see README).

## Pyrlyn logo

The company mark ("Prompt", `>_`), in `logo/pyrlyn/`. Use it for "by Pyrlyn" credits and org-level
surfaces; product logos stay primary.

- Colours: ink `#0C0E11` (mark and wordmark on light), paper `#F4F2ED` (on dark); the cursor bar is
  blue `#4C8DFF` on dark and `#2F6BDB` on light (landing `--accent` / `--accent-light`). It is the
  only accent: don't recolour the chevron; animate the cursor only via the `pyrlyn-mark-blink-*` files.
- Wordmark: JetBrains Mono 600, outlined to paths and hand-kerned; never retype it in a font.
- Lockup ratio 109:26 (viewBox `-2 4 109 26`, 2 grid units of clear space built in). Keep at least
  the cursor height (1/8 of the mark box) clear on every side.
- Minimum size: mark 16px, lockup 16px high. Switch `on-light` / `on-dark` with the theme, or inline
  the `mono` file and set `color`.

