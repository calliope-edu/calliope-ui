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

## First check

If `package.json` or `src/lib/components/` is missing, the workspace is on an old state: run
`git fetch origin && git rebase origin/calliope-main`, then `pnpm install`. Commands, layout and
token naming are in README.md ("Development", "Tokens"); the design rules per component in
DESIGN.md ("Components"); plan and progress in `docs/plan/02-plan.md`.

## Where things go

- Component: `src/lib/components/<Name>/` with `<Name>.svelte`, `<Name>.stories.svelte` and
  `<Name>.test.ts` (sub-parts and CSS beside them, e.g. `Menu/MenuRadioItem.svelte`). Export the
  component and its types from `src/lib/index.ts`.
- Tokens: edit `src/lib/tokens/*.tokens.json`, then `pnpm tokens` and commit the generated
  `tokens.css`/`tokens.scss`/`tokens.ts`. Components style with `var(--cui-*)`, not raw colours.
- Story titles: `Primitives/…`, `Patterns/…`, `Navigation/…`, `Overlays/…`, `Hilfsmittel/…`;
  Foundations pages (`Foundations/Farben`, …) in `src/stories/foundations/`; recipes (whole
  screens from components) in `src/stories/recipes/` titled `Rezepte/<German name>`
  (`Rezepte/Editor-Leiste`). Story text and labels are German, code comments English.
- Component stories use `ComponentPage`, `Row` and `Guidelines` from `src/stories/components/`.

## A new variant (example: `bar` on Button and IconButton)

1. Type and prop: add the value to the exported union (`ButtonVariant` in `Button.svelte`,
   `IconButtonVariant` in `IconButton.svelte`) and document it in the prop's JSDoc. The
   component renders it as `data-variant={variant}`; new types also go into `src/lib/index.ts`.
2. Styling: a `.cui-button[data-variant='bar']` block in the component's `<style>` that sets the
   private `--_bg`/`--_fg`/`--_hover` from `--cui-*` tokens (`--cui-action-bar-*`, defined in
   `color.light/dark.tokens.json` under `action.bar`; per-surface overrides in
   `src/lib/styles/styles.css` via `data-surface`). Need a new token? JSON first, then `pnpm tokens`.
3. Story: add the value to the `variant` argType options and a `<section>` with `Row`s showing it in
   `<Name>.stories.svelte`; if a screen uses it, show it in its recipe too.
4. Test: in `<Name>.test.ts` check behaviour and attributes (`data-variant`, ARIA); happy-dom has
   no layout, so looks are checked in Storybook.
5. Describe it under the component in DESIGN.md.

## Storybook

`node .obeya/storybook.mjs start|stop` (free port from 6006, URL in `.obeya/run/storybook.json`);
see the run setting in `.obeya/settings.json`. Before handing over: `pnpm lint`, `pnpm check`.
