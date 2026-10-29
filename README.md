# calliope-ui

Gemeinsame Svelte-Komponentenbibliothek (inkl. Storybook) für die Calliope-Editoren und -Apps
(Campus, IoT-Dashboard, Teachable, ML Trainer, …).

Status: Fundament (Phase 1): Token-Pipeline, Storybook mit Foundations-Seiten, CI, Einbindung per
gepinntem SHA. Komponenten folgen ab Welle 1.

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
pnpm test             # Vitest (token contrast and decision checks)
pnpm lint             # Prettier
pnpm check            # svelte-check
pnpm package          # library build into dist/ (svelte-package + publint)
```

- `src/lib/` – the library (`@calliope-edu/ui`): tokens (`tokens/`), base styles (`styles/`)
- `src/stories/` – Storybook pages, starting with Foundations (colours, typography, spacing,
  shape, elevation, sizes, motion)
- `scripts/build-tokens.js` – the token pipeline

CI (`.github/workflows/ci.yml`) runs on every push to `main` and every pull request: generated
tokens up to date, lint, svelte-check, tests, library build, Storybook build.

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

`tokens.css` only defines `--cui-*` properties inside `@layer calliope.tokens`, so including it
has no visual effect until something uses them. `styles.css` adds base styles (page colours,
font, focus ring) and is meant for the step where an app actually switches over.

The repository is private: installing the git dependency needs read access to it (an SSH key
locally; in CI a token, e.g. via `git config url."https://x-access-token:$TOKEN@github.com/".insteadOf "https://github.com/"`).

Later the package goes to GitHub Packages with semver; `publishConfig` already switches the
exports to the `dist/` build for that.

### Deploying Storybook

Storybook is published on Cloudflare Pages (project `calliope-ui`, config in `wrangler.jsonc`,
output `storybook-static/`). Pages rather than Workers because a Pages project can get a custom
subdomain through a CNAME record at any DNS provider, while a Worker custom domain needs the whole
zone on Cloudflare.

The Pages project is connected to the GitHub repo (Git integration) with these build settings:

- Framework preset: none
- Build command: `pnpm build-storybook` (must be set: without it nothing is built and there is no
  `storybook-static/` to publish)
- Build output directory: `storybook-static`
- Production branch: `main`; other branches and pull requests get a preview URL

The build image takes the pnpm version from the `packageManager` field in `package.json`
(`pnpm@10.11.1`; `engines` requires pnpm >= 10). Without it the image may pick pnpm 9 and
`pnpm install --frozen-lockfile` fails with `ERR_PNPM_UNSUPPORTED_ENGINE`. If a build still picks
the wrong version, set the environment variable `PNPM_VERSION=10.11.1` in the Pages build settings.
Keep both in step when upgrading pnpm.

```sh
pnpm run deploy   # build and deploy manually (needs `wrangler login`; `pnpm deploy` is a pnpm built-in)
```
