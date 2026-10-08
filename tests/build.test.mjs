import assert from "node:assert/strict";
import test from "node:test";

import {
  bezier,
  family,
  hexToRgb,
  isRole,
  lineHeight,
  rgbChannels,
  tokens,
  withFallbacks,
} from "../build.mjs";

test("tokens keeps only leaf tokens", () => {
  const group = { $description: "skip", regular: { $value: 400 }, nested: { child: { $value: 1 } } };
  assert.deepEqual(tokens(group), [["regular", { $value: 400 }]]);
});

test("color helpers split opaque and 8-digit hex", () => {
  assert.deepEqual(hexToRgb("#5CE1FF"), [92, 225, 255]);
  assert.equal(rgbChannels("#5CE1FF"), "92 225 255");
});

test("font helpers quote only families that contain a space", () => {
  assert.equal(family(["IBM Plex Mono", "ui-monospace", "SFMono-Regular"]), `"IBM Plex Mono", ui-monospace, SFMono-Regular`);
  assert.equal(bezier([0.4, 0, 0.2, 1]), "cubic-bezier(0.4, 0, 0.2, 1)");
  assert.equal(lineHeight({ $extensions: { "com.listepo.lineHeight": "1rem" } }), "1rem");
  assert.equal(lineHeight({}), undefined);
});

test("role lookup matches the base token list", () => {
  assert.equal(isRole("bg"), true);
  assert.equal(isRole("shine"), true);
  assert.equal(isRole("cyan"), false);
});

test("optional roles gain their documented fallback", () => {
  const css = ".x { color: var(--pyr-bg); background: var(--pyr-surface-3); border-color: var(--pyr-shine); box-shadow: rgb(var(--pyr-shine-rgb)); }";
  const out = withFallbacks(css);
  assert.match(out, /var\(--pyr-bg\)/);
  assert.match(out, /var\(--pyr-surface-3, var\(--pyr-surface-2\)\)/);
  assert.match(out, /var\(--pyr-shine, #FFFFFF\)/);
  assert.match(out, /var\(--pyr-shine-rgb, 255 255 255\)/);
});
