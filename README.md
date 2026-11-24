# calliope-ui

Gemeinsame Svelte-Komponentenbibliothek (inkl. Storybook) für die Calliope-Editoren und -Apps
(Campus, IoT-Dashboard, Teachable, ML Trainer, …).

Status: Welle 1 (Phase 2): Icon, Button, IconButton, Spinner, TextField, Switch, Dialog,
ConfirmDialog, Menu und Tooltip. Welle 2 (Phase 3): Checkbox, Radio (mit Farbfeldern), Select,
Combobox, Slider, SegmentedControl, Tabs, Badge, Chip, StatusDot, Banner, EmptyState, Toast,
ProgressBar, Popover, VisuallyHidden und LiveRegion, alle mit Stories und Tests. Die Umstellung
des IoT-Dashboards in Campus folgt (Vorlage: Storybook, Rezepte/IoT-Dashboard). Welle 3
(Phase 5): Card, Avatar, AccountMenu, LocaleSwitcher, Toolbar und AppHeader.

- `docs/input/` – vorhandene Konzept-/Vorab-Dokumente
- `docs/01-bestandsaufnahme.md` – Analyse der bestehenden UI über alle Projekte
- `docs/plan/02-plan.md` – Architektur, Backlog, Phasen, Tool-Einsatz, offene Fragen (Entwurf)
- `docs/03-design-audit.md` – design audit of Campus + IoT (Phase 0)
- `DESIGN.md` – design system (draft); token source in `src/lib/tokens/*.tokens.json`

## Development

Requires Node 22+ and pnpm 10+.

```sh
pnpm install
pnpm storybook        # Storybook on http://localhost:6006
pnpm build-storybook  # static Storybook in storybook-static/
pnpm tokens           # regenerate tokens.css / tokens.scss / tokens.ts from the JSON source
pnpm icons            # regenerate the baked-in icon set (src/lib/icons/icons.ts)
pnpm test             # Vitest: token contrast and decision checks, component tests (happy-dom)
pnpm lint             # Prettier
pnpm check            # svelte-check
pnpm package          # library build into dist/ (pnpm tokens + svelte-package + publint)
```

- `src/lib/` – the library (`@calliope-edu/ui`): tokens (`tokens/`), base styles (`styles/`),
  icons (`icons/`), components (`components/<Name>/`, each with its stories and tests beside it)
- `src/stories/` – Foundations pages (colours, typography, spacing, shape, elevation, sizes,
  motion, the icon set comparison), recipes that assemble a screen from the components
  (`recipes/`) and the shared frame of the component overview stories
- `scripts/build-tokens.js` – the token pipeline
- `scripts/build-icons.js` – semantic icon names → SVG bodies from an Iconify set

- `scripts/release-version.mjs` – the next release version (used by the release workflow)
- `.github/actions/resolve-calliope-deps/` – the shared action that sets calliope-ui and the
  widget in an app's build to its channel's state (see below)
- `.github/actions/dispatch-calliope-builds/` – the shared action that rebuilds the apps after a
  push or a release (see below)

CI (`.github/workflows/ci.yml`) runs on every push to `calliope-main` and every pull request:
generated tokens up to date, lint, svelte-check, tests, library build, Storybook build.

## Branches and releases

calliope-ui follows the scheme of the Calliope editors (plan: `docs/design/2026-editor-channels.md`
in calliope-campus) with two channels:

- **dev**: every commit on `calliope-main`, the only long-lived branch. Work branches off
  `calliope-main` and merges back into it. Dev builds of the editors and campus-dev take its
  newest commit.
- **live**: release tags `vX.Y.Z` (SemVer). Live builds of the editors take the newest tag within
  the major version they pin; a Campus release sets the newest tag.

A release is cut by the release workflow (`.github/workflows/release.yml`), never by hand: it
runs the CI checks on the newest commit of `calliope-main`, sets `version` in `package.json`,
commits it as `chore(release): vX.Y.Z`, tags it and publishes a GitHub release with generated
notes. Its last step rebuilds the apps' live builds on their newest tags and their dev builds
(dispatch-calliope-builds below).

```sh
gh workflow run release.yml -R calliope-edu/calliope-ui -f bump=minor   # or patch, major, X.Y.Z
```

Bump `major` for breaking changes (a removed or renamed component, prop, token or export),
`minor` for new components, props or tokens, `patch` for fixes. While the major is 0 every
release counts as compatible, so a `0.x` pin takes every `v0.*.*` release. Release order across
the repos: calliope-ui → widget → editors → Campus.

### resolve-calliope-deps

`.github/actions/resolve-calliope-deps/` is the one copy of the script that every build workflow
(editors, Campus) runs before its install: it rewrites the pins of `@calliope-edu/ui` and
`@calliope-edu/mini-connection-widget` to the newest commit on `calliope-main` (dev) or the newest
release tag within the pinned major (live) and returns the states for `BUILD.json`. Usage and
inputs: [its README](.github/actions/resolve-calliope-deps/README.md).

### dispatch-calliope-builds

`.github/actions/dispatch-calliope-builds/` starts the build workflows of the apps listed in its
`builds.json` (editors, Campus), so they take a new state without a commit of their own: every
push to `calliope-main` (`.github/workflows/dispatch-builds.yml`) starts their dev builds, a
release also their live builds on their newest tags. The widget runs the same action. It needs a
GitHub App whose key is an org secret; setup and the list's format:
[its README](.github/actions/dispatch-calliope-builds/README.md).

## Tokens

The source of truth is `src/lib/tokens/*.tokens.json` (DTCG 2025.10). `pnpm tokens` runs Style
Dictionary and writes three files next to the source. They are committed, because apps install
the library from a git SHA without building it; CI fails when they are out of date.

| File          | Contents                                                                                                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tokens.css`  | Custom properties `--cui-*` in `@layer calliope.tokens`: palette and scales on `:root`, colour roles for light (`:root`, `[data-theme='light']`) and dark (`[data-theme='dark']`, also on a subtree) |
| `tokens.scss` | Sass variables `$cui-*` with static light-theme values, for places where Sass needs a value (media queries)                                                                                          |
| `tokens.ts`   | `palette`, `tokens` (theme-independent), `colors.light` / `colors.dark`, `cssVar()`                                                                                                                  |

Naming: `--cui-` plus the token path joined with `-`; colour roles drop their `color` group.
`color.text.default` → `--cui-text-default`, `palette.ink` → `--cui-palette-ink`,
`space.4` → `--cui-space-4`, `typography.h1` → `--cui-typography-h1-font-size` and its siblings.

## Using it in an app

Same pattern as `mini-connection-widget`: a git dependency pinned to a commit, plus a Vite alias
to the local checkout in dev. The package exports its sources (`src/lib`), so there is no build
step on install. There is deliberately no `prepare` script either: for a git dependency pnpm would
first install all of this repo's dev dependencies (Storybook, Wrangler, …) inside every app's
install. The scripts that need `svelte-kit sync` run it themselves.

```jsonc
// package.json of the app
"@calliope-edu/ui": "github:calliope-edu/calliope-ui#<commit sha>"
```

```js
// vite.config.js: link the checkout in the calliope-dev superrepo while developing
const uiSrc = fileURLToPath(new URL('../../lib/calliope-ui/src/lib', import.meta.url));
const linkUi = command === 'serve' && process.env.UI_PINNED !== '1' && existsSync(uiSrc);
// resolve.alias (exact entries before the bare one):
//   '@calliope-edu/ui/tokens.css' -> uiSrc + '/tokens/tokens.css'
//   '@calliope-edu/ui/styles.css' -> uiSrc + '/styles/styles.css'
//   '@calliope-edu/ui/tokens'     -> uiSrc + '/tokens/index.ts'
//   '@calliope-edu/ui'            -> uiSrc + '/index.ts'
```

Then import the tokens once, e.g. in the app's root layout:

```js
import '@calliope-edu/ui/tokens.css'; // custom properties only, changes nothing visible
// later, once the app adopts the base styles:
// import '@calliope-edu/ui/styles.css';
```

Components need the tokens loaded and are imported from the package root:

```svelte
<script>
	import { Button, ConfirmDialog, confirmDialog, Menu, MenuItem } from '@calliope-edu/ui';
</script>

<Button tone="negative" icon="delete" onclick={remove}>Löschen</Button>
```

Overlays and form controls (Dialog, Menu, Tooltip, Popover, Select, Combobox, Checkbox, Radio,
Slider, Tabs, …) are built on [bits-ui](https://bits-ui.com), toasts on
[svelte-sonner](https://github.com/wobsoriano/svelte-sonner); both are dependencies of the
package. `confirmDialog()` needs one `<ConfirmDialogHost />` and `toast()` one `<Toaster />` in
the app's root layout.

Text uses Roboto, headings and button labels use Roboto Condensed. The package does not load
fonts; the app does, e.g. with `@fontsource-variable/roboto` and
`@fontsource-variable/roboto-condensed`. Without the condensed font, headings and buttons fall
back to Roboto.

`tokens.css` only defines `--cui-*` properties inside `@layer calliope.tokens`, so including it
has no visual effect until something uses them. `styles.css` adds base styles (page colours,
font, focus ring) and is meant for the step where an app actually switches over.

The repository is public, so installing the git dependency needs no credentials. In a build
workflow, run `resolve-calliope-deps` before the install (see Branches and releases): the pin in
the app's `package.json` then only serves local development.

Later the package goes to GitHub Packages with semver; `publishConfig` already switches the
exports to the `dist/` build for that.

### Deploying Storybook

Storybook follows the two channels (see Branches and releases). The workflow
`.github/workflows/storybook.yml` builds it and commits the static site to a build branch:

| Source                        | Build branch | Channel |
| ----------------------------- | ------------ | ------- |
| every push to `calliope-main` | `build-dev`  | dev     |
| every release tag `vX.Y.Z`    | `build-live` | live    |

The release workflow starts the build of its new tag (and of the release commit on
`calliope-main`) itself, since its own push starts no workflow. Nobody commits to `build-dev` or
`build-live` by hand; the branches only grow, one commit per build. Each build branch holds the
site at its root (`index.html`, `iframe.html`, `assets/`, …) plus a `BUILD.json` with channel,
version (`calliope-main` or the tag), source commit and build time.

Rebuild by hand:

```sh
gh workflow run storybook.yml -R calliope-edu/calliope-ui --ref calliope-main   # build-dev
gh workflow run storybook.yml -R calliope-edu/calliope-ui --ref vX.Y.Z          # build-live
```

A tag only builds if it contains `storybook.yml`, so the first `build-live` comes with the first
release after the workflow was added. `pnpm build-storybook` builds the same site locally into `storybook-static/`.

#### Cloudflare Pages

Two Pages projects, each connected to this repository (Git integration) and serving one build
branch as it is. Pages rather than Workers because a Pages project can get a custom subdomain
through a CNAME record at any DNS provider, while a Worker custom domain needs the whole zone on
Cloudflare.

| Setting                | Live project  | Dev project       |
| ---------------------- | ------------- | ----------------- |
| Project name           | `calliope-ui` | `calliope-ui-dev` |
| Production branch      | `build-live`  | `build-dev`       |
| Framework preset       | None          | None              |
| Build command          | _(empty)_     | _(empty)_         |
| Build output directory | _(empty)_     | _(empty)_         |
| Root directory         | _(empty)_     | _(empty)_         |
| Preview deployments    | None          | None              |

- Build command and output directory stay empty: the build branch is the finished site, and an
  empty output directory means the branch root. No pnpm, no Node and no environment variables are
  needed, since nothing is built on Cloudflare.
- Preview deployments must be off (Settings → Builds & deployments → Branch control: "None"):
  every other branch holds the sources, not a built site.
- A custom domain is added per project under Custom domains and needs a CNAME record at the DNS
  provider pointing at the project's `*.pages.dev` address.
- The existing project `calliope-ui` used to build `calliope-main` itself (build command
  `pnpm build-storybook`, output `storybook-static`). To switch it to the live project, set its
  production branch to `build-live`, empty both fields and turn preview deployments off. Until
  then it keeps building from the sources.
