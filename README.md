# calliope-ui

Gemeinsame Svelte-Komponentenbibliothek (inkl. Storybook) für die Calliope-Editoren und -Apps
(Campus, IoT-Dashboard, Teachable, ML Trainer, …).

Status: Fundament im Aufbau (Library-Scaffold, Storybook, Foundations-Seiten).

- `docs/input/` – vorhandene Konzept-/Vorab-Dokumente
- `docs/01-bestandsaufnahme.md` – Analyse der bestehenden UI über alle Projekte
- `docs/plan/02-plan.md` – Architektur, Backlog, Phasen, Tool-Einsatz, offene Fragen (Entwurf)

## Development

Requires Node 22+ and pnpm 10+.

```sh
pnpm install
pnpm storybook        # Storybook on http://localhost:6006
pnpm build-storybook  # static Storybook in storybook-static/
pnpm package          # library build into dist/ (svelte-package + publint)
pnpm check            # svelte-check
```

- `src/lib/` – the library (`@calliope-edu/ui`): tokens (`tokens/`), base styles (`styles/`)
- `src/stories/` – Storybook pages, starting with Foundations (colours, typography)

Exports: `@calliope-edu/ui`, `@calliope-edu/ui/tokens`, `@calliope-edu/ui/tokens.css`,
`@calliope-edu/ui/styles.css` (tokens plus base styles in `@layer calliope.*`).

### Deploying Storybook

Storybook is published on Cloudflare as a Worker with static assets only (`wrangler.jsonc`, project
`calliope-ui`, serving `storybook-static/`). Workers Builds is connected to the GitHub repo and
uses the default commands: build `pnpm build-storybook`, deploy `npx wrangler deploy` (main), preview
`npx wrangler versions upload` (pull requests get a preview URL).

The build image takes the pnpm version from the `packageManager` field in `package.json`
(`pnpm@10.11.1`; `engines` requires pnpm >= 10). Without it the image may pick pnpm 9 and
`pnpm install --frozen-lockfile` fails with `ERR_PNPM_UNSUPPORTED_ENGINE`. If a build still picks
the wrong version, set the build variable `PNPM_VERSION=10.11.1` in the Workers Builds settings.
Keep both in step when upgrading pnpm.

```sh
pnpm run deploy                 # build and deploy manually (needs `wrangler login`; `pnpm deploy` is a pnpm built-in)
npx wrangler deploy --dry-run   # check the config against an existing storybook-static/
npx wrangler dev                # serve storybook-static/ locally the way the Worker does
```
