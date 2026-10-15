import assert from "node:assert/strict";
import test from "node:test";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
function fixture(t, populated = true) {
  const dir = realpathSync(mkdtempSync(join(tmpdir(), "brand-copy-")));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  for (const folder of ["bin", "scripts"]) cpSync(join(root, folder), join(dir, folder), { recursive: true });
  if (populated) {
    mkdirSync(join(dir, "dist/logo/demo"), { recursive: true });
    writeFileSync(join(dir, "dist/logo/demo/icon.svg"), "<svg/>");
  }
  writeFileSync(join(dir, "private.txt"), "private fixture");
  return {
    dir,
    run: (...args) => spawnSync(process.execPath, [join(dir, "bin/pyrlyn-brand-copy.mjs"), join(dir, "public"), ...args], { encoding: "utf8" }),
  };
}

for (const favicon of ["demo/../../../private.txt", "demo/", "demo//icon.svg", "demo/./icon.svg", "demo/..\\private.txt", "toString/icon.svg", "demo/missing.svg"]) {
  test(`CLI rejects invalid favicon ${favicon} before writing`, (t) => {
    const { dir, run } = fixture(t);
    const result = run("--favicon", favicon);
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stderr, /invalid favicon|no such logo file/);
    assert.doesNotMatch(result.stderr, /at .*\.mjs:/);
    assert.equal(existsSync(join(dir, "public")), false);
  });
}

test("CLI refuses a favicon symlink outside the logo set", (t) => {
  const { dir, run } = fixture(t);
  symlinkSync(join(dir, "private.txt"), join(dir, "dist/logo/demo/escape.txt"));
  const result = run("--favicon", "demo/escape.txt");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /invalid favicon|no such logo file/);
  assert.equal(existsSync(join(dir, "public")), false);
});

test("CLI copies valid logos and favicon", (t) => {
  const { dir, run } = fixture(t);
  const result = run("demo", "--favicon", "demo/icon.svg");
  assert.equal(result.status, 0, result.stderr);
  assert.equal(readFileSync(join(dir, "public/favicon.svg"), "utf8"), "<svg/>");
  assert.equal(readFileSync(join(dir, "public/demo/icon.svg"), "utf8"), "<svg/>");
});

for (const populated of [false, true]) {
  test(`CLI fails when the distribution contains no files (${populated})`, (t) => {
    const { dir, run } = fixture(t, populated);
    if (populated) rmSync(join(dir, "dist/logo/demo/icon.svg"));
    const result = run();
    assert.equal(result.status, 1);
    assert.match(result.stderr, /no logo files/);
  });
}
