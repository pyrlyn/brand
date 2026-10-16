# Toolchain

| Program | How to install | Why here | Source |
| --- | --- | --- | --- |
| node | nodejs.org, or `actions/setup-node` in CI (Node 22) | Run `build.mjs`, `pyrlyn-brand-copy`, and the tests. `engines` allows Node >= 18 | https://nodejs.org/ |
| npm | bundled with node | Run the scripts in `package.json`. The package declares no dependencies | https://github.com/npm/cli |
| jactionlint | mise (`mise.toml` pins `github:jdx/jactionlint` 2.0.2) | Lint the workflows (the `jactionlint` job in `ci.yml`, the pre-push hook and `mise x -- jactionlint`) | https://github.com/jdx/jactionlint |
| hk | mise (`mise.toml` pins 2.5.0) | Runs jactionlint as a pre-push hook (`hk.pkl`) | https://github.com/jdx/hk |
| shellcheck | mise (`mise.toml` pins 0.11.0) | Checks `run:` scripts inside jactionlint | https://github.com/koalaman/shellcheck |
| mise | brew | Pins jactionlint, hk and shellcheck | https://github.com/jdx/mise |

No package-manager dependencies. `package.json` has `scripts` only.
