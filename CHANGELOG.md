# Changelog

## v0.4.0 (unreleased)

The product brand packs moved to their product repos; this repo keeps the shared base layer, the
Pyrlyn logo and the landing theme. The values in `base/` are unchanged (same tokens, roles, fallbacks,
fonts, icons and components), so `dist/base/*` resolves exactly as in v0.3.0. Only descriptions and
comments that pointed at `brands/` were reworded (in `base/tokens.json`, `base/DESIGN.md`,
`base/components/components.css` and the generated CSS headers).

### Removed

- `brands/rtok`, `brands/ketch`, `brands/cox` and their outputs in `dist/brands/`. Each pack now lives
  in its product repo as `brand/` (pyrlyn/rtok#739, pyrlyn/ketch#258, pyrlyn/cox#137), extends
  `@pyrlyn/brand/base/tokens.json` and builds its own `brand/dist/tokens.css`.
- Exports `brands/*/tokens.css`, `brands/*/tokens.json`, `brands/*/tokens.resolved.json`,
  `brands/<brand>/logo/*`, `brands/rtok/icons/*`: use the product's `brand/dist/` and `brand/logo/`.
- The legacy rtok flat build and its aliases: `tokens.css`, `components.css`, `tailwind-v4.css`,
  `tokens.json`, `tokens.resolved.json`, `logo/rtok/*`, `icons/feature/*`. rtok builds the same files
  in `brand/dist/legacy/` (byte-identical values; `tokens.css` there equals rtok's
  `web/src/styles/tokens.css`), and its feature icons are in `brand/icons/feature/`.
- `pyrlyn-brand-copy` sets `rtok`, `ketch`, `cox`; the sets are now `pyrlyn` and `listepo`.

### Kept

- Every `base/*` export, `landing/*`, `logo/*` (`logo/pyrlyn`, `logo/listepo`), the `pyrlyn-brand-copy`
  bin, and the v0.2.0 base aliases `fonts.css`, `fonts/*`, `icons/ui/*`.

### Migrating

- **landing** (pinned to `github:pyrlyn/brand#v0.2.0`): not affected while the pin stays. Before bumping
  to v0.4.0, drop `@import "@pyrlyn/brand/tokens.css";` from `src/styles/global.css` (it only loaded the
  `--rtok-*` variables, which the page CSS does not use). The `pyrlyn` and `listepo` copy sets, the
  `logo/pyrlyn/*` imports and `landing/*.css` keep working.
- **Product packs** pin v0.3.0 today; its `base/` is identical, so bumping to v0.4.0 is optional and
  only needs `npm install github:pyrlyn/brand#v0.4.0 && node build.mjs` in `brand/` (the header line
  of `dist/` changes).
