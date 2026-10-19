import assert from "node:assert/strict";
import test from "node:test";
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

test("the packed copy CLI runs without checkout-only helpers", (t) => {
  const dir = mkdtempSync(join(tmpdir(), "brand-packed-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const pack = spawnSync(process.platform === "win32" ? "npm.cmd" : "npm", ["pack", "--dry-run", "--json", "--ignore-scripts"], {
    cwd: root, encoding: "utf8", shell: process.platform === "win32",
  });
  assert.equal(pack.status, 0, pack.stderr);
  for (const { path } of JSON.parse(pack.stdout)[0].files) {
    const destination = join(dir, "package", path);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(join(root, path), destination);
  }
  const result = spawnSync(process.execPath, [join(dir, "package/bin/pyrlyn-brand-copy.mjs"), join(dir, "public"), "pyrlyn", "--favicon", "listepo/listepo-favicon.svg"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(readFileSync(join(dir, "public/favicon.svg"), "utf8"), readFileSync(join(root, "dist/logo/listepo/listepo-favicon.svg"), "utf8"));
  if (process.platform !== "win32") {
    const link = join(dir, "pyrlyn-brand-copy");
    symlinkSync(join(dir, "package/bin/pyrlyn-brand-copy.mjs"), link);
    const linked = spawnSync(process.execPath, [link, join(dir, "linked"), "pyrlyn", "--favicon", "listepo/listepo-favicon.svg"], { encoding: "utf8" });
    assert.equal(linked.status, 0, linked.stderr);
    assert.equal(readFileSync(join(dir, "linked/favicon.svg"), "utf8"), readFileSync(join(dir, "public/favicon.svg"), "utf8"));
  }
});
