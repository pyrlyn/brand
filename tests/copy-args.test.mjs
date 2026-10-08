import assert from "node:assert/strict";
import test from "node:test";

import { faviconParts, parseCopyArgs, selectSets, unknownSetMessage } from "../bin/pyrlyn-brand-copy.mjs";

test("parseCopyArgs requires a destination and a favicon value", () => {
  assert.equal(parseCopyArgs([]), null);
  assert.equal(parseCopyArgs(["--favicon"]), null);
  assert.equal(parseCopyArgs(["public", "--favicon"]), null);
  assert.deepEqual(parseCopyArgs(["public"]), { dest: "public", wanted: [], favicon: null });
  assert.deepEqual(parseCopyArgs(["public", "pyrlyn", "--favicon", "listepo/listepo-favicon.svg"]), {
    dest: "public",
    wanted: ["pyrlyn"],
    favicon: "listepo/listepo-favicon.svg",
  });
});

test("selectSets defaults to every known set", () => {
  const known = ["pyrlyn", "listepo", "rtok"];
  assert.deepEqual(selectSets([], known), known);
  assert.deepEqual(selectSets(["cox"], known), ["cox"]);
});

test("unknownSetMessage names the sets that exist", () => {
  assert.equal(unknownSetMessage("pyrlyn", ["pyrlyn", "listepo"]), null);
  assert.equal(unknownSetMessage("nope", ["pyrlyn", "listepo"]), 'unknown logo set "nope" (have: pyrlyn, listepo)');
});

test("faviconParts splits the set from the file", () => {
  assert.deepEqual(faviconParts("listepo/listepo-favicon.svg"), { set: "listepo", file: "listepo-favicon.svg" });
});
