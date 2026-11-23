# resolve-calliope-deps

Sets `@calliope-edu/ui` and `@calliope-edu/mini-connection-widget` in an app's `package.json` to
the state its build channel asks for, before the build installs them:

| Channel | Takes                                                                                   |
| ------- | --------------------------------------------------------------------------------------- |
| `dev`   | the newest commit on `calliope-main`                                                    |
| `live`  | the newest release tag `vX.Y.Z` within the major version the app pins (no pre-releases) |
| `auto`  | `live` when the workflow runs for a tag (`refs/tags/…`), else `dev` (the default)       |

The pin in the app's `package.json` only serves local development; the build replaces it. The
pinned major comes from the pin itself when it is a tag (`#v0.3.0`) or a range
(`#semver:^0.3.0`), otherwise from `version` in the package's `package.json` at the pinned
commit. Major 0 counts as a major like any other: a `0.x` pin takes the newest `v0.*.*` tag.

Only GitHub git dependencies (`github:owner/repo#ref`, `git+https://github.com/…`, …) are
touched, in `dependencies`, `devDependencies` and `optionalDependencies`, keeping the file's
formatting; packages the app does not depend on are skipped (and are `null` in the output). The
action fails when a repository has no `calliope-main` (dev) or no release tag in the pinned major
(live). Both repositories are public, so no token is needed to read them.

## Use

Before the install step. The lockfile no longer matches afterwards, so install without
`--frozen-lockfile` (pnpm) or with `npm install` instead of `npm ci`:

```yaml
- id: calliope
  uses: calliope-edu/calliope-ui/.github/actions/resolve-calliope-deps@calliope-main
  # with:
  #   channel: auto            # dev | live | auto
  #   packages: '@calliope-edu/ui @calliope-edu/mini-connection-widget'
  #   package-json: package.json
- run: pnpm install --no-frozen-lockfile
- run: pnpm build
  env:
    # BUILD.json fragment: {"ui":{"tag":"v0.1.0","commit":"…"},"widget":null}
    CALLIOPE_DEPS: ${{ steps.calliope.outputs.json }}
```

Outputs: `channel`, `json` (the `ui` and `widget` fields of `BUILD.json`; `tag` is `null` on
dev), and `ui-tag`, `ui-commit`, `widget-tag`, `widget-commit` (empty when not applicable). The
job summary lists what was resolved.

## Locally

```sh
node .github/actions/resolve-calliope-deps/resolve-calliope-deps.mjs --channel live --dry-run
```

`--dry-run` leaves `package.json` alone and only prints the result; `--package-json`,
`--packages` and `--branch` work as the inputs above. `GITHUB_TOKEN` (or `GH_TOKEN`), when set,
is used for the GitHub API call that reads `package.json` at a pinned commit.
