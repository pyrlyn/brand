# rtok webui mock → Slint handoff (Bitset B)

Visual refs: `overview.png`, `plugins.png`  
Brand: Hex Diff + bitset mark (`../mark/logo.svg`)

## Nav (keep existing page ids)

`overview` · `plugins` · `calls` · `sessions` · `doctor` · `logs`  
(Do not add Bitset/Tokens/Settings pages from the plugins mock chrome — that mock drifted.)

## Theme global

```slint
export global RtokTheme {
    in-out property <color> canvas: #06101A;
    in-out property <color> surface-1: #0A1622;
    in-out property <color> surface-2: #0F1E2E;
    in-out property <color> hairline: #1A3348;
    in-out property <color> ink: #E8F7FF;
    in-out property <color> ink-muted: #8AA8BC;
    in-out property <color> ink-subtle: #5A7388;
    in-out property <color> accent: #5CE1FF;
    in-out property <color> accent-muted: #5CE1FF33;
    in-out property <color> delta: #FF6B4A;
    in-out property <color> success: #3DDC97;
    in-out property <length> radius-sm: 4px;
    in-out property <length> radius-md: 6px;
    in-out property <length> radius-lg: 10px;
    in-out property <length> space-1: 4px;
    in-out property <length> space-2: 8px;
    in-out property <length> space-3: 12px;
    in-out property <length> space-4: 16px;
    in-out property <length> sidebar-w: 200px;
}
```

Font: request `IBM Plex Mono` (fallback system mono). Prefer one family for all `Text`.

## Window

- `background: RtokTheme.canvas`
- Root `HorizontalBox` padding `12px`, spacing `12px`

## Sidebar

- Width `sidebar-w`, `border-radius: radius-lg`, `background: surface-1`, optional 1px `hairline`
- Header row: bitset mark 24×24 (`@image-url("…/logo.svg")`) + `Text { text: "RTOK"; color: ink; font-size: 16px; font-weight: 700; }`
- Status: pill `connected` — `accent` dot + `ink-muted` 11px
- Nav row states:

| State | bg | fg |
|---|---|---|
| default | transparent | ink-muted |
| hover | surface-2 | ink |
| active | accent-muted | accent |
| focus | surface-2 + 2px accent ring | ink |

Height ≥ 36px, radius-md, padding-left 8px.

## Metric card (Overview)

- bg `surface-1`, border 1px `hairline`, radius-md, padding 16
- label: 11px `ink-muted`
- value: 18px weight 600 `ink` (Saved value may use `accent`)
- delta badge: 11px `delta` text `Δ −34.8%` (coral = measured change; do not use accent green for savings %)

## TokenStatsWidget

Replace hardcoded `#1e1e24` / `#888` / `#eee` / `#8fd19e`:

- card bg → `surface-1`
- labels → `ink-muted` 11px
- values → `ink` 18px / 600
- before→after line → `accent` for the pair, or `delta` when showing % change

## Plugins detail

- enabled → `accent` (or success)
- disabled → `ink-subtle`
- list selected → same as nav active

## A11y

- Focus ring 2px `accent`, offset 2px
- Hit targets ≥ 36px
- Coral only for Δ / danger — not for decoration fills
- Contrast: ink on canvas OK; muted labels for non-essential only

## Implementation order

1. `RtokTheme` global + wire `MainWindow` colors
2. Sidebar header + bitset image + nav active styles
3. Restyle `TokenStatsWidget`
4. Overview metric strip + plugin savings rows
5. Fonts (bundle IBM Plex Mono or document system fallback)

## Light + dark

See `themes/TOKENS.md` and updated `rtok-theme.slint` (`RtokTheme.dark`).

- Default: dark.
- Sidebar theme toggle: icon button bottom of sidebar flipping `RtokTheme.dark`.
- Logo asset: `themes/logo-dark.svg` / `themes/logo-light.svg` (both dark-tiled bitsets; light UI still uses navy tile).
- Mocks: `themes/overview-dark.png`, `themes/overview-light.png`.

## Icons (locked)

Set **F Signal/scope** → `../icons/locked/*.svg`  
Nav mapping: overview / plugins / calls / sessions / doctor / logs (+ theme, savings).
