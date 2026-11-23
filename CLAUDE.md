# CLAUDE.md

## Branches

- Work happens on `calliope-main`: branch off `calliope-main` and merge back into it. There is no
  other long-lived branch; `main` is the old line and is not worked on any more.
- Every commit on `calliope-main` reaches the dev channel (dev builds of the editors, campus-dev)
  without a further step, so keep it releasable.
- A release tag `vX.Y.Z` is what goes live. Tags are cut only by the release workflow
  (`gh workflow run release.yml -f bump=patch|minor|major`), never by hand; it also commits the
  version in `package.json`. Bump `major` for breaking changes (removed or renamed components,
  props, tokens or exports), `minor` for additions, `patch` for fixes. Details: README.md,
  "Branches and releases".
- `.github/actions/resolve-calliope-deps/` is used by the build workflows of other repos at
  `@calliope-main`: a change there reaches all of them at once, so keep its inputs and outputs
  compatible.
