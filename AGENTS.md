# @pyrlyn/brand

If an AGENTS.md or CLAUDE.md exists higher in the tree, follow it too. On conflict, ask the creator.

Zero-dependency token package. `node build.mjs` regenerates `dist/` from `base/tokens.json`. Product packs (the token CLI, the package manager, the coding agent) live in each product repo and extend this base. Do not edit `dist/` by hand. `node build.mjs --check` fails when `dist/` is stale, when a file in `dist/` is no longer produced, or when an `exports` or `bin` target is missing.

`npm test` runs Node's built-in test runner on the pure decisions in `build.mjs`, `bin/pyrlyn-brand-copy.mjs`, and `scripts/check-pack.mjs`. Importing those modules must not rewrite `dist/` or copy logos. Do not snapshot `dist/`.

`package.json` allows Node >= 18. CI pins Node 22. The package has no dependencies. `import.meta.resolve` in `scripts/check-pack.mjs` needs Node >= 18.19.

## Commands

jactionlint and hk are pinned in `mise.toml`. `.github/jactionlint.yaml` applies the default profile and the
baseline `.github/jactionlint-baseline.json`. `hk.pkl` runs jactionlint as a pre-push hook:

```bash
mise x -- jactionlint                  # lint workflows, composite actions, dependabot.yml
mise x -- jactionlint --baseline-write # refresh the baseline after fixing findings
mise x -- hk install --mise            # install the pre-push hook once per clone
```
