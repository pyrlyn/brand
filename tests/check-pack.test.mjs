import assert from "node:assert/strict";
import test from "node:test";

import { IMPORT_PATHS, packGaps, unpackedBinPaths } from "../scripts/check-pack.mjs";

test("the documented import list covers the base layer, the landing theme, and the legacy aliases", () => {
  assert.ok(IMPORT_PATHS.includes("base/tokens.css"));
  assert.ok(IMPORT_PATHS.includes("landing/tokens.css"));
  assert.ok(IMPORT_PATHS.includes("fonts.css"));
  assert.ok(IMPORT_PATHS.includes("logo/listepo/listepo-favicon.svg"));
});

test("packGaps reports a missing file and a resolver failure", () => {
  const packed = new Set(["dist/tokens.css"]);
  const resolveFile = (p) => {
    if (p === "broken.css") {
      const error = new Error("no export");
      error.code = "ERR_PACKAGE_PATH_NOT_EXPORTED";
      throw error;
    }
    return p === "tokens.css" ? "dist/tokens.css" : "dist/missing.css";
  };
  assert.deepEqual(packGaps(["tokens.css", "missing.css", "broken.css"], packed, resolveFile), [
    "not packed: missing.css -> dist/missing.css",
    "unresolved: broken.css (ERR_PACKAGE_PATH_NOT_EXPORTED)",
  ]);
});

test("unpackedBinPaths returns bin files the tarball omitted", () => {
  const packed = new Set(["bin/pyrlyn-brand-copy.mjs"]);
  assert.deepEqual(unpackedBinPaths({ "pyrlyn-brand-copy": "bin/pyrlyn-brand-copy.mjs" }, packed), []);
  assert.deepEqual(unpackedBinPaths({ "pyrlyn-brand-copy": "bin/pyrlyn-brand-copy.mjs" }, new Set()), [
    "bin/pyrlyn-brand-copy.mjs",
  ]);
});
