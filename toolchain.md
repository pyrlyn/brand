# Toolchain

| Program | How to install | Why here | Source |
| --- | --- | --- | --- |
| node | nodejs.org, or `actions/setup-node` in CI (Node 22) | Run `build.mjs`, `pyrlyn-brand-copy`, and the tests. `engines` allows Node >= 18 | https://nodejs.org/ |
| npm | bundled with node | Run the scripts in `package.json`. The package declares no dependencies | https://github.com/npm/cli |

No package-manager dependencies. `package.json` has `scripts` only.
